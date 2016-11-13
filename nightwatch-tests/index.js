module.exports = {
  'Demo test' : function (client) {
    client.url('http://localhost:4000/')
        .waitForElementVisible('body', 1000)
	    // May use CSS selectors for element search
	    .waitForElementVisible('header.header input.new-todo', 1000)
	    .setValue('header.header input.new-todo', ['New TODO element', client.Keys.ENTER])
	    // Or use Xpath - it's more powerful tool
	    .useXpath()
	    .waitForElementVisible('//section[@class=\'main\']//label[text()=\'New TODO element\']', 2000)
	    .execute(function() {
			// For dispatch double click - Nightwatch doesn't support it by default
		    var evt = new MouseEvent('dblclick', {'view': window, 'bubbles': true,'cancelable': true});
            var foundElems = document.querySelectorAll('section.main label');
	        if(!foundElems) return;
		    var elm = null;
  	        for(var i=0; i < foundElems.length; i++) {
  	            if(foundElems[i].innerText === 'New TODO element') {
		   		    elm = foundElems[i];
		  		    break;
		  	  }
  	        }
            elm.dispatchEvent(evt);
	    })
	    .waitForElementVisible('//section[@class=\'main\']//input[@type=\'text\']', 2000)
	    .clearValue('//section[@class=\'main\']//input[@type=\'text\']')
	    .setValue('//section[@class=\'main\']//input[@type=\'text\']',
	        ['New TODO element changed', client.Keys.ENTER]
	    )
		.waitForElementVisible(
		    '//section[@class=\'main\']//label[text()=\'New TODO element changed\']' +
			    '/preceding-sibling::input[@type=\'checkbox\' and not(@checked)]',
			2000
		)
		.click(
		    '//section[@class=\'main\']//label[text()=\'New TODO element changed\']' +
			    '/preceding-sibling::input[@type=\'checkbox\' and not(@checked)]'
		)
		.waitForElementVisible(
		    '//section[@class=\'main\']//label[text()=\'New TODO element changed\']' +
			    '/preceding-sibling::input[@type=\'checkbox\']',
			2000
		)
		.click(
		    '//section[@class=\'main\']//label[text()=\'New TODO element changed\']' +
			    '/preceding-sibling::input[@type=\'checkbox\']'
		)
		.waitForElementVisible(
		    '//section[@class=\'main\']//label[text()=\'New TODO element changed\']' +
			    '/following-sibling::button[@class=\'destroy\']',
			2000
		)
		.click(
		    '//section[@class=\'main\']//label[text()=\'New TODO element changed\']' +
			    '/following-sibling::button[@class=\'destroy\']'
		)
		.waitForElementNotPresent(
		    '//section[@class=\'main\']//label[text()=\'New TODO element changed\']',
			2000
		)
		.pause(2000)
		.end();
    }
}
