var expect = require('chai').expect;
var treeTools = require('..');

describe('treeTools.filter()', ()=> {

	it('should filter a simple flat array', ()=> {
		expect(
			treeTools.filter([{name: 'foo'}, {name: 'bar'}, {name: 'baz'}], node => node.name == 'foo' || node.name == 'baz')
		).to.deep.equal([{name: 'foo'}, {name: 'baz'}]);
	});

	it('should filter a simple tree with a root', ()=> {
		expect(
			treeTools.filter({name: 'root', children: [{name: 'foo'}, {name: 'bar'}, {name: 'baz'}]}, node => node.name == 'root' || node.name == 'foo' || node.name == 'baz')
		).to.deep.equal({name: 'root', children: [{name: 'foo'}, {name: 'baz'}]});
	});

	it('should return a copy of a tree if all match', ()=> {
		var given = {name: 'root', children: [{name: 'foo'}, {name: 'bar'}, {name: 'baz'}]};
		var result = treeTools.filter(given, node => true);

		expect(result).to.deep.equal({name: 'root', children: [{name: 'foo'}, {name: 'bar'}, {name: 'baz'}]});
		expect(result).to.to.equal(given); // Should be a copy
	});

	it('should return a blank tree if none match', ()=> {
		var given = {name: 'root', children: [{name: 'foo'}, {name: 'bar'}, {name: 'baz'}]};
		var result = treeTools.filter(given, node => false);

		expect(result).to.deep.equal({});
	});

	it('should be able to deep filter using a lodash query', ()=> {
		var given = {
			name: 'foo',
			children: [
				{name: 'foo', children: [
					{name: 'foo'},
					{name: 'bar'},
				]},
				{name: 'bar', children: [
					{name: 'foo'},
					{name: 'bar'},
				]},
				{name: 'baz', children: []},
			],
		};
		var expected = {
			name: 'foo',
			children: [
				{name: 'foo', children: [
					{name: 'foo'},
				]},
			],
		};

		expect(treeTools.filter(given, {name: 'foo'})).to.deep.equal(expected);
	});

});
