import { Constants } from '../../constants';

const popularSort = [
	{
		label: 'По дате',
		value: 'updatedAt',
		children: [
			{
				label: 'Первыми новые',
				value: 'asc'
			},
			{
				label: 'Первыми старые',
				value: 'desc'
			}
		]
	}
];

export { popularSort };
