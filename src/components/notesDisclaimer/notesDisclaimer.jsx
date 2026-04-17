import { useState } from "react";
import "./notesDisclaimer.css";

const notes = [
  "This note section uses sample content for demo and assignment explanation.",
  "You can treat these points as guidance text for first-time users.",
  "Actual legal or tax statements can be plugged in later as needed.",
  "Core functionality is driven by holdings selection and gains calculation.",
];

function NotesDisclaimer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="notes-wrapper">
      <button
        type="button"
        className="notes-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="notes-title">Important Notes & Disclaimers</span>
        <span className={`notes-arrow ${isOpen ? "open" : ""}`}>⌃</span>
      </button>

      {isOpen && (
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default NotesDisclaimer;
