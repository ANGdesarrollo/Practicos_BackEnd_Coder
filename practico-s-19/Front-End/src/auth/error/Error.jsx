import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";



export const Error = ({text, path}) => {
    const navigate = useNavigate();

    useEffect(() => {
            setTimeout(() => {
                navigate(path)
            }, 2000)
    }, [])

    return (
        <div>
            <h1>{text}</h1>
        </div>
    );
};
