require("babel-register")({
  presets: [ 'es2015' ]
});

var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var AllureReporter = require('jasmine-allure-reporter');

exports.config = {
        directConnect: true,
        specs: ['specs/orangeHRMSpec.js'],
        baseUrl: '',
        framework: 'jasmine',

    jasmineNodeOpts: {
        showColors: true,
        displaySpecDuration: true,
        // overrides jasmine's print method to report dot syntax for custom reports
        print: () => {},
        defaultTimeoutInterval: 100000,
        stopSpecOnExpectationFailure: true
    },

    onPrepare:() => {

    browser.manage().window().setSize(1024, 800);
        let appEnv = process.env.UI_ENV;
    try {
      appEnv = process.env.UI_ENV;
      browser.ignoreSynchronization = true;
    } catch (err) {
      throw new Error("appEnv URL is not Defined, Please Specify the appEnv URL : " + process.env.UI_ENV);
    }
    //browser.get(appEnv.toString());
    browser.driver.manage().window().maximize();
    browser.sleep(3000);

    const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'specs'}));

    //HTMLReport called once tests are finished
        jasmine.getEnv().addReporter(
           new Jasmine2HtmlReporter({
               savePath: 'Reports'
           })
       );

    //Generate HTML report from Allure results
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));

        jasmine.getEnv().afterEach(function(done){
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(pnng, 'base64')
                }, 'image/png')();
                done();
            })
        });
  },

  capabilities: {
      browserName: 'chrome',
      shardTestFiles: true,
      maxInstances: 2,
      chromeOptions: {
          args: [
              // disable chrome's wakiness
              '--disable-infobars',
              '--disable-extensions',
              'verbose',
              'log-path=/tmp/chromedriver.log'
          ],
          prefs: {
              // disable chrome's annoying password manager
              'profile.password_manager_enabled': false,
              'credentials_enable_service': false,
              'password_manager_enabled': false
          }
      },
      jasmineNodeOpts: {
          showColors: true,
          displaySpecDuration: true,
          // overrides jasmine's print method to report dot syntax for custom reports
          print: () => {
          },
          defaultTimeoutInterval: 200000
      }
  }
};