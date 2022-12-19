import { useContext } from 'react';
import { ExpenseTrackerContext } from 'context/context';
import {
	incomeCategories,
	expenseCategories,
	resetCategories,
} from 'constants/categories';

const useTransactions = (title) => {
	resetCategories();
	const { transactions } = useContext(ExpenseTrackerContext);
	const typeTransactions = transactions.filter(
		(transaction) => transaction.type === title
	);
	const total = typeTransactions.reduce(
		(acc, curValue) => (acc += curValue.amount),
		0
	);
	const categories = title === 'Income' ? incomeCategories : expenseCategories;

	typeTransactions.forEach((transaction) => {
		const category = categories.find((c) => c.type === transaction.category);
		if (category) category.amount += transaction.amount;
	});

	const filteredCategories = categories.filter(
		(category) => category.amount > 0
    );
    
    const charData = {
        datasets: [{
            data: filteredCategories.map(category => category.amount),
            backgroundColor: filteredCategories.map(category => category.color)
        }],
        labels: filteredCategories.map(category => category.type)
    }

    return {filteredCategories, total, charData};
};


export default useTransactions;