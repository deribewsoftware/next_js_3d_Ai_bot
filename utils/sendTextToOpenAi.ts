export const sendtextToOpenAi=async(usertext:string):Promise<string>=>{
  const response=await fetch("/api/openai",{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({usertext})
  });
  return await response.json();
}