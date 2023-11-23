import { Message } from '@/types/message'

export async function sendMessage(messages: Message[]) {
  const response = await fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messages),
  })

  if (!response.ok) {
    throw new Error('Houve um erro ao enviar a mensagem.')
  }

  return response.json() as Promise<Message[]>
}
