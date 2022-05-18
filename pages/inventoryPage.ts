import { $, by, element, ElementFinder } from "protractor";

export class InventoryPageObject {
    public cartButton: ElementFinder;
    public sortDropdown: ElementFinder;

        getProductPrice(productName: string): ElementFinder {
            let str = productName.replace(/ /g, "-");
            str = "add-to-cart-" + str.toLowerCase();
            return element(by.id(str));
        }

        removeProduct(productName: string): ElementFinder {
            let str = productName.replace(/ /g, "-");
            str = "remove-" + str.toLowerCase();
            return element(by.id(str));
        }

        getCartItems(productName: string): ElementFinder {
            let item = "//div[contains(text(),'" + productName + "')]";
            return element(by.xpath(item));
        }

        getSortOption(order: string): ElementFinder {
            let elmnt = "//option[contains(text(),'" + order + "')]";
            return element(by.xpath(elmnt));
        }

        getPrices(): ElementFinder {
            let prices = "//div[@class='inventory_item_price']";
            return element(by.xpath(prices));
        }

        constructor() {
            this.cartButton = element(by.id("shopping_cart_container"));
            this.sortDropdown = element(by.xpath("//*[@class='product_sort_container']"));
        }
}
