import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import './App.css';
import Home from "./components/Home"; 
import Header from "./components/Header";
import Register from "./containers/Register";
import Login from "./containers/Login";
import Posts from "./components/Posts";
import Tasks from "./containers/Tasks";
import Drafts from "./containers/Drafts";
import Deleted from "./components/Deleted";
import TaskDetails from "./components/TaskDetails";
import moment from 'moment';
import 'moment/locale/es';

function App() {
  moment.locale('es');
  return (
    <div className="App">
      <Router>
        <Route path="/" render={()=> <Header/>}/>
        <Route path="/" exact={true} render={()=> <Home/>}/>
        <Route path="/signup" exact={true} render={()=> <Register/>}/>
        <Route path="/login" exact={true} render={()=> <Login/>}/>
        <Route path="/eliminadas" exact={true} render={(e)=> (e.location.state === "tasks") ? <Deleted type="tasks"/> : (e.location.state === "notes") && true}/>
        <Route path="/borradores" exact={true} render={(e)=><Drafts type="tasks"/>}/>
        <Route path="/posts" exact={true} render={(e)=> ((e.location.state && e.location.state.public === true) || (e.location.state && e.location.state.public === false)) ? <Posts e={e.location.state}/> : <Posts />}/>
        <Route path="/tareas" exact={true} render={(e)=> ((e.location.state && e.location.state.public === true) || (e.location.state && e.location.state.public === false)) ? <Tasks e={e.location.state}/> : <Tasks />}/>
        <Route path="/tareas/:id" exact={true} render={(e)=> <TaskDetails params={e.match.params.id}/>}/>
      </Router>
    </div>
  );
}

export default App;
