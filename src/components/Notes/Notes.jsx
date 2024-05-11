import { useState, useEffect, useRef } from "react";

import NoteTextarea from "../NoteTextarea/NoteTextarea.jsx";
import Note from "../Note/Note.jsx";
import classes from "./Notes.module.css";
import Initials from "../Initials/Initials.jsx";
import { generateId } from "../../utils/uid.js";

let isInitial = true;

export default function Notes({ activeGroup, isMobile, onBack }) {
  const [activeGroupState, setActiveGroupState] = useState();
  const [notes, setNotes] = useState([]);

  const notesRef = useRef();

  useEffect(() => {
    const groups = JSON.parse(localStorage.getItem("groups") || "[]");
    const _activeGroup = groups.find((group) => group.id === activeGroup);
    setActiveGroupState(_activeGroup);
  }, []);

  useEffect(() => {
    const allNotes = JSON.parse(localStorage.getItem("allNotes") || "{}");
    const activeNotes = allNotes[activeGroup];
    if (activeNotes) setNotes(activeNotes);
  }, []);

  useEffect(() => {
    if (notesRef.current) {
      notesRef.current.scrollTop = notesRef.current.scrollHeight;
    }
  });

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    const allNotes = JSON.parse(localStorage.getItem("allNotes") || "{}");
    allNotes[activeGroup] = notes;
    localStorage.setItem("allNotes", JSON.stringify(allNotes));
  }, [notes]);

  const handleAddNote = (newNote) => {
    const id = generateId();
    const postedDate = new Date().toString();

    setNotes((prevNotes) => [
      ...prevNotes,
      { content: newNote, id, postedDate },
    ]);
  };

  if (!activeGroupState) {
    return <>Loading...</>;
  }

  return (
    <main className={classes.main}>
      <header className={classes.header}>
        {isMobile && (
          <button onClick={onBack}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={classes.backBtn}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        )}
        <Initials
          name={activeGroupState.name}
          backgroundColor={activeGroupState.color}
        />
        <p className={classes.title}>{activeGroupState.name}</p>
      </header>

      <div ref={notesRef} className={classes.notesContainer}>
        <ul className={classes.notes}>
          {notes?.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </ul>
      </div>

      <NoteTextarea onAddNote={handleAddNote} />
    </main>
  );
}
