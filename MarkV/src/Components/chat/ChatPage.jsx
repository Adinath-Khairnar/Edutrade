import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import MotionWrapper from "../MotionWrapper/MotionWrapper";

const ChatPage = () => {
    const { id: book_id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const buyer_id = user?.id;

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [showEmoji, setShowEmoji] = useState(false);
    const [file, setFile] = useState(null);
    const [canReview, setCanReview] = useState(false);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [hasReviewed, setHasReviewed] = useState(false);
    const chatEndRef = useRef(null);

    const [sellerId, setSellerId] = useState(null);
    const [bookTitle, setBookTitle] = useState("");

    useEffect(() => {
        if (book_id) {
            fetch(`http://localhost/MarkV/controllers/getBookTitle.php?book_id=${book_id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setBookTitle(data.title);
                    } else {
                        setBookTitle("Unknown Book");
                    }
                })
                .catch(err => {
                    console.error("Failed to fetch book title:", err);
                    setBookTitle("Error fetching title");
                });
        }
    }, [book_id]);
    



    useEffect(() => {
        fetchMessages();
        fetchSellerId(book_id); // ✅ fetch seller from book table
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch(`http://localhost/MarkV/controllers/getMessages.php?book_id=${book_id}&buyer_id=${buyer_id}`);
            const data = await res.json();
            if (data.success) {
                setMessages(data.messages);
                setCanReview(data.messages.length > 0);
            }
        } catch (err) {
            console.error("Fetch messages error", err);
        }
    };

    const fetchSellerId = async (bookId) => {
        try {
            const res = await fetch("http://localhost/MarkV/controllers/getSellerId.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ book_id: bookId }),
            });
            const data = await res.json();
            if (data.success) {
                setSellerId(data.seller_id);
            } else {
                console.error("Failed to get seller ID:", data.error);
            }
        } catch (err) {
            console.error("Fetch seller ID error", err);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileUrl = URL.createObjectURL(selectedFile);
            setFile(fileUrl);
        }
    };

    const sendMessage = async () => {
        if (!message.trim() && !file) return;
        const sender_id = buyer_id;

        const response = await fetch("http://localhost/MarkV/controllers/saveMessage.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ book_id, buyer_id, sender_id, message, file_url: file }),
        });

        const data = await response.json();
        if (data.success) {
            setMessages([...messages, { sender_id, message, file_url: file }]);
            setMessage("");
            setFile(null);
            setCanReview(true);
        }
    };

    const submitReview = async () => {
        if (!rating || !review.trim()) return alert("Please fill all fields");

        const reviewPayload = {
            reviewer_id: buyer_id,
            reviewee_id: sellerId,
            product_id: book_id,
            rating,
            review,
            role: "buyer"
        };

        try {
            const response = await fetch("http://localhost/MarkV/controllers/submitReview.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewPayload),
            });

            const text = await response.text();
            const data = JSON.parse(text);

            if (data.success) {
                alert("Review submitted!");
                setHasReviewed(true);
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Review submission failed", error);
            alert("Something went wrong while submitting review.");
        }
    };

    return (
        <MotionWrapper>
            <div className="p-7 pr-28 pl-28 flex flex-col h-4.5rem p-4 bg-gray-100">
            <h2 className="text-xl font-bold text-center bg-orange-500 text-white py-2 rounded-md shadow">
                    Chat for Book: {bookTitle}
                </h2>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white shadow rounded mt-2">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender_id === buyer_id ? "justify-end" : "justify-start"}`}>
                            <div className={`p-3 max-w-xs rounded-lg shadow-md ${msg.sender_id === buyer_id ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                                {msg.message && <p>{msg.message}</p>}
                                {msg.file_url && (
                                    msg.file_url.match(/\.(jpeg|jpg|png|gif)$/)
                                        ? <img src={msg.file_url} alt="shared" className="mt-2 rounded-md max-w-full h-40 object-cover" />
                                        : <a href={msg.file_url} target="_blank" rel="noopener noreferrer" className="underline text-sm mt-2 block">📎 View File</a>
                                )}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef}></div>
                </div>

                <div className="flex flex-col sm:flex-row items-center mt-3 p-2 bg-white shadow rounded space-y-2 sm:space-y-0 sm:space-x-2">
                    <button onClick={() => setShowEmoji(!showEmoji)} className="text-xl">😊</button>
                    <input 
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type message..."
                        className="flex-1 p-2 border border-gray-300 rounded focus:outline-none"
                    />
                    <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
                    <label htmlFor="file-upload" className="cursor-pointer px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">📎</label>
                    <button onClick={sendMessage} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Send</button>
                </div>

                {showEmoji && (
                    <div className="mt-2">
                        <EmojiPicker onEmojiClick={(e) => setMessage(prev => prev + e.emoji)} />
                    </div>
                )}

                {canReview && !hasReviewed && (
                    <div className="mt-6 bg-white p-4 shadow rounded">
                        <h3 className="text-lg font-bold mb-2">Leave a Review for Seller</h3>
                        <label className="block mb-2">Rating (1-5):</label>
                        <input
                            type="number"
                            min={1}
                            max={5}
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="border p-2 rounded w-full mb-2"
                        />
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Write your review here..."
                            className="w-full p-2 border rounded mb-2"
                            rows={3}
                        />
                        <button onClick={submitReview} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            Submit Review
                        </button>
                    </div>  
                )}
            </div>
        </MotionWrapper> 
    );
};

export default ChatPage;
