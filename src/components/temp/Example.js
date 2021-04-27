import React, { useState, useEffect } from 'react';

function Example() {
    const [email, setEmail] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    }, [count]);

    return (
        <>
        <div>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
            <input
                type="text"
                value={email}
                onChange={event => setEmail(event.target.value)}
                />
        </>
    )
}

export default Example;