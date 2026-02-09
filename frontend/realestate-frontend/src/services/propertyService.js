import axiosInstance from "../api/axiosInstance";

// --- Function 1: Get List ---
export const getProperties = async (pageNumber = 1, pageSize = 3, filters = {}) => {
    const params = new URLSearchParams();
    params.append("pageNumber", pageNumber);
    params.append("pageSize", pageSize);

    if (filters.search) params.append("title", filters.search); 
    if (filters.minPrice) params.append("min", filters.minPrice); 
    if (filters.maxPrice) params.append("max", filters.maxPrice); 
    if (filters.type) params.append("type", filters.type); 

    const response = await axiosInstance.get('/properties/search', { params });
    return response.data;
}; // 👈 You were missing this closing brace!

// --- Function 2: Get Single Item ---
export const getPropertyById = async (id) => {
    const response = await axiosInstance.get(`/properties/${id}`);
    return response.data;
};

// 🚀 CREATE: Send new property data
export const createProperty = async (propertyData) => {
    const response = await axiosInstance.post("/properties", propertyData);
    return response.data;
};

// 🚀 UPDATE: Send ID and updated data
export const updateProperty = async (id, propertyData) => {
    const response = await axiosInstance.put(`/properties/${id}`, propertyData);
    return response.data;
};

// 🚀 DELETE: Remove property by ID
export const deleteProperty = async (id) => {
    const response = await axiosInstance.delete(`/properties/${id}`);
    return response.data;
};