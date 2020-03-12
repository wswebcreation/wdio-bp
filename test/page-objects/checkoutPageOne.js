import Base from './base';
import {DEFAULT_TIMEOUT} from '../configs/e2eConstants';
import {triggerOnChange} from "../helpers";

const SCREEN_SELECTOR = '#checkout_info_container';

class CheckoutPageOne extends Base {
    constructor() {
        super(SCREEN_SELECTOR);
    }

    // Make it private so people can't mess with it
    // Source: https://github.com/tc39/proposal-class-fields#private-fields
    get #screen() {
        return $(SCREEN_SELECTOR);
    }

    get #cancelButton() {
        return $('.cart_cancel_link');
    }

    get #continueCheckoutButton() {
        return $('.cart_button');
    }

    get #firstName() {
        return $('[data-test="firstName"]');
    }

    get #lastName() {
        return $('[data-test="lastName"]');
    }

    get #postalCode() {
        return $('[data-test="postalCode"]');
    }

    get #errorMessage() {
        return $('[data-test="error"]');
    }

    /**
     * Submit personal info
     *
     * @param {object} personalInfo
     * @param {string} personalInfo.firstName
     * @param {string} personalInfo.lastName
     * @param {string} personalInfo.zip
     */
    submitPersonalInfo(personalInfo) {
        const {firstName, lastName, zip} = personalInfo;

        this.waitForIsDisplayed();
        this.#firstName.addValue(firstName);
        triggerOnChange('[data-test="firstName"]');
        this.#lastName.addValue(lastName);
        triggerOnChange('[data-test="lastName"]');
        this.#postalCode.addValue(zip);
        triggerOnChange('[data-test="postalCode"]');
        this.#continueCheckoutButton.click();
    }

    /**
     * Get the text or the error message container
     *
     * @return {string}
     */
    getErrorMessage() {
        this.#errorMessage.waitForDisplayed(DEFAULT_TIMEOUT);

        return this.#errorMessage.getText();
    }

    /**
     * Check if the error message is displayed
     */
    isErrorMessageDisplayed() {
        this.#errorMessage.isDisplayed();
    }

    /**
     * Cancel checkout
     */
    cancelCheckout() {
        this.#cancelButton.click();
    }
}

export default new CheckoutPageOne();
