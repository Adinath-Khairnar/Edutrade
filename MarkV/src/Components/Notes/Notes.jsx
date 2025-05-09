// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";

// import {
//   ArrowUpTrayIcon,
//   MagnifyingGlassIcon,
//   ArrowDownTrayIcon,
// } from '@heroicons/react/24/outline';
// import MotionWrapper from "../MotionWrapper/MotionWrapper"; // Import the wrapper

// export default function Notes() {
//   const [activeTab, setActiveTab] = useState('search');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [subject, setSubject] = useState('All Subjects');
//   const [noteTitle, setNoteTitle] = useState('');
//   const [noteFile, setNoteFile] = useState(null);

//   // Get user ID from localStorage
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?.id;

//   const handleFileChange = (e) => {
//     setNoteFile(e.target.files[0]);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!noteTitle || !noteFile || !subject || subject === '') {
//       alert("Please fill all fields.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("noteTitle", noteTitle);
//     formData.append("subject", subject);
//     formData.append("noteFile", noteFile);
//     formData.append("user_id", userId);

//     try {
//       const res = await fetch('http://localhost/MarkV/controllers/uploadNote.php', {
//         method: 'POST',
//         body: formData
//       });

//       const data = await res.json();
//       if (data.success) {
//         alert('Note uploaded successfully!');
//         setNoteFile(null);
//         setNoteTitle('');
//         setSubject('');
//       } else {
//         alert('Upload failed: ' + data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Something went wrong!');
//     }
//   };
//   const handleDownload = (note) => {
//     if (!note.file_name) {
//       alert("File not found.");
//       return;
//     }
  
//     const fileUrl = `http://localhost/MarkV/uploads/notes/${note.file_name}`;
//     const a = document.createElement("a");
//     a.href = fileUrl;
//     a.download = note.file_name;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };
  
  
//   const [dbNotes, setDbNotes] = useState([]);

// useEffect(() => {
//   fetch('http://localhost/MarkV/controllers/getNotes.php')
//     .then(res => res.json())
//     .then(data => {
//       if (data.success) {
//         setDbNotes(data.notes);
//       }
//     })
//     .catch(err => console.error("Error fetching notes:", err));
// }, []);


// const filteredNotes = dbNotes.filter((note) => {
//     const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesSubject = subject === 'All Subjects' || note.subject === subject;
//     return matchesSearch && matchesSubject;
//   });

//   return (
//     <MotionWrapper>
//       <div className="mt-12 mb-12 p-6 w-full max-w-4xl mx-auto">
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="px-4 py-5 sm:p-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Notes</h2>
//             <div className="border-b border-gray-200">
//               <nav className="-mb-px flex" aria-label="Tabs">
//                 <button
//                   onClick={() => setActiveTab('search')}
//                   className={`${
//                     activeTab === 'search'
//                       ? 'border-gray-500 text-gray-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
//                 >
//                   Search Notes
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('upload')}
//                   className={`${
//                     activeTab === 'upload'
//                       ? 'border-gray-500 text-gray-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
//                 >
//                   Upload Notes
//                 </button>
//               </nav>
//             </div>

//             {activeTab === 'search' ? (
//               <div className="mt-6">
//                 <p className="text-sm text-gray-500 mb-4">Find study materials uploaded by students.</p>
//                 <div className="flex gap-4 mb-6">
//                   <div className="flex-grow">
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                       </div>
//                       <input
//                         type="search"
//                         className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         placeholder="Search notes..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                   <select
//                     className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                     value={subject}
//                     onChange={(e) => setSubject(e.target.value)}
//                   >
//                     <option>All Subjects</option>
//                     <option>Web Development</option>
//                     <option>Computer Science</option>
//                     <option>Artificial Intelligence</option>
//                     <option>Programming</option>
//                   </select>
//                 </div>
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                   {filteredNotes.map((note, index) => (
//                     <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
//                       <div className="px-4 py-5 sm:p-6">
//                         <h3 className="text-lg font-medium text-gray-900">{note.title}</h3>
//                         <p className="mt-1 text-sm text-gray-500">
//                           {note.subject} - {note.author}
//                         </p>
//                         <div className="mt-4 flex space-x-2">
//                           <button
//                             onClick={() => handleDownload(note)}
//                             className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                           >
//                             <ArrowDownTrayIcon className="mr-2 -ml-1 h-5 w-5 text-gray-400" aria-hidden="true" />
//                             Download {note.type}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div className="mt-6">
//                 <p className="text-sm text-gray-500 mb-4">Share your study materials with students.</p>
//                 <form onSubmit={handleUpload}>
//                   <div className="space-y-4">
//                     <div>
//                       <label htmlFor="note-file" className="block text-sm font-medium text-gray-700">
//                         Note File
//                       </label>
//                       <input
//                         id="note-file"
//                         name="note-file"
//                         type="file"
//                         className="mt-1 block w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                         onChange={handleFileChange}
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="note-title" className="block text-sm font-medium text-gray-700">
//                         Note Title
//                       </label>
//                       <input
//                         type="text"
//                         name="note-title"
//                         id="note-title"
//                         className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         placeholder="Enter note title"
//                         value={noteTitle}
//                         onChange={(e) => setNoteTitle(e.target.value)}
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="upload-subject" className="block text-sm font-medium text-gray-700">
//                         Subject
//                       </label>
//                       <select
//                         id="upload-subject"
//                         name="upload-subject"
//                         className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                         value={subject}
//                         onChange={(e) => setSubject(e.target.value)}
//                       >
//                         <option value="">Select subject</option>
//                         <option>Web Development</option>
//                         <option>Computer Science</option>
//                         <option>Artificial Intelligence</option>
//                         <option>Programming</option>
//                       </select>
//                     </div>
//                     <div>
//                       <button
//                         type="submit"
//                         className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                       >
//                         Upload Notes
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </MotionWrapper>
//   );
// }



/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import MotionWrapper from "../MotionWrapper/MotionWrapper"; // Import your MotionWrapper

export default function Notes() {
  const [activeTab, setActiveTab] = useState("search");
  const [searchTerm, setSearchTerm] = useState("");
  const [subject, setSubject] = useState("All Subjects");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteFile, setNoteFile] = useState(null);

  const [dbNotes, setDbNotes] = useState([]);

  // Get user ID from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // Handle File Change
  const handleFileChange = (e) => {
    setNoteFile(e.target.files[0]);
  };

  // Handle Upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!noteTitle || !noteFile || !subject || subject === "") {
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("noteTitle", noteTitle);
    formData.append("subject", subject);
    formData.append("noteFile", noteFile);
    formData.append("user_id", userId);

    try {
      const res = await fetch(
        "http://localhost/MarkV/controllers/uploadNote.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.success) {
        alert("Note uploaded successfully!");
        setNoteFile(null);
        setNoteTitle("");
        setSubject("All Subjects");
      } else {
        alert("Upload failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  // Handle Download
  const handleDownload = (note) => {
    if (!note.file_name) {
      alert("File not found.");
      return;
    }

    const fileUrl = `http://localhost/MarkV/uploads/notes/${note.file_name}`;
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = note.file_name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Fetch Notes
  useEffect(() => {
    fetch("http://localhost/MarkV/controllers/getNotes.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDbNotes(data.notes);
        }
      })
      .catch((err) => console.error("Error fetching notes:", err));
  }, []);

  // Filter Notes
  const filteredNotes = dbNotes.filter((note) => {
    const matchesSearch = note.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSubject =
      subject === "All Subjects" || note.subject === subject;
    return matchesSearch && matchesSubject;
  });

  return (
    <MotionWrapper>
      <div className="mt-12 mb-12 p-6 w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Notes
            </h2>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab("search")}
                  className={`${
                    activeTab === "search"
                      ? "border-gray-500 text-gray-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                >
                  Search Notes
                </button>
                <button
                  onClick={() => setActiveTab("upload")}
                  className={`${
                    activeTab === "upload"
                      ? "border-gray-500 text-gray-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                >
                  Upload Notes
                </button>
              </nav>
            </div>

            {/* Search Notes */}
            {activeTab === "search" ? (
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-4">
                  Find study materials uploaded by students.
                </p>
                <div className="flex gap-4 mb-6">
                  <div className="flex-grow relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="search"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Search notes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option>All Subjects</option>
                    <option>Web Development</option>
                    <option>Computer Science</option>
                    <option>Artificial Intelligence</option>
                    <option>Programming</option>
                  </select>
                </div>

                {/* Notes Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredNotes.map((note, index) => (
                    <div
                      key={index}
                      className="bg-white overflow-hidden shadow rounded-lg"
                    >
                      <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium text-gray-900">
                          {note.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {note.subject} - {note.author}
                        </p>
                        <div className="mt-4 flex space-x-2">
                          <button
                            onClick={() => handleDownload(note)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <ArrowDownTrayIcon
                              className="mr-2 -ml-1 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            Download {note.type}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Upload Notes Modern Form
              <div className="flex justify-center items-center min-h-[80vh]">
                <motion.form
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full md:w-1/2 bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
                  onSubmit={handleUpload}
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-600 tracking-tight">
                      Upload Your Notes
                    </h2>
                    <p className="text-gray-500">
                      Fill in the details to upload your study notes
                    </p>
                  </div>

                  {/* File Upload */}
                  <div className="mb-6">
                    <label className="block text-md font-medium text-gray-700 mb-2">
                      Upload Note File
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer hover:bg-gray-50 border-gray-200 transition-all duration-200 relative overflow-hidden">
                        {noteFile ? (
                          <p className="text-gray-700">{noteFile.name}</p>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-3 text-orange-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PDF, DOCX, PPTX (MAX. 10MB)
                            </p>
                          </div>
                        )}
                        <input
                          id="note-file"
                          name="note-file"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="noteTitle"
                      placeholder="Note Title"
                      className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-200"
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                    />

                    <select
                      id="upload-subject"
                      name="upload-subject"
                      className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-200"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    >
                      <option value="">Select Subject</option>
                      <option>Web Development</option>
                      <option>Computer Science</option>
                      <option>Artificial Intelligence</option>
                      <option>Programming</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="mt-8 w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-gray-200 transition-all duration-300 hover:from-gray-700 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  >
                    Upload Notes
                  </motion.button>
                </motion.form>
              </div>
            )}
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
}

