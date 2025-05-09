/* eslint-disable no-unused-vars */
import { useParams, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import MotionWrapper from '../MotionWrapper/MotionWrapper';


const BookDetails = () => {
    const { id } = useParams(); // <-- used for book reviews
    const location = useLocation();
    const navigate = useNavigate();

    const book = location.state?.book;
    const [showModal, setShowModal] = useState(false);

    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const user_id = parsedUser?.id || null;

    const product_id = book?.id;
    const [isFavorite, setIsFavorite] = useState(false);
    const [reviews, setReviews] = useState([]); // Seller reviews
    const [bookReviews, setBookReviews] = useState([]); // Book-specific reviews

    console.log("User ID:", user_id);
    console.log("Product ID:", product_id);

    useEffect(() => {
        const checkFavorite = async () => {
            try {
                const response = await fetch("http://localhost/MarkV/controllers/checkFavorite.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_id, product_id }),
                });

                const text = await response.text();
                const data = JSON.parse(text);

                if (data.success) {
                    setIsFavorite(data.favorite);
                }
            } catch (error) {
                console.error("Error checking favorite:", error);
            }
        };

        if (user_id && product_id) {
            checkFavorite();
        }
    }, [user_id, product_id]);

    const toggleFavorite = async () => {
        if (!user_id) {
            alert("Please log in to add to favorites.");
            return;
        }

        try {
            const response = await fetch("http://localhost/MarkV/controllers/toggleFavorite.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id, product_id, type: "book" })
            });

            const text = await response.text();
            console.log("Raw response:", text);
            const data = JSON.parse(text);

            if (data.success) {
                setIsFavorite(!isFavorite);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    // ✅ Fetch reviews of the seller
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch("http://localhost/MarkV/controllers/getSellerReviews.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ book_id: book?.id }),
                });

                const text = await response.text();
                const data = JSON.parse(text);

                if (data.success) {
                    setReviews(data.reviews);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        if (book?.user_id) {
            fetchReviews();
        }
    }, [book]);

    // ✅ Fetch reviews of the book (based on product_id from URL)
    // ✅ Fetch reviews of the book (based on product_id from URL)
useEffect(() => {
    const fetchBookReviews = async () => {
        try {
            const response = await fetch(`http://localhost/MarkV/controllers/getBookReviews.php?product_id=${id}`);
            const text = await response.text(); // get raw text
            console.log("Raw response from getBookReviews.php:", text); // 🔍 inspect this output
            const data = JSON.parse(text); // then parse
            setBookReviews(data);
        } catch (error) {
            console.error("Error fetching book reviews:", error);
        }
    };

    if (id) {
        fetchBookReviews();
    }
}, [id]);



    return (
        <MotionWrapper>
            <div className="max-w-4xl mx-auto p-4">
                <button 
                    className="bg-gray-200 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300"
                    onClick={() => navigate(-1)}
                >
                    ← Back to Books
                </button>

                <h1 className="text-3xl font-bold text-center mb-4">Books Marketplace</h1>

                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row">
                    <img 
                        src={`http://localhost/MarkV/${book.image}`} 
                        alt={book.title} 
                        className="w-64 h-auto rounded-lg"
                    />
                    <div className="ml-6 flex-1">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">{book.title}</h2>
                            <button
                                onClick={toggleFavorite}
                                className="text-red-500 hover:scale-110 transition-transform"
                                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                            >
                                <Heart fill={isFavorite ? "red" : "none"} />
                            </button>
                        </div>
                        <p className="text-gray-600">{book.author}</p>
                        <p className="text-gray-500">📍 {book.location}</p>
                        <p className="text-xl font-semibold text-orange-600 mt-2">₹ {book.price}</p>
                        <p><strong>Condition:</strong> {book.book_condition}</p>
                        <p><strong>Edition:</strong> {book.edition}</p>
                        <p><strong>Language:</strong> {book.language}</p>
                        <p><strong>Pages:</strong> {book.pages}</p>
                        <p><strong>ISBN:</strong> {book.isbn}</p>
                    </div>
                </div>
                
                <div className="mt-6">
                    <h3 className="text-lg font-bold">Description</h3>
                    <p className="text-gray-600">{book.description}</p>
                </div>

                <div className="mt-6 text-center">
                    <button 
                        className="bg-orange-500 text-white px-6 py-2 mt-2 rounded-lg hover:bg-orange-600"
                        onClick={() => navigate(`/chat/${book.id}`)}
                    >
                        💬 Contact Seller
                    </button>
                </div>

                <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">📘 Book Reviews</h3>
        {bookReviews.length === 0 ? (
            <p className="text-gray-500">No reviews for this book yet.</p>
        ) : (
            <div className="space-y-4">
                {bookReviews.map((review) => (
                    <div key={review.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">{review.reviewer_name}</p>
                            <span className="text-yellow-500">⭐ {review.rating}/5</span>
                        </div>
                        <p className="text-gray-700">{review.review}</p>
                        <p className="text-sm text-gray-400">{new Date(review.created_at).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        )}
    </div>

            
            </div>
        </MotionWrapper>
    );
};

export default BookDetails;
