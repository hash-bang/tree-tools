var expect = require('chai').expect;
var treeTools = require('..');

describe('treeTools.sortBy()', ()=> {

	var treeToSort = require('./data/sortable');

	it('should sort the tree by id', ()=> {
		expect(treeToSort.children[0].id).to.equal('1');
		expect(treeToSort.children[1].id).to.equal('3');
		expect(treeToSort.children[2].id).to.equal('2');

		var result = treeTools.sortBy(treeToSort, ['id'])[0];

		expect(result.children[0].id).to.equal('1');
		expect(result.children[1].id).to.equal('2');
		expect(result.children[2].id).to.equal('3');
		expect(result.children[1].children[0].id).to.equal('2.1');
		expect(result.children[1].children[1].id).to.equal('2.2');

	});

	it('should sort the tree by name', ()=> {
		expect(treeToSort.children[0].id).to.equal('1');
		expect(treeToSort.children[1].id).to.equal('2');
		expect(treeToSort.children[2].id).to.equal('3');

		var result = treeTools.sortBy(treeToSort, ['name'])[0];

		expect(result.children[0].id).to.equal('1');
		expect(result.children[1].id).to.equal('3');
		expect(result.children[2].id).to.equal('2');
		expect(result.children[2].children[0].id).to.equal('2.2');
		expect(result.children[2].children[1].id).to.equal('2.1');
	});

});
