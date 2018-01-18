import React, { Component } from 'react';
import axios from 'axios';
import Tasks from './tasks';

class Categories extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			categories: []
		}
	}

	componentDidMount() {

		const categoriesUrl = 'http://localhost:4747/api/boards/596fc1d235dea61c03a4cd70/categories';
		//fetch categories and set state
		axios.get(categoriesUrl)
			.then((response) => {
				this.setState({
					categories: response.data
				})
			})
			.catch((error) => {
				console.log('Unable to load categories');
			});
	}

	componentWillUnmount() {

	}

	render() {
		return(
			<div className="categories">
				{this.state.categories.map((category) => 
				<div className="category" key={category._id}>
					<div className="category-title">
						{category.title}
					</div>
					<Tasks categoryId={category._id}></Tasks>
				</div>
				)}
			</div>
			);
	}
}


function _getMockCategories() {
	return [
		{
			"_id": "597a1e8d22c008117b8e3a5a",
			"title": "Not started",
			"boardId": "596fc1d235dea61c03a4cd70",
			"__v": 6,
			"tasks": [
				{
					"title": "task 6",
					"desc": "description for task 6",
					"position": "6",
					"_id": "597a5623bf9f2624564ee86f"
				},
				{
					"title": "task 5",
					"desc": "description for task 5",
					"position": "5",
					"_id": "597a9fef4b15e003208f7093"
				}
			]
		},
		{
			"_id": "597a2513f3ceab155828252d",
			"title": "In Progress",
			"boardId": "596fc1d235dea61c03a4cd70",
			"__v": 0,
			"tasks": []
		},
		{
			"_id": "597a2521f3ceab155828252e",
			"title": "Blocked",
			"boardId": "596fc1d235dea61c03a4cd70",
			"__v": 0,
			"tasks": []
		}
	];
}

export default Categories;