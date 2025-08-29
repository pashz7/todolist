import {useState} from "react";
import {TextField} from "@mui/material";



type PropsType = {
    title: string
    changeItemTitle: (newTitle: string) => void
}

export const EditableSpan = ({title, changeItemTitle}: PropsType) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const [itemTitle, setItemTitle] = useState(title)

    const onEditMode = () => {
      setIsEditMode(true)
    }
const offEditMode = () => {
      setIsEditMode(false)
    changeItemTitle(itemTitle)
}


    return (
        isEditMode
            ? <TextField
                 variant="standard"
                 autoFocus
                 type="text"
                 value={itemTitle}
                 onChange={(e) => setItemTitle(e.currentTarget.value)}
                 onBlur={offEditMode} />


            : <span onDoubleClick={onEditMode}> {title}</span>

    );
};

