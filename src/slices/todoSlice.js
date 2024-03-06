import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const getInitialToDo = () => {
  const localTodoList = localStorage.getItem("todoList");
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  localStorage.setItem("todoList", JSON.stringify([]));
  return [];
};

const initialValues = {
  filterStatus: "all",
  todoList: getInitialToDo(),
};

export const todoslice = createSlice({
  name: "Todo",
  initialState: initialValues,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({ ...action.payload });
        localStorage.setItem("todoList", JSON.stringify(todoListArr));
      } else {
        localStorage.setItem(
          "todoList",
          JSON.stringify([{ ...action.payload }])
        );
      }
      toast.success("Todo added successfully");
    },
    deleteTodo: (state, action) => {
      const todoList = localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, idx) => {
          if (todo.id === action.payload) {
            todoListArr.splice(idx, 1);
          }
        });
        localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateToDo: (state, action) => {
      const todoList = localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, idx) => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
            todo.status = action.payload.status;
          }
        });
        localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },

});

export default todoslice.reducer;
export const { addTodo, deleteTodo, updateToDo, updateFilterStatus } =
  todoslice.actions;
