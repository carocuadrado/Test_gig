import { browser, Config } from "protractor";
import { Reporter } from "../support/reporter";

import {
    formatOptionString,
    ChromeOptionsConfigHelper,
    VstsHelper,
    shared_config_obj
} from "./shared_config"

const jsonReports = process.cwd() + "/reports/json";
const xmlReports = process.cwd() + "/reports/xml";

let base_url_local = 'http://localhost:8080';
let base_url_test = 'http://www.automationpractice.com/';

let new_conf /*/: Config*/ = shared_config_obj;

export const new_const_conf = shared_config_obj;

 ChromeOptionsConfigHelper.headless = VstsHelper.inPipeline();
// ChromeOptionsConfigHelper.headless = false;
let my_chromeOptions = ChromeOptionsConfigHelper.getOptions();


let tags = "not @WIP and not @Buggy"
// let tags =  "@OpenScenario";

console.log('VstsHelper.buildReason(): ', VstsHelper.buildReason());


console.log('Tags Included in the build: ', tags);

//let my_chromeOptions = chromeOptionsConfigHelper.getOptions();

export const config: Config = {
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
        browser.ignoreSynchronization = true;
        browser.manage().window(); //.maximize();
        Reporter.createDirectory(jsonReports);
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
        'format-options': formatOptionString
    },

    onComplete: () => {
        Reporter.createHTMLReport();
    },
};
let chrome_options_Count = -1;
chrome_options_Count = config.capabilities.chromeOptions.args.length;
if (chrome_options_Count < 0) {
    console.log(config.capabilities.chromeOptions);
    throw new Error("Chrome options was not as expected");
}

//if(config.capabilities.chromeOptions.args.indexOf('--headless'))

function addTag(tag: string): void {
    const prefix = tags.length ? ' and ' : '';
    tags = tags.concat(prefix + tag);
}

function getUrl(): string {
    switch (process.env.ENV) {
        case 'test':
            return base_url_test;
        default:
            return base_url_local;
    }
}