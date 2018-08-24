var tw = require('twemoji').default || require('twemoji')

let markdown = function (paragraph, prevent={}) {
  paragraph = paragraph.replace(/</g, '&lt;')
  paragraph = paragraph.replace(/>/g, '&gt;')
  if (!prevent.lists && !prevent.everything) {
    paragraph = paragraph.replace(/\n\n((\* | +\* )[^\n]+)/gm, '\n\n<ul class="pl-3 mb-0">\n$1')
    paragraph = paragraph.replace(/(\*[^\n]+)\n *\n/gm, '$1\n</ul>\n\n')
    paragraph = paragraph.replace(/\n\n((1\. | +1\. )[^\n]+)/gm, '\n\n<ol class="pl-3">\n$1')
    paragraph = paragraph.replace(/([1-9]+\.[^\n]+)\n *\n/gm, '$1\n</ol>\n\n')
  }
  paragraph = paragraph.split('\n')
  paragraph.forEach((l, line) => {
    paragraph[line] = l.trim()
    if (!prevent.everything) {
      if (!prevent.lists) paragraph[line] = paragraph[line].replace(/^([1-9]+\. |\* )(.+)/, '<li>$2</li>')

      if (!prevent.bold) paragraph[line] = paragraph[line].replace(/\*\*([^*]+)\*\*/g, '<span class="font-weight-bold">$1</span>')
      if (!prevent.italic) paragraph[line] = paragraph[line].replace(/\*([^*]+)\*/g, '<span class="font-italic">$1</span>')
      if (!prevent.strike) paragraph[line] = paragraph[line].replace(/\~\~([^~]+)\~\~/g, '<s>$1</s>')

      if (!prevent.headings) {
        paragraph[line] = paragraph[line].replace(/^#{1}([^#]+)/, '<div class="h1">$1</div>')
        paragraph[line] = paragraph[line].replace(/^#{2}([^#]+)/, '<div class="h2">$1</div>')
        paragraph[line] = paragraph[line].replace(/^#{3}([^#]+)/, '<div class="h3">$1</div>')
        paragraph[line] = paragraph[line].replace(/^#{4}([^#]+)/, '<div class="h4">$1</div>')
        paragraph[line] = paragraph[line].replace(/^#{5}([^#]+)/, '<div class="h5">$1</div>')
        paragraph[line] = paragraph[line].replace(/^#{6}([^#]+)/, '<div class="h6">$1</div>')
        paragraph[line] = paragraph[line].replace(/^-{3,}$/, '<hr />')
        paragraph[line] = paragraph[line].replace(/^={3,}$/, '<hr style="border-width: 3px" />')
      }
      if (!prevent.images) paragraph[line] = paragraph[line].replace(/!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" class="img-fluid"/>')
      if (!prevent.links) paragraph[line] = paragraph[line].replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>')
    }
    paragraph[line] = paragraph[line].replace(/javascript:/g, '!!!!')
    paragraph[line] = paragraph[line].replace(/vbscript:/g, '!!!!')
    paragraph[line] = paragraph[line].replace(/data:/g, '!!!!')
  })
  paragraph = paragraph.join('\n')
  paragraph = paragraph.replace(/(<\/ul>|<\/ol>)\n{2,}/gm, '$1</br>')
  paragraph = paragraph.replace(/\n{2,}/gm, '</br></br>')
  paragraph = tw.parse(paragraph)
  return paragraph
}


module.exports = markdown
