import { expect } from 'chai';
import { Selector } from 'testcafe';

const MAX_TIME_AJAX_WAIT = 2500; // 2.5 seconds by default
const querySelector = Selector((val) => document.querySelector(val), {
    timeout: MAX_TIME_AJAX_WAIT
});

const querySelectorCondition = Selector((val, checkFunc) => {
    const foundElems = document.querySelectorAll(val);
	if(!foundElems) return null;
  	for(let i=0; i < foundElems.length; i++) {
  	    if(checkFunc(foundElems[i])) return foundElems[i];
  	}
	return null;
}, {
    timeout: MAX_TIME_AJAX_WAIT
});

fixture `Example page`
    .page `http://localhost:4000/`;

test('Emulate user actions and perform a verification', async t => {
    await t.setNativeDialogHandler(() => true);
	const inputNewTodo = await querySelector('header.header input.new-todo');
	await t.typeText(inputNewTodo, 'New TODO element\r\n');
	
	const addedTodoElement = await querySelectorCondition(
	    'section.main label',
	    (elm) => (elm.innerText === 'New TODO element')
	);
	await t.doubleClick(addedTodoElement);
	
	const addedTodoEditInput = await querySelectorCondition(
	    'section.main input[type=text]',
	    (elm) => (elm.value === 'New TODO element')
	);
	await t.typeText(addedTodoEditInput, ' changed\r\n');

	const addedTodoCheckboxAC = await querySelectorCondition(
	    'section.main input[type=checkbox]:not([checked])',
	    (elm) => (elm.nextSibling.innerText === 'New TODO element changed')
	);
	await t.click(addedTodoCheckboxAC);

    const addedTodoCheckboxBC = await querySelectorCondition(
	    'section.main input[type=checkbox]',
	    (elm) => (elm.nextSibling.innerText === 'New TODO element changed')
	);
	await t.click(addedTodoCheckboxBC);

    const addedTodoDelBtn = await querySelectorCondition(
	    'button.destroy',
	    (elm) => (elm.previousSibling.innerText === 'New TODO element changed')
	);
	await t.click(addedTodoDelBtn);

});
