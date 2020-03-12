/**
 * Trigger the onChange on an element
 *
 * @param {string} selector the selector
 */
export function triggerOnChange(selector) {
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
