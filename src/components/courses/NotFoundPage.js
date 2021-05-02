import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <>
            Page Not Found
            <Link to="/">Back to Home</Link>
        </>
    )
}

export default NotFoundPage;