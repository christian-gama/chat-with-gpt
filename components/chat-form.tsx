import { Message } from '@/types/message'
import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react'

type ChatFormProps = {
  setMessages: Dispatch<SetStateAction<Message[]>>
  messages: Message[]
  mutate: (data: Message[]) => void
}

export default function ChatForm({ setMessages, messages, mutate }: ChatFormProps) {
  const [input, setInput] = useState('')

  function submitHandler() {
    if (!input) return

    const newMessage: Message = { role: 'user', content: input, key: Date.now().toString() }
    mutate([...messages, newMessage])
    setMessages((messages) => [...messages, newMessage])
    setInput('')
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submitHandler()
  }

  return (
    <form onSubmit={onSubmit} className="p-4 border-t-2">
      <textarea
        className="w-full p-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        rows={8}
        placeholder="Escreva sua mensagem aqui..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault()
            submitHandler()
          }
        }}
        name="message"
      />

      <div className="flex justify-end space-x-2 mt-2">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Enviar
        </button>

        <button
          type="reset"
          onClick={() => setInput('')}
          className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Limpar
        </button>
      </div>
    </form>
  )
}
