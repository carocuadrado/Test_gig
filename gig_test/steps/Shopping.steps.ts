
import { browser, protractor } from 'protractor';
import { Utils } from '../pages/shared/utils';
import { until } from 'selenium-webdriver';
import { expect } from 'chai';
import { ConfigConstants } from '../pages/shared/config.constants';
import { StorePageObject } from '../pages/Store.page';
import { ShoppingPageObject } from '../pages/Shopping.page';
import { Selectors } from '../pages/shared/selectors';
const { Given, When, Then, And } = require("cucumber");
const utils: Utils = Utils.getSingletonInstance();
const Store: StorePageObject = new StorePageObject();
const Shopping: ShoppingPageObject = new ShoppingPageObject();
let default_step_timeout = 2 * 60 * 1000;






Given('I am in Search section', { timeout: 62000 }, async () => {

  await Store.GoSection(Selectors.search_section);


});


Given('I am in shopping-cart summary section', { timeout: 62000 }, async () => {

  await Store.GoSection(Selectors.order);


});


Given('I add to cart the first dress', { timeout: 62000 }, async () => {

  await Shopping.AddtoCart(0);



});




Given('I add to cart the second dress', { timeout: 62000 }, async () => {

  await Shopping.AddtoCart(1);



});
Then('it should display one search box', { timeout: 161000 }, async () => {

  let create = await Store.ElementExist(Selectors.search_text);
  await expect(create).to.be.equal(true);


});


Then('it should display one alert with {string} items', { timeout: 161000 }, async (value) => {

  let create = await Store.ElementExist(Selectors.layer_cart);
  await expect(create).to.be.equal(true);



});




When('I continue shopping', { timeout: 161000 }, async () => {

  await Store.ElementClickContinue(Selectors.continue_button);



});



When('I remove of first dress', { timeout: 161000 }, async () => {

  await Shopping.remove_product();



});


When('I change of quantity of second dress to 2', { timeout: 161000 }, async () => {

  await Store.ElementClick(Selectors.add_qty);



});



When('I click on Proceed to checkout', { timeout: 161000 }, async () => {

  await Shopping.ElementClickProceed(Selectors.proceed);



});

Then('it should display results', { timeout: 161000 }, async () => {

  let num = await Shopping.getResults()
  await expect(num).to.above(0);


});


Then('the value in qty should be 2', { timeout: 161000 }, async () => {

  let num = await Shopping.getQty()

  await expect(num).to.be.equal("2");


});


Then('the product should disappear', { timeout: 161000 }, async () => {

  let value = await Shopping.StatusElement(Selectors.products.get(1))

  await expect(value).to.be.equal(true);


});



When('I search one {string}', { timeout: 161000 }, async (value) => {

  await Shopping.Search(value);


});


When('I Proceed to checkout', { timeout: 161000 }, async () => {

  await Store.ElementClick(Selectors.checkout);


});
