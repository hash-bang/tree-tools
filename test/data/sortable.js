module.exports = {
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
