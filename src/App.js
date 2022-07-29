import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import randomColor from "randomcolor";
import Draggable from "react-draggable";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import "./App.css";


const App = () => {
  const [item, setItem] = useState("");
  const itemFromStorage = JSON.parse(localStorage.getItem("items"));
  const [items, setItems] = useState(itemFromStorage || []);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const newItem = () => {
    if (item.trim() !== "") {
      const newItem = {
        id: v4(),
        item,
        color: randomColor({
        luminosity: "light",
        }),
        defaultPos: {
          x: 500,
          y: -500,
        },
      };
      setItems((item) => [...item, newItem]);
      setItem("");
    } else {
      alert("Enter something...");
      setItem("");
    }
  };

  const deleteNode = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updatePosision = (data, index) => {
    let newArray = [...items];
    newArray[index].defaultPos = { x: data.x, y: data.y };
    setItems(newArray);
  };

  const keyPress = (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      newItem();
    }
  };

  const editNode = () => {
    return(
      console.log()
    )
  }

  return (
    <div className="app">
      <div className="wrapper">
        <input 
        value={item} 
        type="text" 
        placeholder="Enter something..." 
        onChange={(e) => setItem(e.target.value)} 
        onKeyPress={(e) => keyPress(e)} 
        />
        <button 
        className="enter"
        onClick={newItem}>
          ENTER
        </button>
      </div>
      {items.map((item, index) => {
        return (
          <Draggable
            key={index}
            defaultPosition={item.defaultPos}
            onStop={(_, data) => {
              updatePosision(data, index);
            }}
          >
            <div className="todo__item" 
              style={{ backgroundColor: item.color }}>
                { !isEdit && `${item.item}`}
                { isEdit && 'test'}
                <div className="item__control">
                  <button className="dalate" 
                    onClick={() => deleteNode(item.id)}>
                    <CloseIcon/>
                  </button >
                  <button className="edit" 
                  onClick={() => setIsEdit(true)}>
                    <EditIcon/>
                  </button>
                </div>
            </div>
          </Draggable>
        );
      })}
    </div>
  );
};

export default App;
