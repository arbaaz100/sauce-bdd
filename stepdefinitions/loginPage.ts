import { $, by, element, ElementFinder } from "protractor";

export class LoginPageObject {
    public username: ElementFinder;
    public password: ElementFinder;
    public loginButton: ElementFinder;
    public menuButton: ElementFinder;
    public logoutButton: ElementFinder;

    constructor() {
        this.username = element(by.id("user-name"));
        this.password = element(by.id("password"));
        this.loginButton = element(by.id("login-button"));
        this.menuButton = element(by.id("react-burger-menu-btn"));
        this.logoutButton = element(by.id("logout_sidebar_link"));
    }

    getErrorMessage(err: string): ElementFinder {
        let message = "//h3[contains(text(),'" + err + "')]";
        return element(by.xpath(message));
    }
}