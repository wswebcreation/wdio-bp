import Base from './base';
import {DEFAULT_TIMEOUT} from '../configs/e2eConstants';

const SCREEN_SELECTOR = '#login_button_container';

class LoginScreen extends Base {
    constructor() {
        super(SCREEN_SELECTOR);
    }

    // Make it private so people can't mess with it
    // Source: https://github.com/tc39/proposal-class-fields#private-fields
    get #screen() {
        return $(SCREEN_SELECTOR);
    }

    get #username() {
        return $('#user-name');
    }

    get #password() {
        return $('#password');
    }

    get #loginButton() {
        return $('.btn_action');
    }

    get #errorMessage() {
        return $('[data-test="error"]');
    }

    /**
     * Sign in
     *
     * @param {object} userDetails
     * @param {string} userDetails.username
     * @param {string} userDetails.password
     */
    signIn(userDetails) {
        const {password, username} = userDetails;

        this.waitForIsDisplayed();
        this.#username.setValue(username);
        this.triggerOnChange('#user-name');
        this.#password.setValue(password);
        this.triggerOnChange('#password');
        if (browser.isAndroid) {
            return browser.execute('document.querySelector(\'.btn_action\').click()');
        }

        this.#loginButton.click();
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
     *
     * @return {boolean}
     */
    isErrorMessageDisplayed() {
        return this.#errorMessage.isDisplayed();
    }

    /**
     * Trigger the onChange on an element
     *
     * @param {string} selector the selector
     */
    triggerOnChange(selector) {
        if (browser.isIOS) {
            browser.execute((elementSelector) => {
                let input = document.querySelector(elementSelector);
                let lastValue = '';
                let event = new Event('input', {bubbles: true});
                let tracker = input._valueTracker;
                if (tracker) {
                    tracker.setValue(lastValue);
                }
                input.dispatchEvent(event);
            }, selector);
        }
    }
}

export default new LoginScreen();
