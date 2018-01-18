import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Categories from './categories';

class Board extends Component {
	constructor(props){
		super(props);
	}
	render() {
	return (<div>
		<h1>{this.props.name}</h1>
		<Categories boardId="1"></Categories>
		</div>);
	}
}

export default DragDropContext(HTML5Backend)(Board);