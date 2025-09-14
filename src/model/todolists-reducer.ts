import {FilterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";
import {createAction, createReducer} from "@reduxjs/toolkit";


const initialState: Todolist[] = []



export const DeleteTodolistAT = createAction<{id: string}>("todolists/deleteTodolist")
export const CreateTodolistAT = createAction("todolists/createTodolist", (args: {title: string})=>{
return {
    payload: {
        id: v1(),
        title: args.title
    }
}
})
export const changeTodolistTitleAT = createAction<{title: string, id: string}>("todolists/changeTitle")
export const changeTodolistFilterAT = createAction<{filter: FilterValues, id: string}>("todolists/changeTodolistFilter")

export const todolistsReducer = createReducer(initialState, (builder) => {
    builder.addCase(DeleteTodolistAT, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
    })
        .addCase(CreateTodolistAT, (state, action) => {
            const newTodolist: Todolist = {
            id: action.payload.id, title: action.payload.title, filter: 'all',
         }
         state.push(newTodolist)
        })
        .addCase(changeTodolistTitleAT, (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].title = action.payload.title
        })
        .addCase(changeTodolistFilterAT, (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].filter = action.payload.filter
        })
})


export class CreateTodolistAt {
}