import Base from './base';

const SCREEN_SELECTOR = '.inventory_list';

class InventoryListScreen extends Base {
    constructor() {
        super(SCREEN_SELECTOR);
    }

    // Make it private so people can't mess with it
    // Source: https://github.com/tc39/proposal-class-fields#private-fields
    get #screen() {
        return $(SCREEN_SELECTOR);
    }

    get #swagItems() {
        return $$('.inventory_item');
    }

    /**
     * Get the amount of swag items listed on the page
     * @returns {number}
     */
    getSwagItemsAmount() {
        return this.#swagItems.length;
    }

    /**
     * Get a swag Item based on a search string or a number of the visible items
     *
     * @param {number|string} needle
     *
     * @return {Element[]} the selected swagItem
     */
    swagItem(needle) {
        if (typeof needle === 'string') {
            return this.#swagItems.find(swagItem => swagItem.getText().includes(needle));
        }

        return this.#swagItems[needle];
    }

    /**
     * Get the text of the swag item text
     *
     * @param {number|string} needle
     *
     * @return {string}
     */
    getSwagItemText(needle) {
        return this.swagItem(needle).getText();
    }

    /**
     * Add a swag items to the cart
     *
     * @param {number|string} needle
     */
    addSwagItemToCart(needle) {
        this.swagItem(needle).$('.btn_primary.btn_inventory').click();
    }

    /**
     * Remove a swag items from the cart
     *
     * @param {number|string} needle
     */
    removeSwagItemFromCart(needle) {
        this.swagItem(needle).$('.btn_secondary.btn_inventory').click();
    }

    /**
     * Open the details of a swag item
     *
     * @param {number|string} needle
     */
    openSwagItemDetails(needle) {
        this.swagItem(needle).$('.inventory_item_name').click();
    }
}

export default new InventoryListScreen();
