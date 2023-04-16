import { useState } from "react";
import axios from "axios";

function App() {
  const [content, setContent] = useState("");

  const onSubmitChat = async (e) => {
    try {
      e.preventDefault();

      if (!content) return;

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-start items-center pt-16"
      onSubmit={onSubmitChat}
    >
      <form className="flex max-w-screen-md w-full ">
        <input
          className="grow border-2 border-pink-200 rounded-lg focus:outline-pink-400 px-2 py-1 text-lg"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="무엇이든 물어보세요. Chat-GPT"
        />
        <input
          className="ml-4 px-2 py-1 bg-pink-400 rounded-lg text-gray-50 w-28"
          type="submit"
          value="검 색"
        />
      </form>
    </div>
  );
}

export default App;
