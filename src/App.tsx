import { useState } from 'react'
import './App.css'
import { Task, TodolistItem } from './TodolistItem'
import {v1} from "uuid";
import {AddItemForm} from "./addItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Box, Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider} from "@mui/material";
import {amber, indigo, } from "@mui/material/colors";


export type FilterValues = "all" | "active" | "completed"

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}
export type TasksState = {
    [todolistID: string] : Task[]
}

// CRUD => R, D => C, U
function App() {
  
  //BLL
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todolists,setTodolists]=useState<Todolist[]>([
        { id: todolistId_1, title: 'What to learn', filter: 'all' },
        { id: todolistId_2, title: 'What to buy', filter: 'all' },
    ])
    const [tasks, setTasks] = useState<TasksState>({
        [todolistId_1]: [
            { id: v1(), title: "HTML", isDone: true },
            { id: v1(), title: "CSS", isDone: false },
            { id: v1(), title: "JS/TS", isDone: false },
        ],
        [todolistId_2]: [
                { id: v1(), title: "Bread", isDone: true },
                { id: v1(), title: "Meet", isDone: false },
                { id: v1(), title: "Milk", isDone: false },
            ]
    })







  const deleteTask = (taskId: Task["id"], todolistID:Todolist["id"]) => {
    // create next state
    // immutable change data
    const nextState = {...tasks, [todolistID]:tasks[todolistID].filter(t => t.id !== taskId)}
    // set next state
    setTasks(nextState);
  }
  const createTask = (title: Task["title"],todolistID:Todolist["id"]) => {
    const newTask: Task = {
      id: v1(),
      title: title,
      isDone: false
    }
    const nextState = {...tasks,
        [todolistID]: [...tasks[todolistID], newTask]}
    setTasks(nextState)

  }
  const changeTaskStatus = (TaskId: Task["id"], newTaskStatus: Task["isDone"],todolistID:Todolist["id"]) => {

 const nextState = {...tasks, [todolistID]:tasks[todolistID].map(t => t.id === TaskId ? {...t, isDone: newTaskStatus} : t)}
    setTasks(nextState)
  }


  // UI

  const changeTodolistFilter = (filter: FilterValues, todolistID:Todolist["id"]) => {
        const nextState: Todolist[] = todolists.map(tl => tl.id === todolistID ? {...tl, filter} : tl)
    setTodolists(nextState)
  }
const deleteTodolist = (todolistID:Todolist["id"]) => {
        const nextState: Todolist[] = todolists.filter(tl => tl.id !== todolistID)
     setTodolists(nextState)
        const copyTaskState = {...tasks}

      delete copyTaskState[todolistID]
    console.log(copyTaskState)
    setTasks(copyTaskState)
}
 const changeTaskTitle  = (todolistID:Todolist["id"], TaskId:string, newTitle: Task['title']) => {
     const nextState = {...tasks, [todolistID]:tasks[todolistID].map(t => t.id === TaskId ? {...t, title: newTitle} : t)}
     setTasks(nextState)
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
        const newTodolistId = v1()
        const newTodolist: Todolist = {
            id: newTodolistId,
            title: title,
            filter: 'all',
        }
        const nextState: Todolist[] = [...todolists, newTodolist]
       setTodolists(nextState)
      const nextTasksState = {...tasks, [newTodolistId]: []}
      setTasks(nextTasksState)
  }
  const changeTodoListTitle =(todolistID:Todolist['id'], newTitle: string) => {
      const nextState: Todolist[] = todolists.map(tl => tl.id === todolistID ? {...tl, title:newTitle} : tl)
      setTodolists(nextState)
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
                    <MenuIcon />
                </IconButton>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Button color="inherit">Sign in</Button>
                <Button color="inherit">Sign up</Button>
                <Button color="inherit">FAQ</Button>
            </Box>
            </Toolbar>
        </AppBar>
        <Container maxWidth={'lg'}>
            <Grid container sx={{p: "0 20px" }}>
        <AddItemForm createItem={createTodoList} maxTitleLength={10}/>
            </Grid>
            <Grid container spacing={6}>
            {todolistsComponents}
            </Grid >
        </Container>
        </ThemeProvider>
        </div>
  )
}

export default App
