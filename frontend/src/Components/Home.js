import React, { Component } from "react";
import "../Home.css";

class Landing extends Component {
    render() {
        return (
            <div className='back-page'>
                <div className="container1">
                    <h1 className='welcome'>Welcome Home</h1>
                    <div className="container">
                        <img
                            src="https://archive.org/download/under-construction/under-construction.jpg"
                            alt="logo"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;
