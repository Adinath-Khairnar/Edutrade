// /* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react";
// import { FiDownload, FiSearch, FiUpload, FiX } from "react-icons/fi";

// export default function PYQComponent() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [uploadFile, setUploadFile] = useState(null);
//   const [uploadSubject, setUploadSubject] = useState("");
//   const [uploadUniversity, setUploadUniversity] = useState("");
//   const [uploadYear, setUploadYear] = useState("");
//   const [questionPapers, setQuestionPapers] = useState([]);

//   // ✅ handle file selection
//   const handleFileChange = (e) => {
//     setUploadFile(e.target.files[0]);
//   };

//   useEffect(() => {
//     const fetchPapers = async () => {
//       try {
//         const response = await fetch("http://localhost/MarkV/controllers/fetchQuestionPapers.php");
//         const data = await response.json();
//         setQuestionPapers(data);
//       } catch (err) {
//         console.error("Failed to fetch question papers", err);
//       }
//     };
  
//     fetchPapers();
//   }, []);
  

//   const filteredPapers = questionPapers.filter((paper) =>
//     paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     paper.year.toString().includes(searchTerm)
//   );

//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleSubmitUpload = async (e) => {
//     e.preventDefault();
  
//     const formData = new FormData();
//     formData.append("subject", uploadSubject);
//     formData.append("university", uploadUniversity);
//     formData.append("year", uploadYear);
//     formData.append("file", uploadFile);
//     formData.append("user_id", user?.id);
  
//     try {
//       const response = await fetch("http://localhost/MarkV/controllers/uploadQuestionPaper.php", {
//         method: "POST",
//         body: formData,
//       });
  
//       const result = await response.text();
//       alert(result);
  
//       // ✅ Fetch updated list
//       const refreshed = await fetch("http://localhost/MarkV/controllers/fetchQuestionPapers.php");
//       const updatedData = await refreshed.json();
//       setQuestionPapers(updatedData);
  
//       // Reset form
//       setIsUploadModalOpen(false);
//       setUploadFile(null);
//       setUploadSubject("");
//       setUploadUniversity("");
//       setUploadYear("");
//     } catch (err) {
//       alert("Upload failed!");
//     }
//   };
  

//   return (
//     <div className="w-full max-w-4xl mx-auto mt-8 mb-8 px-4 sm:px-6 lg:px-8">
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="p-4 sm:p-6">
//           <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Previous Year Questions (PYQ)</h1>

//           <div className="flex items-center mb-4">
//             <input
//               type="text"
//               placeholder="Search by subject or year"
//               className="w-full p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button className="bg-orange-500 text-white p-2 rounded-r-md hover:bg-orange-600">
//               <FiSearch />
//             </button>
//           </div>

//           <div className="mb-4 flex justify-end">
//             <button
//               onClick={() => setIsUploadModalOpen(true)}
//               className="flex items-center bg-orange-600 text-white font-semibold px-3 py-2 rounded hover:bg-orange-700 text-sm"
//             >
//               <FiUpload className="mr-1" />
//               Upload Question Paper
//             </button>
//           </div>

//           {filteredPapers.length === 0 ? (
//             <p className="text-center text-gray-500">No question papers found.</p>
//           ) : (
//             filteredPapers.map((paper) => (
//               <div key={paper.id} className="flex justify-between bg-gray-100 p-2 mb-2 rounded">
//                 <span>{`${paper.subject} ${paper.year} (${paper.university})`}</span>
//                 <a
//   href={`http://localhost/MarkV/${paper.file_url}`}
//   target="_blank"
//   rel="noopener noreferrer"
//   className="bg-gray-500 text-white px-4 py-2 rounded"
// >
//   Download PDF
// </a>


//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Upload Modal */}
//       {isUploadModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-md w-full">
//             <div className="p-4 border-b flex justify-between items-center">
//               <h2 className="text-xl font-bold">Upload Question Paper</h2>
//               <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-500 hover:text-gray-700">
//                 <FiX />
//               </button>
//             </div>
//             <form onSubmit={handleSubmitUpload}>
//               <div className="p-4 space-y-4">
//               <div>
//                   <label className="block text-sm font-medium mb-1">Upload PDF</label>
//                   <input
//                     type="file"
//                     onChange={handleFileChange}
//                     accept="application/pdf"
//                     required
//                     className="w-full border p-2 rounded"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Subject</label>
//                   <input
//                     type="text"
//                     value={uploadSubject}
//                     onChange={(e) => setUploadSubject(e.target.value)}
//                     required
//                     className="w-full border p-2 rounded"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">University</label>
//                   <input
//                     type="text"
//                     value={uploadUniversity}
//                     onChange={(e) => setUploadUniversity(e.target.value)}
//                     required
//                     className="w-full border p-2 rounded"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Year</label>
//                   <input
//                     type="number"
//                     value={uploadYear}
//                     onChange={(e) => setUploadYear(e.target.value)}
//                     required
//                     className="w-full border p-2 rounded"
//                   />
//                 </div>
//               </div>
//               <div className="p-4 border-t flex justify-center">
//                 <button type="submit" className="bg-orange-500 text-white font-semibold px-4 py-2 rounded hover:bg-orange-600">
//                   Upload
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiUpload } from "react-icons/fi";
import MotionWrapper from "../MotionWrapper/MotionWrapper";


export default function PYQComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadSubject, setUploadSubject] = useState("");
  const [uploadUniversity, setUploadUniversity] = useState("");
  const [uploadYear, setUploadYear] = useState("");
  const [questionPapers, setQuestionPapers] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch question papers
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch("http://localhost/MarkV/controllers/fetchQuestionPapers.php");
        const data = await response.json();
        setQuestionPapers(data);
      } catch (err) {
        console.error("Failed to fetch question papers", err);
      }
    };
    fetchPapers();
  }, []);

  const filteredPapers = questionPapers.filter((paper) =>
    paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.year.toString().includes(searchTerm)
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadFile(file);
    if (file) {
      setSelectedFileName(file.name);
    }
  };

  const handleSubmitUpload = async (e) => {
    e.preventDefault();

    if (!uploadFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("subject", uploadSubject);
    formData.append("university", uploadUniversity);
    formData.append("year", uploadYear);
    formData.append("file", uploadFile);
    formData.append("user_id", user?.id);

    try {
      const response = await fetch("http://localhost/MarkV/controllers/uploadQuestionPaper.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.text();
      alert(result);

      // Refresh papers
      const refreshed = await fetch("http://localhost/MarkV/controllers/fetchQuestionPapers.php");
      const updatedData = await refreshed.json();
      setQuestionPapers(updatedData);

      // Reset form
      setIsUploadModalOpen(false);
      setUploadFile(null);
      setUploadSubject("");
      setUploadUniversity("");
      setUploadYear("");
      setSelectedFileName(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  return (
    <MotionWrapper>
      <div className="p-5 ml-40 mr-40 mt-20 mb-20">
        <h1 className="text-2xl font-bold text-center mb-20 ">Previous Year Questions (PYQ)</h1>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by Subject or Year"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-2/3"
          />
          <button className="bg-orange-500 text-white p-2 rounded ml-2">
            <FiSearch />
          </button>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center bg-orange-500 text-white font-semibold px-4 py-2 rounded hover:bg-orange-700"
          >
            <FiUpload className="mr-2" /> Upload Question Paper
          </button>
        </div>

        {filteredPapers.length === 0 ? (
          <p className="text-center text-gray-500">No question papers found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPapers.map((paper) => (
              <div key={paper.id} className="flex justify-between bg-gray-100 p-4 rounded-lg shadow-md">
                <div>
                  <h2 className="font-semibold">{paper.subject}</h2>
                  <p className="text-sm text-gray-600">{paper.university} - {paper.year}</p>
                </div>
                <a
                  href={`http://localhost/MarkV/${paper.file_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Upload Modal */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.form
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmitUpload}
              className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-orange-100 relative"
            >
              <h2 className="text-2xl font-bold text-center mb-6">Upload Question Paper</h2>

              {/* File Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF</label>
                <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer hover:bg-orange-50 border-orange-200 relative overflow-hidden">
                  {selectedFileName ? (
                    <p className="text-sm font-semibold">{selectedFileName}</p>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-sm text-gray-500">Click to upload</p>
                      <p className="text-xs text-gray-400">PDF Only</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    required
                  />
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Subject"
                  value={uploadSubject}
                  onChange={(e) => setUploadSubject(e.target.value)}
                  className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300"
                  required
                />
                <input
                  type="text"
                  placeholder="University"
                  value={uploadUniversity}
                  onChange={(e) => setUploadUniversity(e.target.value)}
                  className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300"
                  required
                />
                <input
                  type="number"
                  placeholder="Year"
                  value={uploadYear}
                  onChange={(e) => setUploadYear(e.target.value)}
                  className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300"
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="mt-6 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-orange-200 transition-all duration-300 hover:from-orange-600 hover:to-amber-600"
              >
                Upload
              </motion.button>

              {/* Cancel button */}
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </motion.form>
          </div>
        )}
      </div>
    </MotionWrapper>
  );
}
