var expect = require('chai').expect;
var treeTools = require('..');

describe('treeTools.find()', ()=> {

	var tree = require('./data/sample');

	it('should be able to find the "/" node', ()=> {
		expect(treeTools.find(tree, {path: '/'})).to.have.property('path', '/');
	});

	it('should be able to find "/foo" node', ()=> {
		expect(treeTools.find(tree, {path: '/foo'})).to.have.property('path', '/foo');
	});

	it('should be able to find the "/bar" node', ()=> {
		expect(treeTools.find(tree, {path: '/bar'})).to.have.property('path', '/bar');
	});

	it('should be able to find the "/bar/baz" node', ()=> {
		expect(treeTools.find(tree, {path: '/bar/baz'})).to.have.property('path', '/bar/baz');
	});

	it('should be able to find the "/bar/baz" node (via function)', ()=> {
		expect(treeTools.find(tree, i => i.path == '/bar/baz')).to.have.property('path', '/bar/baz');
	});

});


