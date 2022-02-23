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

import axios from "axios";

const listPublicTasks = (keyword, filter) => async (dispatch) => {
  if ((!keyword && !filter) || (keyword && keyword.length === 1)) {
    dispatch({ type: REQ_GET_PUBLIC_TASKS });
    const {data} = await axios.get("https://memo-app21.herokuapp.com/public/tasks");
    dispatch({ type: SUC_GET_PUBLIC_TASKS, payload: data });
    if (!data) {
      dispatch({
        type: ERR_GET_PUBLIC_TASKS,
        payload: "se ha producido un error",
      });
    }
  } else if (keyword) {
    dispatch({ type: REQ_GET_PUBLIC_TASKS });
    const { data } = await axios.get(
      `https://memo-app21.herokuapp.com/public/tasks/?search=${keyword}`
    );
    dispatch({ type: SUC_GET_PUBLIC_TASKS, payload: data });
    if (!data) {
      dispatch({
        type: ERR_GET_PUBLIC_TASKS,
        payload: "se ha producido un error",
      });
    }
  } else if (filter) {
    console.log(filter)
    dispatch({ type: REQ_GET_PUBLIC_TASKS });
    const { data } = await axios.get(
      `https://memo-app21.herokuapp.com/public/tasks/?filter=${filter}`
    );
    dispatch({ type: SUC_GET_PUBLIC_TASKS, payload: data });
    if (!data) {
      dispatch({
        type: ERR_GET_PUBLIC_TASKS,
        payload: "se ha producido un error",
      });
    }
  }
};

const listTasks = (token,keyword, filter) => async (dispatch) => {
  if ((!keyword && !filter) || (keyword && keyword.length === 1)) {
    dispatch({ type: REQ_GET_TASKS });
    const {data} = await axios({
      method: "get",
      url: "https://memo-app21.herokuapp.com/tasks",
      headers: {"Authorization": "Bearer "+token}
    })
    dispatch({ type: SUC_GET_TASKS, payload: data });
    if (!data) {
      dispatch({
        type: ERR_GET_TASKS,
        payload: "se ha producido un error",
      });
    }
  } else if (keyword) {
    dispatch({ type: REQ_GET_TASKS });
    const {data} = await axios({
      method: "get",
      url: `https://memo-app21.herokuapp.com/tasks/?search=${keyword}`,
      headers: {"Authorization": "Bearer "+token}
    })
    dispatch({ type: SUC_GET_TASKS, payload: data });
    if (!data) {
      dispatch({
        type: ERR_GET_TASKS,
        payload: "se ha producido un error",
      });
    }
  }
  else if (filter) {
    dispatch({ type: REQ_GET_TASKS });
    const {data} = await axios({
      method: "get",
      url: `https://memo-app21.herokuapp.com/tasks/?filter=${filter}`,
      headers: {"Authorization": "Bearer "+token}
    })
    dispatch({ type: SUC_GET_TASKS, payload: data });
    if (!data) {
      dispatch({
        type: ERR_GET_TASKS,
        payload: "se ha producido un error",
      });
    }
  }
};

const listDeletedTasks = (token, keyword, filter) => async(dispatch) => {
  if ((!keyword && !filter) || (keyword && keyword.length === 1)) {
    dispatch({ type: REQ_GET_DELETED_TASKS });
    const {data} = await axios({
      method: "get",
      url: "https://memo-app21.herokuapp.com/tasks/deleted",
      headers: {"Authorization": "Bearer "+token}
    })
    dispatch({ type: SUC_GET_DELETED_TASKS, payload: data });
    if (!data) {
      dispatch({
        type: ERR_GET_DELETED_TASKS,
        payload: "se ha producido un error",
      });
    }
  } else if (keyword) {
    dispatch({ type: REQ_GET_DELETED_TASKS });
    const {data} = await axios({
      method: "get",
      url: `https://memo-app21.herokuapp.com/tasks/deleted/?search=${keyword}`,
      headers: {"Authorization": "Bearer "+token}
    })
    dispatch({ type: SUC_GET_DELETED_TASKS, payload: data });
    if (!data) {
      dispatch({
        type: ERR_GET_DELETED_TASKS,
        payload: "se ha producido un error",
      });
    }
  }
  else if (filter) {
    dispatch({ type: REQ_GET_DELETED_TASKS });
    const {data} = await axios({
      method: "get",
      url: `https://memo-app21.herokuapp.com/tasks/deleted/?filter=${filter}`,
      headers: {"Authorization": "Bearer "+token}
    })
    dispatch({ type: SUC_GET_DELETED_TASKS, payload: data });
    if (!data) {
      dispatch({
        type: ERR_GET_DELETED_TASKS,
        payload: "se ha producido un error",
      });
    }
  }
}

const taskDetails = (taskId, token) => async (dispatch) => {
  try {
    dispatch({ type: REQ_TASK_DETAILS, payload: taskId });
    const {data} = await axios({
      method: "get",
      url: `https://memo-app21.herokuapp.com/tasks/${taskId}`,
      headers: {"Authorization": "Bearer "+token || null}
    })
    dispatch({ type: SUC_TASK_DETAILS, payload: data });
  } catch (error) {
    dispatch({ type: ERR_TASK_DETAILS, payload: error.message });
  }
};

const editTask = (task, token) => async (dispatch) => {
try {
  dispatch({type: REQ_EDIT_TASK});
  const {data} = await axios({
    method: "put",
    url: `https://memo-app21.herokuapp.com/posts/${task.id}`,
    headers: {"Authorization": "Bearer "+token || null},
    data: task
  })
  dispatch({type: SUC_EDIT_TASK, payload: data});
} catch (error) {
  dispatch({ type: ERR_EDIT_TASK, payload: error.message });
}
};

export { listPublicTasks, listTasks, taskDetails, editTask, listDeletedTasks };
