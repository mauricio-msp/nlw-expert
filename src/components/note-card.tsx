import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Play, StopCircle } from 'lucide-react'
import { useState } from 'react'

import { MarkdownWrapper } from '@/components/markdown/markdown-wrapper'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { getHasMarkdown } from '@/helpers/get-has-markdown-text'
import { cn } from '@/lib/utils'

import { ScrollArea } from './ui/scroll-area'

interface NoteCardProps {
  note: {
    id: string
    date: Date
    content: string
    isRecording: boolean
  }
  onDeleteNote: (id: string) => void
}

export function NoteCard({ note, onDeleteNote }: NoteCardProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const hasMarkdownText = getHasMarkdown(note.content)

  function handleSpeak({ text }: { text: string }) {
    setIsSpeaking(true)
    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(text)

    utterance.onend = () => setIsSpeaking(false)

    synth.speak(utterance)
  }

  function handleCancel() {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          'flex flex-col gap-3 overflow-hidden rounded-md border border-accent bg-card p-5 text-left outline-none transition-colors',
          'hover:bg-card-foreground/5 hover:ring-2 hover:ring-muted-foreground focus-visible:ring-2 focus-visible:ring-emerald-500',
        )}
      >
        <span className="flex-shrink-0 text-sm font-medium">
          {formatDistanceToNow(new Date(note.date), {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>

        {!hasMarkdownText && note.isRecording && (
          <div className="mb-1 flex size-fit items-center gap-2 rounded-md bg-accent p-2 text-foreground opacity-85 hover:bg-accent">
            <Play className="size-4 text-emerald-500" />
            tocar audio
          </div>
        )}

        {hasMarkdownText ? (
          <MarkdownWrapper content={note.content} />
        ) : (
          <p className="text-sm leading-6 text-muted-foreground">
            {note.content}
          </p>
        )}
      </DialogTrigger>
      <DialogContent className="flex h-[70vh] max-w-[640px] flex-col gap-0 overflow-hidden border border-accent p-0">
        <div className="flex flex-1 flex-col gap-3 bg-card p-5">
          <span className="flex-shrink-0 text-sm font-medium">
            {formatDistanceToNow(new Date(note.date), {
              locale: ptBR,
              addSuffix: true,
            })}
          </span>

          <ScrollArea className="max-h-[535px] min-h-0 flex-grow">
            {!hasMarkdownText && note.isRecording && (
              <>
                {isSpeaking ? (
                  <div
                    onClick={handleCancel}
                    className="my-2 flex size-fit items-center gap-2 rounded-md bg-foreground/15 p-2 text-foreground hover:bg-foreground/30"
                  >
                    <StopCircle className="size-4 text-rose-500" />
                    cancelar audio
                  </div>
                ) : (
                  <div
                    onClick={() => handleSpeak({ text: note.content })}
                    className="my-2 flex size-fit items-center gap-2 rounded-md bg-foreground/15 p-2 text-foreground hover:bg-foreground/30"
                  >
                    <Play className="size-4 text-emerald-500" />
                    tocar audio
                  </div>
                )}
              </>
            )}

            {hasMarkdownText ? (
              <MarkdownWrapper content={note.content} />
            ) : (
              <p className="text-sm leading-6 text-muted-foreground">
                {note.content}
              </p>
            )}
          </ScrollArea>
        </div>

        <Button
          variant="outline"
          className="group rounded-none border-none bg-accent hover:bg-accent"
          onClick={() => onDeleteNote(note.id)}
        >
          Deseja
          <span className="ml-1 font-semibold text-rose-500 group-hover:underline">
            apagar essa nota?
          </span>
        </Button>
      </DialogContent>
    </Dialog>
  )
}
