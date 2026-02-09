import { useEffect, useState } from "react";
import { getProperties } from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    type: "",
  });

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const data = await getProperties(currentPage, pageSize, filters);
      setProperties(data.items || []);
      const total = Math.ceil(data.totalCount / pageSize);
      setTotalPages(total || 1);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch when page changes OR filters change
  useEffect(() => {
    fetchProperties();
  }, [currentPage, filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // reset page when searching
    fetchProperties();
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1); // reset page when filters change
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1683120769541-a8847ff686bf?w=500&auto=format&fit=crop&q=60')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center text-white px-4 w-full">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Find Your Dream Home
          </h1>
          <p className="text-xl mb-12 opacity-90">
            Verified listings in Islamabad's most premium sectors.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="bg-white p-2 md:p-4 rounded-2xl shadow-2xl max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
          >
            <div className="px-2 border-r border-gray-100">
              <label className="block text-[10px] font-black text-blue-600 uppercase text-left ml-1">
                Location / Title
              </label>
              <input
                type="text"
                placeholder="E-11, Bahria..."
                className="w-full text-gray-800 p-1 focus:outline-none font-medium"
                value={filters.search}
                onChange={(e) =>
                  handleFilterChange("search", e.target.value)
                }
              />
            </div>

            <div className="px-2 border-r border-gray-100">
              <label className="block text-[10px] font-black text-blue-600 uppercase text-left ml-1">
                Min Price (PKR)
              </label>
              <input
                type="number"
                placeholder="Any"
                className="w-full text-gray-800 p-1 focus:outline-none font-medium"
                value={filters.minPrice}
                onChange={(e) =>
                  handleFilterChange("minPrice", e.target.value)
                }
              />
            </div>

            <div className="px-2 border-r border-gray-100">
              <label className="block text-[10px] font-black text-blue-600 uppercase text-left ml-1">
                Property Type
              </label>
              <select
                className="w-full text-gray-800 p-1 bg-transparent focus:outline-none font-medium"
                value={filters.type}
                onChange={(e) =>
                  handleFilterChange("type", e.target.value)
                }
              >
                <option value="">All Types</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Flat">Flat</option>
                <option value="Plot">Plot</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-4 px-8 rounded-xl font-black hover:bg-blue-700 transition-all shadow-lg"
            >
              SEARCH
            </button>
          </form>
        </div>
      </div>

      {/* Property Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-gray-900">
            Recent Listings
          </h2>
          <p className="text-gray-500 font-medium">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500 font-bold">
              Fetching Properties...
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {properties.length > 0 ? (
                properties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                  <p className="text-gray-400 text-xl font-bold">
                    No matches found.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {properties.length > 0 && (
              <div className="flex justify-center items-center mt-16 gap-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="px-6 py-3 bg-white border rounded-xl disabled:opacity-30 hover:shadow-md font-bold"
                >
                  ← Prev
                </button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-bold ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-400 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl disabled:opacity-30 hover:bg-blue-700 font-bold"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
