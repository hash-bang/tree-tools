var expect = require('chai').expect;
var treeTools = require('..');

describe('treeTools.children()', ()=> {

	var tree = require('./data/sample');

	it('should be able to find the children of "/"', ()=> {
		expect(treeTools.children(tree, {path: '/'}).map(node => node.path)).to.deep.equal(['/foo', '/foo/foo', '/foo/bar', '/foo/baz', '/bar', '/bar/foo', '/bar/bar', '/bar/baz', '/baz', '/baz/foo', '/baz/bar', '/baz/baz']);
	});

	it('should be able to find the children of "/foo"', ()=> {
		expect(treeTools.children(tree, {path: '/foo'}).map(node => node.path)).to.deep.equal(['/foo/foo', '/foo/bar', '/foo/baz']);
	});

	it('should be able to find the children of "/foo" (via function)', ()=> {
		expect(treeTools.children(tree, i => i.path == '/foo').map(node => node.path)).to.deep.equal(['/foo/foo', '/foo/bar', '/foo/baz']);
	});

	it('should be able to find the children of "/bar"', ()=> {
		expect(treeTools.children(tree, {path: '/bar'}).map(node => node.path)).to.deep.equal(['/bar/foo', '/bar/bar', '/bar/baz']);
	});

	it('should be able to find the (non-existant) children of "/bar/baz"', ()=> {
		expect(treeTools.children(tree, {path: '/bar/baz'}).map(node => node.path)).to.deep.equal([]);
	});
});
