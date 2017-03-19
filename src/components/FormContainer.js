import React, { Component } from 'react';
import shortid from 'shortid';
import 'whatwg-fetch'; //fetch

import UrlInputForm from './UrlInputForm';

export default class FormContainer extends Component {
	constructor(props){
		super(props);
		this.state = {
			shortURL: ''
		};
	}

	shortenUrl(inputURL){
		// validation
		if(/https?:\/{2}.*\.[com|ca|org|net|io].*/.test(inputURL)){
			let id = shortid.generate();
			const urlObj = {
				id: id,
				longURL: inputURL,
				shortURL: 'http://localhost:9000/' + id
			};

			const options = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(urlObj)
			}

			fetch('/api/shorten', options)
				.then((response) => {
					return response.json();
				})
				.then((shortURL) => {
					this.setState({ shortURL: urlObj.shortURL });
				})
				.catch((err) =>{
					throw err;
				});
			} else {
				alert('input must be a valid url');
			}
	}

	render(){
		return (
			<div>
				enter a url below:
				<UrlInputForm shortenUrl={this.shortenUrl.bind(this)} />
				<p>your short url will appear below when its ready</p>
				<a href={this.state.shortURL}>{this.state.shortURL}</a>
			</div>
		);
	}
}
