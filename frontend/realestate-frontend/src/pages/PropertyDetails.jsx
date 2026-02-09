import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../services/propertyService";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const backendUrl = "https://localhost:7185";

  const handleWhatsAppContact = () => {
    const phoneNumber = property.whatsappNumber || "923000000000"; 
    const message = `Assalam-o-Alaikum, I am interested in your property: "${property.title}" on RealEstate Portal.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await getPropertyById(id);
      setProperty(data);
      if (data.imageUrls && data.imageUrls.length > 0) {
        setActiveImage(data.imageUrls[0]);
      }
    };
    fetchDetail();
  }, [id]);

  if (!property) return <div className="text-center mt-20">Loading Details...</div>;

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        
        {/* 🖼️ Image Gallery */}
        <div className="space-y-3 sm:space-y-4">
          <div className="relative group">
            <img 
              src={activeImage ? `${backendUrl}${activeImage}` : "https://via.placeholder.com/600x400"} 
              className="w-full h-[240px] sm:h-[320px] md:h-[400px] lg:h-[450px] object-cover rounded-2xl sm:rounded-3xl shadow-xl transition-all duration-500"
              alt={property.title}
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
            {property.imageUrls?.map((img, index) => (
              <div 
                key={index} 
                className={`relative h-16 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                  activeImage === img ? "border-blue-600 scale-95" : "border-transparent hover:border-blue-300"
                }`}
                onClick={() => setActiveImage(img)}
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
        <div className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100">
          <span className="bg-blue-100 text-blue-800 text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full uppercase tracking-widest">
            {property.type}
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mt-3 sm:mt-4 leading-tight">
            {property.title}
          </h1>
          
          <div className="flex items-center gap-2 mt-2 sm:mt-3 text-gray-500">
            <span className="text-lg sm:text-xl">📍</span>
            <p className="text-gray-400 text-xs sm:text-sm italic ml-1 sm:ml-2">
              {property.address}
            </p>
          </div>

          <div className="mt-6 sm:mt-8 bg-blue-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-blue-100">
            <p className="text-[9px] sm:text-[10px] text-blue-500 font-black uppercase tracking-widest mb-1">
              Asking Price
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-700">
              Rs. {property.price.toLocaleString()}
            </p>
          </div>

          <div className="mt-6 sm:mt-8">
            <h3 className="font-black text-gray-800 text-base sm:text-lg mb-2 sm:mb-3">
              Property Description
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-xs sm:text-sm bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-100">
              {property.description}
            </p>
          </div>

          <button 
            onClick={handleWhatsAppContact}
            className="w-full bg-green-600 text-white py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-black mt-6 sm:mt-10 hover:bg-green-700 hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
          >
            <span className="text-xl sm:text-2xl">💬</span> CONTACT VIA WHATSAPP
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
