'use strict';
exports.config = {
    seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.44.0.jar',
    // seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    capabilities: {
        'browserName': 'chrome'
    },
    // specs: ['scenarios/functional-tests.js'],
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        includeStackTrace: true,
        isVerbose: true
    }
};