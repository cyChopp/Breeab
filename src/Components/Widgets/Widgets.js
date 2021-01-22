import React from 'react';
import SearchIcon from "@material-ui/icons/Search"

const Widgets=()=>{
    return (
        <div className="widgets">
            <div className="widgets--input">
                <SearchIcon className="widgets--searchIcon"/>
                <input placeholder="Search" type="text"/>
            </div>
        </div>
    )
}

export default Widgets
