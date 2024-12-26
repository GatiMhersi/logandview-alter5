import React, { useState } from "react";
import { Product } from "../types"; // Asegúrate de importar el tipo Product
import useAddProduct from "../hook/useAddProduct"; // Importamos el hook que maneja la adición de productos

const AddProductForm: React.FC = () => {
  // Estado local para almacenar los valores del formulario
  const [productData, setProductData] = useState<Product>({
    id: 0,
    title: '',
    description: '',
    category: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    tags: [],
    brand: '',
    sku: '',
    weight: 0,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
    },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    reviews: [],
    returnPolicy: '',
    minimumOrderQuantity: 0,
    meta: {
      createdAt: '',
      updatedAt: '',
      barcode: '',
      qrCode: '',
    },
    thumbnail: '',
    images: [],
  });

  const { addNewProduct, loading, error } = useAddProduct(); // Usamos el hook para agregar productos

  // Maneja los cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDimensionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      dimensions: {
        ...prevData.dimensions,
        [name]: parseFloat(value),
      },
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí, puedes generar un id o hacer otras acciones necesarias antes de enviar
    addNewProduct(productData); // Llamamos al hook para agregar el producto
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-xl font-semibold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title and Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Title:</label>
            <input
              type="text"
              name="title"
              value={productData.title}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-sm rounded-md"
              required
            />
          </div>
          <div>
            <label className="text-sm">Category:</label>
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-sm rounded-md"
              required
            />
          </div>
        </div>
  
        {/* Description and Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Description:</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-sm rounded-md"
              required
            />
          </div>
          <div>
            <label className="text-sm">Tags (comma separated):</label>
            <input
              type="text"
              name="tags"
              value={productData.tags.join(", ")}
              onChange={(e) =>
                setProductData((prevData) => ({
                  ...prevData,
                  tags: e.target.value.split(",").map((tag) => tag.trim()),
                }))
              }
              className="w-full p-2 bg-gray-700 text-sm rounded-md"
              required
            />
          </div>
        </div>
  
        {/* Price, Stock and Discount */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm">Price:</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-sm rounded-md"
              required
            />
          </div>
          <div>
            <label className="text-sm">Stock:</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-sm rounded-md"
              required
            />
          </div>
          <div>
            <label className="text-sm">Discount:</label>
            <input
              type="number"
              name="discountPercentage"
              value={productData.discountPercentage}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-sm rounded-md"
              required
            />
          </div>
        </div>
  
        {/* Rating and SKU */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Rating:</label>
            <input
              type="number"
              name="rating"
              value={productData.rating}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-sm rounded-md"
              required
            />
          </div>
          <div>
            <label className="text-sm">SKU:</label>
            <input
              type="text"
              name="sku"
              value={productData.sku}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-sm rounded-md"
              required
            />
          </div>
        </div>
  
        {/* Dimensions and Weight */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm">Weight (kg):</label>
            <input
              type="number"
              name="weight"
              value={productData.weight}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-sm rounded-md"
              required
            />
          </div>
          <div>
            <label className="text-sm">Width (cm):</label>
            <input
              type="number"
              name="width"
              value={productData.dimensions.width}
              onChange={handleDimensionsChange}
              className="w-full p-2 bg-gray-700 text-sm rounded-md"
              required
            />
          </div>
          <div>
            <label className="text-sm">Height (cm):</label>
            <input
              type="number"
              name="height"
              value={productData.dimensions.height}
              onChange={handleDimensionsChange}
              className="w-full p-2 bg-gray-700 text-sm rounded-md"
              required
            />
          </div>
        </div>
  
        {/* Warranty and Shipping Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Warranty:</label>
            <input
              type="text"
              name="warrantyInformation"
              value={productData.warrantyInformation}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-sm rounded-md"
              required
            />
          </div>
          <div>
            <label className="text-sm">Shipping:</label>
            <input
              type="text"
              name="shippingInformation"
              value={productData.shippingInformation}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-sm rounded-md"
              required
            />
          </div>
        </div>
  
        {/* Availability and Return Policy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Availability:</label>
            <input
              type="text"
              name="availabilityStatus"
              value={productData.availabilityStatus}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-sm rounded-md"
              required
            />
          </div>
          <div>
            <label className="text-sm">Return Policy:</label>
            <input
              type="text"
              name="returnPolicy"
              value={productData.returnPolicy}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-sm rounded-md"
              required
            />
          </div>
        </div>
  
        {/* Minimum Order Quantity */}
        <div>
          <label className="text-sm">Minimum Order Quantity:</label>
          <input
            type="number"
            name="minimumOrderQuantity"
            value={productData.minimumOrderQuantity}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-sm rounded-md"
            required
          />
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-600 text-white text-sm rounded-md mt-4"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
  
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
  
};

export default AddProductForm;
