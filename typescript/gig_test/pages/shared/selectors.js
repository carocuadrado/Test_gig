"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
class Selectors {
}
/*# Initiation*/
Selectors.header = protractor_1.$('#header_logo');
/* GENERAL modal alert/spinner/error message */
Selectors.alert = protractor_1.$('#center_column [class="alert alert-danger"]');
Selectors.alert_success = protractor_1.$('[class="alert alert-success"]');
Selectors.alert_message = protractor_1.$('#center_column [class="alert alert-danger"] > ol > li');
/* Header*/
Selectors.comsPanelControls_Sign_index = protractor_1.$('#header [class="login"]');
//*Login -My store*/
Selectors.authentication = protractor_1.$('#center_column > h1 ');
Selectors.create_account = protractor_1.$('#create-account_form');
Selectors.registered = protractor_1.$('#login_form');
Selectors.comsPanelControls_Sign_in = protractor_1.$('#SubmitLogin');
Selectors.pass = protractor_1.$('#passwd');
Selectors.email = protractor_1.$('#email');
/*Forgot password*/
Selectors.link_forgot = protractor_1.$('[class="lost_password form-group"] > a');
Selectors.password = protractor_1.$('#password');
Selectors.email_forgot = protractor_1.$('#form_forgotpassword #email');
Selectors.email_retrieve = protractor_1.$('#form_forgotpassword > fieldset > p > button');
Selectors.back = protractor_1.$('#center_column > ul > li > a');
/** My account */
Selectors.myaccount = protractor_1.$('#my-account');
/**Shopping */
Selectors.search_text = protractor_1.$('#searchbox #search_query_top');
Selectors.glass = protractor_1.$('#searchbox >button');
Selectors.results = protractor_1.$$('#center_column > ul >li');
Selectors.search_section = protractor_1.$('#center_column > h1');
Selectors.add_to_cart = protractor_1.$$('[class="button-container"] >a');
Selectors.layer_cart = protractor_1.$('#layer_cart');
Selectors.num_items = protractor_1.$('#layer_cart [class="ajax_cart_quantity"]');
Selectors.add_button = protractor_1.$('#add_to_cart');
Selectors.continue_button = protractor_1.$('#layer_cart > div.clearfix > div.layer_cart_cart.col-xs-12.col-md-6 > div.button-container > span');
Selectors.proceed = protractor_1.$('#layer_cart > div.clearfix > div.layer_cart_cart.col-xs-12.col-md-6 > div.button-container > a');
Selectors.back_search = protractor_1.$('#columns > div.pull-right > strong > a');
Selectors.order = protractor_1.$('#cart_title');
Selectors.add_qty = protractor_1.$$('#cart_summary tr td.cart_quantity.text-center > div > a:nth-child(2)').first();
Selectors.text_qty = protractor_1.$$('#cart_summary tr td.cart_quantity.text-center >input').first();
Selectors.unit_price = protractor_1.$$('#cart_summary tr td.cart_unit >span > span.price').first();
Selectors.total = protractor_1.$$('#cart_summary tr td.cart_total > span').first();
Selectors.delete = protractor_1.$$('#cart_summary tr td.cart_delete.text-center >div >a');
Selectors.products = protractor_1.$$('#cart_summary tr td.cart_product');
Selectors.checkout = protractor_1.$$('[class="cart_navigation clearfix"] >a').first();
exports.Selectors = Selectors;
//# sourceMappingURL=selectors.js.map