import {FilterValues, Todolist} from "./App"


import {AddItemForm} from "./addItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {Box} from "@mui/material";


type Props = {
    title: string
    tasks: Task[]
    filter: FilterValues
    deleteTask: (taskId: Task["id"], todolistID: Todolist["id"]) => void
    changeTodolistFilter: (filter: FilterValues, todolistID: Todolist["id"]) => void
    createTask: (task: Task["title"], todolistID: Todolist["id"]) => void
    changeTaskStatus: (TaskId: Task["id"], newTaskStatus: Task["isDone"], todolistID: Todolist["id"]) => void
    deleteTodolist: (todolistID: Todolist["id"]) => void
    todolistID: Todolist["id"]
    changeTaskTitle: (todolistID: Todolist["id"], TaskId: string, newTitle: Task['title']) => void
    changeTodoListTitle: (todolistID: Todolist['id'], newTitle: string) => void

}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeTodolistFilter,
                                 createTask,
                                 changeTaskStatus,
                                 filter,
                                 todolistID,
                                 deleteTodolist,
                                 changeTaskTitle,
                                 changeTodoListTitle


                             }: Props) => {
    // const title = props.title
    // const tasks = props.tasks

    // const {tasks, title} = props
    const createTaskHanler = (taskTitle: string) => {
        createTask(taskTitle, todolistID)

    }


    const tasksList = tasks.length === 0
        ? <span>Tasks list is empty</span>
        : <ul>
            {
                tasks.map(t => {
                    const changeTaskTitleHandler = (title: string) => {
                        changeTaskTitle(todolistID, t.id, title)
                    }
                    return (
                        <li>
                            <Checkbox checked={t.isDone}
                                      onChange={(e) => changeTaskStatus(t.id, e.currentTarget.checked, todolistID)}/>
                            <span className={t.isDone ? "task-done" : "task"}><EditableSpan title={t.title}

                                                                                            changeItemTitle={changeTaskTitleHandler}/></span>


                            <IconButton
                                title="x"
                                onClick={() => deleteTask(t.id, todolistID)}

                            ><DeleteIcon/>
                            </IconButton>
                        </li>
                    )
                })
            }
        </ul>

    const changeTodoListItemHandler = (newTitle: string) => changeTodoListTitle(todolistID, newTitle)
    return (
        <div>
            <h3>
                <Button variant={"contained"} size={"small"} title="delete TODO"
                        onClick={() => deleteTodolist(todolistID)}/>
                <EditableSpan title={title} changeItemTitle={changeTodoListItemHandler}/>

            </h3>
            <AddItemForm maxTitleLength={10} createItem={createTaskHanler}/>
            {tasksList}
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Button onClick={() => changeTodolistFilter("all", todolistID)}
                        variant="contained"
                        size="small"
                        color={filter === "all" ? "secondary" : "primary"}>ALL</Button>

                <Button onClick={() => changeTodolistFilter("active", todolistID)}
                        variant="contained"
                        size="small"
                        color={filter === "active" ? "secondary" : "primary"}>Active</Button>
                <Button onClick={() => changeTodolistFilter("completed", todolistID)}
                        variant="contained"
                        size="small"
                        color={filter === "completed" ? "secondary" : "primary"}>Completed</Button>
            </Box>
        </div>
    )
}