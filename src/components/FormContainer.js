import React, { Component } from 'react';
import shortid from 'shortid';
import 'whatwg-fetch'; //fetch

import UrlInputForm from './UrlInputForm';

export default class FormContainer extends Component {
	shortenUrl(inputURL){
		let id = shortid.generate();
		const urlObj = {
			id: id,
			longURL: inputURL,
			shortURL: ''
		};

		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(urlObj)
		}

		fetch('/api/shorten', options)
			.then((response) =>{
				console.log(response);
			})
			.catch((err) =>{
				throw err;
			});
	}

	render(){
		return (
			<div>
				enter a url below:
				<UrlInputForm shortenUrl={this.shortenUrl.bind(this)} />
			</div>
		);
	}
}
