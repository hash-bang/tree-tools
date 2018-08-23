module.exports.input = [
	{
		id: 'foo',
		children: [
			{id: 'foo-foo', title: ()=> 'Foo-Foo!'},
		],
	},
	{
		id: 'bar',
		children: ()=> new Promise(resolve => setTimeout(()=> resolve([
			{id: 'bar-foo', title: 'Bar-Foo!'},
			{id: 'bar-bar', title: 'Bar-Bar!'},
		]), 10)),
	},
	{
		id: 'baz',
		children: ()=> new Promise(resolve => setTimeout(()=> resolve([
			{id: 'baz-foo', title: 'Baz-Foo!'},
			{
				id: 'baz-bar',
				title: 'Baz-Bar!',
				children: ()=> new Promise(resolve => resolve([
					{id: 'baz-bar-foo', title: 'Baz-Bar-Foo!'},
					{id: 'baz-bar-bar', title: ()=> new Promise(resolve => setTimeout(resolve('Baz-Bar-Bar!'), 20))},
				])),
			},
		]), 40)),
	},
	()=> new Promise(resolve => setTimeout(()=> resolve({
		id: 'quz',
		title: ()=> new Promise(resolve => setTimeout(()=> resolve('Quz!'), 30)),
	}))),
];

module.exports.expected = [
	{
		id: 'foo',
		children: [
			{id: 'foo-foo', title: 'Foo-Foo!'},
		],
	},
	{
		id: 'bar',
		children: [
			{id: 'bar-foo', title: 'Bar-Foo!'},
			{id: 'bar-bar', title: 'Bar-Bar!'},
		],
	},
	{
		id: 'baz',
		children: [
			{id: 'baz-foo', title: 'Baz-Foo!'},
			{
				id: 'baz-bar',
				title: 'Baz-Bar!',
				children: [
					{id: 'baz-bar-foo', title: 'Baz-Bar-Foo!'},
					{id: 'baz-bar-bar', title: 'Baz-Bar-Bar!'},
				],
			},
		],
	},
	{
		id: 'quz',
		title: 'Quz!',
	},
];
