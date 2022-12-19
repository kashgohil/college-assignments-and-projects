import React, { useContext } from 'react';
import { ExpenseTrackerContext } from 'context/context';
import { RupeeIcon, DeleteIcon } from 'components/Icons';
import './list.scss';

const List = () => {
	const { deleteTransaction, transactions } = useContext(ExpenseTrackerContext);

	return (
		<section className='transactions-list'>
			<span className='header'>Your Transactions: </span>
			<section className='scrollable-list'>
				{transactions.map((transaction) => {
					return (
						<span className='transaction-item'>
							<span className='rupee-icon'>
								<RupeeIcon
									color={transaction.type === 'Expense' ? 'red' : 'green'}
									width='20px'
									height='20px'
								/>
							</span>
							<span className='transaction-item-details'>
								<span className='transaction-item-title'>
									{transaction.category}
								</span>
								<span className='transaction-item-subtitle'>
									₹{transaction.amount} - {transaction.date}
								</span>
							</span>
							<span
								className='delete-icon'
								onClick={() => deleteTransaction(transaction.id)}
							>
								<DeleteIcon color='red' height='20px' width='20px' />
							</span>
						</span>
					);
				})}
			</section>
		</section>
	);
};

export default List;
