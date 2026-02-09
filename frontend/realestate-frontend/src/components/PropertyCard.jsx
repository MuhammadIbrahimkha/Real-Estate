import { Link } from "react-router-dom";


const PropertyCard = ({ property }) => {
  // 📸 Image Logic:
  // We take the first image from the array. 
  // We MUST prefix it with the Backend URL because the DB only stores the relative path.
  const backendUrl = "https://localhost:7185";
  const mainImage = property.imageUrls && property.imageUrls.length > 0 
    ? `${backendUrl}${property.imageUrls[0]}` 
    : "https://via.placeholder.com/400x300?text=No+Image+Available";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
      {/* 🖼️ Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={mainImage} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Image+Error"; }}
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md">
            {property.type}
          </span>
        </div>
      </div>
      
      {/* 📝 Content Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800 truncate leading-tight">
                {property.title}
            </h3>
        </div>
        
       <div className="flex items-center gap-2 mt-3 text-gray-500">
             <span className="text-xl">📍</span>
          <p className="text-gray-400 text-sm italic mt-1 ml-0">{property.address}</p>
          </div>

        <div className="flex items-center justify-between border-t pt-4">
            <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Price</p>
                <p className="text-2xl font-black text-blue-700">
                    Rs. {Number(property.price).toLocaleString()}
                </p>
            </div>
           <Link 
  to={`/property/${property.id}`} 
  className="w-full inline-block text-center bg-gray-800 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm"
>
  View Details
</Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;