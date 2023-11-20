import { createSlice } from '@reduxjs/toolkit'

export const TodoSlice = createSlice({
  name: 'todoList',
  initialState: {
    value: []
  },
  reducers: {
    AddinTodo: (state, action) => {
      //  console.log(state.value)
      console.log(action.payload)
      state.value = [...state.value, action.payload]

    },
    DeleteinTodo: (state, action) => {
      let newTodo = state.value.filter((newTodo) => {
        if (newTodo.id !== action.payload) {
          return newTodo
        }
      }
      )
      state.value = [...newTodo]

    },
    UpdateinTodo: (state, action) => {
      console.log(action.payload)
      let newTodo = state.value.filter((newTodo) => {
        if (newTodo.id == action.payload.id) {
          newTodo.title = action.payload.title
          newTodo.description = action.payload.description
          return newTodo
        }
        else {
          return newTodo
        }
      }
      )
      state.value = [...newTodo]
    },


  }
})


export const { AddinTodo, DeleteinTodo, UpdateinTodo, FindinTodo } = TodoSlice.actions
export default TodoSlice.reducer