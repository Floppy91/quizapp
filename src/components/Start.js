import React from "react";

export default function Start(props){


    return(
        <div className="start-container">
            <h1 className="start-title">Quizapp</h1>
            <p className="start-description">Press the button to start the game!</p>
            <button className="start-btn" 
            onClick={props.handleClick}>Start GAME!</button>

        </div>
    )

}