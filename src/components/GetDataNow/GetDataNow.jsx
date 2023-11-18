import React, { useState, useEffect } from 'react';
import style from "./GetDataNow.module.css"

const GetDataNow = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={style.box_data}>
            <h3 className={style.current_time}>Current Date and Time:</h3>
            <p className={style.date}>{currentTime.toLocaleString()}</p>
        </div>
    );
}

export default GetDataNow;
