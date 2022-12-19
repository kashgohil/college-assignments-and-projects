import React from 'react';
import Main from 'components/main/Main';
import Details from 'components/details/Details';
import {
	PushToTalkButton,
	PushToTalkButtonContainer,
	ErrorPanel,
} from '@speechly/react-ui';
import './App.scss';

const App = () => {
	return (
		<section className='app'>
			<Main />
			<span className='chart-cards'>
				<Details title='Income' />
				<Details title='Expense' />
			</span>
			<PushToTalkButtonContainer>
				<PushToTalkButton />
				<ErrorPanel />
			</PushToTalkButtonContainer>
		</section>
	);
};

export default App;
