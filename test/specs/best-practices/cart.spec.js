import AppHeader from '../../page-objects/appHeader';
import InventoryListScreen from '../../page-objects/inventoryList';
import CartContent from '../../page-objects/cart';
import CheckoutPageOne from '../../page-objects/checkoutPageOne';

describe('Best Practices - Cart', () => {
    it('should validate that we can continue shopping', () => {
        // Prepare the environment
        browser.url('');
        browser.execute('sessionStorage.setItem("session-username", "standard_user");');
        browser.url('/cart.html');


        CartContent.waitForIsDisplayed();

        // Actual test starts here
        expect(InventoryListScreen.isDisplayed()).toEqual(
            false,
            'Inventory screen is already visible'
        );

        CartContent.continueShopping();

        expect(InventoryListScreen.waitForIsDisplayed()).toEqual(
            true,
            'Inventory screen is still not visible'
        );
    });

    it('should validate that we can go from the cart to the checkout page', () => {
        // Prepare the environment
        browser.url('');
        browser.execute('sessionStorage.setItem("session-username", "standard_user");');
        browser.url('/cart.html');
        CartContent.waitForIsDisplayed();

        // Actual test starts here
        expect(CheckoutPageOne.isDisplayed()).toEqual(
            false,
            'Inventory screen is already visible'
        );

        CartContent.goToCheckout();

        expect(CheckoutPageOne.waitForIsDisplayed()).toEqual(
            true,
            'Inventory screen is still not visible'
        );
    });

    it('should validate that a product can be removed from the cart', () => {
        // Prepare the environment
        browser.url('');
        browser.execute('sessionStorage.setItem("session-username", "standard_user"); sessionStorage.setItem("cart-contents", "[4]")');
        browser.url('/cart.html');
        CartContent.waitForIsDisplayed();

        // Actual test starts here
        expect(AppHeader.getCartAmount()).toEqual(
            '1',
            'The amount of cart items is not equal to 1',
        );
        expect(CartContent.getSwagItemsAmount()).toEqual(
            1,
            'The amount of items in the cart overview is not equal to 1',
        );

        CartContent.removeItem(0);

        expect(AppHeader.getCartAmount()).toEqual(
            '',
            'The amount of cart items is not equal to nothing',
        );

        expect(CartContent.getSwagItemsAmount()).toEqual(
            0,
            'The amount of items in the cart overview is not equal to 1',
        );
    });
});
