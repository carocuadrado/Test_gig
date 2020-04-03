@test
Feature: Shopping cart
This feature considers the following behaviour

-Testing that the Shopping Cart tracks items correctly



  #  Load homepage
  Scenario Outline: <Description>

    Given I am in homepage
    When title contains "My Store"
    Then it should display one search box

    Examples:
      | Description                                   |
      | "Users should be able to enter into homepage" |


  #Search for black dress
  Scenario Outline: <Description>

    Given I am in homepage
    When I search one <value>
    Then it should display results

    Examples:
      | value         | Description                                      |
      | "black dress" | "User can be able to search black dress product" |


  #Add
  Scenario Outline: <Description>

    Given I am in Search section
    And I add to cart the first dress
    And it should display one alert with <value> items
    And I continue shopping
    And it should appear Search page "Search - My Store"
    And I am in Search section
    When I add to cart the second dress
    Then it should display one alert with "2" items
    And I click on Proceed to checkout
    Then it should appear Order page "Order - My Store"

    Examples:
      | value | Description                                                                                           |
      | "1"   | "User adds the first dress, continues shopping,adds the second dress and goes on Proceed to checkout" |



  #order change quantity
  Scenario Outline: <Description>

    Given I am in shopping-cart summary section
    When I change of quantity of second dress to 2
    Then the value in qty should be 2


    Examples:
      | Description                                         |
      | "User change the quantity to 2 of the second dress" |



  #order remove
  Scenario Outline: <Description>

    Given I am in shopping-cart summary section
    When I remove of first dress
    Then the product should disappear



    Examples:
      | Description                                       |
      | "User removes the first dress on summary section" |




  #Proceed to checkout

  Scenario Outline: <Description>

    Given I am in shopping-cart summary section
    When I Proceed to checkout
    Then it should appear authentication page "Login - My Store"


    Examples:
      | Description                                                       |
      | "User goes back to Login page after click in Proceed to checkout" |

