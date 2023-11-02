
import { NextResponse } from "next/server"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});
export  async function POST(request:Request){
  const {userText}=await request.json()

  const chatCompletion = await openai.chat.completions.create({
    messages: [
     
      { role: 'user', content: userText }  // User message
    ],
    model: 'gpt-3.5-turbo',
  });
  
  const aimessage=chatCompletion.choices[0].message
  // console.log(aimessage.content?.toString)
  console.log(userText)

  return NextResponse.json({message:aimessage.content},{status:200})
}