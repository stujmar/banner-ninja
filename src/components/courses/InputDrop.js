import React, { useEffect, useState } from 'react';
import { getAuthors } from '../../api/authorApi';

const InputDrop = ({ valueProp, onChange, name, label, error }) => {
    const [value, setValue] = useState("");
    const [authorList, setAuthorList] = useState([])

    useEffect(() => {
        getAuthors().then((authors) => setAuthorList(authors));
    },[])

    useEffect(() => {
       setValue(valueProp)
    }, [valueProp])

    return (
        <div className="text-left">
            <label htmlFor="author">{label}</label>
            <div className="border w-min rounded border border-gray-300 bg-gray-50 shadow-sm">
                <select
                    id="author"
                    name={name}
                    onChange={(e) => onChange(e)}
                    value={value}
                    className="bg-gray-100"
                >
                    <option value="" />
                    {authorList.map((author) => {
                        return <option key={author.id} value={author.id}>{`${author.name}`}</option>
                    })}
                </select>
            </div>
            {error && (<div className="font-bold text-red-600">{error}</div>)}
        </div>
    )
}

export default InputDrop;