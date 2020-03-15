import InventoryListScreen from '../../page-objects/inventoryList';
import CheckoutComplete from '../../page-objects/checkoutComplete';
import CheckoutPageTwo from '../../page-objects/CheckoutPageTwo';

describe('Best Practices - Checkout - Overview', () => {
    beforeEach(() => {
        // Prepare the environment
        browser.url('');
        browser.execute('sessionStorage.setItem("session-username", "standard_user"); sessionStorage.setItem("cart-contents", "[4]")');
        browser.url('/checkout-step-two.html');
        CheckoutPageTwo.waitForIsDisplayed();
    });

    it('should validate that we can continue shopping', () => {
        // It doesn't matter which error we check here, all error states should have been tested in a UT
        // Reason for selecting this one is that it triggers multiple fields and thus triggers the state
        CheckoutPageTwo.finishCheckout();

        expect(CheckoutComplete.waitForIsDisplayed()).toEqual(
            true,
            'The checkout complete page is still not shown',
        );
    });

    it('should validate that we can cancel checkout and go to the inventory page', () => {
        CheckoutPageTwo.cancelCheckout();

        expect(InventoryListScreen.waitForIsDisplayed()).toEqual(
            true,
            'Inventory screen is still not visible'
        );
    });

    it('should validate that we have 1 product in our checkout overview', () => {
        expect(CheckoutPageTwo.getSwagItemsAmount()).toEqual(
            1,
            'Not the correct items are shown in the checkout overview page'
        );
    });
});
