import assert = require("assert");
import { Then, When } from "cucumber";
import { browser, by, element, ElementFinder } from "protractor";
import { protractor } from "protractor/built/ptor";
import { InventoryPageObject } from "../pages/inventoryPage";
const { Given } = require("cucumber");
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;

const inventory: InventoryPageObject = new InventoryPageObject();
let EC = protractor.ExpectedConditions;

Given(/^I am on the Cart Page$/, async () => {
    await browser.waitForAngularEnabled(false);
    let url = browser.getCurrentUrl();
    await expect(url).to.eventually.equal(browser.baseUrl+"cart.html");
});

When(/^I add "(.*?)" to cart$/, async (text) => {
    await waitUntilELementIsDisplayed(inventory.getProductPrice(text));
    await inventory.getProductPrice(text).click();
});

When(/^I remove "(.*?)" from Cart$/, async (text) => {
    await waitUntilELementIsDisplayed(inventory.removeProduct(text));
    await inventory.removeProduct(text).click();
});

When(/^I go to cart$/, async () => {
    await waitUntilELementIsDisplayed(inventory.cartButton);
    await inventory.cartButton.click();
    let url = browser.getCurrentUrl();
    await expect(url).to.eventually.equal(browser.baseUrl+"cart.html");
});

Then(/^I validate that "(.*?)" has been added to the cart successfully$/, async (text) => {
    await waitUntilELementIsDisplayed(inventory.getCartItems(text));
    await expect(inventory.getCartItems(text).isDisplayed()).to.eventually.equal
        (true, "Element is not added to the cart successfully!! It may be a problem with the User!!!");
});

Then(/^I validate that "(.*?)" has been removed from the cart successfully$/, async (text) => {
    await expect(waitForElementToDisapper(inventory.getCartItems(text))).to.eventually.equal
        (true, "Element has not been removed successfully!! Please check the User!!!");
    
});

When(/^I validate Items are sorted alphabetically A-Z$/, async () => {
    await getAllItems();
});

When(/^I validate Items are sorted alphabetically Z-A$/, async () => {
    await getAllItemsDescending();
});

When(/^I sort the Items by "(.*?)"$/, async (order) => {
    await waitUntilELementIsDisplayed(inventory.sortDropdown);
    await inventory.sortDropdown.click();
    await inventory.getSortOption(order).click();
    await browser.sleep(5000);
});

When(/^I validate Items are sorted by ascending Price$/, async () => {
    await waitUntilELementIsDisplayed(inventory.getPrices());
    let elmts = element.all(by.xpath("//div[@class='inventory_item_price']"));
    const prices = await elmts.map((el: ElementFinder) => el.getText()
        .then((text: string) => text));
    const unSort = prices;
    prices.sort();
    console.log("Prices - " + prices);
    console.log("Unsort - " + unSort);
    for(let i=0; i<prices.length; i++) {
        assert.equal(prices[i], unSort[i]);
    }
});

When(/^I validate Items are sorted by descending Price$/, async () => {
    await waitUntilELementIsDisplayed(inventory.getPrices());
    let elmts = element.all(by.xpath("//div[@class='inventory_item_price']"));
    let prices = await elmts.map((el: ElementFinder) => el.getText()
        .then((text: string) => text));
    const unSort = [...prices];
    prices.reverse();
    console.log("Prices - " + prices);
    console.log("Unsort - " + unSort);
    let n = prices.length-1;
    for(let i=0; i<prices.length; i++) {
        assert.equal(prices[i], unSort[n]);
        n-=1;
    }
});

async function waitUntilELementIsDisplayed(elmt: ElementFinder) {
    await browser.wait(EC.visibilityOf(elmt), 10000);
}

async function waitUntilELementGetsEnabled(elmt: ElementFinder) {
    await browser.wait(EC.elementToBeClickable(elmt), 10000);
}

async function waitForElementToDisapper(elmt:ElementFinder) {
    try {
        await browser.wait(EC.invisibilityOf(elmt));
        return true;
    } catch (err){
        return false;
    }
}

async function getAllItems() {
    let items = "//div[@class='inventory_item_name']";
    const elmts = element.all(by.xpath(items));
    const textFields = await elmts.map((el: ElementFinder) => el.getText()
        .then((text: string) => text));
    const actual = [...textFields];
    textFields.sort();
    for(var index in textFields) {
        console.log(textFields[index]+" is compared with "+actual[index]);
        assert.strictEqual(textFields[index], actual[index]);
    }
}

async function getAllItemsDescending() {
    let items = "//div[@class='inventory_item_name']";
    const elmts = element.all(by.xpath(items));
    const textFields = await elmts.map((el: ElementFinder) => el.getText()
        .then((text: string) => text));
    const actual = [...textFields];
    textFields.reverse();
    let n = textFields.length-1;
    for(let i=0; i<textFields.length; i++) {
        assert.equal(textFields[i], actual[n]);
        n-=1;
    }
}
