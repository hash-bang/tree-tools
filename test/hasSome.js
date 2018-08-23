var expect = require('chai').expect;
var treeTools = require('..');


describe('treeTools.hasSome()', ()=> {

	it('should deep scan an object', ()=> {
		expect(treeTools.hasSome({
			foo: {
				bar: {
					baz: 'Wally!',
				},
			},
		}, {baz: 'Wally!'})).to.equal(true);

		expect(treeTools.hasSome({
			foo: {
				bar: {
					baz: 'Wally!',
				},
			},
		}, (v, k) => v == 'Wally!')).to.equal(true);
	});

});
