import React from 'react';
export default class Addtodo extends React.Component{
	constructor(props){
		super(props);
		this.state={
			value: ''
		}
		this.handleInput = this.handleInput.bind(this);
		}
	 handleInput()
	 {
	 	let input = document.getElementById("todoinput").value;
        {/*let inputdate = document.getElementById("tododate").value;*/}
	 	this.props.getinput(input);
	 }
	render(){
		return(
			<div>
				<input id="todoinput" type="text" placeholder="Today's Tasks!!"  />
				{/*<input id="tododate" type="date" />*/}
				<button onClick={this.handleInput} onKeyPress={this.handleInput} className="btn btn-primary">Add!</button>
			</div>
		);
	}
}


