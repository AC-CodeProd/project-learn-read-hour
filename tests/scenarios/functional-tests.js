describe('Controller: PageCtrl', function() {
    it('should have a title', function() {
        browser.get(browser.baseUrl);
        expect(browser.getTitle()).toEqual('Apprendre à lire l\'heure en CE2');
    })
});