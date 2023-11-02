"use client"

import { appContex } from "@/context/ispalying";

import { FormEvent, useContext, useState } from "react";

const TextToSpeech = () => {
  const {setPlaying}=useContext(appContex)
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
  const voices = synth?.getVoices();

  const seletedVoice = voices?.find((voice) => voice.name === "Albert"); // Other voice that sounds good Karen, Tessa, Trinoids

 const speak=(textToSpeak:string)=>{
  const utterance=new SpeechSynthesisUtterance(textToSpeak)
  utterance.voice= seletedVoice!
  utterance.rate=0.2
  synth?.speak(utterance)
  setPlaying(true);
    utterance.onend = () => {
      setPlaying(false);
    };
 }
  const [userText, setUserText]=useState("")
  const [isLoading, setLoading]=useState(false)
 
  const handleUserText=async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setLoading(true)
    setUserText(userText)

    try{
      const response=await fetch("/api/openai",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({userText})
      });

      const {message}=await response.json()

      speak(message)
      console.log(message)
    }
    catch(error){
      console.log(error)

    }finally{
      setUserText("")
      setLoading(false)
    }
          
  }
  return ( <div className="relative top-0 z-50 ">
  <form
    onSubmit={handleUserText}
    className="m-4 absolute top-[400px] md:top-[800px] md:left-[30%]  space-x-2 pt-2 "
  >
    <input
    disabled={isLoading}
      type="text"
      value={userText}
      className="bg-transparent  md:w-[510px] border border-[#b00c3f]/80 outline-none  rounded-lg placeholder:text-[#b00c3f] p-2 text-[#b00c3f]"
      onChange={(e) => setUserText(e.target.value)}
      placeholder="What do you want to know human...."
    />
    <button
      disabled={isLoading}
      className="text-[#b00c3f] p-2 border border-[#b00c3f] rounded-lg disabled:text-blue-100 
      disabled:cursor-not-allowed disabled:bg-gray-500 hover:scale-110 hover:bg-[#b00c3f] hover:text-black duration-300 transition-all"
    >
      {isLoading ? "thinking..." : "Ask"}
    </button>
  </form>

  

</div>);
}
 
export default TextToSpeech;