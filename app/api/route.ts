import { Message } from '@/types/message'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const body = await request.json()

  const response = await openai.chat.completions.create({
    messages: body.map((m: any) => ({ role: m.role, content: m.content })),
    model: 'gpt-4-1106-preview',
  })

  return NextResponse.json(
    response.choices.map(
      ({ message }): Message => ({
        role: message.role,
        content: message.content,
        key: Date.now().toString(),
      }),
    ),
  )
}
