import { useEffect, useState } from "react";
import { deleteProperty } from "../services/propertyService";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";

// 🚀 Helper Component for the "Read More" logic
const ExpandableDescription = ({ text, limit = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;
  if (text.length <= limit) return <p className="text-gray-500 text-sm mt-2">{text}</p>;

  return (
    <p className="text-gray-500 text-sm mt-2">
      {isExpanded ? text : `${text.substring(0, limit)}...`}
      <button 
        onClick={(e) => {
          e.preventDefault(); // Prevents card clicks if you add them later
          setIsExpanded(!isExpanded);
        }}
        className="text-blue-600 font-bold ml-1 hover:underline focus:outline-none"
      >
        {isExpanded ? "Show Less" : "Read More"}
      </button>
    </p>
  );
};

const MyProperties = () => {
  const [myProps, setMyProps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/properties/my-listings") 
      .then(res => {
        setMyProps(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching listings:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Islamabad listing?")) {
      try {
        await deleteProperty(id);
        setMyProps(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        alert("Delete failed. Make sure you are the owner.",err);
      }
    }
  };

  if (loading) return <div className="text-center py-20 text-blue-600 font-bold animate-pulse">Loading your dashboard...</div>;

  return (
    <div className="container mx-auto p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Listings</h1>
          <p className="text-gray-500 font-medium">Managing {myProps.length} properties in Islamabad.</p>
        </div>
        {/* We kept this button here, but if it's also in your Navbar, you can delete it */}
        <Link to="/add-property" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2">
          <span>+</span> Post New Property
        </Link>
      </div>

      {myProps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myProps.map(p => (
            <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Image Preview */}
              <div className="h-52 bg-gray-200 relative overflow-hidden">
                <img 
                  src={p.imageUrls && p.imageUrls[0] ? `https://localhost:7185${p.imageUrls[0]}` : "/placeholder-house.png"} 
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest shadow-sm">
                  {p.type}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-gray-900 text-xl truncate mb-1">{p.title}</h3>
                
                {/* 🚀 Using the new Expandable component here */}
                <ExpandableDescription text={p.description} limit={90} />

                <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-blue-600 font-black text-2xl">Rs. {p.price.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center gap-3 mt-6">
                  <Link 
                    to={`/edit-property/${p.id}`}
                    className="flex-1 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white font-bold py-2.5 rounded-xl transition-all text-center border border-blue-100"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(p.id)}
                    className="flex-1 bg-red-50 hover:bg-red-600 text-red-500 hover:text-white font-bold py-2.5 rounded-xl transition-all border border-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-[2rem] p-20 text-center border-2 border-dashed border-gray-200">
          <div className="text-5xl mb-4">🏠</div>
          <p className="text-gray-400 text-xl font-medium">Your portfolio is currently empty.</p>
          <Link to="/add-property" className="text-blue-600 font-bold hover:underline mt-4 inline-block text-lg">
            Start by adding a villa in Islamabad →
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyProperties;