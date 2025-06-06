/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Cards/Cards";
import { DollarSign, MapPin, BookOpen } from "lucide-react";
import MotionWrapper from "../MotionWrapper/MotionWrapper";

const Header = () => {
  return (
    <MotionWrapper>
        <main className="bg-gray-100 min-h-screen flex flex-col items-center justify-center mt-0">
      {/* Logo and tagline */}
      <div className="text-center mb-12 mt-14">
        <div className="grid place-items-center sm:mt-1">
          <img
            className="sm:w-96 w-48"
            src="https://i.ibb.co/GpWjXMc/Edu-Trade-Educational-web-Application-logo-text.png"
            alt="Logo"
          />
        </div>
        <p className="text-2xl font-semibold text-gray-600">
          Connecting Students, Empowering Exchanges
        </p>
      </div>

      {/* Hero Section */}
      <section className="bg-orange-500 text-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Local Book Marketplace
          </h2>
          <p className="text-xl md:text-2xl mb-8 ">
            Buy, sell, and rent books in your community
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              {/* Input field */}
              <input
                type="text"
                placeholder="Search for books..."
                className="flex-grow p-3 rounded-l-lg border text-black font-semibold border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {/* Button */}
              <Link to='/books'>
              <button className="bg-black text-white p-3 rounded-r-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400">
                <div className="flex items-center">
                  {/* Inline SVG for search icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6M10 4a6 6 0 100 12 6 6 0 000-12z"
                    />
                  </svg>
                  Search
                </div>
              </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <h1 className="text-3xl font-semibold text-center my-8 mx-5 ">
        Educational Resources at Your Fingertips
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8  px-4 mt-9 mb-9">
        {/* Books Card */}
        <Link to='/books'>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 cursor-pointer">
            <img
              className="w-full h-48 object-cover rounded-md mb-4"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtCyGq73Yl8yr0YzSuxuS8-fJUQVGXDgPJRw&s"
              alt="Buy"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Books</h2>
            <p className="text-gray-600 mb-6">
              Explore a vast collection of books to enhance your knowledge and
              understanding.
            </p>
            <button className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 ">
              Explore Book
            </button>
          </div>
        </Link>
        
        {/* Notes Card */}
        <Link to="/notes">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 cursor-pointer">
            <img
              className="w-full h-48 object-cover rounded-md mb-4"
              src="https://www.pngitem.com/pimgs/m/127-1279166_word-to-pdf-icon-graphic-design-hd-png.png"
              alt="Rent"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notes</h2>
            <p className="text-gray-600 mb-6">
              Access well-structured notes tailored to your subjects for
              effective studying.
            </p>
            <button className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600">
              Explore Notes
            </button>
          </div>
        </Link>

        {/* Stationery Card */}
        <Link to="/stationery">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 cursor-pointer">
            <img
              className="w-full h-48 object-cover rounded-md mb-4"
              src="https://png.pngtree.com/png-vector/20231115/ourmid/pngtree-set-of-stationery-items-office-png-image_10465196.png"
              alt="Stationery"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Stationery</h2>
            <p className="text-gray-600 mb-6">
            Explore a Wide Range of Stationery for All Your Needs.
            </p>
            <button className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600">
              Explore Stationery
            </button>
          </div>
        </Link>

        {/* Py - Question Paper Card */}
        <Link to='/question-papers'>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 cursor-pointer">
          <img
            className="w-full h-48 object-cover rounded-md mb-4"
            src="https://png.pngtree.com/png-clipart/20220102/original/pngtree-test-paper-stationery-illustration-png-image_6993720.png"
            alt="Sell"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Question Papers
          </h2>
          <p className="text-gray-600 mb-6">
            Find past question papers and practice exams to prepare for your
            tests efficiently.
          </p>
          <button className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600">
            Explore Question Papers
          </button>
        </div>
        </Link>
      </div>

      {/* Feature Highlights */}
      <section className="py-16 bg-white w-full">
        <div className="px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-semibold text-center mb-4">
            Why To Choose EduTrade?
          </h3>
          <p className="text-lg text-center text-gray-600 max-w-5xl mx-auto mb-14">
            EduTrade provides a trusted platform for students to trade
            educational materials with ease. Whether you're looking to buy,
            rent, or sell, we ensure a secure and simple process. Join our
            community today and empower your educational journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <DollarSign className="h-20 w-10 text-orange-600 mb-2" />
                <CardTitle>Save Money</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Find great deals on used books or rent textbooks for a
                  fraction of the cost.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MapPin className="h-20 w-10 text-orange-600 mb-2" />
                <CardTitle>Local Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Connect with book lovers in your area and support local
                  literacy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-20 w-10 text-orange-600 mb-2" />
                <CardTitle>Vast Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Access a wide variety of books, from bestsellers to rare
                  finds.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-semibold text-center mb-12">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className=" font-bold bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h4 className="text-xl font-semibold mb-2">Sign Up</h4>
              <p>
                Create your free account to start buying, selling, or renting
                books.
              </p>
            </div>
            <div className="text-center">
              <div className="font-bold bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h4 className="text-xl font-semibold mb-2">List or Browse</h4>
              <p>
                List your books for sale or rent, or browse available books in
                your area.
              </p>
            </div>
            <div className="text-center">
              <div className="font-bold bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h4 className="text-xl font-semibold mb-2">Exchange</h4>
              <p>
                Meet up with local book lovers to complete your transaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-semibold text-center mb-12">Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah L.",
                quote:
                  "I've saved so much money on textbooks using BookExchange. It's a game-changer for students!",
              },
              {
                name: "Mike R.",
                quote:
                  "As a book collector, I've found some amazing rare books through this platform. Highly recommended!",
              },
              {
                name: "Emily T.",
                quote:
                  "I love how easy it is to sell my old books. It's great for decluttering and making some extra cash.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {/* Star Rating (4 out of 5) using plain SVGs */}
                  {[1, 2, 3, 4].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.707 1.527 8.187-7.463-4.207-7.463 4.207 1.527-8.187-6.064-5.707 8.332-1.151z" />
                    </svg>
                  ))}
                  <svg
                    className="h-5 w-5 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.707 1.527 8.187-7.463-4.207-7.463 4.207 1.527-8.187-6.064-5.707 8.332-1.151z" />
                  </svg>
                </div>
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-500 text-white w-full">
        <div className="px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h3 className="text-3xl font-semibold mb-4">Ready to Start?</h3>
          <p className="text-xl mb-8">
            Join our community of book lovers today!
          </p>
          <Link to="/login">
          <button className="bg-white text-gray-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200">
            Sign Up Now
          </button>
          </Link>
        </div>
      </section>
    </main>
    </MotionWrapper>
    
  );
};

export default Header;