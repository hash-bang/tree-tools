var expect = require('chai').expect;
var treeTools = require('..');


describe('treeTools.hasChildren()', ()=> {

	var tree = require('./data/sample');

	it('should be able to determine the children of "/"', ()=> {
		expect(treeTools.hasChildren(treeTools.find(tree, {path: '/'}))).to.be.true;
	});

	it('should be able to determine the children of "/foo"', ()=> {
		expect(treeTools.hasChildren(treeTools.find(tree, {path: '/foo'}))).to.be.true;
	});

	it('should be able to determine the children of "/bar"', ()=> {
		expect(treeTools.hasChildren(treeTools.find(tree, {path: '/bar'}))).to.be.true;
	});

	it('should be able to determine the (non-existant) children of "/bar/baz"', ()=> {
		expect(treeTools.hasChildren(treeTools.find(tree, {path: '/bar/baz'}))).to.be.false;
	});
});
