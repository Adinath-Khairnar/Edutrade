/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";

const StationeryViewPage = () => {
  const { id } = useParams(); // product_id from URL
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false); // ← NEW
  const chatBoxRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch stationery item
  useEffect(() => {
    fetch(`http://localhost/MarkV/controllers/getStationeryById.php?id=${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res.item);
        } else {
          setError(res.message || "No data found");
        }
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [id]);

  // Check if favorited
  useEffect(() => {
    if (user) {
      fetch("http://localhost/MarkV/controllers/checkStationeryFavorite.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          product_id: id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setIsFavorited(res.favorited);  // Make sure it's set correctly
        });
    }
  }, [id, user]);

  const toggleFavorite = () => {
    if (!user) {
      alert("You must be logged in to add to favorites");
      return;
    }

    fetch("http://localhost/MarkV/controllers/toggleStationeryFavorite.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        product_id: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setIsFavorited((prev) => !prev);  // Toggle the favorite state
        } else {
          console.error(res.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const fetchChatMessages = async (sellerId, buyerId, productId) => {
    try {
      const res = await fetch(
        `http://localhost/MarkV/controllers/getStationeryMessages.php?product_id=${productId}&seller_id=${sellerId}&buyer_id=${buyerId}`
      );
      const result = await res.json();
      if (result.success) {
        setChatMessages(result.messages);
        setTimeout(() => {
          if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
          }
        }, 100);
      }
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const messageData = {
      product_id: parseInt(id),
      seller_id: data.user_id,
      buyer_id: user.id,
      sender_id: user.id,
      message: message.trim(),
      file_url: null,
    };

    fetch("http://localhost/MarkV/controllers/sendStationeryMessage.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setMessage("");
          fetchChatMessages(data.user_id, user.id, id); // Refresh chat
        } else {
          console.error("Failed to send message:", res.message);
        }
      })
      .catch((err) => {
        console.error("Error sending message:", err);
      });
  };

  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
    fetchChatMessages(data.user_id, user.id, id);
  };

  const isImageFile = (fileUrl) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(fileUrl);
  };

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!data) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 relative">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/2 w-full bg-gray-100 flex items-center justify-center p-4">
          <img
            src={data.image_url}
            alt={data.name}
            className="object-contain max-h-[500px] w-full rounded"
          />
        </div>

        {/* Details */}
        <div className="md:w-1/2 w-full p-6 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{data.name}</h2>
          <p><strong>Brand:</strong> {data.brand}</p>
          <p><strong>Course:</strong> {data.course}</p>
          <p><strong>Location:</strong> {data.location}</p>
          <p><strong>Price:</strong> ₹{data.price}</p>
          <p><strong>Color:</strong> {data.color}</p>
          <p><strong>Size:</strong> {data.size}</p>
          <p><strong>Condition:</strong> {data.item_condition}</p>
          <p><strong>Description:</strong> {data.description}</p>

          <div className="flex gap-4 mt-4 flex-wrap items-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
            >
              Go Back
            </button>
            <button
              onClick={handleOpenChat}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Contact Seller
            </button>
            <button
              onClick={toggleFavorite}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg border ${
                isFavorited ? "bg-red-100 border-red-400 text-red-600" : "bg-gray-100"
              }`}
            >
              {isFavorited ? "❤️ Favorited" : "🤍 Add to Favorites"}
            </button>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-2xl h-[80vh] rounded-lg shadow-lg p-4 relative flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Chat with Seller</h2>

            <div
              className="flex-1 bg-gray-100 rounded p-3 mb-3 overflow-y-auto"
              ref={chatBoxRef}
            >
              {chatMessages.length === 0 ? (
                <p className="text-gray-500 text-sm">No messages yet.</p>
              ) : (
                chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-2 p-2 rounded max-w-xs ${
                      msg.sender_id === user.id
                        ? "bg-green-100 self-end ml-auto"
                        : "bg-blue-100"
                    }`}
                  >
                    {msg.file_url ? (
                      isImageFile(msg.file_url) ? (
                        <img
                          src={msg.file_url}
                          alt="Sent"
                          className="max-w-full rounded"
                        />
                      ) : (
                        <a
                          href={msg.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-700 underline"
                        >
                          📄 Document
                        </a>
                      )
                    ) : (
                      <p>{msg.message}</p>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>

              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border rounded px-3 py-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>

            {showEmojiPicker && (
              <div className="absolute bottom-20 left-4 z-50">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}

            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
              onClick={() => setIsChatOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationeryViewPage;
