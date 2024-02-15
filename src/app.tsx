import { ChangeEvent, useState } from 'react'

import logo from '@/assets/logo-nlw-expert-2.svg'
import { NewNoteCard } from '@/components/new-note-card'
import { NoteCard } from '@/components/note-card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

interface Note {
  id: string
  date: Date
  content: string
  isRecording: boolean
}

export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('@notes')

    if (notesOnStorage) return JSON.parse(notesOnStorage)

    return []
  })

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value

    setSearch(query)
  }

  function onCreateNote({
    content,
    isRecording,
  }: {
    content: string
    isRecording: boolean
  }) {
    const newNote: Note = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
      isRecording,
    }

    const newNotes = [newNote, ...notes]

    setNotes(newNotes)
    localStorage.setItem('@notes', JSON.stringify(newNotes))
  }

  function onDeleteNote(id: string) {
    const newNotes = notes.filter((note) => note.id !== id)

    setNotes(newNotes)
    localStorage.setItem('@notes', JSON.stringify(newNotes))
  }

  const filteredNotes = search
    ? notes.filter((note) =>
        note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      )
    : notes

  return (
    <main className="mx-auto my-12 w-full max-w-6xl space-y-6 px-4">
      <img src={logo} alt="NLW Expert" />

      <form className="w-full">
        <Input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full border-0 px-0 text-3xl font-semibold tracking-tight outline-none"
          onChange={handleSearch}
        />
      </form>

      <Separator className="h-px w-full bg-muted" />

      <div className="grid auto-rows-[250px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NewNoteCard onCreateNote={onCreateNote} />

        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} onDeleteNote={onDeleteNote} />
        ))}
      </div>
    </main>
  )
}
