"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { BeforeAll, Before, After, Status } = require("cucumber");
const protractor_1 = require("protractor");
const utils_1 = require("../gig_test/pages/shared/utils");
const utils = utils_1.Utils.getSingletonInstance();
BeforeAll({ timeout: 15 * 1000 }, async () => {
    utils_1.Utils.cleanUpMetadataFiles();
    await utils.setNavigatorUserAgent();
});
Before({ timeout: 15 * 1000 }, async (scenario) => {
});
After({ timeout: 15 * 1000 }, async function (scenario) {
    if (scenario.result.status === Status.FAILED) {
        // screenShot is a base-64 encoded PNG
        console.log('\n Feature Failed: ', scenario.sourceLocation.uri);
        console.log(' Scenario Failed: ', scenario.pickle.name);
        const screenShot = await protractor_1.browser.takeScreenshot();
        this.attach(screenShot, "image/png");
    }
});
//# sourceMappingURL=hooks.js.map