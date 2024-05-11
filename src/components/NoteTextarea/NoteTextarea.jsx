import { useState } from "react";

import classes from "./NoteTextarea.module.css";

export default function NoteTextarea({ onAddNote }) {
  const [note, setNote] = useState();

  return (
    <div className={classes.container}>
      <textarea
        className={classes.textarea}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter your text here..."
      />
      <button
        onClick={() => {
          onAddNote(note);
          setNote("");
        }}
        disabled={!note}
        className={classes.sendBtn}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className={`${note ? classes.send : classes.disabled} ${
            classes.sendIcon
          }`}
        >
          <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
        </svg>
      </button>
    </div>
  );
}
