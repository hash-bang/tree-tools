Tree-Tools
==========
Tools to manage deeply nested collection tree structures.

See the [API](#api) reference for a full list of functionality.


Goals:

* Provide a simple API to manipulate and operate on tree structures
* Closely mirror [Lodash's](https://lodash.com) API wherever possible to minimize confusion
* No dependencies (except Lodash)


Install (NodeJS)
----------------
Install via

	npm install tree-tools

Then just use as

```javascript
var treeTools = require('tree-tools');

treeTools.flatten(treeTools.find(tree, {path: '/bar/baz'}));
```

Install (AngularJS)
-------------------
1. Include `dist/ngTreeTools.js` somewhere in your build chain
2. Add `ngTreeTools` as a module in your main `angular.module('app', [modules])` list
3. Require the module as `TreeTools` in your controller e.g. `app.controller('myController', function($scope, TreeTools) { // Controller // })`


API
===
In all the examples below the example tree structure is similar to [the main test case](test/test.js).


treeTools.find(tree, query, options)
------------------------------------
Find a single node deeply within a tree structure.
Query can be any valid Lodash matching object or a function.

```javascript
treeTools.find(tree, {path: '/bar/baz'});
```

Since this function is really just a convenience wrapper around `parents()` see that function definition for available options.


treeTools.filter(tree, query, options)
--------------------------------------
Return a copy of a tree while filtering nodes.
Query can be any valid Lodash matching object or a function.

```javascript
treeTools.find(tree, (node, index) => matchingExpression);
```

Options are:

| Option      | Type            | Default      | Description                                                                   |
|-------------|-----------------|--------------|-------------------------------------------------------------------------------|
| `childNode` | String or Array | `"children"` | How to discover child nodes, can be a single key or an array of keys to check |


treeTools.flatten(tree)
-----------------------
Return all branches of a tree as a flat array.
The array is returned as a shallow copy, allowing mutation via `forEach` or `map` iterators.

```javascript
treeTools.flatten(treeTools.find(tree, {path: '/bar/baz'}));
```

Options are:

| Option      | Type            | Default      | Description                                                                   |
|-------------|-----------------|--------------|-------------------------------------------------------------------------------|
| `childNode` | String or Array | `"children"` | How to discover child nodes, can be a single key or an array of keys to check |


treeTools.parents(tree, query, options)
---------------------------------------
Utility function to deep search a tree structure for a matching query and find parents up to the given query.
If found this function will return an array of all generations with the found branch as the last element of the array.

```javascript
treeTools.parents(tree, {path: '/bar/baz'})
```

Options are:

| Option      | Type            | Default      | Description                                                                   |
|-------------|-----------------|--------------|-------------------------------------------------------------------------------|
| `childNode` | String or Array | `"children"` | How to discover child nodes, can be a single key or an array of keys to check |


treeTools.children(tree, query, options)
----------------------------------------
Utility function to deep search a tree structure for a matching query and find all children after the given query.
If found this function will return an array of all child elements NOT including the query element.

```javscript
treeTools.children(tree, {path: '/foo'});
```

Options are:

| Option      | Type            | Default      | Description                                                                   |
|-------------|-----------------|--------------|-------------------------------------------------------------------------------|
| `childNode` | String or Array | `"children"` | How to discover child nodes, can be a single key or an array of keys to check |


treeTools.hasChildren(branch, options)
--------------------------------------
Utility function to determines whether a given node has children.

```javascript
treeTools.hasChildren(someBranch); // Returns a boolean
```

Options are:

| Option      | Type            | Default      | Description                                                                   |
|-------------|-----------------|--------------|-------------------------------------------------------------------------------|
| `childNode` | String or Array | `"children"` | How to discover child nodes, can be a single key or an array of keys to check |


treeTools.hasSome(tree, query)
------------------------------
Utility function to determine if an item matching query exists deep within a given tree.

```javascript
treeTools.hasSome(tree, {someKey: someValue});
treeTools.hasSome(tree, (v, k) => { ... });
```


treeTools.resolve(tree, options)
--------------------------------
Recursively walk a tree evaluating all functions (promise compatible) and inserting their values.
Should a node return a promise it will be waited on before evaluating it along with its children, recursively.

```javascript
treeTools.resolve(complexTreeWithPromises)
	.then(tree => {...})
```

Options are:

| Option        | Type              | Default           | Description                                                                                                                                  |
|---------------|-------------------|-------------------| ---------------------------------------------------------------------------------------------------------------------------------------------|
| `childNode`   | String or Array   | `"children"`      | How to discover child nodes, can be a single key or an array of keys to check                                                                |
| `clone`       | Boolean           | `false`           | Clone the tree before resolving it, this keeps the original intact but costs some time while cloning, without this the input will be mutated |
| `attempts`    | Number            | `5`               | How many times to recurse when resolving promises-within-promises                                                                            |
| `isPromise`   | Function          | `_.isFunction`    | Function used to recognise a promise-like return when recursing into promises                                                                |
| `isSplice`    | Function          | See code          | Support splicing arrays (arrays are collapsed into their parents rather than returned as is)                                                 |
| `wrapper`     | Function          | `Promise.resolve` | Wrap the promise in this function before resolving. Called as `(nodeFunction, path, tree)`                                                   |


treeTools.sortBy(tree, propertyName)
------------------------------------
Utility function to sort tree by specific property or an array of properties.
`propertyName` can be a string or an array of strings.

```javascript
// Sort an outer array of families with all children in `name` order
treeTools.sortBy(families, 'name');
```
