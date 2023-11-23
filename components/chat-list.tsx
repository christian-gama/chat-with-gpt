import { Message } from '@/types/message'
import 'katex/dist/katex.min.css'
import { useEffect, useRef } from 'react'
import Markdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import CodeBlock from './code-block'
import Loading from './loading'

type ChatListProps = {
  messages: Message[]
  isPending: boolean
}

export default function ChatList({ messages, isPending }: ChatListProps) {
  const ulRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    ulRef.current?.scrollTo(0, ulRef.current.scrollHeight)
  }, [messages])

  return (
    <ul className="flex-grow overflow-auto p-4 space-y-2" ref={ulRef}>
      {messages?.map((message) => (
        <li
          key={message.key}
          className={`font-medium p-3 rounded-lg ${
            message.role === 'user' ? 'bg-green-100' : 'bg-blue-100'
          }`}
        >
          <div className="text-gray-800 font-bold opacity-80 mb-1 text-lg">
            {message.role === 'user' ? 'Você' : 'I.A'}:
          </div>

          <Markdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeRaw]}
            className="mt-1 text-gray-700 opacity-85 leading-6"
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <CodeBlock value={String(children).replace(/\n$/, '')} language={match[1]} />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
              li({ node, ...props }) {
                return <li className="list-disc ml-4" {...props} />
              },
              a({ node, ...props }) {
                return (
                  <a
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                )
              },
            }}
          >
            {message.content}
          </Markdown>
        </li>
      ))}

      {isPending && (
        <li className="flex justify-center" key="loading">
          <Loading />
        </li>
      )}
    </ul>
  )
}
