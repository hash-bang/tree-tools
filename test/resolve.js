var expect = require('chai').expect;
var treeTools = require('..');

describe('treeTools.resolve()', ()=> {

	it('should resolve a simple function returns', done => {
		treeTools.resolve({foo: 'Foo!', bar: ()=> 'Bar!'})
			.then(tree => {
				expect(tree).to.deep.equal({foo: 'Foo!', bar: 'Bar!'});
				done();
			})
			.catch(done)
	});

	it('should resolve nested object attributes', done => {
		treeTools.resolve({
			foo: ()=> 'Foo!',
			bar: ()=> new Promise(resolve => resolve('Bar!')),
			baz: [
				{quz: ()=> new Promise(resolve => setTimeout(()=> resolve('Quz!'), 10))}
			],
		})
			.then(tree => {
				expect(tree).to.deep.equal({foo: 'Foo!', bar: 'Bar!', baz: [{quz: 'Quz!'}]});
				done();
			})
			.catch(done)
	});

	it('should resolve promises within promises', done => {
		treeTools.resolve({
			foo: ()=> new Promise(resolve => resolve(({
				bar: ()=> new Promise(resolve => resolve(({
					baz: ()=> new Promise(resolve => resolve('Done!')),
				}))),
			}))),
		})
			.then(tree => {
				expect(tree).to.deep.equal({foo: {bar: {baz: 'Done!'}}});
				done();
			})
			.catch(done)
	})

	it('should be able to resolve a set of child attributes', done => {
		var attributeTree = require('./data/promises-attributes');

		treeTools.resolve(attributeTree.input)
			.then(tree => {
				expect(tree).to.nested.deep.equal(attributeTree.expected);
				done();
			})
			.catch(done)
	});

	it('should be able to populate an array of children', done => {
		treeTools.resolve([
			()=> ({id: 'foo'}),
			()=> new Promise(resolve => resolve({id: 'bar'})),
			()=> new Promise(resolve => setTimeout(()=> resolve({id: 'baz'}), 10)),
			()=> ([{id: 'quz'}, {id: 'qux'}]),
			()=> new Promise(resolve => setTimeout(()=> resolve([{id: 'flarp'}, {id: 'corge'}]), 10)),
		])
			.then(tree => {
				expect(tree).to.nested.deep.equal([{id: 'foo'}, {id: 'bar'}, {id: 'baz'}, {id: 'quz'}, {id: 'qux'}, {id: 'flarp'}, {id: 'corge'}]);
				done();
			})
			.catch(done)
	});

	it('should be able to resolve a arrays of children', done => {
		var childrenTree = require('./data/promises-arrays');

		treeTools.resolve(childrenTree.input)
			.then(tree => {
				expect(tree).to.nested.deep.equal(childrenTree.expected);
				done();
			})
			.catch(done)
	});

});
