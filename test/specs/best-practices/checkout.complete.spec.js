import CheckoutComplete from '../../page-objects/checkoutComplete';

describe('Best Practices - Checkout - Complete', () => {
    beforeEach(() => {
        browser.url('');
        browser.execute('sessionStorage.setItem("session-username", "standard_user");');
        browser.url('/checkout-complete.html');
        CheckoutComplete.waitForIsDisplayed();
    });

    it('should be able to test loading of login page', () => {
        expect(CheckoutComplete.waitForIsDisplayed()).toEqual(
            true,
            'Checkout complete page was not shown',
        );
    });
});
