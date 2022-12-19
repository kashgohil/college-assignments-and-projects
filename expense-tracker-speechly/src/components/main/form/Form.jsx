import React, { useState, useContext, useEffect } from 'react';
import {
	TextField,
	Typography,
	Grid,
	FormControl,
	Button,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core';
import useStyles from './styles';
import { ExpenseTrackerContext } from 'context/context';
import { v4 as uuidv4 } from 'uuid';
import { incomeCategories, expenseCategories } from 'constants/categories';
import formatDate from 'utils/formatDate';
import { useSpeechContext } from '@speechly/react-client';

const initialState = {
	amount: '',
	category: '',
	type: 'Income',
	date: formatDate(new Date()),
};

const Form = () => {
	const classes = useStyles();
	const { addTransaction } = useContext(ExpenseTrackerContext);
	const [formData, setFormData] = useState(initialState);
	const { segment } = useSpeechContext();

	const createTransaction = () => {
		if (Number.isNaN(formData.amount) || !formData.date.includes('-')) return;
		const transaction = {
			...formData,
			amount: Number(formData.amount),
			id: uuidv4(),
		};
		addTransaction(transaction);
		setFormData(initialState);
	};

	useEffect(() => {
		if (segment) {
			if (segment.intent.intent === 'add_expense') {
				setFormData({ ...formData, type: 'Expense' });
			} else if (segment.intent.intent === 'add_income') {
				setFormData({ ...formData, type: 'Income' });
			} else if (
				segment.isFinal &&
				segment.intent.intent === 'create_transaction'
			) {
				return createTransaction();
			} else if (
				segment.isFinal &&
				segment.intent.intent === 'cancel_transaction'
			) {
				return setFormData(initialState);
			}

			segment.entities.forEach((e) => {
				const category = `${e.value.charAt(0)}${e.value
					.slice(1)
					.toLowerCase()}`;

				switch (e.type) {
					case 'amount':
						setFormData({ ...formData, amount: e.value });
						break;
					case 'category':
						if (incomeCategories.map((ic) => ic.type).includes(category)) {
							setFormData({ ...formData, type: 'Income', category });
						} else if (
							expenseCategories.map((ic) => ic.type).includes(category)
						) {
							setFormData({ ...formData, type: 'Expense', category });
						}
						break;
					case 'date':
						setFormData({ ...formData, date: e.value });
						break;

					default:
						break;
				}
			});
			if (
				segment.isFinal &&
				formData.amount &&
				formData.type &&
				formData.category &&
				formData.date
			)
				createTransaction();
		}
	}, [segment]);

	const selectedCategories =
		formData.type === 'Income' ? incomeCategories : expenseCategories;

	return (
		<section className='form'>
			<span className='spoken-text'>
				{segment && segment.words.map((word) => word.value).join(' ')}
			</span>
			<span className='form-attribute'>
				<span className='label'>Type</span>
				<select
					value={formData.type}
					onChange={(e) => setFormData({ ...formData, type: e.target.value })}
				>
					<option value='Income'>Income</option>
					<option value='Expense'>Expense</option>
				</select>
			</span>
			<span className='form-attribute'>
				<span className='label'>Category</span>
				<select
					value={formData.category}
					onChange={(e) =>
						setFormData({ ...formData, category: e.target.value })
					}
				>
					{selectedCategories.map((category) => (
						<option key={category.type} value={category.type}>
							{category.type}
						</option>
					))}
				</select>
			</span>

			<span className='form-attribute'>
				<span className='label'>Amount</span>
				<input
					type='number'
					value={formData.amount}
					onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
				/>
			</span>
			<span className='form-attribute'>
				<span className='label'>date</span>
				<input
					type='date'
					value={formData.amount}
					onChange={(e) => setFormData({ ...formData, date: e.target.value })}
				/>
			</span>

			<button className='form-button' onClick={createTransaction}>
				Create
			</button>
		</section>
	);
};

export default Form;
