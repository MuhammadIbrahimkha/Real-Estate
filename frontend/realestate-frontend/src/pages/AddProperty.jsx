import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const AddProperty = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [property, setProperty] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    whatsappNumber: "", 
    type: "House", 
    // locationId: 1 // Default ID
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Create the Property record first to get the ID
      const response = await axiosInstance.post("/properties", property);
      const newPropertyId = response.data.id;

      // 2️⃣ If an image is selected, upload it using the new ID
      if (selectedFile) {
        const formData = new FormData();
        formData.append("File", selectedFile);
        formData.append("IsPrimary", true);

        await axiosInstance.post(`/properties/${newPropertyId}/images`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      alert("Success! Your property is now live with an image.");
      navigate("/my-properties");
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert("Something went wrong. Check the console for details.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">List Your Property</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <input 
          type="text" placeholder="Title" required className="w-full border p-3 rounded-lg"
          onChange={(e) => setProperty({...property, title: e.target.value})}
        />

        <div className="grid grid-cols-2 gap-4">
          <input 
            type="number" placeholder="Price (Rs.)" required className="w-full border p-3 rounded-lg"
            onChange={(e) => setProperty({...property, price: e.target.value})}
          />
       <select 
  className="w-full border p-3 rounded-lg"
  value={property.type}   // ✅ IMPORTANT
  onChange={(e) => setProperty({...property, type: e.target.value})}
>
  <option value="House">House</option>
  <option value="Apartment">Apartment</option>
  <option value="Flat">Flat</option>
  <option value="Plot">Plot</option>
  <option value="Commercial">Commercial</option>
  <option value="Penthouse">Penthouse</option>
</select>

        </div>

<input 
  type="text" 
  placeholder="WhatsApp Number (e.g. 923001234567)" 
  className="w-full border p-3 rounded-lg"
  value={property.whatsappNumber}
  onChange={(e) => setProperty({...property, whatsappNumber: e.target.value})}
/>
        <input 
          type="text" placeholder="Address" required className="w-full border p-3 rounded-lg"
          onChange={(e) => setProperty({...property, address: e.target.value})}
        />

        <textarea 
          placeholder="Description" className="w-full border p-3 rounded-lg"
          onChange={(e) => setProperty({...property, description: e.target.value})}
        />

        {/* 🖼️ Image Upload Input */}
        <div className="bg-blue-50 p-4 rounded-lg border-2 border-dashed border-blue-200">
          <label className="block text-sm font-bold text-blue-700 uppercase mb-2">Upload Property Photo</label>
          <input 
            type="file" 
            accept="image/*"
            className="w-full text-sm text-gray-500"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 shadow-lg">
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default AddProperty;