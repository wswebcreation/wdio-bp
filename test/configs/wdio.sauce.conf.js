const {config} = require('./wdio.shared.conf');
const build = `Sauce Labs test build-${new Date().getTime()}`;
const screenResolution = '1600x1200';
const defaultBrowserSauceOptions = {
    build,
    screenResolution,
    seleniumVersion: '3.141.59'
};
const chromeOptions = {
    'goog:chromeOptions': {
        args: ['--no-sandbox', 'disable-infobars'],
    },
};

// =================
// Service Providers
// =================
config.user = process.env.SAUCE_USERNAME;
config.key = process.env.SAUCE_ACCESS_KEY;
config.region = 'eu';

// ========
// Services
// ========
config.services = ['sauce'];

// ============
// Capabilities
// ============
config.maxInstances = 25;
config.capabilities = [
    {
        browserName: 'googlechrome',
        browserVersion: 'latest-1',
        platformName: 'Windows 10',
        'sauce:options': {
            ...defaultBrowserSauceOptions,
        },
        ...chromeOptions,
    },
    {
        browserName: 'firefox',
        browserVersion: 'latest',
        platformName: 'Windows 10',
        'sauce:options': {
            ...defaultBrowserSauceOptions,
        },
    },
    {
        browserName: 'internet explorer',
        browserVersion: 'latest',
        platformName: 'Windows 10',
        'sauce:options': {
            ...defaultBrowserSauceOptions,
            iedriverVersion: '3.141.59',
        },
    },
    {
        browserName: 'MicrosoftEdge',
        browserVersion: 'latest',
        platformName: 'Windows 10',
        'sauce:options': {
            ...defaultBrowserSauceOptions,
        },
    },
    {
        browserName: 'MicrosoftEdge',
        browserVersion: '18',
        platformName: 'Windows 10',
        'sauce:options': {
            ...defaultBrowserSauceOptions,
        },
    },
    {
        browserName: 'chrome',
        browserVersion: 'latest-1',
        platformName: 'macOS 10.14',
        'sauce:options': {
            ...defaultBrowserSauceOptions,
        },
        ...chromeOptions,
    },
    {
        browserName: 'firefox',
        browserVersion: 'latest',
        platformName: 'macOS 10.14',
        'sauce:options': {
            ...defaultBrowserSauceOptions,
        },
    },
    {
        browserName: 'safari',
        browserVersion: 'latest',
        platformName: 'macOS 10.14',
        'sauce:options': {
            ...defaultBrowserSauceOptions,
        },
    },
    // {
    //     automationName: 'XCUITest',
    //     browserName: 'safari',
    //     deviceName: 'iPhone XS Simulator',
    //     platformName: 'iOS',
    //     platformVersion: '12.2',
    //     appiumVersion: "1.13.0",
    //     build,
    //     tunnelIdentifier: 'MyTunnelName'
    // },
    // {
    //     automationName: 'UiAutomator2',
    //     browserName: 'chrome',
    //     deviceName: 'Google Pixel GoogleAPI Emulator',
    //     platformName: 'Android',
    //     platformVersion: '8.0',
    //     appiumVersion: "1.16.0",
    //     build,
    //     tunnelIdentifier: 'MyTunnelName'
    // },
];

exports.config = config;
