"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../pages/shared/utils");
const chai_1 = require("chai");
const Store_page_1 = require("../pages/Store.page");
const Shopping_page_1 = require("../pages/Shopping.page");
const selectors_1 = require("../pages/shared/selectors");
const { Given, When, Then, And } = require("cucumber");
const utils = utils_1.Utils.getSingletonInstance();
const Store = new Store_page_1.StorePageObject();
const Shopping = new Shopping_page_1.ShoppingPageObject();
let default_step_timeout = 2 * 60 * 1000;
Given('I am in Search section', { timeout: 62000 }, async () => {
    await Store.GoSection(selectors_1.Selectors.search_section);
});
Given('I am in shopping-cart summary section', { timeout: 62000 }, async () => {
    await Store.GoSection(selectors_1.Selectors.order);
});
Given('I add to cart the first dress', { timeout: 62000 }, async () => {
    await Shopping.AddtoCart(0);
});
Given('I add to cart the second dress', { timeout: 62000 }, async () => {
    await Shopping.AddtoCart(1);
});
Then('it should display one search box', { timeout: 161000 }, async () => {
    let create = await Store.ElementExist(selectors_1.Selectors.search_text);
    await chai_1.expect(create).to.be.equal(true);
});
Then('it should display one alert with {string} items', { timeout: 161000 }, async (value) => {
    let create = await Store.ElementExist(selectors_1.Selectors.layer_cart);
    await chai_1.expect(create).to.be.equal(true);
});
When('I continue shopping', { timeout: 161000 }, async () => {
    await Store.ElementClickContinue(selectors_1.Selectors.continue_button);
});
When('I remove of first dress', { timeout: 161000 }, async () => {
    await Shopping.remove_product();
});
When('I change of quantity of second dress to 2', { timeout: 161000 }, async () => {
    await Store.ElementClick(selectors_1.Selectors.add_qty);
});
When('I click on Proceed to checkout', { timeout: 161000 }, async () => {
    await Shopping.ElementClickProceed(selectors_1.Selectors.proceed);
});
Then('it should display results', { timeout: 161000 }, async () => {
    let num = await Shopping.getResults();
    await chai_1.expect(num).to.above(0);
});
Then('the value in qty should be 2', { timeout: 161000 }, async () => {
    let num = await Shopping.getQty();
    await chai_1.expect(num).to.be.equal("2");
});
Then('the product should disappear', { timeout: 161000 }, async () => {
    let value = await Shopping.StatusElement(selectors_1.Selectors.products.get(1));
    await chai_1.expect(value).to.be.equal(true);
});
When('I search one {string}', { timeout: 161000 }, async (value) => {
    await Shopping.Search(value);
});
When('I Proceed to checkout', { timeout: 161000 }, async () => {
    await Store.ElementClick(selectors_1.Selectors.checkout);
});
//# sourceMappingURL=Shopping.steps.js.map