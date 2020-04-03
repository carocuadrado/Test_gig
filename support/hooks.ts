const { BeforeAll, Before, After, Status } = require("cucumber");
import { browser, protractor } from "protractor";
import { Utils } from '../gig_test/pages/shared/utils';
const utils: Utils = Utils.getSingletonInstance();


BeforeAll({ timeout: 15 * 1000 }, async () => {
    Utils.cleanUpMetadataFiles();
    await utils.setNavigatorUserAgent();
});



Before({ timeout: 15 * 1000 }, async (scenario) => {
  
});

After({timeout: 15 * 1000 }, async function (scenario) {

    if (scenario.result.status === Status.FAILED) {
        // screenShot is a base-64 encoded PNG
        console.log('\n Feature Failed: ', scenario.sourceLocation.uri);
        console.log(' Scenario Failed: ', scenario.pickle.name);
        
        const screenShot = await browser.takeScreenshot();
    this.attach(screenShot, "image/png");
    }

  
});