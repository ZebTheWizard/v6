# IOS Haven - Version 6
This version of IOS Haven uses 
- Expressjs
- Mongoose
- EJS

To get started install **nodejs/npm** and **nodemon**
```
npm install -g nodemon
```

Then install the dependencies
```
npm install
```

Then install mongodb
this video does a pretty good job at explaining how to install it https://www.youtube.com/watch?v=-0X8mr6Q8Ew
or you can reference the documentation https://docs.mongodb.com/manual/installation/

Once everything is installed duplicate the production env file
```
cp config/production.js config/default.js
```

replace all the instances of `process.env...` with the appropiate values.

### DO NOT PLACE API KEYS IN THE PRODUCTION.JS FILE**

### API KEYS GO IN THE DEFAULT.JS FILE**

Everything should work now. To start the webserver run mongodb first then the following command
```
npm test
```

To watch the assets folder use 
```
npm run watch
```
