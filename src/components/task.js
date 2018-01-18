import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { ItemTypes } from './../constants';
import axios from 'axios';

const taskSource = {
	beginDrag(props, monitor, component) {
		return { 
			taskId: props.task._id,
			categoryId: props.categoryId
		}
	},

	isDragging(props, monitor) {
		return monitor.getItem().taskId === props.task._id;
	},

	endDrag(props, monitor, component) {
		const taskInfo = monitor.getItem();

		const dropResult = monitor.getDropResult();

		const oldTaskUrl = 'http://localhost:4747/api/boards/596fc1d235dea61c03a4cd70/categories/' + taskInfo.categoryId + '/tasks/' + taskInfo.taskId;

		if(dropResult.moved)
		{
			axios.delete(oldTaskUrl)
					.then((response) => {
						console.log(response);
					})
					.catch((error)=> {
						console.log(error);
					})
		}
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

class Task extends Component {

	constructor(props) {
		super(props);

	}

	componentDidMount() {

	}

	render() {
		const { connectDragSource, isDragging, task } = this.props;
		return connectDragSource(
			<div className="task" style={{
				opacity: isDragging ? 0.5 : 1,
				cursor: 'pointer'
			  }}>
				<p>
					ID: {task._id}<br/>
					Title: {task.title}, <br/>
					Description: {task.desc}
				</p>
			</div>
		);
	}
}
Task.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
  	isDragging: PropTypes.bool.isRequired
}

export default DragSource(ItemTypes.TASK, taskSource, collect)(Task);