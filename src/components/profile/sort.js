const myproductSort = [
	{
		label: 'По количеству продаж',
		value: 'sales',
		children: [
			{
				label: 'Больше',
				value: 'desc'
			},
			{
				label: 'Меньше',
				value: 'asc'
			}
		]
	},
	{
		label: 'По дате создания',
		value: 'date',
		children: [
			{
				label: 'Новые',
				value: 'asc'
			},
			{
				label: 'Старые',
				value: 'desc'
			}
		]
	},
	{
		label: 'По последней продаже',
		value: 'lastsale',
		children: [
			{
				label: 'Новые',
				value: 'asc'
			},
			{
				label: 'Старые',
				value: 'desc'
			}
		]
	},
	{
		label: 'По цене',
		value: 'price',
		children: [
			{
				label: 'Сначала дешевые',
				value: 'asc'
			},
			{
				label: 'Сначала дорогие',
				value: 'desc'
			}
		]
	}
];


export { myproductSort };
