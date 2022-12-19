import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import useTransactions from 'useTransactions';

const Details = ({ title }) => {
	const { total, charData } = useTransactions(title);
	return (
		<section className='chart-card'>
			<header className='chart-card-title'>{title}</header>
			<span className='chart-card-content'>
				<span className='total'>₹{total}</span>
			</span>
			<Doughnut data={charData} />
		</section>
	);
};

export default Details;
