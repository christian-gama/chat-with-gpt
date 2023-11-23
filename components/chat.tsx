'use client'

import { sendMessage } from '@/libs/send-message'
import { Message } from '@/types/message'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import ChatForm from './chat-form'
import ChatList from './chat-list'

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])

  const { mutate, isPending } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      setMessages((messages) => [...messages, ...data])
    },
  })

  return (
    <div className="flex flex-col h-screen container mx-auto p-4">
      <ChatList messages={messages} isPending={isPending} />
      <ChatForm mutate={mutate} messages={messages} setMessages={setMessages} />
    </div>
  )
}
