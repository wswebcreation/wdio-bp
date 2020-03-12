import AppHeader from '../../page-objects/appHeader';
import InventoryListScreen from '../../page-objects/inventoryList';
import SwagItemScreen from '../../page-objects/swagItem';

describe('Best Practices - Swag Item Details', () => {
    it('should validate that we can go back from the details to the inventory page', () => {
        // Prepare the environment
        browser.url('');
        browser.execute('sessionStorage.setItem("session-username", "standard_user");');
        // Need to add this url here to get the correct routing
        browser.url('/inventory.html');
        browser.url('/inventory-item.html?id=4');
        SwagItemScreen.waitForIsDisplayed();

        // Actual test starts here
        expect(InventoryListScreen.isDisplayed()).toEqual(
            false,
            'Inventory screen is already visible'
        );

        SwagItemScreen.goBack();

        // Actual test starts here
        expect(InventoryListScreen.waitForIsDisplayed()).toEqual(
            true,
            'Inventory screen is still not visible'
        );
    });

    it('should validate that a product can be added to a cart', () => {
        // Prepare the environment
        browser.url('');
        browser.execute('sessionStorage.setItem("session-username", "standard_user");');
        browser.url('/inventory-item.html?id=4');
        SwagItemScreen.waitForIsDisplayed();

        // Actual test starts here
        expect(AppHeader.getCartAmount()).toEqual(
            '',
            'The amount of cart items is not equal to nothing',
        );

        // Add an item to the cart
        SwagItemScreen.addSwagItemToCart();

        expect(AppHeader.getCartAmount()).toEqual(
            '1',
            'The amount of cart items is not equal to 1',
        );
    });

    it('should validate that a product can be removed from the cart', () => {
        // Prepare the environment
        browser.url('');
        browser.execute('sessionStorage.setItem("session-username", "standard_user"); sessionStorage.setItem("cart-contents", "[4]")');
        browser.url('/inventory-item.html?id=4');
        SwagItemScreen.waitForIsDisplayed();

        // Actual test starts here
        expect(AppHeader.getCartAmount()).toEqual(
            '1',
            'The amount of cart items is not equal to 1',
        );

        SwagItemScreen.removeSwagItemFromCart();

        expect(AppHeader.getCartAmount()).toEqual(
            '',
            'The amount of cart items is not equal to nothing',
        );
    });
});
