import React from 'react';
export default class Addtodo extends React.Component{
	constructor(props){
		super(props);
		this.state={
			todoinput:'',
			tododate:'',
		};
		this.handleInput = this.handleInput.bind(this);
		}
	 handleInput(event)
	 {
	 	event.preventDefault();
	 	if(event.target.todoinput.value!==''){
	 	let input = event.target.todoinput.value;
        let inputdate = event.target.tododate.value;
        this.setState({
        	todoinput:event.target.todoinput.value,
        	tododate:event.target.tododate.value
        });
        console.log(input);
        {/*let inputtime = document.getElementById("todotime").value;*/}
	 	this.props.getinput(input,inputdate);
	 	}
	 	else
	 	{
	 		alert("No Task Entered");
	 	}
	 }
	render(){
		return(
			<div>
			<form onSubmit={this.handleInput}>
				Task: <input id="todoinput" type="text" placeholder="Today's Tasks!!" />
				Deadline Date: <input id="tododate" type="date" />
				{/*Deadline Time: <input id="todotime" type="time" />*/}
				<input type="submit" className='btn btn-warning' value="Add!" />
				</form>
			</div>
		);
	}
}


