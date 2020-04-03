import { browser, by, element, $$, $, ElementFinder, ProtractorExpectedConditions } from "protractor";
import { protractor } from "protractor/built/ptor";
import { ConfigConstants } from './shared/config.constants';
import { Selectors } from './shared/selectors';
import { extend as extendWD, ExtendedWebDriver } from 'webdriver-js-extender';
import * as fs from "fs"
import { Utils } from './shared/utils';
const EC = protractor.ExpectedConditions;




export class StorePageObject {

    constructor() { }



    async validateLoggedSession() {
        let currentURL = await this.getBrowserURL();
        if (currentURL === 'data:,') {
            await this.validateNavegation();
        }

    }
    async validateNavegation() {
        await this.navigate('/index.php');
        console.log("validateNavegation", await browser.getTitle(), await browser.getCurrentUrl());

    }


    async navigate(path) {

        let originalUrl = "automationpractice.com" + path;
        let encodedOriginalUrl = encodeURI(originalUrl);
        let url = "http://" + encodedOriginalUrl;
        console.log(url);
        browser.get(url);


    }
    async getBrowserURL() {
        let currentURL;
        await browser.getCurrentUrl().then(function (url) {
            currentURL = url;
        });
        return currentURL;
    }

    async getTitle(PageStr: string) {
        try {

            await browser.wait(EC.visibilityOf(Selectors.header), ConfigConstants.DEFAULT_PAGE_TIMEOUT * 4);


        } catch (e) {
            console.log("Error in getTitle", e);
            throw e;
        }
        return await browser.getTitle();
    }


    async Controlbutton(button: string) {
        let controlPanelButton: ElementFinder;
        switch (button) {
            case "sign index": { controlPanelButton = await Selectors.comsPanelControls_Sign_index; break; }
            case "sign in": { controlPanelButton = await Selectors.comsPanelControls_Sign_in; break; }
            case "forgot": { controlPanelButton = await Selectors.link_forgot; break; }
            case "retrieve": { controlPanelButton = await Selectors.email_retrieve; break; }

        }
        try {
            await this.getTime(controlPanelButton);
        } catch (e) {
            console.log(e);
            return false;
        }

        controlPanelButton.click();
    }


    async getTime(timeElement) {
        try {
            await browser.wait(EC.presenceOf(timeElement), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        } catch (e) {
            console.error("Error in getTime", e, element, element);
            throw (e);
        }
    }


    async getError() {
        await browser.wait(EC.presenceOf(Selectors.alert), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        return await Selectors.alert_message.getText();


    }


    async ElementClick(element: ElementFinder) {
        await browser.wait(EC.presenceOf(element), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        await element.click();


    }
    async ElementClickContinue(element: ElementFinder) {
        await browser.wait(EC.visibilityOf(element), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        await browser.wait(EC.elementToBeClickable(element), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        element.click();
        await browser.wait(EC.not(EC.visibilityOf(Selectors.layer_cart)), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT);
        await browser.wait(EC.visibilityOf(Selectors.back_search), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT);
        Selectors.back_search.click();



    }


    async getMessage() {

        await browser.wait(EC.presenceOf(Selectors.alert_success), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        return await Selectors.alert_success.getText();



    }
    async ElementExist(modal: ElementFinder) {

        if (await browser.wait(EC.presenceOf(modal), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2))
            return true
        else return false
    }
    async forgotPass() {
        if (await browser.wait(EC.presenceOf(Selectors.link_forgot), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2)) {

            return Selectors.link_forgot.getAttribute('href');
        }
    }



    async GoSection(section: ElementFinder) {

        await browser.wait(EC.presenceOf(section), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT);
        browser.executeScript("arguments[0].scrollIntoView();", section);
        browser.actions().mouseMove(section).perform();

    }

    async Inputform(element: string, val: string) {

        let ele = $(`#${element}`);
        await browser.wait(EC.presenceOf(ele), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT);
        await this.clear(ele, "90")

        ele.sendKeys(protractor.Key.DELETE);

        await ele.click();
        await ele.sendKeys(val);
        await ele.click();


    }


    async clear(elem, length) {
        //  length = length || 100;
        var backspaceSeries = '';
        for (var i = 0; i < length; i++) {
            backspaceSeries += protractor.Key.BACK_SPACE;
        }
        elem.sendKeys(backspaceSeries);
    }

    async GetFormEmail(form: string) {

        await this.ElementClick(Selectors.email);
        Selectors.email.sendKeys(protractor.Key.ENTER);
        await this.ElementClick(Selectors.comsPanelControls_Sign_in);
        let ele = $(`[class="${form}"] #email`);
        if (await browser.wait(EC.presenceOf(ele), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2))
            return true
        else return false

    }

}

