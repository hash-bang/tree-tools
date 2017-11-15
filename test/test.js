var expect = require('chai').expect;
var treeTools = require('..');

// Define test structure {{{
var tree = {
	path: '/',
	children: [
		{
			title: 'foo',
			path: '/foo',
			children: [
				{
					title: 'foo-foo',
					path: '/foo/foo',
				},
				{
					title: 'foo-bar',
					path: '/foo/bar',
				},
				{
					title: 'foo-baz',
					path: '/foo/baz',
				},
			],
		},
		{
			title: 'bar',
			path: '/bar',
			children: [
				{
					title: 'bar-foo',
					path: '/bar/foo',
				},
				{
					title: 'bar-bar',
					path: '/bar/bar',
				},
				{
					title: 'bar-baz',
					path: '/bar/baz',
				},
			],
		},
		{
			title: 'baz',
			path: '/baz',
			children: [
				{
					title: 'baz-foo',
					path: '/baz/foo',
				},
				{
					title: 'baz-bar',
					path: '/baz/bar',
				},
				{
					title: 'baz-baz',
					path: '/baz/baz',
				},
			],
		},
	],
};

var treeToSort = {
	id: '0',
	name: 'parent',
	children: [
		{
			id: '1',
			name: 'b',
			children: [
				{
					id: '1.1',
					name: 't',
					children: []
				}
			]
		},
		{
			id: '3',
			name: 'g',
			children: []
		},
		{
			id: '2',
			name: 'z',
			children: [
				{
					id: '2.1',
					name: 'x',
					children: []
				},
				{
					id: '2.2',
					name: 'r',
					children: [
						{
							id: '2.2.2',
							name: 'a',
							children: []
						}
					]
				}
			]
		}
	]	
};
// }}}

describe('treeTools.find()', function() {
	
	it('should be able to find the "/" node', function() {
		expect(treeTools.find(tree, {path: '/'})).to.have.property('path', '/');
	});

	it('should be able to find "/foo" node', function() {
		expect(treeTools.find(tree, {path: '/foo'})).to.have.property('path', '/foo');
	});

	it('should be able to find the "/bar" node', function() {
		expect(treeTools.find(tree, {path: '/bar'})).to.have.property('path', '/bar');
	});

	it('should be able to find the "/bar/baz" node', function() {
		expect(treeTools.find(tree, {path: '/bar/baz'})).to.have.property('path', '/bar/baz');
	});

});


describe('treeTools.flattenTree()', function() {
	
	it('should be able to flatten the "/" node', function() {
		expect(treeTools.flatten(treeTools.find(tree, {path: '/'})).map(node => node.path)).to.deep.equal(['/', '/foo', '/foo/foo', '/foo/bar', '/foo/baz', '/bar', '/bar/foo', '/bar/bar', '/bar/baz', '/baz', '/baz/foo', '/baz/bar', '/baz/baz']);
	});

	it('should be able to flatten the "/foo" node', function() {
		expect(treeTools.flatten(treeTools.find(tree, {path: '/foo'})).map(node => node.path)).to.deep.equal(['/foo', '/foo/foo', '/foo/bar', '/foo/baz']);
	});

	it('should be able to flatten the "/bar" node', function() {
		expect(treeTools.flatten(treeTools.find(tree, {path: '/bar'})).map(node => node.path)).to.deep.equal(['/bar', '/bar/foo', '/bar/bar', '/bar/baz']);
	});

	it('should be able to flatten the (non-existant) children of "/bar/baz"', function() {
		expect(treeTools.flatten(treeTools.find(tree, {path: '/bar/baz'})).map(node => node.path)).to.deep.equal(['/bar/baz']);
	});

});


describe('treeTools.parents()', function() {
	
	it('should be able to find the (non-existant) parents of "/"', function() {
		expect(treeTools.parents(tree, {path: '/'}).map(node => node.path)).to.deep.equal(['/']);
	});

	it('should be able to find the parents of "/foo"', function() {
		expect(treeTools.parents(tree, {path: '/foo'}).map(node => node.path)).to.deep.equal(['/', '/foo']);
	});

	it('should be able to find the parents of "/bar"', function() {
		expect(treeTools.parents(tree, {path: '/bar'}).map(node => node.path)).to.deep.equal(['/', '/bar']);
	});

	it('should be able to find the parents of "/bar/baz"', function() {
		expect(treeTools.parents(tree, {path: '/bar/baz'}).map(node => node.path)).to.deep.equal(['/', '/bar', '/bar/baz']);
	});

});


describe('treeTools.children()', function() {
	it('should be able to find the children of "/"', function() {
		expect(treeTools.children(tree, {path: '/'}).map(node => node.path)).to.deep.equal(['/foo', '/foo/foo', '/foo/bar', '/foo/baz', '/bar', '/bar/foo', '/bar/bar', '/bar/baz', '/baz', '/baz/foo', '/baz/bar', '/baz/baz']);
	});

	it('should be able to find the children of "/foo"', function() {
		expect(treeTools.children(tree, {path: '/foo'}).map(node => node.path)).to.deep.equal(['/foo/foo', '/foo/bar', '/foo/baz']);
	});

	it('should be able to find the children of "/bar"', function() {
		expect(treeTools.children(tree, {path: '/bar'}).map(node => node.path)).to.deep.equal(['/bar/foo', '/bar/bar', '/bar/baz']);
	});

	it('should be able to find the (non-existant) children of "/bar/baz"', function() {
		expect(treeTools.children(tree, {path: '/bar/baz'}).map(node => node.path)).to.deep.equal([]);
	});
});


describe('treeTools.hasChildren()', function() {
	it('should be able to determine the children of "/"', function() {
		expect(treeTools.hasChildren(treeTools.find(tree, {path: '/'}))).to.be.true;
	});

	it('should be able to determine the children of "/foo"', function() {
		expect(treeTools.hasChildren(treeTools.find(tree, {path: '/foo'}))).to.be.true;
	});

	it('should be able to determine the children of "/bar"', function() {
		expect(treeTools.hasChildren(treeTools.find(tree, {path: '/bar'}))).to.be.true;
	});

	it('should be able to determine the (non-existant) children of "/bar/baz"', function() {
		expect(treeTools.hasChildren(treeTools.find(tree, {path: '/bar/baz'}))).to.be.false;
	});
});

describe('treeTools.sortBy()', function() {

	it('should sort the tree by id', function() {
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

	it('should sort the tree by name', function() {
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