var expect = require('chai').expect;
var treeTools = require('..');

describe('treeTools.parents()', ()=> {

	var tree = require('./data/sample');

	it('should be able to find the (non-existant) parents of "/"', ()=> {
		expect(treeTools.parents(tree, {path: '/'}).map(node => node.path)).to.deep.equal(['/']);
	});

	it('should be able to find the parents of "/foo"', ()=> {
		expect(treeTools.parents(tree, {path: '/foo'}).map(node => node.path)).to.deep.equal(['/', '/foo']);
	});

	it('should be able to find the parents of "/bar"', ()=> {
		expect(treeTools.parents(tree, {path: '/bar'}).map(node => node.path)).to.deep.equal(['/', '/bar']);
	});

	it('should be able to find the parents of "/bar/baz"', ()=> {
		expect(treeTools.parents(tree, {path: '/bar/baz'}).map(node => node.path)).to.deep.equal(['/', '/bar', '/bar/baz']);
	});

	it('should be able to find the parents of "/bar/baz" (by function)', ()=> {
		expect(treeTools.parents(tree, i => i.path == '/bar/baz').map(node => node.path)).to.deep.equal(['/', '/bar', '/bar/baz']);
	});

});
