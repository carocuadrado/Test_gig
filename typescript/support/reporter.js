"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reporter = require("cucumber-html-reporter");
const fs = require("fs");
const os = require("os");
const mkdirp = require("mkdirp");
const path = require("path");
const jsonReports = path.join(process.cwd(), "/reports/json");
const xmlReports = path.join(process.cwd(), "/reports/xml");
const htmlReports = path.join(process.cwd(), "/reports/html");
const targetJson = jsonReports + "/cucumber_report.json";
exports.ExtraMetaData = Array();
let cucumberReporterOptions = {
    jsonFile: targetJson,
    output: htmlReports + "/cucumber_reporter.html",
    reportSuiteAsScenarios: true,
    theme: "hierarchy",
    metadata: {
        'Test Client OS': os.type() + " " + os.release() + " " + os.platform(),
        'Metadata Location': 'Source code - /support/reporter.ts file'
    }
};
if (process.env.AGENT_NAME) {
    cucumberReporterOptions.metadata['AGENT_NAME'] = process.env.AGENT_NAME;
}
if (process.env.UI_TEST_SUT_URL) {
    cucumberReporterOptions.metadata['UI_TEST_SUT_URL'] = process.env.UI_TEST_SUT_URL;
}
class Reporter {
    static createDirectory(dir) {
        if (!fs.existsSync(dir)) {
            mkdirp.sync(dir);
        }
    }
    static createHTMLReport() {
        try {
            let browserInfo;
            browserInfo = fs.readFileSync('metadata.browserInfo.json');
            cucumberReporterOptions.metadata['Browser Agent'] = JSON.parse(browserInfo)['browserUserAgent'];
        }
        catch (e) {
            console.error("Something went wrong reading metadata.browserInfo.json", e.name, e.message);
        }
        /////////////////
        /////////////////////
        try {
            reporter.generate(cucumberReporterOptions); // invoke cucumber-html-reporter
        }
        catch (err) {
            if (err) {
                console.error(err);
                throw new Error("Failed to save cucumber test results to json file.");
            }
        }
    }
}
exports.Reporter = Reporter;
//# sourceMappingURL=reporter.js.map