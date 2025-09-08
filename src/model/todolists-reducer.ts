import {FilterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";

export const DELETE_TODOLIST = "delete_todolist" as const

export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAt = ReturnType<typeof createTodolistAC>
export type changeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>

type ActionType = DeleteTodolistAT | CreateTodolistAt | changeTodolistTitleAT | changeTodolistFilterAT



export const todolistsReducer = (todolists:Todolist[], action: ActionType): Todolist[]  => {
 switch (action.type) {
     case DELETE_TODOLIST:
         return todolists.filter(tl => tl.id !== action.payload.id)
     case "create_todolist ":

         const newTodolist: Todolist = {
             id: action.payload.id,
             title: action.payload.title,
             filter: 'all',
         }
         return [...todolists, newTodolist]
     case "change_todolistName":
         // const nextState: Todolist[] = todolists.map(tl => tl.id === todolistID ? {...tl, title:newTitle} : tl)
         return todolists.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
     case "change_todolist_filter":
         return todolists.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)



     default:
         return todolists

 }
}


export const deleteTodolistAC = (id: string) => ({
    type: "delete_todolist",
    payload: {
        id: id
    }
}as const)

export const createTodolistAC = (title: string) => ({
    type: "create_todolist ",
    payload: {
        id: v1(),
        title: title
    }
}as const)

export const changeTodolistTitleAC = (payload: {id: string, title: string})=> ({
    type: "change_todolistName",
    payload: payload


}as const)

export const changeTodolistFilterAC = (payload: {id:string, filter: FilterValues} ) => ({
    type: "change_todolist_filter",
    payload: payload
}as const)