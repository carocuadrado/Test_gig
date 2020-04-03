
import { browser, protractor } from 'protractor';
import { Utils } from '../pages/shared/utils';
import { until } from 'selenium-webdriver';
import { expect } from 'chai';
import { ConfigConstants } from '../pages/shared/config.constants';
import { StorePageObject } from '../pages/Store.page';
import { Selectors} from '../pages/shared/selectors';
const { Given, When, Then, And } = require("cucumber");
const utils: Utils = Utils.getSingletonInstance();
const Store: StorePageObject = new StorePageObject();
let title: string;
let default_step_timeout = 2 * 60 * 1000;




Then('title contains {string}', { timeout: 161000 }, async (titleStr) => {
  
  title = await Store.getTitle(titleStr);
  
  await expect(title).to.contain(titleStr);
 

});



Then('it should appear authentication page {string}', { timeout: 161000 }, async (titleStr) => {
  
  await browser.manage().timeouts().implicitlyWait(4000);
   Store.getTime(Selectors.authentication)
  
  title = await Store.getTitle(titleStr);
  
  await expect(title).to.contain(titleStr);
 

});

Then('it should appear Forgot password page {string}', { timeout: 161000 }, async (titleStr) => {

  await browser.manage().timeouts().implicitlyWait(4000);
  Store.getTime(Selectors.password)
   
  title = await Store.getTitle(titleStr);
  
  await expect(title).to.contain(titleStr);
 
});




 Then('it should appear Order page {string}', { timeout: 161000 }, async (titleStr) => {

  await browser.manage().timeouts().implicitlyWait(4000);
  Store.getTime(Selectors.order)
   
  title = await Store.getTitle(titleStr);
  
  await expect(title).to.contain(titleStr);
 
});



Then('it should appear my account page {string}', { timeout: 161000 }, async (titleStr) => {

  await browser.manage().timeouts().implicitlyWait(4000);
  Store.getTime(Selectors.myaccount)
   
  title = await Store.getTitle(titleStr);
  
  await expect(title).to.contain(titleStr);
 
});


Then('it should appear Search page {string}', { timeout: 161000 }, async (titleStr) => {

  await browser.manage().timeouts().implicitlyWait(4000);
  Store.getTime(Selectors.search_section)
   
  title = await Store.getTitle(titleStr);
  
  await expect(title).to.contain(titleStr);
 
});



Then('there are textbox for email address and button Retrieve password', { timeout: 161000 }, async () => {

 let create = await Store.ElementExist(Selectors.email_forgot);
 await expect(create).to.be.equal(true);
 
 let registered = await Store.ElementExist(Selectors.email_retrieve);
 await expect(create).to.be.equal(true);
 

});


Then('it should display the panel to registered and create account', { timeout: 161000 }, async () => {

 let create = await Store.ElementExist(Selectors.create_account);
 await expect(create).to.be.equal(true);
 
 let registered = await Store.ElementExist(Selectors.registered);
 await expect(create).to.be.equal(true);
 

});



Then('it should appear an error {string}', { timeout: 62000 }, async (error) => {
  let fail = await Store.getError();
  console.log ("msg ", fail);
   await expect(fail).to.contain(error);


});



Then('it should appear an alert {string}', { timeout: 62000 }, async (message) => {
  let success = await Store.getMessage();
  console.log ("fine ", success);
   await expect(success).to.contain(message);


});



Then('I back to login', { timeout: 62000 }, async () => {
 await Store.ElementClick(Selectors.back);

 
});




Given('I input one {string}', { timeout: 62000 }, async (address) => {
   await Store.Inputform("email",address);
  
});



Given('I input the {string}', { timeout: 62000 }, async (pass) => {
   await Store.Inputform("passwd",pass);
  
});

Given('there is a link to forgot password', { timeout: 62000 }, async () => {
  let href=await Store.forgotPass();
  console.log("href ", href);
   await expect(href).to.contain("controller=password");
});



Given('the field should display in {string}', { timeout: 62000 }, async (color) => {
  let val;
    
   switch (color) {
            case "red": { val=await Store.GetFormEmail("form-group form-error");break }
            case "green": { val= await Store.GetFormEmail("form-group form-ok"); break; }
        }
   
   await expect(val).to.be.equal(true);


});



Given('I am in homepage', { timeout: 62000 }, async () => {
  let validation = await Store.validateLoggedSession();


});



When('I enter in Forgot password', { timeout: 62000 }, async () => {
 
await Store.Controlbutton("forgot");
 

});
When('I click on Retrieve password', { timeout: 62000 }, async () => {
 
await Store.ElementClick(Selectors.email_retrieve);
 

});




Given('I am in Authentication section', { timeout: 62000 }, async () => {
  
  await Store.GoSection(Selectors.authentication);


});




Given('I am in Forgot password section', { timeout: 62000 }, async () => {
  
  await Store.GoSection(Selectors.password);


});

When('I mark the Sign in section', { timeout: 62000 }, async () => {
   await Store.Controlbutton("sign index");

});

When('I mark the Sign in', { timeout: 62000 }, async () => {
   await Store.Controlbutton("sign in");

});
