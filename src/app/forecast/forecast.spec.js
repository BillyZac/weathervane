const WEATHERVANE_URL = 'http://localhost:3000/'

describe('Weathervane app', function() {
  beforeEach(function() {
    browser.get(WEATHERVANE_URL)
  })

  it ('should have a title', function() {
    expect(browser.getTitle()).toEqual('Weathervane')
  })

  it('should have city listed as Denver', function() {
    expect(element(by.css('.city-name')).getText()).toEqual('Denver')
  })
})
