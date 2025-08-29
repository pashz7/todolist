
import {useState} from "react";
import {TextField} from "@mui/material";
import Button from '@mui/material/Button'


type PropsType = {
    maxTitleLength: number
    createItem: (title: string) => void;
}



export const AddItemForm = ({maxTitleLength, createItem}: PropsType) => {
    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState(false)


    const createTaskHanler = () => {
        const trimedTitle = taskTitle.trim()
        if (trimedTitle) {
            createItem(trimedTitle)
        }
        else {
            setError(true)
        }


        setTaskTitle("")

    }




    return (
        <div>
            <TextField
            size="small"
            variant="outlined"
            value={taskTitle}
            onChange={(e) => {setTaskTitle(e.currentTarget.value)}}
            onKeyDown={(e)=> {
                if (e.key === "Enter") {
                    createTaskHanler()
                }
            }}
            error={error}
            helperText={error && "title is required"}


            />


            <Button  onClick={createTaskHanler}>Add</Button>

            {/*{!error && !taskTitle && <div>Please enter a title</div>}*/}
            {/*{taskTitle.length > 15 && <div>TOO MUCH </div>}*/}
            {/*{!!taskTitle.length && taskTitle.length <= 15 && <div>Rest amount {15-taskTitle.length}</div>}*/}
            {/*{error && <div style={{color: "red"}}> Enter valid title </div>}*/}
        </div>
    )
}