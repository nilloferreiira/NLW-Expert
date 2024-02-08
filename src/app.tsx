import { toast } from "sonner";
import Logo from "./assets/Logo.svg";
import { ChangeEvent, useState } from "react";
import { NoteCard } from "./components/note-card";
import { NewNoteCard } from "./components/new-note-card";

export function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");
    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  });

  interface Note {
    id: string;
    date: Date;
    content: string;
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  const filteredNotes =
    search !== ""
      ? notes.filter((note: Note) =>
          note.content.toLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content: content,
    };

    const notesArray = [newNote, ...notes];

    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  function deleteNote(id: string) {
    const updatedNotes = notes.filter((note: Note) => note.id !== id);

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    toast.warning("Nota deletada com sucesso!");
  }

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={Logo} alt="NLW Expert" />

      <form className="w-full ">
        <input
          type="text"
          onChange={handleSearch}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredNotes.map((note: any) => {
          return <NoteCard key={note.id} note={note} deleteNote={deleteNote} />;
        })}
      </div>
    </div>
  );
}
