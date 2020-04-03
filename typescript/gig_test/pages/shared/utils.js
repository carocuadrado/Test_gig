"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const fs = require("fs");
const timeout = 25000; // timeout in ms
class Utils {
    constructor() {
        if (Utils.self)
            throw new Error("One instance already exists");
        if (Utils.navigatorUserAgent === undefined) {
            this.setNavigatorUserAgent(); //.then(() => {console.log("Utils.Done in constructor")});            
        }
        Utils.self = this;
    }
    static warning(message) {
        Utils.logType(message, 'Warning');
    }
    static getSingletonInstance() {
        if (Utils.self == null) {
            new Utils();
        }
        if (Utils.navigatorUserAgent === undefined)
            Utils.self.setNavigatorUserAgent();
        return Utils.self;
    }
    static metaDataFileAge(metaDataName) {
        const fileName = `metadata.${metaDataName}.json`;
        const fs_metadata = fs.statSync(fileName);
        return Date.now() - fs_metadata.ctimeMs;
    }
    static metaDataFileToOld(metaDataName) {
        const file_age_ms = Utils.metaDataFileAge(metaDataName);
        const one_hour_in_ms = 60 * 60 * 1000;
        return file_age_ms > one_hour_in_ms;
    }
    static cleanUpMetadataFiles() {
        try {
            if (Utils.metaDataFileToOld('browserInfo'))
                fs.unlinkSync('metadata.browserInfo.json');
        }
        catch (e) { }
    }
    async setNavigatorUserAgent() {
        let metaDataFileTooOld = null;
        try {
            metaDataFileTooOld = Utils.metaDataFileToOld('browserInfo');
        }
        catch (e) {
        }
        let browserInfo;
        if (protractor_1.browser.driver === undefined) {
            console.log("Driver not set yet, which is OK");
            return;
        }
        if (Utils.navigatorUserAgent) {
            browserInfo = {
                'browserUserAgent': Utils.navigatorUserAgent,
            };
            console.log("Utils.navigatorUserAgent already set", Utils.navigatorUserAgent);
            return fs.writeFileSync('metadata.browserInfo.json', JSON.stringify(browserInfo));
            //            return;
        }
        try {
            let browserUserAgent = await protractor_1.browser.driver.executeScript("return navigator.userAgent");
            Utils.navigatorUserAgent = browserUserAgent;
            Utils.navigatorUserAgentName = browserUserAgent;
            browserInfo = {
                'browserUserAgent': browserUserAgent,
            };
            return fs.writeFileSync('metadata.browserInfo.json', JSON.stringify(browserInfo));
        }
        catch (e) {
            console.error("Failed in getting the UserAgent", e);
        }
        return "ok";
    }
    async loggedInHandler() {
        return;
    }
    static log(message) {
        if (this.loggingInfo) {
            console.log("\nINFO: " + message);
        }
    }
    static logType(message, logType) {
        switch (logType) {
            case 'Warning':
                //
                break;
            case 'Info':
                if (this.loggingInfo == false) {
                    return; // Do nothing
                }
            default:
                break;
        }
        console.log(logType + ": " + message);
    }
    addJson(jsonString) {
        if (Utils.jsonItems)
            Utils.jsonItems.push(jsonString);
        else
            Utils.jsonItems = new Array(jsonString);
    }
    getJson() {
        if (Utils.jsonItems)
            return Utils.jsonItems.pop();
        else
            return null;
    }
}
Utils.jsonItems = [];
Utils.loggingInfo = false;
Utils.self = null;
Utils.subscribers = [];
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map