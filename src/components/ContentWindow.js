import React from 'react'
import mic from '../assets/mic_sfx.gif'
import '../components/ContentWindow.css'

export default function ContentWindow(props) {
    return (
        <div>
            <div className="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            {/* <div style={{ color: "red" }}>
                <h1>Your query:</h1>
                <p>{props.transcript}</p>
                <h1>Your response:</h1>
                <p>{props.response}</p>
            </div> */}
        </div>
    )
}
