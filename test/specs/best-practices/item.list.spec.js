import AppHeader from '../../page-objects/appHeader';
import InventoryListScreen from '../../page-objects/inventoryList';
import SwagItemScreen from '../../page-objects/swagItem';

describe('Best Practices - Inventory list', () => {
    beforeEach(() => {
        // Load the url
        browser.url('');
        browser.execute('sessionStorage.setItem("session-username", "standard_user")');

        // Now got to the inventory page
        browser.url('/inventory.html');
        InventoryListScreen.waitForIsDisplayed();
    });

    it('should validate that all products are present', () => {
        expect(InventoryListScreen.getSwagItemsAmount()).toEqual(
            6,
            'Amount of items was not equal to 6',
        );
    });

    it('should validate that the details of a product can be opened', () => {
        const product = 'Sauce Labs Backpack';

        InventoryListScreen.openSwagItemDetails(product);

        expect(SwagItemScreen.waitForIsDisplayed()).toEqual(
            true,
            'Swag Item detail page was not shown',
        );

        expect(SwagItemScreen.getSwagItemText()).toContain(
            product,
            'Swag Item detail page did not show the right text',
        );
    });

    it('should validate that a product can be added to a cart', () => {
        expect(AppHeader.getCartAmount()).toEqual(
            '',
            'The amount of cart items is not equal to nothing',
        );

        // Add an item to the cart
        InventoryListScreen.addSwagItemToCart(0);

        expect(AppHeader.getCartAmount()).toEqual(
            '1',
            'The amount of cart items is not equal to 1',
        );
    });
});
