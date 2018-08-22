var expect = require('chai').expect;
var treeTools = require('..');

describe('treeTools.flatten()', ()=> {

	var tree = require('./data/sample');

	it('should be able to flatten the entire tree', ()=> {
		expect(treeTools.flatten(tree).map(node => node.path)).to.deep.equal(['/', '/foo', '/foo/foo', '/foo/bar', '/foo/baz', '/bar', '/bar/foo', '/bar/bar', '/bar/baz', '/baz', '/baz/foo', '/baz/bar', '/baz/baz']);
	});

	it('should be able to flatten the "/" node', ()=> {
		expect(treeTools.flatten(treeTools.find(tree, {path: '/'})).map(node => node.path)).to.deep.equal(['/', '/foo', '/foo/foo', '/foo/bar', '/foo/baz', '/bar', '/bar/foo', '/bar/bar', '/bar/baz', '/baz', '/baz/foo', '/baz/bar', '/baz/baz']);
	});

	it('should be able to flatten the "/foo" node', ()=> {
		expect(treeTools.flatten(treeTools.find(tree, {path: '/foo'})).map(node => node.path)).to.deep.equal(['/foo', '/foo/foo', '/foo/bar', '/foo/baz']);
	});

	it('should be able to flatten the "/bar" node', ()=> {
		expect(treeTools.flatten(treeTools.find(tree, {path: '/bar'})).map(node => node.path)).to.deep.equal(['/bar', '/bar/foo', '/bar/bar', '/bar/baz']);
	});

	it('should be able to flatten the (non-existant) children of "/bar/baz"', ()=> {
		expect(treeTools.flatten(treeTools.find(tree, {path: '/bar/baz'})).map(node => node.path)).to.deep.equal(['/bar/baz']);
	});

});
