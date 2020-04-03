"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const reporter_1 = require("../support/reporter");
const jsonReports = process.cwd() + "/reports/json";
const xmlReports = process.cwd() + "/reports/xml";
const { Authenticator } = require('authenticator-browser-extension');
let system_under_test_base_url = 'https://localhost:4200'; // Default Angular startup location
/** Default waiting time for use in Page objects, to wait for. Will be adjusted based on runtime environment. Build server is allowed to use longer time.  */
let default_element_wait; // comment after
exports.default_element_wait = default_element_wait;
class VstsHelper {
    static inPipeline() {
        return !(!process.env.AGENT_NAME);
    }
    static buildReason() {
        // https://docs.microsoft.com/en-us/vsts/pipelines/build/variables?view=vsts&tabs=batch#buildreason
        let buildType = '';
        switch (process.env.BUILD_REQUESTEDFORID) {
            case '8872e40a-2230-4b42-bbac-1fca8f00939e':
                buildType = 'Schedule';
                break;
            default:
                buildType = 'CI ( Continues Integration )';
                break;
        }
        return buildType;
    }
}
exports.VstsHelper = VstsHelper;
class ChromeOptionsConfigHelper {
    static getOptions(goHeadless = false, logLevel = 3) {
        let theOptions = {
            args: ['--headless', '--disable-gpu',
                '--disable-logging', "--log-level=3"]
        };
        let theArgs = [];
        if (goHeadless || ChromeOptionsConfigHelper.headless) {
            theArgs = ['--headless', '--start-maximized', '--disable-gpu', '--force-device-scale-factor=.8', 'window-size=1920,1200'];
        }
        else {
            theArgs = ['--start-maximized', '--force-device-scale-factor=.8', 'window-size=1920,1200'];
        }
        theOptions.args = theArgs;
        return theOptions;
    }
    static enableHeadless() {
        ChromeOptionsConfigHelper.headless = true;
        return ChromeOptionsConfigHelper;
    }
}
ChromeOptionsConfigHelper.headless = false;
exports.ChromeOptionsConfigHelper = ChromeOptionsConfigHelper;
let shared_config_obj = {
    /*Protractor: Default time to wait in ms before a test fails.*/
    defaultTimeoutInterval: 20000,
    seleniumAddress: "http://127.0.0.1:4444/wd/hub",
    SELENIUM_PROMISE_MANAGER: false,
    baseUrl: "www.automationpractice.com",
    capabilities: {
        browserName: "chrome",
        chromeOptions: {
        //        args: ["--test-type", "--no-sandbox"],
        },
    },
    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    specs: [
        "../gig_test/features/**/*.feature",
    ],
    onPrepare: () => {
        protractor_1.browser.ignoreSynchronization = true;
        protractor_1.browser.manage().window(); //.maximize();
        reporter_1.Reporter.createDirectory(jsonReports);
    },
    cucumberOpts: {
        compiler: "ts:ts-node/register",
        format: "json:./reports/json/cucumber_report.json",
        require: [
            "../../gig_test/steps/*.ts",
            "../../support/*.ts"
        ],
        strict: true,
    },
    onComplete: () => {
        reporter_1.Reporter.createHTMLReport();
    },
};
exports.shared_config_obj = shared_config_obj;
let formatOptionString = "";
exports.formatOptionString = formatOptionString;
if (VstsHelper.inPipeline()) { // THIS IS TRUE FOR VSTS
    console.log("Agent name was set to " + process.env.AGENT_NAME + " so VSTS");
    exports.formatOptionString = formatOptionString = '{"colorsEnabled": false}';
    exports.default_element_wait = default_element_wait = 3 * 60 * 1000; // 3 mins
    if (process.env.UI_TEST_SUT_URL) {
        system_under_test_base_url = process.env.UI_TEST_SUT_URL;
    }
    else {
        throw new Error("Please set the environment variable 'UI_TEST_SUT_URL' on your pipeline. This should point to the environment you want to test");
    }
}
else {
    console.log("No Agent name so NOT in VSTS");
    exports.formatOptionString = formatOptionString = "";
    exports.default_element_wait = default_element_wait = 1 * 60 * 1000; // 15 mins
    if (process.env.UI_TEST_SUT_URL) {
        system_under_test_base_url = process.env.UI_TEST_SUT_URL;
    }
}
console.log(" - Default Wait set to " + default_element_wait);
//# sourceMappingURL=shared_config.js.map