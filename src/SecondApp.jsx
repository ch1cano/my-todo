import React, { useState } from 'react'

function SecondApp() {

    const [playerCounter1, setplayerCounter1] = useState(() => 10);
    const [playerCounter2, setplayerCounter2] = useState(() => 10);

    return (
        <div>
            <div>
                <div>Иван Иванович</div>
                <div>{playerCounter1}</div>
                <button onClick={() => { setplayerCounter1((actual) => actual + 1) }}>+</button>
            </div>
            <hr />
            <div>
                <div>Петр Петрович</div>
                <div>{playerCounter2}</div>
                <button onClick={() => { setplayerCounter2((actual) => actual + 1) }}>+</button>
            </div>
            <hr />
            <button onClick={() => {
                setplayerCounter1((actual) => actual - 1)
                setplayerCounter2((actual) => actual - 1)
            }}>-</button>
            <button onClick={() => {
                setplayerCounter1(10)
                setplayerCounter2(10)
            }}>reset
            </button>
        </div>
    );
}

export default SecondApp;