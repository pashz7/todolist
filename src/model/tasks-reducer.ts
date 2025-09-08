import {TasksState} from "../App.tsx";
import {CreateTodolistAt, DELETE_TODOLIST, DeleteTodolistAT} from "./todolists-reducer.ts";
import {v1} from "uuid";
import {Task} from "../TodolistItem.tsx";


type deleteTaskAT = ReturnType<typeof deleteTaskAC>
type createTaskAt = ReturnType<typeof createTaskAC>
type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>


type ActionType = DeleteTodolistAT | CreateTodolistAt | deleteTaskAT | createTaskAt | changeTaskStatusAT | changeTaskTitleAT


export const tasksReducer = (tasks: TasksState, action: ActionType): TasksState => {
    switch (action.type) {
        case DELETE_TODOLIST:
            const copyTaskState = {...tasks}
            delete copyTaskState[action.payload.id];
            return copyTaskState
        case "create_todolist ":
            return {...tasks, [action.payload.id]: []}
        case "delete_task":
            return {
                ...tasks,
                [action.payload.todolistID]: tasks[action.payload.todolistID].filter(t => t.id !== action.payload.taskId)
            }
        case "create_task":
            const newTask: Task = {id: action.payload.id, title: action.payload.title, isDone: false}
            return {...tasks, [action.payload.todolistID]: [...tasks[action.payload.todolistID], newTask]}
        case "change_task_status":
            return {
                ...tasks,
                [action.payload.todolistId]: tasks[action.payload.todolistId].map(t => t.id === action.payload.taskID ? {
                    ...t,
                    isDone: action.payload.newTaskStatus
                } : t)
            }
        case "change_task_title":
            return {...tasks, [action.payload.todolistID]: tasks[action.payload.todolistID].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.newTitle} : t)}
        default:
            return tasks
    }
}


export const deleteTaskAC = (payload: { taskId: string; todolistID: string }) => {
    return {
        type: "delete_task",
        payload
    } as const
}
export const createTaskAC = (todolistID: string, title: string) => {
    return {
        type: "create_task",
        payload: {
            id: v1(),
            todolistID,
            title
        }
    } as const
}

export const changeTaskStatusAC = (payload: { taskID: string; newTaskStatus: boolean; todolistId: string }) => {
    return {
        type: "change_task_status",
        payload: payload
    } as const
}

export const changeTaskTitleAC = (payload: { taskId: string; newTitle: string, todolistID: string }) => {
    return {
        type: "change_task_title",
        payload
    }as const
}






