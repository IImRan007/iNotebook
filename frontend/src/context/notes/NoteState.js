import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyNWU1ZGQwNmU0ZjEyZGQ3MDc4OTE4In0sImlhdCI6MTY0NjkwMDgxNn0.19aQ89GPhBMUArKC1tb-Pi-XOAH6rLMrF8UE24WBYuM",
      },
    });

    const json = await response.json();
    console.log("All Notes==>", json);
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyNWU1ZGQwNmU0ZjEyZGQ3MDc4OTE4In0sImlhdCI6MTY0NjkwMDgxNn0.19aQ89GPhBMUArKC1tb-Pi-XOAH6rLMrF8UE24WBYuM",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log("Add Notes==>", json);

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
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyNWU1ZGQwNmU0ZjEyZGQ3MDc4OTE4In0sImlhdCI6MTY0NjkwMDgxNn0.19aQ89GPhBMUArKC1tb-Pi-XOAH6rLMrF8UE24WBYuM",
      },
    });

    const json = await response.json();
    console.log(json);

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });

    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyNWU1ZGQwNmU0ZjEyZGQ3MDc4OTE4In0sImlhdCI6MTY0NjkwMDgxNn0.19aQ89GPhBMUArKC1tb-Pi-XOAH6rLMrF8UE24WBYuM",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log("Edit Note==>", json);

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
