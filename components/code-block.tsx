import SyntaxHighlighter from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs'

type CodeBlockProps = {
  value: string
  language: string
}

export default function CodeBlock({ value, language }: CodeBlockProps) {
  return (
    <SyntaxHighlighter
      style={darcula}
      language={language}
      customStyle={{ marginBlock: '1rem', borderRadius: '0.25rem', padding: '1rem' }}
    >
      {value}
    </SyntaxHighlighter>
  )
}
