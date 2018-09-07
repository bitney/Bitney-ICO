import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
// import custom components
import HomePage from './components/homepage/HomePage';
import { I18nextProvider } from 'react-i18next';

import i18n from './i18n';

ReactDOM.render(
	<BrowserRouter>
		<I18nextProvider i18n={ i18n }>
			<HomePage />
		</I18nextProvider>
	</BrowserRouter>,
	document.getElementById('awd-site-wrap')
);

window.localStorage.setItem('lang', "en");
// registerServiceWorker();
unregister();