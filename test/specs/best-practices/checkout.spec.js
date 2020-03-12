import {PERSONAL_INFO} from '../../configs/e2eConstants';
import CartContent from '../../page-objects/cart';
import CheckoutComplete from '../../page-objects/checkoutComplete';
import CheckoutPageOne from '../../page-objects/checkoutPageOne';
import CheckoutPageTwo from '../../page-objects/checkoutPageTwo';

describe('Best Practices - Checkout', () => {
    beforeEach(() => {
        // Load the url
        browser.url('');
        browser.execute('sessionStorage.setItem("session-username", "standard_user"); sessionStorage.setItem("cart-contents", "[0]")');

        // Now got to the inventory page
        browser.url('/cart.html');
        CartContent.waitForIsDisplayed();
    });

    it('should validate that user can checkout', () => {
        // Go to checkout
        CartContent.goToCheckout();

        // Submit personal info
        CheckoutPageOne.waitForIsDisplayed();
        CheckoutPageOne.submitPersonalInfo(PERSONAL_INFO.STANDARD);
        CheckoutPageTwo.waitForIsDisplayed();

        expect(CheckoutPageTwo.getSwagItemsAmount()).toEqual(1);

        // Finish it
        CheckoutPageTwo.finishCheckout();

        // Validate that the checkout was successful
        expect(CheckoutComplete.waitForIsDisplayed()).toEqual(
            true,
            'The amount of cart items is not equal to 1',
        );
    });
});
