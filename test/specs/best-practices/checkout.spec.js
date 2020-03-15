import {PERSONAL_INFO} from '../../configs/e2eConstants';
import CartOverview from '../../page-objects/CartOverview';
import CheckoutComplete from '../../page-objects/CheckoutComplete';
import CheckoutPersonalInfo from '../../page-objects/CheckoutPersonalInfo';
import CheckoutOverview from '../../page-objects/CheckoutOverview';
import {prepareEnvironment} from "../../helpers";

describe('Best Practices - Checkout', () => {
    beforeEach(() => {
        prepareEnvironment('/cart.html', [0]);
        CartOverview.waitForIsDisplayed();
    });

    it('should validate that user can checkout', () => {
        // Go to checkout
        CartOverview.goToCheckout();

        // Submit personal info
        CheckoutPersonalInfo.waitForIsDisplayed();
        CheckoutPersonalInfo.submitPersonalInfo(PERSONAL_INFO.STANDARD);
        CheckoutOverview.waitForIsDisplayed();

        expect(CheckoutOverview.getSwagAmount()).toEqual(1);

        // Finish it
        CheckoutOverview.finishCheckout();

        // Validate that the checkout was successful
        expect(CheckoutComplete.waitForIsDisplayed()).toEqual(
            true,
            'The amount of cart items is not equal to 1',
        );
    });
});
