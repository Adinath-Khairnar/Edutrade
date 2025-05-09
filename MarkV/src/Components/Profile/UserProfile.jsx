import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { useParams } from 'react-router-dom';
import { FaEdit, FaLock, FaSignOutAlt, FaTrash, FaTimes, FaStar, FaBook, FaPenFancy, FaFileAlt, FaHeart, FaComments, FaChartBar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import MotionWrapper from "../MotionWrapper/MotionWrapper";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('listings');
  const [activeListingType, setActiveListingType] = useState('Books');
  const [activeChatType, setActiveChatType] = useState('Books');
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({ full_name: '', phone: '', location: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [replyTexts, setReplyTexts] = useState({});
  const [messages, setMessages] = useState([]);
  const [buyers, setBuyers] = useState({});
  const [sellerReviews, setSellerReviews] = useState([]);

  const { id: paramId } = useParams();
  const id = paramId || JSON.parse(localStorage.getItem('user'))?.id;

  const [userBooks, setUserBooks] = useState([]);
  const [userStationery, setUserStationery] = useState([]);
  const [userNotes, setUserNotes] = useState([]);
  const [userPapers, setUserPapers] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch("http://localhost/MarkV/controllers/deleteAccount.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Account deleted successfully.");
        localStorage.removeItem("user");
        window.location.href = "/signup";
      } else {
        alert(data.error || "Failed to delete account.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting your account.");
    }
  };

  useEffect(() => {
    // Fetch user details
    fetch(`http://localhost/MarkV/controllers/getUserDetails.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setFormData({
          full_name: data.full_name,
          phone: data.phone,
          location: data.location,
        });
      });

    // Fetch user listings
    fetch(`http://localhost/MarkV/controllers/getUserListings.php?user_id=${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log("API Response:", data);
        setUserBooks(data.books || []);
        setUserStationery(data.stationery || []);  
        setUserNotes(data.notes || []);
        setUserPapers(data.questionPapers || []);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });

    fetch(`http://localhost/MarkV/controllers/getSellerReviews.php?seller_id=${id}`)
      .then(res => res.json())
      .then(data => {
        setSellerReviews(data);
      });

    // Fetch user favorites
    fetch(`http://localhost/MarkV/controllers/getUserFavorites.php?user_id=${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setUserFavorites(data.favorites || []);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

    // Fetch messages if on messages tab
    if (activeTab === 'messages') {
      fetchMessages(activeChatType);
    }
  }, [id, activeTab, activeChatType]);

  const fetchMessages = (chatType) => {
    const url = chatType === 'Books'
      ? `http://localhost/MarkV/controllers/getSellerMessages.php?seller_id=${id}&type=books`
      : `http://localhost/MarkV/controllers/getSellerMessages.php?seller_id=${id}&type=stationery`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setMessages(data || []);
        fetchBuyerNames(data);
      });
  };

  const deleteQuestionPaper = async (paperId) => {
    if (!window.confirm("Are you sure you want to delete this question paper?")) return;
  
    try {
      const response = await fetch(`http://localhost/MarkV/controllers/deleteQuestionPaper.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question_paper_id: paperId, user_id: id })
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(data.message || "Question paper deleted successfully!");
        setUserPapers(prev => prev.filter(paper => paper.question_paper_id !== paperId));
      } else {
        alert(data.message || "Failed to delete question paper");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Network error. Please try again.");
    }
  };

  const deleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
  
    try {
      const response = await fetch(`http://localhost/MarkV/controllers/deleteNote.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note_id: noteId, user_id: id })
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(data.message || "Note deleted successfully!");
        setUserNotes(prev => prev.filter(note => note.note_id !== noteId));
      } else {
        alert(data.message || "Failed to delete note");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Network error. Please try again.");
    }
  };
  
  const deleteStationery = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this stationery item?")) return;
  
    try {
      const response = await fetch(`http://localhost/MarkV/controllers/deleteStationery.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, user_id: id })
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(data.message || "Stationery item deleted successfully!");
        setUserStationery(prev => prev.filter(item => item.product_id !== productId));
      } else {
        alert(data.message || "Failed to delete stationery item");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Network error. Please try again.");
    }
  };

  const deleteBook = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const response = await fetch(`http://localhost/MarkV/controllers/deleteBook.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ book_id: bookId, user_id: id })
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(data.message || "Book deleted successfully!");
        setUserBooks(prev => prev.filter(book => book.id !== bookId));
      } else {
        alert(data.message || "Failed to delete book");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Network error. Please try again.");
    }
  };

  const fetchBuyerNames = (messages) => {
    const buyerIds = [...new Set(messages.map(msg => msg.buyer_id))];

    const promises = buyerIds.map(buyerId =>
      fetch(`http://localhost/MarkV/controllers/getUserDetails.php?id=${buyerId}`)
        .then(res => res.json())
    );

    Promise.all(promises)
      .then(data => {
        const buyerDetails = data.reduce((acc, buyer) => {
          acc[buyer.id] = buyer.full_name;
          return acc;
        }, {});
        setBuyers(buyerDetails);
      });
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handleReplyChange = (buyerId, text) => {
    setReplyTexts(prev => ({ ...prev, [buyerId]: text }));
  };

  const sendReply = async (buyerId, itemId) => {
    const message = replyTexts[buyerId];
    if (!message.trim()) return;

    try {
      const res = await fetch('http://localhost/MarkV/controllers/sendSellerReply.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seller_id: id,
          buyer_id: buyerId,
          book_id: itemId,
          message,
          sender_id: id,
          chat_type: activeChatType.toLowerCase()
        })
      });

      const data = await res.json();
      if (data.status === 'success') {
        fetchMessages(activeChatType);
        setReplyTexts(prev => ({ ...prev, [buyerId]: '' }));
      } else {
        console.error('Server Error:', data);
      }
    } catch (err) {
      console.error('Fetch Error:', err);
    }
  };

  const handleUpdate = () => {
    fetch('http://localhost/MarkV/controllers/updateUser.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...formData }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("✅ Profile updated!");
          setUser({ ...user, ...formData });
          setShowModal(false);
        } else {
          alert("❌ Failed to update profile.");
        }
      });
  };

  const handlePasswordSubmit = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    if (newPassword !== confirmPassword) return alert("❌ New passwords do not match.");

    fetch('http://localhost/MarkV/controllers/changePassword.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, currentPassword, newPassword }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("✅ Password changed!");
          setShowPasswordModal(false);
          setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } else {
          alert("❌ " + data.message);
        }
      });
  };

  const groupMessagesByBuyer = () => {
    const grouped = {};
    messages.forEach(msg => {
      if (!grouped[msg.buyer_id]) {
        grouped[msg.buyer_id] = [];
      }
      grouped[msg.buyer_id].push(msg);
    });
    return grouped;
  };

  const renderMessages = () => {
    const groupedMessages = groupMessagesByBuyer();
    const buyerIds = Object.keys(groupedMessages);

    if (buyerIds.length === 0) {
      return (
        <motion.div 
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-500 italic">No messages yet.</p>
        </motion.div>
      );
    }

    return buyerIds.map((buyerId, index) => {
      const chat = groupedMessages[buyerId];
      const itemId = chat[0]?.book_id || chat[0]?.product_id;
      const buyerName = buyers[buyerId] || 'Unknown Buyer';

      return (
        <motion.div 
          key={index} 
          className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center mb-4 gap-3">
            <Avatar name={buyerName} size="40" round className="ring-2 ring-orange-500 shadow-sm" />
            <div>
              <h4 className="text-lg font-bold text-gray-800">Chat with {buyerName}</h4>
              <p className="text-xs text-gray-500">About: {activeChatType} listing</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 max-h-64 overflow-y-auto px-1 py-2 scrollbar-thin scrollbar-thumb-orange-300">
            {chat.map((message, idx) => (
              <motion.div
                key={idx}
                className={`max-w-[75%] px-4 py-2 rounded-xl shadow-sm text-sm whitespace-pre-wrap ${
                  message.sender_id === id
                    ? 'self-end bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                    : 'self-start bg-gray-100 text-gray-800'
                }`}
                initial={{ opacity: 0, x: message.sender_id === id ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <p>{message.message}</p>
                <p className={`text-xs mt-1 ${message.sender_id === id ? 'text-orange-100' : 'text-gray-500'}`}>
                  {new Date(message.timestamp).toLocaleString()}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <input
              type="text"
              placeholder="Type your reply..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={replyTexts[buyerId] || ''}
              onChange={(e) => handleReplyChange(buyerId, e.target.value)}
            />
            <motion.button
              onClick={() => sendReply(buyerId, itemId)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-full shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send
            </motion.button>
          </div>
        </motion.div>
      );
    });
  };

  const renderTabContent = () => {
    const tabVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    if (activeTab === 'listings') {
      let sectionData = [];
      let renderItem;

      switch (activeListingType) {
        case 'Books':
          sectionData = userBooks;
          renderItem = (item) => (
            <motion.div 
              className="flex items-center justify-between gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <FaBook className="text-orange-600 text-xl" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.author}</p>
                  {item.price && <p className="text-sm text-orange-600 font-medium">₹{item.price}</p>}
                </div>
              </div>
              <button 
                onClick={() => deleteBook(item.id)}
                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                title="Delete this book"
              >
                <FaTrash />
              </button>
            </motion.div>
          );
          break;
        case 'Stationery':
          sectionData = userStationery;
          renderItem = (item) => (
            <motion.div 
              className="flex items-center justify-between gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaPenFancy className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.course}</p>
                  {item.price && <p className="text-sm text-blue-600 font-medium">₹{item.price}</p>}
                </div>
              </div>
              <button 
                onClick={() => deleteStationery(item.product_id)}
                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                title="Delete this item"
              >
                <FaTrash />
              </button>
            </motion.div>
          );
          break;
        case 'Notes':
          sectionData = userNotes;
          renderItem = (item) => (
            <motion.div 
              className="flex items-center justify-between gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <FaFileAlt className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.subject}</p>
                  <p className="text-xs text-gray-400">{new Date(item.uploaded_at).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => deleteNote(item.note_id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                  title="Delete this note"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          );
          break;
        case 'Question Papers':
          sectionData = userPapers;
          renderItem = (item) => (
            <motion.div 
              className="flex items-center justify-between gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <FaChartBar className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{item.subject}</p>
                  <p className="text-sm text-gray-500">{item.university} ({item.year})</p>
                  <p className="text-xs text-gray-400">{new Date(item.uploaded_at).toLocaleString()}</p>
                </div>
              </div>
              <button 
                onClick={() => deleteQuestionPaper(item.question_paper_id)}
                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                title="Delete this question paper"
              >
                <FaTrash />
              </button>
            </motion.div>
          );
          break;
        default:
          break;
      }

      return (
        <motion.div variants={tabVariants} initial="hidden" animate="visible">
          <div className="flex flex-wrap gap-3 mb-6">
            {['Books', 'Stationery', 'Notes', 'Question Papers'].map((type) => (
              <motion.button
                key={type}
                onClick={() => setActiveListingType(type)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  activeListingType === type
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {type === 'Books' && <FaBook />}
                {type === 'Stationery' && <FaPenFancy />}
                {type === 'Notes' && <FaFileAlt />}
                {type === 'Question Papers' && <FaChartBar />}
                {type}
              </motion.button>
            ))}
          </div>

          <Section title={activeListingType} items={sectionData} renderItem={renderItem} />
        </motion.div>
      );
    }

    if (activeTab === 'favorites') {
      return (
        <motion.div variants={tabVariants} initial="hidden" animate="visible">
          <Section
            title="Favorites"
            items={userFavorites}
            renderItem={(item) => (
              <motion.div 
                className="p-4 border rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white"
                whileHover={{ y: -3 }}
              >
                <div className="flex gap-4">
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <FaHeart className="text-pink-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg text-gray-800">{item.product_name}</p>
                    {item.price && <p className="text-sm text-green-600 font-medium">₹{item.price}</p>}
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <button className="mt-3 text-sm bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-full transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          />
        </motion.div>
      );
    }

    if (activeTab === 'messages') {
      return (
        <motion.div variants={tabVariants} initial="hidden" animate="visible">
          <div className="flex gap-4 mb-6">
            {['Books', 'Stationery'].map((type) => (
              <motion.button
                key={type}
                onClick={() => setActiveChatType(type)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  activeChatType === type
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaComments />
                {type} Chats
              </motion.button>
            ))}
          </div>
          {renderMessages()}
        </motion.div>
      );
    }

    if (activeTab === 'reviews') {
      return (
        <motion.div variants={tabVariants} initial="hidden" animate="visible">
          <div className="bg-gradient-to-r from-orange-50 to-orange-50 p-6 rounded-2xl mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full shadow-md">
                <FaStar className="text-yellow-500 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {sellerReviews.length > 0 
                    ? (sellerReviews.reduce((acc, review) => acc + review.rating, 0) / sellerReviews.length) 
                    : '0.0'}
                </h3>
                <p className="text-gray-600">Average Rating ({sellerReviews.length} reviews)</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {sellerReviews.map((review, index) => (
              <motion.div 
                key={review.id || index}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar name={review.reviewer_name} size="40" round color="#4f46e5" />
                    <div>
                      <h4 className="font-bold text-gray-800">{review.reviewer_name}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={`text-sm ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-3 text-gray-600">{review.review}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div 
        className="flex flex-col items-center justify-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <FaBook className="text-gray-400 text-4xl" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700">No {activeTab} available</h3>
        <p className="text-gray-500 mt-2">You don't have any {activeTab} yet</p>
      </motion.div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <MotionWrapper>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Welcome {user.full_name}</h2>

        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-4 gap-6"
          >
            {/* Left Panel */}
            <div className="md:col-span-1">
              <motion.div 
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-24 relative">
                  <motion.div 
                    className="absolute -bottom-12 left-1/3 transform -translate-x-1/2"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Avatar 
                      name={user.full_name} 
                      size="100" 
                      round 
                      className="ring-4 ring-white shadow-xl"
                    />
                  </motion.div>
                </div>
                
                <div className="pt-16 pb-6 px-6 text-center">
                  <motion.h2 
                    className="text-2xl font-bold text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {user.full_name}
                  </motion.h2>
                  <p className="text-gray-500 mt-1">{user.email}</p>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-gray-600 justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{user.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 space-y-3">
                    <motion.button 
                      onClick={() => setShowModal(true)}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 rounded-lg shadow-md transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaEdit /> Edit Profile
                    </motion.button>
                    <motion.button 
                      onClick={() => setShowPasswordModal(true)}
                      className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaLock /> Change Password
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Panel */}
            <div className="md:col-span-3">
              <motion.div 
                className="bg-white rounded-2xl shadow-xl overflow-hidden h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px">
                    {['listings', 'favorites', 'messages', 'reviews'].map((tab) => (
                      <motion.button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center gap-2 ${
                          activeTab === tab
                            ? 'border-orange-500 text-orange-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tab === 'listings' && <FaBook />}
                        {tab === 'favorites' && <FaHeart />}
                        {tab === 'messages' && <FaComments />}
                        {tab === 'reviews' && <FaStar />}
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </motion.button>
                    ))}
                  </nav>
                </div>
                
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {renderTabContent()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Controls */}
          <motion.div className="flex justify-center gap-5 mt-8">
            <motion.button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg shadow-md transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaSignOutAlt /> Logout
            </motion.button>

            <motion.button
              onClick={handleDeleteAccount}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-5 py-3 rounded-lg shadow-md transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaTrash /> Delete Account
            </motion.button>
          </motion.div>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showModal && (
            <Modal title="Edit Profile" onClose={() => setShowModal(false)}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    name="full_name" 
                    value={formData.full_name} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input 
                    type="text" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <motion.button 
                  onClick={handleUpdate}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 rounded-lg shadow-md transition-all mt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Changes
                </motion.button>
              </div>
            </Modal>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showPasswordModal && (
            <Modal title="Change Password" onClose={() => setShowPasswordModal(false)}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input 
                    type="password" 
                    name="currentPassword" 
                    value={passwordData.currentPassword} 
                    onChange={handlePasswordChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input 
                    type="password" 
                    name="newPassword" 
                    value={passwordData.newPassword} 
                    onChange={handlePasswordChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    value={passwordData.confirmPassword} 
                    onChange={handlePasswordChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <motion.button 
                  onClick={handlePasswordSubmit}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 rounded-lg shadow-md transition-all mt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Update Password
                </motion.button>
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </MotionWrapper>
  );
};

const Section = ({ title, items, renderItem }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    {items.length === 0 ? (
      <div className="text-center py-8">
        <p className="text-gray-500">No {title.toLowerCase()} available.</p>
      </div>
    ) : (
      <div className="grid gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {renderItem(item)}
          </motion.div>
        ))}
      </div>
    )}
  </div>
);

const Modal = ({ title, children, onClose }) => (
  <motion.div 
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div 
      className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
    >
      <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <FaTimes />
        </button>
      </div>
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  </motion.div>
);

export default UserProfile;