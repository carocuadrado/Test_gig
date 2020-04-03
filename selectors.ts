
import { browser, by, element, $$, $, ElementFinder, ProtractorExpectedConditions } from "protractor";
import { protractor } from "protractor/built/ptor";
import * as fs from 'fs';
export class Selectors {

  /*# Initiation*/
 

  public static header =$('#header_logo')

  /* GENERAL modal alert/spinner/error message */
 

 
 public static alert =$('#center_column [class="alert alert-danger"]');
  public static alert_success =$('[class="alert alert-success"]');
 public static alert_message =$('#center_column [class="alert alert-danger"] > ol > li');


  /* Header*/


  public static comsPanelControls_Sign_index = $('#header [class="login"]');



  //*Login -My store*/


  public static authentication =$('#center_column > h1 ');
 public static create_account =$('#create-account_form');
 public static registered =$('#login_form');
 public static comsPanelControls_Sign_in=$('#SubmitLogin');
 public static pass =$('#passwd');
 public static email =$('#email');


/*Forgot password*/

public static link_forgot=$('[class="lost_password form-group"] > a');
public static password=$('#password');
public static email_forgot =$('#form_forgotpassword #email');
public static email_retrieve=$('#form_forgotpassword > fieldset > p > button');
public static back=$('#center_column > ul > li > a')   




/** My account */

 public static myaccount=$('#my-account');

/**Shopping */

public static search_text=$('#searchbox #search_query_top');
public static glass =$('#searchbox >button');
public static results =$$('#center_column > ul >li');
public static search_section=$('#center_column > h1');
public static add_to_cart=$$('[class="button-container"] >a');
public static layer_cart=$('#layer_cart');
public static num_items=$('#layer_cart [class="ajax_cart_quantity"]');
public static add_button=$('#add_to_cart');
public static continue_button=$('#layer_cart > div.clearfix > div.layer_cart_cart.col-xs-12.col-md-6 > div.button-container > span');
public static proceed=$('#layer_cart > div.clearfix > div.layer_cart_cart.col-xs-12.col-md-6 > div.button-container > a');
public static back_search=$('#columns > div.pull-right > strong > a');
public static order=$('#cart_title');
public static add_qty=$$('#cart_summary tr td.cart_quantity.text-center > div > a:nth-child(2)').first();
public static text_qty=$$('#cart_summary tr td.cart_quantity.text-center >input').first();
public static unit_price=$$('#cart_summary tr td.cart_unit >span > span.price').first();
public static total=$$('#cart_summary tr td.cart_total > span').first();
public static delete=$$('#cart_summary tr td.cart_delete.text-center >div >a');
public static products=$$('#cart_summary tr td.cart_product');
public static checkout=$$('[class="cart_navigation clearfix"] >a').first();

}