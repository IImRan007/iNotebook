import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "622701231917333f208bc68a1473",
      user: "6225e5dd06e4f12dd7078918",
      title: "My Title",
      description: "Hello, this is my description.",
      tag: "Personal",
      date: "2022-03-08T07:17:45.912Z",
      __v: 0,
    },
    {
      _id: "6227112e67d3311f6b199b5e1a12",
      user: "6225e5dd06e4f12dd7078918",
      title: "New Note",
      description: "This is my new note",
      tag: "New",
      date: "2022-03-08T09:14:15.723Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  // Add a Note
  const addNote = (title, description, tag) => {
    console.log("Adding a new note");
    let note = {
      _id: "6211271e67d11f6b199b5e1a121212",
      user: "6225e5dd06e4f12dd7078918",
      title: title,
      description: description,
      tag: tag,
      date: "2022-03-08T09:14:15.723Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = () => {};

  // Edit a Note
  const editNote = () => {};

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
