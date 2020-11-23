import React, { useState, useEffect } from 'react'

const Switcher = () => {

    const [ resource, setResource ] = useState('posts');
    const [ data, setData ] = useState([]);

    useEffect(() => {
        console.log("We're inside the useEffect");
    });


    return (
        <div>
            <button onClick={() => setResource('posts')}>Posts</button>
            <button onClick={() => setResource('users')}>Users</button>
            <button onClick={() => setResource('comments')}>Comments</button>
        </div>
    )
}

export default Switcher 