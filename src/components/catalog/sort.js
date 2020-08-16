import { Constants } from '../../constants';

const popularSort = [
	{
		label: 'По популярности',
		value: 'ball',
		children: [
			{
				label: 'Сначала популярные',
				value: 'desc'
			},
			{
				label: 'Сначала не популярные',
				value: 'asc'
			}
		]
	},
	{
		label: 'По дате',
		value: 'date',
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

const typesSort = [
	{
		label: 'Курс',
		value: Constants.Entities.Course
	},
	{
		label: 'Урок',
		value: Constants.Entities.Lesson
	},
	{
		label: 'Вебинар',
		value: Constants.Entities.Webinar
  },
  {
    label: 'Консультация',
    value: Constants.Entities.Consult
  },
	{
		label: 'Книга',
		value: Constants.Entities.Book
	}
];

export { popularSort, typesSort };
