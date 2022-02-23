import React, {useEffect} from 'react';
import ItemsCatalog from "../components/ItemsCatalog";
import {listTasks, listPublicTasks} from "../app/actions/tasks_actions";
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress} from "@material-ui/core";
import SearchBar from "../containers/SearchBar";

function Tasks({e}) {
  let userPublic = (localStorage.getItem("tk") && (e && e.public));
  let guest = (!localStorage.getItem("tk"));
  const dispatch = useDispatch();
  const tasksList = useSelector((state) => state.tasksList);
  const { tasks, loadingtasks, errortasks, ptasks, loadingptasks, errorptasks } = tasksList;
  const showTasks = () => {
    if((userPublic || guest) && !loadingptasks) {
      return (<ItemsCatalog type="tasks" items={ptasks}/>);
    }
    if((!userPublic && !guest) && (!loadingtasks)) {
      return (<ItemsCatalog type="tasks" items={tasks}/>);
    }
    return (<CircularProgress style={{color: "turquoise", width: "70px", marginTop: "100px"}} />);
  }
  const showSb = () => {
    if(userPublic || guest) {
      return(<SearchBar type="tasks" visible={true}/>);
    }
      return(<SearchBar type="tasks" visible={false}/>);
  }
  useEffect(() => {
    (userPublic || guest) ? dispatch(listPublicTasks()) : dispatch(listTasks(localStorage.getItem("tk")));
  }, [])
  
  return (
    <div>
      {showSb()}
      {showTasks()}
    </div>
  )
}

export default Tasks;
