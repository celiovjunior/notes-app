import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { ChangeEvent, FormEvent, useState } from 'react'

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void,
}

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true)
  const [content, setContent] = useState('')

  function handleStartEditor() {
    setShouldShowOnBoarding(false)
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)
    
    if (event.target.value === '') {
      setShouldShowOnBoarding(true)
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()

    onNoteCreated(content)

    setContent('')
    setShouldShowOnBoarding(true)

    toast.success("Your note has been saved")
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className='rounded-md flex flex-col bg-slate-700 p-5 text-left gap-3 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
        <span className='text-sm font-medium text-slate-200'>Add note</span>
        <p className='text-sm leading-6 text-slate-400'>Record an audio note that will be converted in a text automatically.</p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/60' />
        <Dialog.Content className='fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none'>
          
          <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
            <X className='w-5 h-5' />
          </Dialog.Close>

          <form onSubmit={handleSaveNote} className='flex-1 flex flex-col'>
            <div className='flex flex-1 flex-col gap3 p-5'>
              <span className='text-sm font-medium text-slate-200'>
                Add a new note
              </span>
              { shouldShowOnBoarding ? (
                    <p className='text-sm leading-6 text-slate-300'>
                    Start <button className='font-medium text-lime-400 hover:underline'>recording an audio</button> or <button onClick={handleStartEditor} className='font-medium text-lime-400 hover:underline'>write some note</button>.
                    </p>
              ) : (
                <textarea
                  autoFocus 
                  className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none' 
                  onChange={handleContentChanged}
                  value={content}
                />
              ) }
            </div>

            <button 
            type='submit'
            className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'
            >
              Save note
            </button>
          </form>

        </Dialog.Content>
      </Dialog.Portal>

    </Dialog.Root>
  )
}