import {TasksState} from "../App.tsx";
import {CreateTodolistAT, DeleteTodolistAT} from "./todolists-reducer.ts";
import {v1} from "uuid";

import {createAction, createReducer} from "@reduxjs/toolkit";




const initialState: TasksState = {}
export const deleteTaskAt = createAction<{todolistID: string, taskID: string}>("tasks/deleteTaskAt");
export const createTaskAt = createAction("tasks/createTask", (args: {todolistID: string, title: string})=> {
    return {
        payload: {
            taskId: v1(),
            todolistId: args.todolistID,
            title: args.title
        }
    }
});
export const changeTaskStatusAT = createAction<{todolistId: string, status: boolean, taskID: string}>("tasks/changeTaskStatus");
export const changeTaskTitleAT = createAction<{todolistID: string, taskId: string, newTitle: string}>("tasks/changeTaskTitle");


export const tasksReducer = createReducer(initialState, (builder) => {
    builder.addCase(DeleteTodolistAT, (state,action) => {
        delete state[action.payload.id];
    })
        .addCase(CreateTodolistAT, (state, action)=> {
            state[action.payload.id] = []
        })
        .addCase(deleteTaskAt, (state, action) => {
            const index = state[action.payload.todolistID].findIndex(todo => todo.id === action.payload.taskID)
            if (index !== -1) state[action.payload.todolistID].splice(index, 1)
        })
        .addCase(createTaskAt, (state, action) => {
           state[action.payload.todolistId].push({id: action.payload.taskId, title: action.payload.title, isDone: false})
        })
        .addCase(changeTaskStatusAT, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(todo => todo.id === action.payload.taskID)
            if (index !== -1) state[action.payload.todolistId][index].isDone = action.payload.status
        })
        .addCase(changeTaskTitleAT, (state, action) => {
            const index = state[action.payload.todolistID].findIndex(todo => todo.id === action.payload.taskId)
            if (index !== -1) state[action.payload.todolistID][index].title = action.payload.newTitle
        })
})










