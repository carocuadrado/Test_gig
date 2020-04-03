"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const ptor_1 = require("protractor/built/ptor");
const config_constants_1 = require("./shared/config.constants");
const selectors_1 = require("./shared/selectors");
const EC = ptor_1.protractor.ExpectedConditions;
class StorePageObject {
    constructor() { }
    async validateLoggedSession() {
        let currentURL = await this.getBrowserURL();
        if (currentURL === 'data:,') {
            await this.validateNavegation();
        }
    }
    async validateNavegation() {
        await this.navigate('/index.php');
        console.log("validateNavegation", await protractor_1.browser.getTitle(), await protractor_1.browser.getCurrentUrl());
    }
    async navigate(path) {
        let originalUrl = "automationpractice.com" + path;
        let encodedOriginalUrl = encodeURI(originalUrl);
        let url = "http://" + encodedOriginalUrl;
        console.log(url);
        protractor_1.browser.get(url);
    }
    async getBrowserURL() {
        let currentURL;
        await protractor_1.browser.getCurrentUrl().then(function (url) {
            currentURL = url;
        });
        return currentURL;
    }
    async getTitle(PageStr) {
        try {
            await protractor_1.browser.wait(EC.visibilityOf(selectors_1.Selectors.header), config_constants_1.ConfigConstants.DEFAULT_PAGE_TIMEOUT * 4);
        }
        catch (e) {
            console.log("Error in getTitle", e);
            throw e;
        }
        return await protractor_1.browser.getTitle();
    }
    async Controlbutton(button) {
        let controlPanelButton;
        switch (button) {
            case "sign index": {
                controlPanelButton = await selectors_1.Selectors.comsPanelControls_Sign_index;
                break;
            }
            case "sign in": {
                controlPanelButton = await selectors_1.Selectors.comsPanelControls_Sign_in;
                break;
            }
            case "forgot": {
                controlPanelButton = await selectors_1.Selectors.link_forgot;
                break;
            }
            case "retrieve": {
                controlPanelButton = await selectors_1.Selectors.email_retrieve;
                break;
            }
        }
        try {
            await this.getTime(controlPanelButton);
        }
        catch (e) {
            console.log(e);
            return false;
        }
        controlPanelButton.click();
    }
    async getTime(timeElement) {
        try {
            await protractor_1.browser.wait(EC.presenceOf(timeElement), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        }
        catch (e) {
            console.error("Error in getTime", e, protractor_1.element, protractor_1.element);
            throw (e);
        }
    }
    async getError() {
        await protractor_1.browser.wait(EC.presenceOf(selectors_1.Selectors.alert), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        return await selectors_1.Selectors.alert_message.getText();
    }
    async ElementClick(element) {
        await protractor_1.browser.wait(EC.presenceOf(element), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        await element.click();
    }
    async ElementClickContinue(element) {
        await protractor_1.browser.wait(EC.visibilityOf(element), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        await protractor_1.browser.wait(EC.elementToBeClickable(element), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        element.click();
        await protractor_1.browser.wait(EC.not(EC.visibilityOf(selectors_1.Selectors.layer_cart)), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT);
        await protractor_1.browser.wait(EC.visibilityOf(selectors_1.Selectors.back_search), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT);
        selectors_1.Selectors.back_search.click();
    }
    async getMessage() {
        await protractor_1.browser.wait(EC.presenceOf(selectors_1.Selectors.alert_success), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        return await selectors_1.Selectors.alert_success.getText();
    }
    async ElementExist(modal) {
        if (await protractor_1.browser.wait(EC.presenceOf(modal), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2))
            return true;
        else
            return false;
    }
    async forgotPass() {
        if (await protractor_1.browser.wait(EC.presenceOf(selectors_1.Selectors.link_forgot), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2)) {
            return selectors_1.Selectors.link_forgot.getAttribute('href');
        }
    }
    async GoSection(section) {
        await protractor_1.browser.wait(EC.presenceOf(section), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT);
        protractor_1.browser.executeScript("arguments[0].scrollIntoView();", section);
        protractor_1.browser.actions().mouseMove(section).perform();
    }
    async Inputform(element, val) {
        let ele = protractor_1.$(`#${element}`);
        await protractor_1.browser.wait(EC.presenceOf(ele), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT);
        //  ele.click();
        //ele.sendKeys(protractor.Key.DELETE);
        await this.clear(ele, "90");
        ele.sendKeys(ptor_1.protractor.Key.DELETE);
        //browser.actions().sendKeys(protractor.Key.DELETE).perform();
        // browser.actions().sendKeys(protractor.Key.DELETE).perform();
        await ele.click();
        await ele.sendKeys(val);
        await ele.click();
        // await ele.sendKeys(protractor.Key.ENTER);
    }
    async clear(elem, length) {
        //  length = length || 100;
        var backspaceSeries = '';
        for (var i = 0; i < length; i++) {
            backspaceSeries += ptor_1.protractor.Key.BACK_SPACE;
        }
        elem.sendKeys(backspaceSeries);
    }
    async GetFormEmail(form) {
        // let modal = $('[class="form_content" clearfix"]')
        // await browser.wait(EC.presenceOf(modal), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT);
        // modal.click();
        await this.ElementClick(selectors_1.Selectors.email);
        selectors_1.Selectors.email.sendKeys(ptor_1.protractor.Key.ENTER);
        await this.ElementClick(selectors_1.Selectors.comsPanelControls_Sign_in);
        let ele = protractor_1.$(`[class="${form}"] #email`);
        if (await protractor_1.browser.wait(EC.presenceOf(ele), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2))
            return true;
        else
            return false;
    }
}
exports.StorePageObject = StorePageObject;
//# sourceMappingURL=Store.page.js.map