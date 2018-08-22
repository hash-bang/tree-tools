module.exports = {
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
					children: 123,
				},
				{
					title: 'baz-bar',
					path: '/baz/bar',
					children: ()=> {},
				},
				{
					title: 'baz-baz',
					path: '/baz/baz',
					children: {},
				},
			],
		},
	],
};
