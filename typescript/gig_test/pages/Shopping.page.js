"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const ptor_1 = require("protractor/built/ptor");
const config_constants_1 = require("./shared/config.constants");
const selectors_1 = require("./shared/selectors");
const EC = ptor_1.protractor.ExpectedConditions;
class ShoppingPageObject {
    constructor() { }
    async Search(value) {
        await protractor_1.browser.wait(EC.presenceOf(selectors_1.Selectors.search_text), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        selectors_1.Selectors.search_text.click();
        selectors_1.Selectors.search_text.sendKeys(value);
        protractor_1.browser.actions().sendKeys(ptor_1.protractor.Key.ENTER).perform();
        await protractor_1.browser.wait(EC.presenceOf(selectors_1.Selectors.glass), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        selectors_1.Selectors.glass.click();
    }
    async getResults() {
        await protractor_1.browser.wait(EC.presenceOf(selectors_1.Selectors.results.get(0)), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        let num = await selectors_1.Selectors.results.count();
        return num;
    }
    async getQty() {
        var i;
        var num;
        await protractor_1.browser.manage().timeouts().implicitlyWait(4000);
        await protractor_1.browser.wait(EC.presenceOf(selectors_1.Selectors.text_qty), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        do {
            num = await selectors_1.Selectors.text_qty.getAttribute("value");
            i++;
        } while ((num == "1"));
        return num;
    }
    async remove_product() {
        await protractor_1.browser.wait(EC.presenceOf(selectors_1.Selectors.delete.get(1)), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        selectors_1.Selectors.delete.get(1).click();
    }
    async StatusElement(element) {
        if (await protractor_1.browser.wait(EC.not(EC.presenceOf(element)), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT))
            return true;
        else
            return false;
    }
    async getValues(value) {
        let val;
        let val2;
        switch (value) {
            case "unit": {
                val = await selectors_1.Selectors.unit_price.getText();
                val2 = parseInt(val);
                break;
            }
            case "total": {
                val = await selectors_1.Selectors.total.getText();
                val2 = parseFloat(val);
                break;
            }
        }
        console.log("val2 ", val2);
        return val2;
    }
    async GetItemLayer() {
        await protractor_1.browser.wait(EC.visibilityOf(selectors_1.Selectors.num_items), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        console.log("GETTxt ", await selectors_1.Selectors.num_items.getText());
        //console.log( "GETAtr " ,Selectors.num_items.getAttribute("textContent"));
        return selectors_1.Selectors.num_items.getText();
    }
    async ElementClickProceed(element) {
        await protractor_1.browser.wait(EC.visibilityOf(element), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        await protractor_1.browser.wait(EC.elementToBeClickable(element), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        element.click();
        await protractor_1.browser.wait(EC.not(EC.visibilityOf(selectors_1.Selectors.layer_cart)), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT);
    }
    async AddtoCart(val) {
        let results = protractor_1.$$('#center_column > ul >li');
        let add_to_cart = protractor_1.$('[class="button-container"]');
        //let imag= $$('#center_column > ul >li > div [class="product_img_link"]');
        await protractor_1.browser.wait(EC.presenceOf(selectors_1.Selectors.results.get(val)), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
        await protractor_1.browser.actions().mouseMove(selectors_1.Selectors.results.get(val)).mouseMove(selectors_1.Selectors.results.get(val)).click().perform();
        // browser.actions().doubleClick(results.get(val)).perform();
        selectors_1.Selectors.results.get(val).click();
        await protractor_1.browser.manage().timeouts().implicitlyWait(4000);
        //Selectors.results.get(val).click();
        //  let control = await Selectors.results.get(val).element(by.css('.button-container'))
        await protractor_1.browser.wait(EC.presenceOf(selectors_1.Selectors.add_button), config_constants_1.ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 3);
        selectors_1.Selectors.add_button.click();
        // control.click();
    }
}
exports.ShoppingPageObject = ShoppingPageObject;
//# sourceMappingURL=Shopping.page.js.map