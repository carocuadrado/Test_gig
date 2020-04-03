"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const reporter_1 = require("../support/reporter");
const shared_config_1 = require("./shared_config");
const jsonReports = process.cwd() + "/reports/json";
const xmlReports = process.cwd() + "/reports/xml";
let base_url_local = 'http://localhost:8080';
let base_url_test = 'http://www.automationpractice.com/';
let new_conf /*/: Config*/ = shared_config_1.shared_config_obj;
exports.new_const_conf = shared_config_1.shared_config_obj;
shared_config_1.ChromeOptionsConfigHelper.headless = shared_config_1.VstsHelper.inPipeline();
// ChromeOptionsConfigHelper.headless = false;
let my_chromeOptions = shared_config_1.ChromeOptionsConfigHelper.getOptions();
let tags = "not @WIP and not @Buggy";
// let tags =  "@OpenScenario";
console.log('VstsHelper.buildReason(): ', shared_config_1.VstsHelper.buildReason());
console.log('Tags Included in the build: ', tags);
//let my_chromeOptions = chromeOptionsConfigHelper.getOptions();
exports.config = {
    defaultTimeoutInterval: 20000,
    directConnect: true,
    seleniumAddress: "http://127.0.0.1:4444/wd/hub",
    SELENIUM_PROMISE_MANAGER: false,
    baseUrl: getUrl(),
    capabilities: {
        browserName: "chrome",
        chromeOptions: my_chromeOptions,
    },
    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    specs: [
        "../../gig_test/features/**/*.feature",
    ],
    onPrepare: () => {
        protractor_1.browser.ignoreSynchronization = true;
        protractor_1.browser.manage().window(); //.maximize();
        reporter_1.Reporter.createDirectory(jsonReports);
    },
    cucumberOpts: {
        'require-module': "ts-node/register",
        format: "json:./reports/json/cucumber_report.json",
        require: [
            "../../gig_test/steps/*.ts",
            "../../support/*.ts",
        ],
        strict: true,
        tags: tags,
        colorsEnabled: false,
        'format-options': shared_config_1.formatOptionString
    },
    onComplete: () => {
        reporter_1.Reporter.createHTMLReport();
    },
};
let chrome_options_Count = -1;
chrome_options_Count = exports.config.capabilities.chromeOptions.args.length;
if (chrome_options_Count < 0) {
    console.log(exports.config.capabilities.chromeOptions);
    throw new Error("Chrome options was not as expected");
}
//if(config.capabilities.chromeOptions.args.indexOf('--headless'))
function addTag(tag) {
    const prefix = tags.length ? ' and ' : '';
    tags = tags.concat(prefix + tag);
}
function getUrl() {
    switch (process.env.ENV) {
        case 'test':
            return base_url_test;
        default:
            return base_url_local;
    }
}
//# sourceMappingURL=config.js.map