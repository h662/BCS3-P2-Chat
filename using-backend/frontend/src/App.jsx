import { useState } from "react";
import axios from "axios";

function App() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitChat = async (e) => {
    try {
      e.preventDefault();

      if (!content) return;

      setIsLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/chat`,
        {
          content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          },
        }
      );

      setResult(response.data.result);

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen max-w-screen-md mx-auto flex flex-col justify-start items-center pt-16"
      onSubmit={onSubmitChat}
    >
      <form className="flex w-full">
        <input
          className="grow border-2 border-pink-200 rounded-lg focus:outline-pink-400 px-2 py-1 text-lg"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="무엇이든 물어보세요. Chat-GPT"
          disabled={isLoading}
        />
        <input
          className={`ml-4 px-2 py-1 rounded-lg text-gray-50 w-28 ${
            isLoading ? "bg-pink-200" : "bg-pink-400"
          }`}
          type="submit"
          value={isLoading ? "검색중..." : "검 색"}
          disabled={isLoading}
        />
      </form>
      {result && <div className="mt-16 text-lg">{result}</div>}
    </div>
  );
}

export default App;
