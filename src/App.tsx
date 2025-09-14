
import './App.css'
import {Task, TodolistItem} from './TodolistItem'

import {AddItemForm} from "./addItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Box, Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider} from "@mui/material";
import {amber, indigo,} from "@mui/material/colors";



import { RootState } from './app/store.ts';
import {useAppDispatch} from "./common/hooks/useAppDispatch.ts";
import {useAppSelector} from "./common/hooks/useAppSelector.ts";
import {changeTaskStatusAT, changeTaskTitleAT, createTaskAt, deleteTaskAt} from "./model/tasks-reducer.ts";
import {
    changeTodolistFilterAT,
    changeTodolistTitleAT,
    CreateTodolistAT,
    DeleteTodolistAT
} from "./model/todolists-reducer.ts";


export type FilterValues = "all" | "active" | "completed"

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}
export type TasksState = {
    [todolistID: string]: Task[]
}

export const selectTodolists = (state: RootState): Todolist[] => state.todolists
export const selectTasks = (state: RootState): TasksState => state.tasks
// CRUD => R, D => C, U
function App() {

   const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

const dispatch = useAppDispatch()


    const deleteTask = (taskId: Task["id"], todolistID: Todolist["id"]) => {
        // create next state
        // immutable change data
        // const nextState = {...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskId)}
        // // set next state
        // setTasks(nextState);
        dispatch(deleteTaskAt({taskID: taskId, todolistID: todolistID}))
    }
    const createTask = (title: Task["title"], todolistID: Todolist["id"]) => {
        // const newTask: Task = {
        //     id: v1(),
        //     title: title,
        //     isDone: false
        // }
        // const nextState = {
        //     ...tasks, [todolistID]: [...tasks[todolistID], newTask]
        // }
        // setTasks(nextState)
       dispatch(createTaskAt({title: title, todolistID: todolistID}))

    }
    const changeTaskStatus = (taskID: Task["id"], newTaskStatus: Task["isDone"], todolistId: Todolist["id"]) => {

        // const nextState = {
        //     ...tasks,
        //     [todolistID]: tasks[todolistID].map(t => t.id === TaskId ? {...t, isDone: newTaskStatus} : t)
        // }
        // setTasks(nextState)
        dispatch(changeTaskStatusAT({taskID: taskID, status: newTaskStatus, todolistId: todolistId}))
    }


    const changeTodolistFilter = (filter: FilterValues, todolistID: Todolist["id"]) => {
        dispatch(changeTodolistFilterAT({filter: filter, id: todolistID}))
    }
    const deleteTodolist = (todolistID: Todolist["id"]) => {
       dispatch(DeleteTodolistAT({id: todolistID}))

    }
    const changeTaskTitle = (todolistID: Todolist["id"], taskId: string, newTitle: Task['title']) => {
        // const nextState = {
        //     ...tasks,
        //     [todolistID]: tasks[todolistID].map(t => t.id === TaskId ? {...t, title: newTitle} : t)
        // }
        // setTasks(nextState)
        dispatch(changeTaskTitleAT({todolistID: todolistID, taskId: taskId, newTitle }))
    }

    const getFilteredTasks = (tasks: Task[], filter: FilterValues): Task[] => {
        let filteredTasks = tasks
        if (filter === "active") {
            filteredTasks = filteredTasks.filter(t => !t.isDone)
        }
        if (filter === "completed") {
            filteredTasks = filteredTasks.filter(t => t.isDone)
        }
        return filteredTasks
    }
    const createTodoList = (title: Todolist["title"]) => {

dispatch(CreateTodolistAT({title}))


    }
    const changeTodoListTitle = (todolistID: Todolist['id'], newTitle: string) => {
        dispatch(changeTodolistTitleAT({id: todolistID, title: newTitle}))
    }

    const todolistsComponents = todolists.map(tl => {

        const filteredTasks: Task[] = getFilteredTasks(tasks[tl.id], tl.filter)
        return (
            <Grid>
                <Paper elevation={8} sx={{p: "20px"}}>
                    <TodolistItem
                        key={tl.id}
                        todolistID={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={filteredTasks}
                        deleteTask={deleteTask}
                        changeTodolistFilter={changeTodolistFilter}
                        createTask={createTask}
                        changeTaskStatus={changeTaskStatus}
                        deleteTodolist={deleteTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}

                    />
                </Paper>
            </Grid>
        )
    })
    const theme = createTheme({
        palette: {
            primary: indigo,
            secondary: amber,
            // mode: dark
        }
    })

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Button color="inherit">Sign in</Button>
                            <Button color="inherit">Sign up</Button>
                            <Button color="inherit">FAQ</Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'lg'}>
                    <Grid container sx={{p: "0 20px"}}>
                        <AddItemForm createItem={createTodoList} maxTitleLength={10}/>
                    </Grid>
                    <Grid container spacing={6}>
                        {todolistsComponents}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default App
