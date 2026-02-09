import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../services/propertyService";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  // 🚀 Step 1: Create a state to track which image is currently being viewed
  const [activeImage, setActiveImage] = useState(null);
  const backendUrl = "https://localhost:7185";

 const handleWhatsAppContact = () => {
  // 🚀 Get the real number from the property object
  const phoneNumber = property.whatsappNumber || "923000000000"; 
  
  const message = `Assalam-o-Alaikum, I am interested in your property: "${property.title}" on RealEstate Portal.`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  window.open(whatsappUrl, "_blank");
};
  useEffect(() => {
    const fetchDetail = async () => {
      const data = await getPropertyById(id);
      setProperty(data);
      // 🚀 Step 2: Set the primary image as the default active image once data loads
      if (data.imageUrls && data.imageUrls.length > 0) {
        setActiveImage(data.imageUrls[0]);
      }
    };
    fetchDetail();
  }, [id]);

  if (!property) return <div className="text-center mt-20">Loading Details...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 🖼️ Image Gallery */}
        <div className="space-y-4">
          {/* 🚀 Step 3: The big parent image now displays the 'activeImage' state */}
          <div className="relative group">
            <img 
              src={activeImage ? `${backendUrl}${activeImage}` : "https://via.placeholder.com/600x400"} 
              className="w-full h-[450px] object-cover rounded-3xl shadow-2xl transition-all duration-500"
              alt={property.title}
            />
          </div>

          {/* 🚀 Step 4: Map through ALL images to create the thumbnail bar */}
          <div className="grid grid-cols-4 gap-3">
            {property.imageUrls?.map((img, index) => (
              <div 
                key={index} 
                className={`relative h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                  activeImage === img ? "border-blue-600 scale-95" : "border-transparent hover:border-blue-300"
                }`}
                onClick={() => setActiveImage(img)} // 🚀 Updates the big image on click
              >
                <img 
                  src={`${backendUrl}${img}`} 
                  className="h-full w-full object-cover" 
                  alt={`Thumbnail ${index}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 📝 Information Section */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            {property.type}
          </span>
          <h1 className="text-4xl font-black text-gray-900 mt-4 leading-tight">{property.title}</h1>
          
          <div className="flex items-center gap-2 mt-3 text-gray-500">
             <span className="text-xl">📍</span>
          <p className="text-gray-400 text-sm italic mt-1 ml-2">{property.address}</p>
          </div>
          

          <div className="mt-8 bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-1">Asking Price</p>
            <p className="text-4xl font-black text-blue-700">Rs. {property.price.toLocaleString()}</p>
          </div>

          <div className="mt-8">
            <h3 className="font-black text-gray-800 text-lg mb-3">Property Description</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
              {property.description}
            </p>
          </div>

         <button 
  onClick={handleWhatsAppContact}
  className="w-full bg-green-600 text-white py-5 rounded-2xl font-black mt-10 hover:bg-green-700 hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
>
  <span className="text-2xl">💬</span> CONTACT VIA WHATSAPP
</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;