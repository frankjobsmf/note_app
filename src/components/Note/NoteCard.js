import React from 'react';
import {
    Link
} from "react-router-dom";

export const NoteCard = ({ id, title, content, date }) => {
    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-text">{content}</p>
                    <div className="info">
                    <Link to={`./note/${id}`}>
                        ver mas...
                    </Link>
                    <p className="dateNote">{date}</p>
                    </div>
                </div>
            </div>
        </div>    
    )
}
