import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MotionWrapper from '../MotionWrapper/MotionWrapper';



const BookPage = () => {
    const [books, setBooks] = useState([]);
    const [activeTab, setActiveTab] = useState("browse");
    const [searchTitle, setSearchTitle] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    
    const [formData, setFormData] = useState({
        bookTitle: "",
        author: "",
        price: "",
        location: "",
        condition: "",
        edition: "",
        pages: "",
        language: "",
        isbn: "",
        description: "",
        image: null,
    });

    
    // Fetch books from PHP API
    useEffect(() => {
        const fetchBooks = async () => {
            let query = `http://localhost/MarkV/controllers/getbooks.php`;
            const params = new URLSearchParams();

            if (searchTitle) params.append("title", searchTitle);
            if (searchLocation) params.append("location", searchLocation);

            if (params.toString()) query += `?${params.toString()}`;

            try {
                const response = await fetch(query);
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, [searchTitle, searchLocation]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file upload
    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
        const file = e.target.files[0];
        if (file) {
          setSelectedImage(URL.createObjectURL(file));
        }
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;
        const seller_id = user ? user.id : null;
        

        if (!seller_id) {
            alert("User not found. Please log in again.");
            return;
        }

        const bookData = new FormData();
        bookData.append("title", formData.bookTitle);
        bookData.append("author", formData.author);
        bookData.append("price", formData.price);
        bookData.append("location", formData.location);
        bookData.append("condition", formData.condition);
        bookData.append("edition", formData.edition);
        bookData.append("pages", formData.pages);
        bookData.append("language", formData.language);
        bookData.append("isbn", formData.isbn);
        bookData.append("description", formData.description);
        bookData.append("seller_id", seller_id);
        bookData.append("image", formData.image);

        try {
            const response = await fetch("http://localhost/MarkV/controllers/sellBook.php", {
                method: "POST",
                body: bookData,
            });

            const text = await response.text();
            console.log("Raw Response:", text);

            let data;
            try {
                data = JSON.parse(text);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                alert("Invalid server response. Please try again.");
                return;
            }

            if (data.success) {
                alert("Book listed successfully!");
                setFormData({
                    bookTitle: "",
                    author: "",
                    price: "",
                    location: "",
                    condition: "",
                    edition: "",
                    pages: "",
                    language: "",
                    isbn: "",
                    description: "",
                    image: null,
                });
            } else {
                alert(data.error || "Something went wrong!");
            }
        } catch (error) {
            console.error("Error submitting book:", error);
            alert("Error submitting book. Please try again.");
        }
    };


    

    return (
        <MotionWrapper>
            <div className="p-5">
                <h1 className="text-2xl font-bold text-center mb-6">Books Marketplace</h1>

                {/* Toggle Buttons */}
                <div className="flex justify-center mb-6">
                    <button
                        className={`px-6 py-2 rounded-l-lg ${activeTab === "browse" ? "bg-gray-700 text-white" : "bg-gray-300 text-black"}`}
                        onClick={() => setActiveTab("browse")}
                    >
                        Browse Books
                    </button>
                    <button
                        className={`px-6 py-2 rounded-r-lg ${activeTab === "sell" ? "bg-gray-700 text-white" : "bg-gray-300 text-black"}`}
                        onClick={() => setActiveTab("sell")}
                    >
                        Sell a Book
                    </button>
                </div>

                {/* Browse Books Tab */}
                {activeTab === "browse" && (
                    <div>
                        {/* Search Fields */}
                        <div className="mb-6 flex justify-center gap-4">
                            <input
                                type="text"
                                placeholder="Search by Title"
                                value={searchTitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                                className="border p-2 rounded w-1/3"
                            />
                            <input
                                type="text"
                                placeholder="Search by Location"
                                value={searchLocation}
                                onChange={(e) => setSearchLocation(e.target.value)}
                                className="border p-2 rounded w-1/3"
                            />
                        </div>

                        {/* Books Grid
                        <div className="grid grid-cols-3 gap-6">
                            {books.map((book) => (
                                <div key={book.id} className="border p-4 rounded shadow-lg text-center">
                                    <img src={book.image} alt={book.title} className="w-full h-48 object-cover mb-2 rounded-md" />
                                    <h2 className="text-lg font-semibold">{book.title}</h2>
                                    <p className="text-sm text-gray-600">{book.author}</p>
                                    <p className="text-md font-bold text-green-700">₹{book.price}</p>
                                    <p className="text-sm">{book.location}</p>
                                    <p className="text-sm text-gray-500">Condition: {book.condition}</p>
                                    <button
                                        className="bg-orange-500 text-white px-4 py-2 rounded mt-2"
                                        onClick={() => navigate(`/book-details/${book.id}`, { state: { book } })}
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div> */}
                        
                        {/* Books Grid */}

                        <div className="grid grid-cols-5 gap-6">
                        {books.map((book) => (
                            <div key={book.id} className="border p-4 rounded shadow-lg flex flex-col items-center">
                            <div className="w-full h-64 mb-4 overflow-hidden rounded-md flex justify-center items-center">
                                <img src={book.image} alt={book.title} className="h-full object-contain" />
                            </div>
                            <h2 className="text-lg font-semibold text-center">{book.title}</h2>
                            <p className="text-sm text-gray-600">{book.author}</p>
                            <p className="text-md font-bold text-green-700">₹{book.price}</p>
                            <p className="text-sm">{book.location}</p>
                            <p className="text-sm text-gray-500">Condition: {book.condition}</p>
                            <button
                                className="bg-orange-500 text-white px-4 py-2 rounded mt-2"
                                onClick={() => navigate(`/book-details/${book.id}`, { state: { book } })}
                            >
                                View Details
                            </button>
                            </div>
                        ))}
                        </div>


                    </div>
                )}

                {/* Sell a Book Tab
                {activeTab === "sell" && (
                    <div className="flex justify-center">
                        <form className="w-1/2 border p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                            <h2 className="text-xl font-semibold mb-4">Sell Your Book</h2>

                            <input type="file" name="image" className="border p-2 w-full mb-3 rounded" onChange={handleFileChange} />
                            <input type="text" name="bookTitle" placeholder="Book Title" className="border p-2 w-full mb-3 rounded" value={formData.bookTitle} onChange={handleChange} />
                            <input type="text" name="author" placeholder="Author" className="border p-2 w-full mb-3 rounded" value={formData.author} onChange={handleChange} />
                            <input type="text" name="price" placeholder="Price" className="border p-2 w-full mb-3 rounded" value={formData.price} onChange={handleChange} />
                            <input type="text" name="location" placeholder="Your Location" className="border p-2 w-full mb-3 rounded" value={formData.location} onChange={handleChange} />
                            <input type="text" name="condition" placeholder="Condition (e.g., Good, New)" className="border p-2 w-full mb-3 rounded" value={formData.condition} onChange={handleChange} />
                            <input type="text" name="edition" placeholder="Edition (e.g., First Edition)" className="border p-2 w-full mb-3 rounded" value={formData.edition} onChange={handleChange} />
                            <input type="text" name="pages" placeholder="Pages" className="border p-2 w-full mb-3 rounded" value={formData.pages} onChange={handleChange} />
                            <input type="text" name="language" placeholder="Language (e.g., English)" className="border p-2 w-full mb-3 rounded" value={formData.language} onChange={handleChange} />
                            <input type="text" name="isbn" placeholder="ISBN (e.g., 9780446310789)" className="border p-2 w-full mb-3 rounded" value={formData.isbn} onChange={handleChange} />
                            <textarea name="description" placeholder="Book Description" className="border p-2 w-full mb-3 rounded" value={formData.description} onChange={handleChange}></textarea>

                            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded w-full">
                                List Book for Sale
                            </button>
                        </form>
                    </div>
                )} */}
                    
                {activeTab === "sell" && (
                <div className="flex justify-center items-center min-h-[80vh] ">
                    <motion.form
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full md:w-1/2 bg-white p-8 rounded-3xl shadow-xl border border-orange-100"
                    onSubmit={handleSubmit}
                    >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600 tracking-tight">
                        Sell Your Book
                        </h2>
                        <p className="text-gray-500">Fill in the details to list your book for sale</p>
                    </div>

                    {/* File Upload with Preview */}
                    <div className="mb-6">
                        <label className="block text-md font-medium text-gray-700 mb-2">Book Cover</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer hover:bg-orange-50 border-orange-200 transition-all duration-200 relative overflow-hidden">
                                {selectedImage ? (
                                <img src={selectedImage} alt="Selected" className="object-cover w-50 h-full rounded-2xl" />
                                ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-3 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                                </div>
                                )}
                                <input
                                type="file"
                                name="image"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                                />
                            </label>
                            </div>

                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        {/* Full-width fields */}
                        <div className="relative">
                        <input
                            type="text"
                            name="bookTitle"
                            placeholder="Book Title"
                            className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all duration-200"
                            value={formData.bookTitle}
                            onChange={handleChange}
                        />
                        </div>

                        <div className="relative">
                        <input
                            type="text"
                            name="author"
                            placeholder="Author"
                            className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all duration-200"
                            value={formData.author}
                            onChange={handleChange}
                        />
                        </div>

                        {/* Two-column fields */}
                        <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <input
                            type="text"
                            name="price"
                            placeholder="Price"
                            className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all duration-200"
                            value={formData.price}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <input
                            type="text"
                            name="condition"
                            placeholder="Condition (e.g., Good, New)"
                            className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all duration-200"
                            value={formData.condition}
                            onChange={handleChange}
                            />
                        </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <input
                            type="text"
                            name="edition"
                            placeholder="Edition (e.g., First Edition)"
                            className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all duration-200"
                            value={formData.edition}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <input
                            type="text"
                            name="pages"
                            placeholder="Pages"
                            className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all duration-200"
                            value={formData.pages}
                            onChange={handleChange}
                            />
                        </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <input
                            type="text"
                            name="language"
                            placeholder="Language (e.g., English)"
                            className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all duration-200"
                            value={formData.language}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <input
                            type="text"
                            name="isbn"
                            placeholder="ISBN (e.g., 9780446310789)"
                            className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all duration-200"
                            value={formData.isbn}
                            onChange={handleChange}
                            />
                        </div>
                        </div>

                        {/* Full-width fields */}
                        <div className="relative">
                        <input
                            type="text"
                            name="location"
                            placeholder="Your Location"
                            className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all duration-200"
                            value={formData.location}
                            onChange={handleChange}
                        />
                        </div>

                        <div className="relative">
                        <textarea
                            name="description"
                            placeholder="Book Description"
                            className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all duration-200 min-h-[120px]"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="mt-8 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-orange-200 transition-all duration-300 hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                    >
                        List Book for Sale
                    </motion.button>
                    </motion.form>
                </div>
                )}
            </div>
        </MotionWrapper>
    );
};

export default BookPage;
