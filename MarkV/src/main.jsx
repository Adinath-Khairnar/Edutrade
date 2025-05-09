import { createRoot } from "react-dom/client";
import { StrictMode, Suspense } from "react";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Notes from "./Components/Notes/Notes";
import PYQComponent from "./Components/QuestionPaper/PYQComponent";
import BooksPage from "./Components/Book/BookPage";
import Stationery from "./Components/Stationery/Stationery";
import StationeryViewPage from './Components/Stationery/StationeryViewPage';
import UserProfile from './Components/Profile/UserProfile';
import Verify from './Components/Auth/Verify';

// Import Signup & Login components
import Signup from "./Components/Auth/Signup";
import Login from "./Components/Auth/Login";
import BookDetails from "./Components/Book/BookDetails";

import ChatPage from "./Components/chat/ChatPage"; // ✅ Import Chat Page

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="notes" element={<Notes />} />
      <Route path="question-papers" element={<PYQComponent />} />
      <Route path="books" element={<BooksPage />} />
      <Route path="stationery" element={<Stationery />} />

      {/* Authentication Routes */}
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />

      {/* Book Details Route */}
      <Route path="book-details/:id" element={<BookDetails />} />

      {/* ✅ Chat Route (Dynamic book_id) */}
      <Route path="/chat/:id" element={<ChatPage />} />
      <Route path="/stationery-view/:id" element={<StationeryViewPage />} />
      
      <Route path="/profile/:id" element={<UserProfile />} />
      <Route path="/verify/:token" element={<Verify />} />

    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);