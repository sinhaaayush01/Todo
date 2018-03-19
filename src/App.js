import React, { Component } from 'react';
import Request from 'superagent';
import _ from 'lodash';
import Addtodo from './components/addtodo';
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
  getinput(input,inputdate){
    let c='';
    if(inputdate===''){
    if(moment(chrono.parseDate(input)).format('LLLL')==='Invalid date')
    {
      alert('Enter Manual Deadline');
    }
    else
    {
      c=moment(chrono.parseDate(input)).format('LLLL');
      let url = "http://localhost:3000/tasks";
    Request.post(url)
    .send({ id: this.id , todoitem: input, tododate: c })
    .then(this.updatingstate)
    }
  }
  else{
    c=inputdate;
    let url = "http://localhost:3000/tasks";
    Request.post(url)
    .send({ id: this.id , todoitem: input, tododate:moment(chrono.parseDate(c)).format('LLLL') })
    .then(this.updatingstate)

  }
  }
  componentWillMount(){
    let url = "http://localhost:3000/tasks";
    Request.get(url).then((response)=>{
      this.setState({
        tasks:response.body
      });
      console.log(response.body);
    });
  }
  dodelete(key){
    console.log(key);
     let url = `http://localhost:3000/tasks/${key}`;
    Request.del(url).then(this.updatingstate);
  }
  updatingstate(){
    let url = "http://localhost:3000/tasks";
    Request.get(url).then((response)=>{
      this.setState({
        tasks:response.body
      });
    });
  }
  render() {
    let tasks = _.map(this.state.tasks,(task) =>{
      return <li><b>Task:</b> {task.todoitem} <b>Due by:</b> {task.tododate} 
      <button onClick={() => this.dodelete(task.id)} className="btn btn-link" type="submit">Done</button><hr /></li>
    });
    return (
      <div>
      <header>
      <br />
      <h2><b>ToDo List</b></h2>
      <br />
        <Addtodo getinput={this.getinput} />
        </header>
        <br />
        <ul>{tasks}</ul>
      </div>
    );
  }
}

export default App;