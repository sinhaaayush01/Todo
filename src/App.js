import React, { Component } from 'react';
import Request from 'superagent';
import _ from 'lodash';
import Addtodo from './components/addtodo';
import TodoItem from './components/todoItem';
var chrono = require('chrono-node');
var moment = require('moment');

class App extends Component {
  constructor(props){
    super(props);
    this.state={};
    this.getinput = this.getinput.bind(this);
    this.dodelete = this.dodelete.bind(this);
    this.updatingstate = this.updatingstate.bind(this)
    this.id = 0;
  }
  getinput(input){
    console.log(chrono.parseDate(input));
    var url = "http://localhost:3000/tasks";
    Request.post(url)
    .send({ id: this.id , todoitem: input, tododate: moment(chrono.parseDate(input)).format('LLLL') })
    .then(this.updatingstate)

  }
  componentDidMount(){
    var url = "http://localhost:3000/tasks";
    Request.get(url).then((response)=>{
      this.setState({
        tasks:response.body
      });
    });
  }
  dodelete(key){
    console.log(key);
     var url = `http://localhost:3000/tasks/${key}`;
    Request.del(url).then(this.updatingstate);
  }
  updatingstate(){
    var url = "http://localhost:3000/tasks";
    Request.get(url).then((response)=>{
      this.setState({
        tasks:response.body
      });
    });
  }
  render() {
    var tasks = _.map(this.state.tasks,(task) =>{
      return <li><b>Task:</b> {task.todoitem}, <b>Due by:</b> {task.tododate} 
      <button onClick={() => this.dodelete(task.id)} className="btn btn-link" type="submit">Delete</button></li>
    });
    return (
      <div>
        <Addtodo getinput={this.getinput} />
        <ul>{tasks}</ul>
      </div>
    );
  }
}

export default App;