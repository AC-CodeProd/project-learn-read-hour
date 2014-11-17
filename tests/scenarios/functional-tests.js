describe('Test game', function() {
    var startButton = element(by.css('.button-start'));
    var optionsButton = element(by.css('.button-options'));
    var creditsButton = element(by.css('.button-credits'));
    var _protractor;

    beforeEach(function() {
        _protractor = protractor.getInstance();
        _protractor.ignoreSynchronization = true;
        _protractor.waitForAngular();
        browser.driver.manage().window().maximize();
        browser.get('http://127.0.0.1:9000/#/');
        _protractor.sleep(500);
    });
    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Apprendre à lire l\'heure en CE2');
    });
    it('should click button options', function() {
        var expectedUrl = _protractor.baseUrl + '/#/options';
        element(by.css('.button-options')).click();
        expect(_protractor.getCurrentUrl()).toBe(expectedUrl);
        // _protractor.sleep(10000);
    });
});