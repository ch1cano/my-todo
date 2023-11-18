import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import randomColor from "randomcolor";
import Draggable from "react-draggable";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import GetDataNow from "./components/GetDataNow/GetDataNow";
import "./App.css";

const noteDefaultPosition = {
  x: 30,
  y: 80,
};

const App = () => {
  const [note, setNote] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editableNote, setEditableNote] = useState({});

  const storageData = JSON.parse(localStorage.getItem("noteList"));

  const [noteList, setNoteList] = useState(storageData || []);

  // const [updateData, setUpdateData] = useState(false)

  useEffect(() => {
    localStorage.setItem("noteList", JSON.stringify(noteList));
  }, [noteList]);

  const handleCraeteNote = () => {
    if (note.trim() !== "") {
      const newNoteValues = {
        id: v4(),
        color: randomColor({ luminosity: "light" }),
        defaultPos: { ...noteDefaultPosition },
        note,
      };
      setNoteList((note) => [...note, newNoteValues]);
      setNote("");
    } else {
      alert("Enter something...");
      setNote("");
    }
  };

  const handleDeleteNode = (id) => {
    setNoteList(noteList.filter((item) => item.id !== id));
  };

  const handleUpdateNotePosition = (data, index) => {
    let newNoteArr = [...noteList];

    newNoteArr[index].defaultPos = { x: data.x, y: data.y };
    setNoteList(newNoteArr);
  };

  const keyPress = (event) => {
    const code = event.keyCode || event.which;

    if (code === 13) handleCraeteNote(); // проаисываем подтверждение на кнопку Enter
  };

  const handleEditableNote = (id) => {
    setIsEdit(true);
    const foundNote = noteList.find((item) => item?.id === id);

    foundNote && setEditableNote(foundNote);
  };

  const editSubmit = () => {
    setIsEdit((prev) => !prev);
    const test = { note: "test1234" };

    Object.keys(test).forEach((key) => {
      console.log("storageData[key]", storageData[key]);
      storageData[key] = test[key];
    });
  };

  console.log("storageData", storageData);

  return (
    <div>
      <div className="wrapper">
        <div className="title">
          <h1>My To Do</h1>
        </div>
        <div className="main_box">
          <GetDataNow />
          <input
            className="input_todo"
            value={note}
            type="text"
            placeholder="Create todo..."
            onChange={(e) => setNote(e.target.value)}
            onKeyPress={(e) => keyPress(e)}
          />
          <button className="enter" onClick={handleCraeteNote}>
            ENTER
          </button>

          {noteList.map(({ id, note, defaultPos, color }, index) => {
            return (
              <Draggable
                key={index}
                defaultPosition={defaultPos}
                onStop={(_, data) => {
                  handleUpdateNotePosition(data, index);
                }}>
                <div className="todo__item" style={{ backgroundColor: color }}>
                  {isEdit && editableNote.id === id ? (
                    <>
                      <input
                        type="text"
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Edit field"
                      />
                      <button onClick={() => editSubmit()}>ok</button>
                    </>
                  ) : (
                    `${note}`
                  )}

                  <div className="item__control">
                    <button
                      className="dalate"
                      onClick={() => handleDeleteNode(id)}>
                      <CloseIcon />
                    </button>
                    <button
                      className="edit"
                      onClick={() => handleEditableNote(id)}>
                      <EditIcon />
                    </button>
                  </div>
                </div>
              </Draggable>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
