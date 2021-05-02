import React, { useEffect, useState } from 'react';
import { getAuthors } from '../../api/authorApi';
const InputDrop = (props) => {
    const [value, setValue] = useState("");
    const [authorList, setAuthorList] = useState([])

    useEffect(() => {
        getAuthors().then((authors) => setAuthorList(authors));
    },[])

    console.log(authorList);
    
    useEffect(() => {
       setValue(props.value)
    }, [props.value])
    
    // const handleChange = (e) => {
    //     props.onChange(e);
    //     setValue(props.value);
    // }

    return (
        <div className="text-left">
            <label htmlFor="author">{props.label}</label>
            <div className="border w-min rounded border border-gray-300 bg-gray-50 shadow-sm">
                <select
                    id="author"
                    name={props.name}
                    onChange={(e) => props.onChange(e)}
                    value={value}
                    className="bg-gray-100"
                >
                    <option value="" />
                    <option value="1">Cory House</option>
                    <option value="2">Scott Allen</option>
                    <option value="3">Stuart Marsh</option>
                </select>
            </div>
            {props.error && (<div className="font-bold text-red-600">{props.error}</div>)}
        </div>
    )
}

export default InputDrop;