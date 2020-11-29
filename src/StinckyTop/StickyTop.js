import React from 'react'
import "./StickyTop.css"

const StickyTop = (props) => {
    return (
       <div className="sticky">
        <h2>{props.header}</h2>
      </div>

    )
}

export default StickyTop
