import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="flex justify-around">
            <NavLink exact className="flex-grow bg-blue-400 py-2 px-4 text-blue-50 hover:bg-gray-50 hover:text-gray-500" to="/" activeClassName="border-b-4">Home</NavLink>
            <NavLink exact className="flex-grow bg-blue-400 py-2 px-4 text-blue-50 hover:bg-gray-50 hover:text-gray-500" to="/courses" activeClassName="border-b-4">Course List</NavLink>
            <NavLink exact className="flex-grow bg-blue-400 py-2 px-4 text-blue-50 hover:bg-gray-50 hover:text-gray-500" to="/stargame" activeClassName="border-b-4">Star Game</NavLink>
            <NavLink exact className="flex-grow bg-blue-400 py-2 px-4 text-blue-50 hover:bg-gray-50 hover:text-gray-500" to="/seed-planter" activeClassName="border-b-4">Seed Planter</NavLink>
    
        </div>
    )
}

export default Nav;