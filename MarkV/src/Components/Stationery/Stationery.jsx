// import { useState, useEffect } from "react";
// import { Search, MapPin } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import MotionWrapper from "../MotionWrapper/MotionWrapper";

// export default function StationeryMarketplace() {
//   const [view, setView] = useState("buy");
//   const [search, setSearch] = useState("");
//   const [location, setLocation] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [items, setItems] = useState([]);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     course: "",
//     location: "",
//     price: "",
//     condition: "",
//     brand: "",
//     color: "",
//     size: "",
//     description: "",
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setFormData({ ...formData, image: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user || !user.id) {
//       alert("User not logged in");
//       return;
//     }

//     const fd = new FormData();
//     Object.keys(formData).forEach((key) => {
//       fd.append(key, formData[key]);
//     });
//     fd.append("user_id", user.id);

//     try {
//       const res = await fetch("http://localhost/MarkV/controllers/uploadStationery.php", {
//         method: "POST",
//         body: fd,
//       });

//       const result = await res.text();
//       alert(result);

//       setFormData({
//         name: "",
//         course: "",
//         location: "",
//         price: "",
//         condition: "",
//         brand: "",
//         color: "",
//         size: "",
//         description: "",
//         image: null,
//       });

//       setShowForm(false);
//       setTimeout(() => window.location.reload(), 300);
//     } catch (error) {
//       alert("Upload failed!");
//       console.error("Error uploading stationery:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchStationery = async () => {
//       try {
//         const res = await fetch("http://localhost/MarkV/controllers/getStationery.php");
//         const data = await res.json();
//         setItems(data);
//       } catch (err) {
//         console.error("Failed to fetch stationery items", err);
//       }
//     };

//     fetchStationery();
//   }, []);

//   const filteredItems = items.filter((item) => {
//     const matchesSearch = item.name?.toLowerCase().includes(search.toLowerCase());
//     const matchesLocation = location === "" || item.location?.toLowerCase().includes(location.toLowerCase());
//     return matchesSearch && matchesLocation;
//   });

//   return (
//     <MotionWrapper>
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="mx-auto w-[70%] bg-white rounded-lg shadow-lg p-6">
//           <h1 className="text-2xl font-bold text-center mb-6">Stationery</h1>

//           <div className="flex gap-4 mb-6">
//             {view === "buy" && (
//               <>
//                 <div className="flex-1 relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search Here...."
//                     className="w-full pl-10 pr-4 py-2 border rounded-md"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                   />
//                 </div>
//                 <div className="flex-1 relative">
//                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Location"
//                     className="w-full pl-10 pr-4 py-2 border rounded-md"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                   />
//                 </div>
//               </>
//             )}
//           </div>

//           <div className="flex gap-4 justify-center mb-6">
//             <button
//               onClick={() => {
//                 setView("buy");
//                 setShowForm(false);
//               }}
//               className={`px-6 py-2 rounded-md ${view === "buy" ? "bg-orange-500 text-white" : "bg-gray-200"}`}
//             >
//               Buy
//             </button>
//             <button
//               onClick={() => {
//                 setView("sell");
//                 setShowForm(true);
//               }}
//               className={`px-6 py-2 rounded-md ${view === "sell" ? "bg-orange-500 text-white" : "bg-gray-200"}`}
//             >
//               Sell
//             </button>
//           </div>

//           {showForm ? (
//             <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
//               {[
//                 { label: "Product Name", name: "name", type: "text", required: true },
//                 { label: "Course & Year", name: "course", type: "text", required: true },
//                 { label: "Location", name: "location", type: "text", required: true },
//                 { label: "Price (Rs.)", name: "price", type: "number", required: true },
//                 { label: "Brand / Company", name: "brand", type: "text" },
//                 { label: "Color", name: "color", type: "text" },
//                 { label: "Size / Pack Info", name: "size", type: "text" },
//               ].map((field) => (
//                 <div key={field.name}>
//                   <label className="block mb-1">{field.label}</label>
//                   <input
//                     name={field.name}
//                     value={formData[field.name]}
//                     onChange={handleChange}
//                     type={field.type}
//                     className="w-full p-2 border rounded-md"
//                     required={field.required}
//                   />
//                 </div>
//               ))}

//               <div>
//                 <label className="block mb-1">Condition</label>
//                 <select name="condition" value={formData.condition} onChange={handleChange} className="w-full p-2 border rounded-md" required>
//                   <option value="">Select</option>
//                   <option value="New">New</option>
//                   <option value="Like New">Like New</option>
//                   <option value="Used">Used</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block mb-1">Additional Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md"
//                   rows={3}
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">Image</label>
//                 <input name="image" onChange={handleChange} type="file" accept="image/*" className="w-full p-2 border rounded-md" required />
//               </div>

//               <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600">
//                 List Item
//               </button>
//             </form>
//           ) : (
//             <div className="space-y-4">
//               {filteredItems.map((item, index) => {
//                 const imageUrl = item.image?.startsWith("http") ? item.image : item.image_url;
//                 return (
//                   <div key={item.id || index} className="flex items-center gap-4 p-4 border rounded-lg">
//                     <div className="w-24 h-24">
//                       <img
//                         src={imageUrl}
//                         alt={item.name}
//                         className="w-full h-full object-cover rounded-lg"
//                         onError={(e) => {
//                           e.target.src = "/placeholder.svg";
//                         }}
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-medium">{item.name}</h3>
//                       <p className="text-sm text-gray-600">{item.course}</p>
//                       <p className="text-sm text-gray-600">{item.location}</p>
//                       <p className="text-orange-600 font-bold">Rs. {item.price}</p>
//                     </div>
//                     <button
//                       onClick={() => navigate(`/stationery-view/${item.product_id}`)}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
//                     >
//                       View
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </MotionWrapper>
//   );
// }








// import { useState, useEffect } from "react";
// import { Search, MapPin } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import MotionWrapper from "../MotionWrapper/MotionWrapper";
// import { motion } from "framer-motion";

// export default function StationeryMarketplace() {
//   const [view, setView] = useState("buy");
//   const [search, setSearch] = useState("");
//   const [location, setLocation] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [items, setItems] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     course: "",
//     location: "",
//     price: "",
//     condition: "",
//     brand: "",
//     color: "",
//     size: "",
//     description: "",
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(URL.createObjectURL(file));
//       setFormData({ ...formData, image: file });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user || !user.id) {
//       alert("User not logged in");
//       return;
//     }

//     const fd = new FormData();
//     Object.keys(formData).forEach((key) => {
//       fd.append(key, formData[key]);
//     });
//     fd.append("user_id", user.id);

//     try {
//       const res = await fetch("http://localhost/MarkV/controllers/uploadStationery.php", {
//         method: "POST",
//         body: fd,
//       });

//       const result = await res.text();
//       alert(result);

//       setFormData({
//         name: "",
//         course: "",
//         location: "",
//         price: "",
//         condition: "",
//         brand: "",
//         color: "",
//         size: "",
//         description: "",
//         image: null,
//       });
//       setSelectedImage(null);
//       setShowForm(false);
//       setTimeout(() => window.location.reload(), 300);
//     } catch (error) {
//       alert("Upload failed!");
//       console.error("Error uploading stationery:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchStationery = async () => {
//       try {
//         const res = await fetch("http://localhost/MarkV/controllers/getStationery.php");
//         const data = await res.json();
//         setItems(data);
//       } catch (err) {
//         console.error("Failed to fetch stationery items", err);
//       }
//     };
//     fetchStationery();
//   }, []);

//   const filteredItems = items.filter((item) => {
//     const matchesSearch = item.name?.toLowerCase().includes(search.toLowerCase());
//     const matchesLocation = location === "" || item.location?.toLowerCase().includes(location.toLowerCase());
//     return matchesSearch && matchesLocation;
//   });

//   return (
//     <MotionWrapper>
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="mx-auto w-[70%] bg-white rounded-lg shadow-lg p-6">
//           <h1 className="text-2xl font-bold text-center mb-6">Stationery</h1>

//           <div className="flex gap-4 mb-6">
//             {view === "buy" && (
//               <>
//                 <div className="flex-1 relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search Here...."
//                     className="w-full pl-10 pr-4 py-2 border rounded-md"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                   />
//                 </div>
//                 <div className="flex-1 relative">
//                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Location"
//                     className="w-full pl-10 pr-4 py-2 border rounded-md"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                   />
//                 </div>
//               </>
//             )}
//           </div>

//           <div className="flex gap-4 justify-center mb-6">
//             <button
//               onClick={() => {
//                 setView("buy");
//                 setShowForm(false);
//               }}
//               className={`px-6 py-2 rounded-md ${view === "buy" ? "bg-orange-500 text-white" : "bg-gray-200"}`}
//             >
//               Buy
//             </button>
//             <button
//               onClick={() => {
//                 setView("sell");
//                 setShowForm(true);
//               }}
//               className={`px-6 py-2 rounded-md ${view === "sell" ? "bg-orange-500 text-white" : "bg-gray-200"}`}
//             >
//               Sell
//             </button>
//           </div>

//           {/* SELL FORM */}
//           {showForm ? (
//             <div className="flex justify-center items-center min-h-[70vh]">
//               <motion.form
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, ease: "easeOut" }}
//                 className="w-full md:w-1/2 bg-white p-8 rounded-3xl shadow-xl border border-orange-100"
//                 onSubmit={handleSubmit}
//               >
//                 <div className="text-center mb-8">
//                   <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600 tracking-tight">
//                     Sell Your Stationery
//                   </h2>
//                   <p className="text-gray-500">Fill in the details to list your stationery for sale</p>
//                 </div>

//                 {/* Image Upload */}
//                 <div className="mb-6">
//                   <label className="block text-md font-medium text-gray-700 mb-2">Product Image</label>
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer hover:bg-orange-50 border-orange-200 transition-all duration-200 relative overflow-hidden">
//                       {selectedImage ? (
//                         <img src={selectedImage} alt="Selected" className="object-cover w-50 h-full rounded-2xl" />
//                       ) : (
//                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                           <svg className="w-8 h-8 mb-3 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//                           </svg>
//                           <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
//                           <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
//                         </div>
//                       )}
//                       <input
//                         type="file"
//                         name="image"
//                         accept="image/*"
//                         className="hidden"
//                         onChange={handleFileChange}
//                       />
//                     </label>
//                   </div>
//                 </div>

//                 {/* Form Inputs */}
//                 <div className="space-y-4">
//                   {[
//                     { name: "name", placeholder: "Product Name" },
//                     { name: "course", placeholder: "Course & Year" },
//                     { name: "location", placeholder: "Location" },
//                     { name: "price", placeholder: "Price (Rs.)" },
//                     { name: "brand", placeholder: "Brand / Company" },
//                     { name: "color", placeholder: "Color" },
//                     { name: "size", placeholder: "Size / Pack Info" },
//                   ].map((field) => (
//                     <input
//                       key={field.name}
//                       type="text"
//                       name={field.name}
//                       placeholder={field.placeholder}
//                       className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200"
//                       value={formData[field.name]}
//                       onChange={handleChange}
//                     />
//                   ))}

//                   {/* Condition Dropdown */}
//                   <select
//                     name="condition"
//                     value={formData.condition}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl"
//                     required
//                   >
//                     <option value="">Condition</option>
//                     <option value="New">New</option>
//                     <option value="Like New">Like New</option>
//                     <option value="Used">Used</option>
//                   </select>

//                   {/* Description */}
//                   <textarea
//                     name="description"
//                     placeholder="Additional Description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl min-h-[120px]"
//                   ></textarea>
//                 </div>

//                 {/* Submit Button */}
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="submit"
//                   className="mt-8 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-orange-200 transition-all duration-300 hover:from-orange-600 hover:to-amber-600"
//                 >
//                   List Stationery for Sale
//                 </motion.button>
//               </motion.form>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {filteredItems.map((item, index) => {
//                 const imageUrl = item.image?.startsWith("http") ? item.image : item.image_url;
//                 return (
//                   <div key={item.id || index} className="flex items-center gap-4 p-4 border rounded-lg">
//                     <div className="w-24 h-24">
//                       <img
//                         src={imageUrl}
//                         alt={item.name}
//                         className="w-full h-full object-cover rounded-lg"
//                         onError={(e) => {
//                           e.target.src = "/placeholder.svg";
//                         }}
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-medium">{item.name}</h3>
//                       <p className="text-sm text-gray-600">{item.course}</p>
//                       <p className="text-sm text-gray-600">{item.location}</p>
//                       <p className="text-orange-600 font-bold">Rs. {item.price}</p>
//                     </div>
//                     <button
//                       onClick={() => navigate(`/stationery-view/${item.product_id}`)}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
//                     >
//                       View
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </MotionWrapper>
//   );
// }






import { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MotionWrapper from "../MotionWrapper/MotionWrapper";
import { motion } from "framer-motion";

export default function StationeryMarketplace() {
  const [view, setView] = useState("buy");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    course: "",
    location: "",
    price: "",
    condition: "",
    brand: "",
    color: "",
    size: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      alert("User not logged in");
      return;
    }

    const fd = new FormData();
    Object.keys(formData).forEach((key) => {
      fd.append(key, formData[key]);
    });
    fd.append("user_id", user.id);

    try {
      const res = await fetch("http://localhost/MarkV/controllers/uploadStationery.php", {
        method: "POST",
        body: fd,
      });

      const result = await res.text();
      alert(result);

      setFormData({
        name: "",
        course: "",
        location: "",
        price: "",
        condition: "",
        brand: "",
        color: "",
        size: "",
        description: "",
        image: null,
      });
      setSelectedImage(null);
      setShowForm(false);
      setTimeout(() => window.location.reload(), 300);
    } catch (error) {
      alert("Upload failed!");
      console.error("Error uploading stationery:", error);
    }
  };

  useEffect(() => {
    const fetchStationery = async () => {
      try {
        const res = await fetch("http://localhost/MarkV/controllers/getStationery.php");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch stationery items", err);
      }
    };
    fetchStationery();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name?.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = location === "" || item.location?.toLowerCase().includes(location.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <MotionWrapper>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto w-[90%] bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Stationery Marketplace</h1>

          <div className="flex gap-4 mb-6">
            {view === "buy" && (
              <>
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search Here...."
                    className="w-full pl-10 pr-4 py-2 border rounded-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full pl-10 pr-4 py-2 border rounded-md"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex gap-4 justify-center mb-6">
            <button
              onClick={() => {
                setView("buy");
                setShowForm(false);
              }}
              className={`px-6 py-2 rounded-md ${view === "buy" ? "bg-orange-500 text-white" : "bg-gray-200"}`}
            >
              Buy
            </button>
            <button
              onClick={() => {
                setView("sell");
                setShowForm(true);
              }}
              className={`px-6 py-2 rounded-md ${view === "sell" ? "bg-orange-500 text-white" : "bg-gray-200"}`}
            >
              Sell
            </button>
          </div>

          {/* SELL FORM */}
          {showForm ? (
            <div className="flex justify-center items-center min-h-[70vh]">
              <motion.form
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full md:w-1/2 bg-white p-8 rounded-3xl shadow-xl border border-orange-100"
                onSubmit={handleSubmit}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600 tracking-tight">
                    Sell Your Stationery
                  </h2>
                  <p className="text-gray-500">Fill in the details to list your stationery for sale</p>
                </div>

                {/* Image Upload */}
                <div className="mb-6">
                  <label className="block text-md font-medium text-gray-700 mb-2">Product Image</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer hover:bg-orange-50 border-orange-200 transition-all duration-200 relative overflow-hidden">
                      {selectedImage ? (
                        <img src={selectedImage} alt="Selected" className="object-cover w-50 h-full rounded-2xl" />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-3 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                {/* Form Inputs */}
                <div className="space-y-4">
                  {[ 
                    { name: "name", placeholder: "Product Name" },
                    { name: "course", placeholder: "Course & Year" },
                    { name: "location", placeholder: "Location" },
                    { name: "price", placeholder: "Price (Rs.)" },
                    { name: "brand", placeholder: "Brand / Company" },
                    { name: "color", placeholder: "Color" },
                    { name: "size", placeholder: "Size / Pack Info" }
                  ].map((field) => (
                    <input
                      key={field.name}
                      type="text"
                      name={field.name}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200"
                      value={formData[field.name]}
                      onChange={handleChange}
                    />
                  ))}
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl"
                    required
                  >
                    <option value="">Condition</option>
                    <option value="New">New</option>
                    <option value="Like New">Like New</option>
                    <option value="Used">Used</option>
                  </select>

                  {/* Description */}
                  <textarea
                    name="description"
                    placeholder="Additional Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-700 bg-orange-50 border border-orange-100 rounded-xl min-h-[120px]"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="mt-8 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-orange-200 transition-all duration-300 hover:from-orange-600 hover:to-amber-600"
                >
                  List Stationery for Sale
                </motion.button>
              </motion.form>
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-6">
              {filteredItems.map((item, index) => {
                const imageUrl = item.image?.startsWith("http") ? item.image : item.image_url;
                return (
                  <div key={item.id || index} className="border p-4 rounded shadow-lg flex flex-col items-center">
                    <div className="w-full h-64 mb-4 overflow-hidden rounded-md flex justify-center items-center">
                      <img
                        src={imageUrl}
                        alt={item.name}
                        className="h-full object-contain"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <h2 className="text-lg font-semibold text-center">{item.name}</h2>
                    <p className="text-sm text-gray-600">{item.course}</p>
                    <p className="text-md font-bold text-green-700">Rs. {item.price}</p>
                    <p className="text-sm">{item.location}</p>
                    <p className="text-sm text-gray-500">Condition: {item.condition}</p>
                    <button
                      onClick={() => navigate(`/stationery-view/${item.product_id}`)}
                      className="bg-orange-500 text-white px-4 py-2 rounded mt-2"
                    >
                      View Details
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </MotionWrapper>
  );
}
