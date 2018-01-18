import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './../constants';

import Task from './task';

const taskTarget = {
	drop(props, monitor, component) {
		const taskInfo = monitor.getItem();
		const tasksUrl = 'http://localhost:4747/api/boards/596fc1d235dea61c03a4cd70/categories/' + props.categoryId + '/tasks';
		
		const oldTaskUrl = 'http://localhost:4747/api/boards/596fc1d235dea61c03a4cd70/categories/' + taskInfo.categoryId + '/tasks/' + taskInfo.taskId;

		axios.get(oldTaskUrl)
				.then((response) => {
						const taskMoved = response.data;
						//update the new category with the dropped task
						axios.post(tasksUrl, {
							"title": taskMoved.title,
							"desc": taskMoved.desc,
							"position": taskMoved.position
						})
						.then(function (response) {
							console.log(response);
							
						})
						.catch(function (error) {
							console.log(error);
						});
				})
				.catch((error) => {
					console.log('unable to get task');
				});
		
		return {
			moved: true
		}
		
	}
}

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
}

class Tasks extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tasks: []
		}
	}

	componentDidMount() {
		//fetch tasks for this category

		const tasksUrl = 'http://localhost:4747/api/boards/596fc1d235dea61c03a4cd70/categories/' + this.props.categoryId + '/tasks';
		//fetch categories and set state
		axios.get(tasksUrl)
			.then((response) => {
				this.setState({
					tasks: response.data
				})
			})
			.catch((error) => {
				console.log('Unable to load tasks');
			});
	}

	componentWillUnmount() {

	}

	render() {
		const {connectDropTarget, isOver } = this.props;
		return connectDropTarget(
		<div className="tasks" style={{
			position: 'relative',
			width: '100%',
			height: '100%'
		  }}>
			{this.state.tasks.map(task => (
				<Task key={task._id} task={task} categoryId={this.props.categoryId}></Task>
			))}
		</div>);
	}
}

function _getMockTasks() {
	return [
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
	];
}

Tasks.propTypes = {
	connectDropTarget: PropTypes.func.isRequired,
	isOver: PropTypes.bool.isRequired
  };

export default DropTarget(ItemTypes.TASK, taskTarget, collect)(Tasks);