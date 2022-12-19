import React, { useContext } from 'react';
import Form from './form/Form';
import List from './list/List';
import { ExpenseTrackerContext } from 'context/context';
import './main.scss';

const Main = () => {
	const { total } = useContext(ExpenseTrackerContext);
	return (
		<section className='card'>
			<header className='card-header'>Expense Tracker</header>
			<span className='card-content'>
				<span className='card-content-header'>Total Balance ₹{total}</span>
				<span className='example-text'>
					Try saying: Add income for ₹100 in category salary for monday ...
				</span>
			</span>
			<Form />
			<List />
		</section>
	);
};

export default Main;
