import React from 'react';
import {Link} from 'react-router-dom';

const YouLose = () => {
    return (
        <div className="text-center">
        <div className="my-4">You Lost.</div>
        <Link className="border mt-4 px-2 py-1 shadow-sm rounded "to="/stargame">Try Again</Link>
        </div>
    )
}

export default YouLose;