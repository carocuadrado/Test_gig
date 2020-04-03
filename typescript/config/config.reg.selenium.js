"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var reporter_1 = require("../support/reporter");
var shared_config_1 = require("./shared_config");
var jsonReports = process.cwd() + "/reports/json";
var xmlReports = process.cwd() + "/reports/xml";
var new_conf /*/: Config*/ = shared_config_1.shared_config_obj;
exports.new_const_conf = shared_config_1.shared_config_obj;
shared_config_1.chromeOptionsConfigHelper.headless = shared_config_1.vstsHelper.inPipeline();
var my_chromeOptions = shared_config_1.chromeOptionsConfigHelper.getOptions();
//let my_chromeOptions = chromeOptionsConfigHelper.getOptions();
exports.config = {
    defaultTimeoutInterval: 20000,
    seleniumAddress: "http://127.0.0.1:4444/wd/hub",
    SELENIUM_PROMISE_MANAGER: false,
    baseUrl: "http://comst.apmoller.net/ddnd/",
    capabilities: {
        browserName: "chrome",
        chromeOptions: my_chromeOptions,
    },
    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    specs: [
        "../../features/directory/*.feature",
    ],
    onPrepare: function () {
        protractor_1.browser.ignoreSynchronization = true;
        protractor_1.browser.manage().window(); //.maximize();
        reporter_1.Reporter.createDirectory(jsonReports);
    },
    cucumberOpts: {
        'require-module': "ts-node/register",
        format: "json:./reports/json/cucumber_report.json",
        require: [
            "../../steps/*.ts",
            "../../support/*.ts"
        ],
        strict: true,
        tags: ["~@WIP"],
        colorsEnabled: false,
        'format-options': shared_config_1.formatOptionString
    },
    onComplete: function () {
        reporter_1.Reporter.createHTMLReport();
    },
};
var chrome_options_Count = -1;
chrome_options_Count = exports.config.capabilities.chromeOptions.args.length;
if (chrome_options_Count < 0) {
    console.log(exports.config.capabilities.chromeOptions);
    throw new Error("Chrome options was not as expected");
}
//if(config.capabilities.chromeOptions.args.indexOf('--headless'))
//# sourceMappingURL=config.reg.selenium.js.map