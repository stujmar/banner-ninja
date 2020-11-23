import React, { useState } from 'react'

const Switcher = () => {

    const [ resource, setResource ] = useState('posts');

    return (
        <div>
            <button onClick={() => setResource('posts')}>Posts</button>
            <button onClick={() => setResource('users')}>Users</button>
            <button onClick={() => setResource('comments')}>Comments</button>
        </div>
    )
}

export default Switcher 