import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";

const App = () => {
  const [message, setmessage] = useState([]);
  const [socket, setsocket] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const timestamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  useEffect(() => {
    const socketInstance = io("http://localhost:3000"); //React app backend server se connect ho jaayegi
    setsocket(socketInstance);
    //Event listener
    socketInstance.on("ai-response", (response) =>
      setmessage((prev) => [
        ...prev,
        { sender: "ai", text: response, time: timestamp },
      ])
    );
  }, []);
  const submitHandler = (data) => {
    const usermessage = data.message.trim();
    if (!usermessage) return;
    // Event trigger
    if (socket) socket.emit("ai-message", usermessage);

    setmessage((prev) => [
      ...prev,
      { sender: "user", text: usermessage, time: timestamp },
    ]);
    reset();
  };
  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-pink-300 text-black text-xl font-semibold p-4 text-center shadow-md">
          🤖 AI Chatbot
        </div>
        {/* chat body */}

        <div className="flex-1 p-4 overflow-y-auto space-y-3 w-screen">
          {message.length == 0 ? (
            <div className="flex items-center justify-center h-full">
              <h1 className="text-center text-5xl text-gray-500 font-medium  font-black mt-10">
                Start Conversation Here!
              </h1>
            </div>
          ) : (
            message.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  key={i}
                  className={`max-w-xs p-3 rounded-2xl shadow ${
                    msg.sender === "user"
                      ? "bg-pink-300 text-black"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {msg.text}
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {msg.time}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* input form */}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="border-t-[4px] border-pink-300 flex justify-between items-center p-4 bg-white"
        >
          <input
            type="text"
            placeholder="Type your message..."
            {...register("message")}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-pink-300"
          />
          <button
            {...register("button")}
            className="ml-4 bg-pink-300 px-6 py-2 rounded-xl font-medium hover:bg-pink-400 transition"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default App;
