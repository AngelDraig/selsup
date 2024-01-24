import React from 'react';
import ReactDOM from 'react-dom/client';

import ParamEditor from './ParamEditor';

import './index.css';
import 'normalize.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const params = [
	{
		"id": 1,
		"name": "Назначение"
	},
	{
		"id": 2,
		"name": "Длина"
	},
	{
		"id": 3,
		"name": "Цвет"
	}
];

const model = {
	"paramValues": [
		{
			"paramId": 1,
			"value": "повседневное"
		},
		{
			"paramId": 2,
			"value": "макси"
		},
		{
			"paramId": 3,
			"value": "Серый"
		}
	]
}

root.render(
	<ParamEditor params={params} model={model}/>
);