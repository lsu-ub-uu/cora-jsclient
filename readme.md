**jsclient is the js client for Cora.**

**Node.js**

We are using node for testing, installed with:

sudo npm install -g karma phantomjs karma-phantomjs-launcher karma-chrome-launcher karma-firefox-launcher karma qunitjs karma-qunit karma-coverage karma-html-reporter karma-junit-reporter

On development machine might this be enough:
npm install karma phantomjs karma-phantomjs-launcher karma-chrome-launcher karma-firefox-launcher karma karma-qunit karma-coverage karma-html-reporter --save-dev


Javascript files can be minimized with grunt:

sudo npm install -g grunt-cli

**FitNesse**

Install SlimJS: sudo npm install -g slimjs

Update node: sudo npm install -g n && sudo n stable

Start FitNesse with mvn -P wiki verify

