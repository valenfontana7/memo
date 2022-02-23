import {
  REQ_GET_PUBLIC_TASKS,
  SUC_GET_PUBLIC_TASKS,
  ERR_GET_PUBLIC_TASKS,
  REQ_GET_TASKS,
  SUC_GET_TASKS,
  ERR_GET_TASKS,
  REQ_GET_DELETED_TASKS,
  SUC_GET_DELETED_TASKS,
  ERR_GET_DELETED_TASKS,
  REQ_TASK_DETAILS,
  SUC_TASK_DETAILS,
  ERR_TASK_DETAILS,
  REQ_EDIT_TASK,
  SUC_EDIT_TASK,
  ERR_EDIT_TASK
} from "../constants/tasks_constants";

const initialState = {
  task: {},
  tasks: [],
  ptasks: [],
  dtasks: []
}

export default function tasksReducer(state = initialState, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    // PUBLIC TASKS
    case REQ_GET_PUBLIC_TASKS:
      return { loadingptasks: true }
    case SUC_GET_PUBLIC_TASKS:
      return { ptasks: action.payload, loadingptasks: false }
    case ERR_GET_PUBLIC_TASKS:
      return { errorptasks: "No se ha podido realizar la operación", loadingptasks: false }
    // GET TASKS
    case REQ_GET_TASKS:
      return { loadingtasks: true }
    case SUC_GET_TASKS:
      return { tasks: action.payload, loadingtasks: false }
    case ERR_GET_TASKS:
      return { errortasks: "No se ha podido realizar la operación", loadingtasks: false }  
    // GET DELETED TASKS
  case REQ_GET_DELETED_TASKS:
    return { loadingdeletedtasks: true }
  case SUC_GET_DELETED_TASKS:
    return { dtasks: action.payload, loadingdeletedtasks: false }
  case ERR_GET_DELETED_TASKS:
    return { errordeletedtasks: "No se ha podido realizar la operación", loadingdeletedtasks: false }  
    // GET TASK
    case REQ_TASK_DETAILS:
      return { loadingtask: true }
    case SUC_TASK_DETAILS:
      return { task: action.payload, loadingtask: false }
    case ERR_TASK_DETAILS:
      return { errortask: "No se ha podido realizar la operación", loadingtask: false }  
    // EDIT TASK
    case REQ_EDIT_TASK:
      return { edittaskloading: true }
    case SUC_EDIT_TASK:
      return { task: action.payload, edittaskloading: false }
    case ERR_EDIT_TASK:
      return { errortask: "No se ha podido realizar la operación", loadingtask: false }  
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}