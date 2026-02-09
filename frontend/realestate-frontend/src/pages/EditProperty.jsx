import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [property, setProperty] = useState({
    title: "",
    price: "",
    description: "",
    type: ""
  });

  useEffect(() => {
    axiosInstance.get(`/properties/${id}`)
      .then(res => {
        const data = res.data;
        setProperty({
          title: data.title,
          description: data.description,
          price: data.price,
          type: data.type
        });
        if (data.imageUrls && data.imageUrls[0]) {
          setPreview(`https://localhost:7185${data.imageUrls[0]}?t=${new Date().getTime()}`);
        }
      })
      .catch(err => console.error("Could not load property", err));
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/properties/${id}`, property);

      if (selectedFile) {
        const formData = new FormData();
        formData.append("File", selectedFile);
        formData.append("IsPrimary", true);

        await axiosInstance.post(`/properties/${id}/images`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      alert("Updated successfully!");
      navigate("/my-properties", { replace: true });
    } catch (err) {
      alert("Update failed. Check if you are the owner.", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-6 sm:my-10 px-4">
      <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
          Edit Listing
        </h2>

        <form onSubmit={handleUpdate} className="space-y-5">

          <input 
            type="text" 
            value={property.title} 
            placeholder="Title"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setProperty({...property, title: e.target.value})}
          />

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input 
              type="number" 
              value={property.price} 
              placeholder="Price"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setProperty({...property, price: e.target.value})}
            />
            <select 
              value={property.type} 
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setProperty({...property, type: e.target.value})}
            >
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <textarea 
            value={property.description} 
            rows="4" 
            placeholder="Description"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            onChange={(e) => setProperty({...property, description: e.target.value})}
          />

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Add New Image
            </label>

            {preview && (
              <img 
                src={preview} 
                alt="Current" 
                className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3"
              />
            )}

            <input 
              type="file" 
              onChange={handleFileChange}
              className="w-full text-sm"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditProperty;
