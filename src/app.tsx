import { useState } from "react";
import Logo from "./assets/Logo.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

export function App() {

  interface Note {
    id: string,
    date: Date,
    content: string
  }

  const [notes, setNotes] = useState<Note[]>([])

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content: content
    }

    setNotes([newNote, ...notes])
  } 

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={Logo} alt="NLW Expert" />

      <form className="w-full ">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className={`
                    w-full 
                    bg-transparent 
                    text-3xl 
                    font-semibold 
                    tracking-tight 
                    placeholder:text-slate-500 
                    outline-none
                  `}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />
          {notes.map((note: any) => {
            return <NoteCard key={note.id} note={note} />
          })}
      </div>
    </div>
  );
}
