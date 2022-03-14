import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = ({ showAlert }) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  let history = useHistory();

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    showAlert("Note Updated Successfully", "success");
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="container my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={handleChange}
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={handleChange}
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag's
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={handleChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && `No notes to display`}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              note={note}
              updateNote={updateNote}
              showAlert={showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
