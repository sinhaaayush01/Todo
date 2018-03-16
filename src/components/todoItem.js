import React, { Component } from 'react';
class TodoItem extends Component{
	constructor(props){
		super(props);
		this.removeTodo=this.removeTodo.bind(this);
	}
	removeTodo(id){
		this.props.removeTodo(id);
	}
	render(){
		return(
				<div className="app">
				<button className="removeTodo" onClick={(e) => this.removeTodo(this.props.todo.id)}>Remove</button><p>{this.props.todo.text}</p>
				</div>
			);
	}
}
export default TodoItem;