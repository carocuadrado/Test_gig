"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reporter_1 = require("../support/reporter");
var shared_config_1 = require("./shared_config");
var jsonReports = process.cwd() + "/reports/json";
exports.new_const_conf = shared_config_1.shared_config_obj;
exports.config = {
    defaultTimeoutInterval: 20000,
    mockSelenium: true,
    baseUrl: "http://comst.apmoller.net/ddnd/",
    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    specs: [
        "../../features/directory/*.feature",
    ],
    onPrepare: function () {
        reporter_1.Reporter.createDirectory(jsonReports);
    },
    cucumberOpts: {
        'require-module': "ts-node/register",
        format: "json:./reports/json/cucumber_report.json",
        require: [
            "../../steps/*.ts",
            "../../support/*.ts"
        ],
        'dry-run': true,
        strict: true,
        'format-options': shared_config_1.formatOptionString
        /*tags: "@TypeScriptScenario or @CucumberScenario or @ProtractorScenario",*/
    },
    onComplete: function () {
        reporter_1.Reporter.createHTMLReport();
    },
};
//# sourceMappingURL=config.dry-run.js.map