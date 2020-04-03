import { browser, by, element, $$, $, ElementFinder, ProtractorExpectedConditions } from "protractor";
import { protractor } from "protractor/built/ptor";
import { ConfigConstants } from './shared/config.constants';
import { Selectors } from './shared/selectors';
import { extend as extendWD, ExtendedWebDriver } from 'webdriver-js-extender';
import * as fs from "fs"
import { Utils } from './shared/utils';
const EC = protractor.ExpectedConditions;




export class ShoppingPageObject {

  constructor() { }



  async Search(value: string) {

    await browser.wait(EC.presenceOf(Selectors.search_text), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
    Selectors.search_text.click();
    Selectors.search_text.sendKeys(value);
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    await browser.wait(EC.presenceOf(Selectors.glass), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
    Selectors.glass.click();


  }



  async getResults() {
    await browser.wait(EC.presenceOf(Selectors.results.get(0)), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
    let num = await Selectors.results.count();
    return num;

  }

  async getQty() {
    var i;
    var num;
    await browser.manage().timeouts().implicitlyWait(4000);
    await browser.wait(EC.presenceOf(Selectors.text_qty), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
    do {
      num = await Selectors.text_qty.getAttribute("value");
      i++

    } while ((num == "1"))


    return num


  }
  async remove_product() {

    await browser.wait(EC.presenceOf(Selectors.delete.get(1)), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
    Selectors.delete.get(1).click();

  }
  async StatusElement(element: ElementFinder) {

    if (await browser.wait(EC.not(EC.presenceOf(element)), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT))
      return true
    else return false
  }

  async getValues(value: string) {
    let val;
    let val2
    switch (value) {
      case "unit": {
        val = await Selectors.unit_price.getText();
        val2 = parseInt(val); break
      }
      case "total": {
        val = await Selectors.total.getText();
        val2 = parseFloat(val); break
      }
    }
    console.log("val2 ", val2);
    return val2;

  }
  async GetItemLayer() {

    await browser.wait(EC.visibilityOf(Selectors.num_items), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
    console.log("GETTxt ", await Selectors.num_items.getText());
    //console.log( "GETAtr " ,Selectors.num_items.getAttribute("textContent"));
    return Selectors.num_items.getText();

  }



  async ElementClickProceed(element: ElementFinder) {
    await browser.wait(EC.visibilityOf(element), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
    await browser.wait(EC.elementToBeClickable(element), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);
    element.click();
    await browser.wait(EC.not(EC.visibilityOf(Selectors.layer_cart)), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT);




  }

  async AddtoCart(val) {

    let results = $$('#center_column > ul >li');
    let add_to_cart = $('[class="button-container"]');
    //let imag= $$('#center_column > ul >li > div [class="product_img_link"]');
    await browser.wait(EC.presenceOf(Selectors.results.get(val)), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 2);

    await browser.actions().mouseMove(Selectors.results.get(val)).mouseMove(Selectors.results.get(val)).click().perform();


    // browser.actions().doubleClick(results.get(val)).perform();
    Selectors.results.get(val).click();
    await browser.manage().timeouts().implicitlyWait(4000);

    //Selectors.results.get(val).click();

    //  let control = await Selectors.results.get(val).element(by.css('.button-container'))
    await browser.wait(EC.presenceOf(Selectors.add_button), ConfigConstants.DEFAULT_ELEMENT_TIMEOUT * 3);
    Selectors.add_button.click();
    // control.click();





  }



}











