Tree-Tools
==========
Tools to manage deeply nested collection tree structures.


Installation (NodeJS)
---------------------
Install via

	npm install tree-tools

Then just use as

```javascript
var treeTools = require('tree-tools');

treeTools.flatten(treeTools.find(tree, {path: '/bar/baz'}));
```

Installation (AngularJS)
-----------------------
1. Include `dist/ngTreeTools.js` somewhere in your build chain
2. Add `ngTreeTools` as a module in your main `angular.module('app', [modules])` list
3. Require the module as `TreeTools` in your controller e.g. `app.controller('myController', function($scope, TreeTools) { // Controller // })`


API
===
In all the examples below the example tree structure is similar to [the main test case](test/test.js).

find(tree, query, [options])
----------------------------
Find a single node deeply within a tree structure.

```javascript
treeTools.find(tree, {path: '/bar/baz'});
```


flatten(tree)
-------------
Return all branches of a tree as a flat array.

```javascript
treeTools.flatten(treeTools.find(tree, {path: '/bar/baz'}));
```


parents(tree, query, [options])
-------------------------------
Utility function to deep search a tree structure for a matching query and find parents up to the given query.
If found this function will return an array of all generations with the found branch as the last element of the array.

```javascript
treeTools.parents(tree, {path: '/bar/baz'})
```


children(tree, query, [options])
--------------------------------
Utility function to deep search a tree structure for a matching query and find all children after the given query.
If found this function will return an array of all child elements NOT including the query element.

```javscript
treeTools.children(tree, {path: '/foo'});
```


hasChildren(branch, [options])
------------------------------
Utility function to determines whether a given node has children.

```javascript
treeTools.hasChildren(someBranch); // Returns a boolean
```


sortBy(tree, propertyName)
------------------------------
Utility function to sort tree by specific property.

```javascript
treeTools.sortBy(tree, ['id', 'title']); // Returns new tree sorted
```