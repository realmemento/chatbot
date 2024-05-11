import { useState } from "react";
import "./App.css";
import axios from "axios";


function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  
  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Wait...Loading Your Answer");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.CHAT_BOT_API}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAnswer("Opps....Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <>
    <div className="h-screen bg-zinc-950">
      <div className="bg-zinc-950 max-h-max p-3">
      <h1 className="text-center text-white text-4xl ">CHATBOT-MEMENTO</h1> <br/>

<form class="flex items-center max-w-sm mx-auto" onSubmit={generateAnswer}>  

    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
            </svg>
        </div>
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ask Anything...." required />
    </div>
    <button type="submit" disabled={generatingAnswer} class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search</span>
    </button>
</form>

          
       <pre className="p-3 text-zinc-50 font-medium md:w-3/4 m-auto text-center max-h-fit w-3 rounded bg-slate-700 my-4">{answer}</pre>

        
      </div>
      </div>
    </>
  );
}

export default App;
