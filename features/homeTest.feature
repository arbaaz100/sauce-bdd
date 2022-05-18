Feature: Add and remove an item and validate the results

    Scenario: Add an item to the cart
        Given I am on Sauce Demo Page
        When I login with valid credentials "Standard User"
        Then I validate I am on "Inventory" Page
        And I add "Sauce Labs Backpack" to cart
        And I go to cart
        Then I validate that "Sauce Labs Backpack" has been added to the cart successfully

    Scenario: Remove an item from the cart
        Given I am on the Cart Page
        When I remove "Sauce Labs Backpack" from Cart
        Then I validate that "Sauce Labs Backpack" has been removed from the cart successfully

    Scenario: Login with Locked Out User
        Given I am on Sauce Demo Page
        When I login with valid credentials "Locked Out User"
        Then I validate the error "Epic sadface: Sorry, this user has been locked out."

    Scenario: Login with Problem User Negative Test Case
        Given I am on Sauce Demo Page
        When I login with valid credentials "Problem User"
        Then I validate I am on "Inventory" Page
        And I add "Sauce Labs Fleece Jacket" to cart
        And I go to cart
        Then I validate that "Sauce Labs Fleece Jacket" has been added to the cart successfully

    Scenario: Login with Performance Glitch User
        Given I am on Sauce Demo Page
        When I login with valid credentials "Performance Glitch User"
        Then I validate I am on "Inventory" Page
        And I add "Sauce Labs Fleece Jacket" to cart
        And I add "Sauce Labs Onesie" to cart
        And I go to cart
        Then I validate that "Sauce Labs Onesie" has been added to the cart successfully
        Then I validate that "Sauce Labs Fleece Jacket" has been added to the cart successfully
        When I remove "Sauce Labs Onesie" from Cart
        When I remove "Sauce Labs Fleece Jacket" from Cart
        Then I validate that "Sauce Labs Onesie" has been removed from the cart successfully
        Then I validate that "Sauce Labs Fleece Jacket" has been removed from the cart successfully

    Scenario: Sorting Items in Inventory Test
        Given I am on Sauce Demo Page
        When I login with valid credentials "Standard User"
        Then I validate I am on "Inventory" Page
        Then I validate Items are sorted alphabetically A-Z
        And I sort the Items by "Name (Z to A)"
        Then I validate Items are sorted alphabetically Z-A
        And I sort the Items by "Price (low to high)"
        Then I validate Items are sorted by ascending Price
        And I sort the Items by "Price (high to low)"
        Then I validate Items are sorted by descending Price
