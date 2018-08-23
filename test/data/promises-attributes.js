module.exports.input = [
	{
		id: 'foo',
		children: [
			{id: 'foo-foo', title: ()=> 'Foo-Foo!', undefValue: undefined},
			{id: 'foo-bar', title: ()=> new Promise(resolve => resolve('Foo-Bar!')), nullValue: null},
			{id: 'foo-baz', title: ()=> new Promise(resolve => setTimeout(()=> resolve('Foo-Baz!'), 10)), emptyObject: {}},
		],
	},
	{
		id: 'bar',
		children: [
			{id: 'bar-foo', title: ()=> 'Bar-Foo!', testNumber: 1234},
			{id: 'bar-bar', title: ()=> new Promise(resolve => resolve('Bar-Bar!')), children: []},
			{
				id: 'bar-baz',
				title: ()=> new Promise(resolve => setTimeout(()=> resolve('Bar-Baz!'), 20)),
				children: [
					{id: 'bar-baz-foo', title: ()=> 'Bar-Baz-Foo!'},
					{id: 'bar-baz-bar', title: ()=> new Promise(resolve => resolve('Bar-Baz-Bar!'))},
					{id: 'bar-baz-baz', title: ()=> new Promise(resolve => setTimeout(()=> resolve('Bar-Baz-Baz!'), 30))},
				],
			},
		],
	},
];

module.exports.expected = [
	{
		id: 'foo',
		children: [
			{id: 'foo-foo', title: 'Foo-Foo!', undefValue: undefined},
			{id: 'foo-bar', title: 'Foo-Bar!', nullValue: null},
			{id: 'foo-baz', title: 'Foo-Baz!', emptyObject: {}},
		],
	},
	{
		id: 'bar',
		children: [
			{id: 'bar-foo', title: 'Bar-Foo!', testNumber: 1234},
			{id: 'bar-bar', title: 'Bar-Bar!', children: []},
			{
				id: 'bar-baz',
				title: 'Bar-Baz!',
				children: [
					{id: 'bar-baz-foo', title: 'Bar-Baz-Foo!'},
					{id: 'bar-baz-bar', title: 'Bar-Baz-Bar!'},
					{id: 'bar-baz-baz', title: 'Bar-Baz-Baz!'},
				],
			},
		],
	},
];
