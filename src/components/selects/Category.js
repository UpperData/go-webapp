import React, {useEffect, useState} from 'react'
import {Select, MenuItem, InputLabel, FormControl, FormHelperText} from "@mui/material"
import axios from "../../auth/fetch"

const CategorySelect = (props) => {
    const {value, onChange, reset, cancelReset, disabled, helperText, error,
        id // classId
    } = props;

    const [list, setlist]           = useState([]);
    const [actualId, setactualId]   = useState("");
    const [canReset, setcanReset]   = useState(false);

    const [loading, setloading]     = useState(true);
    const [search, setsearch]       = useState(true);

    const getData = () => {
        if(id !== null && id !== ""){
            // let url = "/CargO/GEt/"+id;
            axios.get(`/Front/SubCATEGORY/GET/${id}`).then((res) => {
                // console.log("Get departments");
                if(res.data.result){
                    setlist(res.data.data);
                    setcanReset(true);
                    setloading(false);
                }
            }).catch((err) => {
                console.error(err);
            });
        }
    }
    
    // console.log(reset, canReset, search);

    useEffect(async () => {

        if(loading && id !== null && id !== ""){
            setsearch(false);
            setcanReset(false);
            setactualId(id);

            if(search){
                getData();
            }
        }

        if(!loading && id !== actualId && id !== ""){
            if(list.length > 0){
                onChange("");
            }
            setloading(true);
            setsearch(true);
        }

        if(reset && canReset){
            cancelReset();
            setloading(true);
            setsearch(true);
        }

    }, [loading, search, reset, id]);
    

    return (
        <FormControl fullWidth size="small" error={error}>
            <InputLabel id="department-select">
                Categoría
            </InputLabel>
            <Select
                size="small"
                fullWidth
                value={value.toString()}
                onChange={(e) => onChange(e.target.value)}
                label="Categoría"
                displayEmpty
                disabled={disabled || id === "" || id === null || list.length === 0}
            >
                {list.length > 0 && list.map((item, key) => {
                    let itemData = item;
                    return  <MenuItem key={key} value={itemData.id.toString()}>
                                {itemData.name}
                            </MenuItem>
                })}
            </Select>
            {helperText &&
                <FormHelperText>
                    {helperText}
                </FormHelperText>
            }
        </FormControl>
    );
};

export default CategorySelect