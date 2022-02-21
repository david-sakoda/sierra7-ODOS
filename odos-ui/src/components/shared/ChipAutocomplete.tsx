import { TextField, Autocomplete, Chip } from "@mui/material";
import { useState } from "react";


type Props = {
    label: string;
    options : string[];
    values: string[];
}



export const ChipAutocomplete = ({label, options = [], values=[]}: Props) => {
    //return <TextField variant="outlined" label={label} />;
    const [autocompleteValues, setAutocompleteValues] = useState(values.filter(i => i !==""));
    const handleChange = (event:any, value:any) => {
        setAutocompleteValues(value);
    }
    return <Autocomplete
            multiple={true}
            value={autocompleteValues}
            id={label}
            options={options}
            freeSolo
            renderTags={(value: string[], getTagProps) => value.map((option:string, index: number)=><Chip variant="outlined" label={option} {...getTagProps({index})} />)}
            renderInput={(params)=> <TextField {...params} variant="outlined" label={label} />}
            onChange={handleChange}
  />
};
