import Image from 'next/image'
import TextToSpeech from './components/TextToSpeech'
import ChatbotCanvas from './components/chatBotcanvas'
import AppProvider from '@/context/ispalying'

export default function Home() {
  return (
    <main className="h-screen ">
      <AppProvider>
      <TextToSpeech/>
      <ChatbotCanvas/>
      
   
      </AppProvider>
      
    </main>
  )
}
