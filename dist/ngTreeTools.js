'use strict';

angular.module('ngTreeTools', []).service('TreeTools', function () {

	return {
		/**
  * Find a single node deeply within a tree structure
  * This method is really just a convenience wrapper around parents(tree, query, {limit: 1})
  * @param {Object|array} tree The tree structure to search (assumed to be a collection)
  * @param {Object|function} query A valid lodash query to run (anything valid via _.find()) or a matching function to be run on each node
  * @param {Object} options Optional options object passed to parents() finder
  * @return {array|undefined} A generation list of all parents decending to the found item
  */
		find: function find(tree, query, options) {
			var settings = _.defaults(options, {
				limit: 1
			});

			var generations = this.parents(tree, query, settings);
			return _.isArray(generations) ? _.last(generations) : undefined;
		},

		/**
  * Return all branches of a tree as a flat array
  * The return array with be a depth-first-search i.e. the order of the elements will be deepest traversal at each stage (so don't expact all root keys to be listed first)
  * @return {Object|array} An array of all elements
  */
		flatten: function flatten(tree) {
			var seekStack = [];
			var seekDown = function seekDown(tree) {
				tree.forEach(function (branch) {
					seekStack.push(branch);

					if (branch.children && branch.children.length) seekDown(branch.children);
				});
			};

			seekDown(_.castArray(tree));
			return seekStack;
		},

		/**
  * Utility function to deep search a tree structure for a matching query and find parents up to the given query
  * If found this function will return an array of all generations with the found branch as the last element of the array
  * @param {Object|array} tree The tree structure to search
  * @param {Object|function} query A valid lodash query to run (anything valid via _.find()) or a matching function to be run on each node
  * @param {Object} options Optional options object
  * @param {array|string} [options.childNode="children"] Node or nodes to examine to discover the child elements
  * @return {array} A generation list of all parents decending to the found item
  */
		parents: function parents(tree, query, options) {
			var compiledQuery = _.isFunction(query) ? _.noop : _.matches(query);
			var seekStack = [];
			var settings = _.defaults(options, {
				childNode: ['children']
			});
			settings.childNode = _.castArray(settings.childNode);

			var seekDown = function seekDown(tree) {
				var foundChild = _.find(tree, _.isFunction(query) ? query : compiledQuery);
				if (foundChild) {
					seekStack.unshift(foundChild);
					return true;
				} else {
					return tree.some(function (branch) {
						var walkedStack = false;
						settings.childNode.some(function (key) {
							// Walk down first found childNode entry
							if (branch[key] && _.isArray(branch[key]) && seekDown(branch[key])) {
								// Found a valid key - stop iterating over possible key names
								seekStack.unshift(branch);
								walkedStack = true;
								return true;
							}
						});
						return walkedStack;
					});
				}
			};

			seekDown(_.castArray(tree));
			return seekStack;
		},

		/**
  * Utility function to deep search a tree structure for a matching query and find all children after the given query
  * If found this function will return an array of all child elements NOT including the query element
  * @param {Object|array} tree The tree structure to search (assumed to be a collection)
  * @param {Object|function|null} [query] A valid lodash query to run (anything valid via _.find()) or a callback function. If null the entire flattened tree is returned
  * @param {Object} options Optional options object
  * @param {array|string} [options.childNode="children"] Node or nodes to examine to discover the child elements
  * @return {array} An array of all child elements under that item
  */
		children: function children(tree, query, options) {
			var compiledQuery = query ? _.matches(query) : null;
			var settings = _.defaults(options, {
				childNode: ['children']
			});
			settings.childNode = _.castArray(settings.childNode);

			var rootNode = query ? treeTools.find(tree, query) : tree;

			var seekStack = [];
			var seekDown = function seekDown(branch, level) {
				if (level > 0) seekStack.push(branch);
				settings.childNode.some(function (key) {
					if (branch[key] && _.isArray(branch[key])) {
						branch[key].forEach(function (branchChild) {
							seekDown(branchChild, level + 1);
						});
						return true;
					}
				});
			};

			seekDown(rootNode, 0);
			return seekStack;
		},

		/**
  * Utility function to determines whether a given node has children
  * @param {Object|array} branch The tree structure to search (assumed to be a collection)
  * @param {Object} options Optional options object
  * @param {array|string} [options.childNode="children"] Node or nodes to examine to discover the child elements
  * @return {array} An array of all child elements under that item
  */
		hasChildren: function hasChildren(branch, options) {
			var settings = _.defaults(options, {
				childNode: ['children']
			});

			return settings.childNode.some(function (key) {
				return branch[key] && _.isArray(branch[key]) && branch[key].length;
			});
		},

		/**
   * Utility function to sort tree by specific property or an array of properties
   * @param {array} tree The tree structure to sort
   * @param {array|string} propertyName Property names to sort the tree
   * @return {array} An array sorted by propertyName
   */
		sortBy: function sortBy(tree, propertyName) {
			var _this = this;

			// It is needed an array structure to sort.
			if (!_.isArray(tree)) tree = [tree];

			tree.forEach(function (item) {
				return _(item).keys().forEach(function (key) {
					if (_.isArray(item[key])) item[key] = _this.sortBy(item[key], propertyName);
				});
			});

			return _.sortBy(tree, propertyName);
		}

	};
});