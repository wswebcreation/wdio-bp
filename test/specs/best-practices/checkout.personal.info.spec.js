import CartContent from '../../page-objects/cart';
import CheckoutPageOne from '../../page-objects/checkoutPageOne';
import CheckoutPageTwo from '../../page-objects/CheckoutPageTwo';
import {PERSONAL_INFO} from "../../configs/e2eConstants";

describe('Best Practices - Cart', () => {
    beforeEach(() => {
        // Prepare the environment
        browser.url('');
        browser.execute('sessionStorage.setItem("session-username", "standard_user");');
        browser.url('/checkout-step-one.html');
        CheckoutPageOne.waitForIsDisplayed();
    });

    it('should validate that we can continue shopping', () => {
        // It doesn't matter which error we check here, all error states should have been tested in a UT
        // Reason for selecting this one is that it triggers multiple fields and thus triggers the state
        CheckoutPageOne.submitPersonalInfo(PERSONAL_INFO.NO_POSTAL_CODE);

        expect(CheckoutPageOne.waitForIsDisplayed()).toEqual(
            true,
            'Error message is shown, this is not correct',
        );

        // I'm not validating the error message here because that's content and should be a UT
    });

    it('should validate that we can cancel the first checkout', () => {
        expect(CartContent.isDisplayed()).toEqual(
            false,
            'Cart screen is already visible'
        );

        CheckoutPageOne.cancelCheckout();

        expect(CartContent.waitForIsDisplayed()).toEqual(
            true,
            'Cart content screen is still not visible'
        );
    });

    it('should be able to continue the checkout', () => {
        CheckoutPageOne.submitPersonalInfo(PERSONAL_INFO.STANDARD);

        expect(CheckoutPageTwo.waitForIsDisplayed()).toEqual(
            true,
            'Checkout page two is still not visible'
        );
    });
});
