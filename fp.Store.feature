@test
Feature: Sign-in
This feature considers the following behaviour

-Testing the Sign-in feature 



  #  Login page
  Scenario Outline: <Description>

    Given I am in homepage
    And title contains "My Store"
    When I mark the Sign in section
    Then it should appear authentication page "Login - My Store"
    And it should display the panel to registered and create account

    Examples:
      | Description                                   |
      | "Users should be able to enter in Login page" |


  #Sign in error address required
  Scenario Outline: <Description>

    Given I am in Authentication section
    When I mark the Sign in
    Then it should appear an error <error>

    Examples:
      | error                       | Description                                   |
      | "An email address required" | "Address is required to sign in" |


  #Sign in address validations
  Scenario Outline: <Description>

    Given I am in Authentication section
    And I input one <address>
    #And the field should display in <color>
    When I mark the Sign in
    Then it should appear an error <error>
    Examples:
      | error                  | address                   | color   | Description                                   |
      | "Invalid email address." | "1"                       | "red"   | "It shows an alert when the address "1" is invalid" |
      | "Invalid email address." | "ae@"                     | "red"   | "It shows an alert when the address "ae@" is invalid" |
      | "Invalid email address." | "ae@.com"                 | "red"   | "It shows an alert when the address "ae@.com" is invalid" |
      | "Invalid email address." | "ae@gmail"                | "red"   | "It shows an alert when the address "ae@gmail" is invalid" |
      | "Invalid email address." | "ae@."                    | "red"   | "It shows an alert when the address "ae@." " is invalid" |
      | "Password is required." | "carocuadradoj@gmail.com" | "green" | ""It shows an alert when the address is correct but the password is required |


  #Sign in password validations
  Scenario Outline: <Description>

    Given I am in Authentication section
    And I input one <address>
    And I input the <password>
    When I mark the Sign in
    Then it should appear an error <error>
    Examples:
      | error                  | address                     | password  | Description                                   |
      | "Invalid password."     | "carocuadradoj@gmail.com" | "123"      | "It shows one alert when the password is invalid" |
      | "Authentication failed." | "carocuadradoj@gmail.com" | "5841CDh2855"   | "It shows one alert of Authentication failed when address is not according with password" |
     



 #Enter in Forgot password
  Scenario Outline: <Description>

    Given I am in Authentication section
    And I input one <address>
     And there is a link to forgot password
    When I enter in Forgot password
    Then it should appear Forgot password page "Forgot your password - My Store"
    And there are textbox for email address and button Retrieve password

    Examples:
     | address                    | password       | Description                                   |
     | "carocuadradoj@gmail.com" | "5841CDj2939"   | "Users have the possibility to link about Forgot the password" |
 

 #Retrieve password
  Scenario Outline: <Description>

    Given I am in Forgot password section
    And I input one <address>
    When I click on Retrieve password
   Then it should appear an error <error>

    Examples:
     | address        |   error                                                    | Description                                   |
     | "ae@gmail.com" | "There is no account registered for this email address."   | "Validation of address to recovering password" |
     | "e"             | "Invalid email address"                                    | "Validation of address valid to recover a password" |
 


 #Retrieve password successfully
  Scenario Outline: <Description>

    Given I am in Forgot password section
    And I input one <address>
    When I click on Retrieve password
   Then it should appear an alert <message>
    And I back to login
    And it should appear authentication page "Login - My Store"
    Examples:
     | address                 |  message                                                   | Description                                   |
     | "carocuadrado@hotmail.com" | "A confirmation email has been sent to your address:"   | "Recovering password successfully" |
    
 

 #Enter in My account
  Scenario Outline: <Description>

    Given I am in Authentication section
    And I input one <address>
     And I input the <password>
    When I mark the Sign in
    Then it should appear my account page "My account - My Store"
    Examples:
     | address                    | password       | Description                                   |
     | "carocuadradoj@gmail.com" | "5841CDj2933"   | "Users should be able to login successfully" |
 

 