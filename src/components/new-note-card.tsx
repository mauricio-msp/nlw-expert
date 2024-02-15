import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

import { MarkdownWrapper } from '@/components/markdown/markdown-wrapper'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface NewNoteCardProps {
  onCreateNote: ({
    content,
    isRecording,
  }: {
    content: string
    isRecording: boolean
  }) => void
}

export function NewNoteCard({ onCreateNote }: NewNoteCardProps) {
  const [content, setContent] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true)
  const [isAudioNote, setIsAudioNote] = useState(false)

  function handleStartEditor() {
    setIsAudioNote(false)
    setShouldShowOnBoarding(false)
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)

    if (!event.target.value) setShouldShowOnBoarding(true)
  }

  function handleSaveNote() {
    if (!content) {
      toast.error('Você precisa preencher a anotação antes de salvar.')
      return
    }

    onCreateNote({ content, isRecording: isAudioNote })

    setContent('')
    setShouldShowOnBoarding(true)

    toast.success('Nota criada com sucesso!')
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      toast.warning('Infelizmente seu navegador não suporta a API de gravação!')
      return
    }

    setIsRecording(true)
    setIsAudioNote(true)
    setShouldShowOnBoarding(false)

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition

    const speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.interimResults = true
    speechRecognition.maxAlternatives = 1

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error(event.message)
    }

    speechRecognition.start()
  }

  function handleStopRecording() {
    setIsRecording(false)
  }

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          'relative flex h-full cursor-pointer flex-col overflow-hidden rounded-md bg-muted p-5 text-left outline-none',
          'hover:ring-2 hover:ring-muted-foreground focus-visible:ring-2 focus-visible:ring-emerald-500',
        )}
      >
        <span className="text-sm font-medium">Adicionar nota</span>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </DialogTrigger>
      <DialogContent className="flex h-[70vh] max-w-[640px] flex-col gap-0 overflow-hidden border border-accent p-0">
        <form className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-3 bg-muted p-5">
            <span className="flex-shrink-0 text-sm font-medium">
              Adicionar nota
            </span>

            {shouldShowOnBoarding ? (
              <p className="text-sm leading-6 text-muted-foreground">
                Comece
                <Button
                  type="button"
                  variant="link"
                  className="h-fit px-1 py-0 text-emerald-500"
                  onClick={handleStartRecording}
                >
                  gravando uma nota
                </Button>
                em áudio ou se preferir
                <Button
                  type="button"
                  variant="link"
                  className="h-fit px-1 py-0 text-emerald-500"
                  onClick={handleStartEditor}
                >
                  utilize apenas texto.
                </Button>
              </p>
            ) : (
              <Tabs
                defaultValue="note"
                className="flex w-full flex-1 flex-col items-start"
              >
                <TabsList className="flex-shrink-0 p-0">
                  <TabsTrigger value="note">Nota</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="note"
                  className="max-h-[503px] w-full data-[state=active]:flex data-[state=active]:flex-1"
                >
                  <Textarea
                    autoFocus
                    value={content}
                    placeholder="Este campo aceita marcação markdown"
                    className={cn(
                      'flex-1 resize-none border-transparent text-sm leading-6 text-muted-foreground outline-none',
                      'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent focus:outline-none',
                    )}
                    onChange={handleContentChange}
                  />
                </TabsContent>
                <TabsContent
                  value="preview"
                  className="max-h-[485px] w-full rounded-md bg-background p-3 data-[state=active]:flex data-[state=active]:flex-1"
                >
                  <ScrollArea className="h-full w-full">
                    <MarkdownWrapper content={content} />
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            )}
          </div>

          {isRecording ? (
            <Button
              type="button"
              variant="outline"
              className="group flex-shrink-0 gap-1 rounded-none border-none bg-card text-muted-foreground hover:bg-transparent hover:text-primary"
              onClick={handleStopRecording}
            >
              <span className="size-3 animate-pulse rounded-full bg-destructive" />
              Gravando! (clique p/ interromper)
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              className="group flex-shrink-0 rounded-none border-none bg-emerald-600 hover:bg-emerald-700"
              onClick={handleSaveNote}
            >
              Salvar nota
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
