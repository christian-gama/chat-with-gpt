import Chat from '@/components/chat'
import Provider from '@/components/provider'

export default async function Page() {
  return (
    <main>
      <Provider>
        <Chat />
      </Provider>
    </main>
  )
}
