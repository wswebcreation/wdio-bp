exports.config = {
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './test/specs/**/*.js'
    ],
    // Define specific suites
    suites: {
        anti: [
            './test/specs/anti-pattern/*.spec.js',
        ],
        bp: [
            './test/specs/best-practices/*.spec.js',
        ],
    },
    // ============
    // Capabilities
    // ============
    maxInstances: 10,
    capabilities: [{
        browserName: 'firefox',
    }],
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'silent',
    bail: 0,
    baseUrl: 'https://www.saucedemo.com/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'jasmine',
    reporters: ['spec'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000,
    },
    // ============
    // Hooks
    // ============
    before: function () {
        require('@babel/register')
    },
};
