

import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function AddProductPage() {
	
	const [productId, setProductId] = useState("");
	const [name, setName] = useState("");
	const [altNames, setAltNames] = useState("");
	const [description, setDescription] = useState("");
	const [images, setImages] = useState([]);
	const [labellePrice, setLabelledPrice] = useState(0);
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);
    const navigate = useNavigate()

	async function AddProduct() {

        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("Please login first")
            return
        }

		if (images.length <= 0) {
			toast.error("Please select at least one image");
			return;
		}

		const promisesArray = [];

		for (let i = 0; i < images.length; i++) {
			promisesArray[i] = mediaUpload(images[i]);
		}
		try {
			const imageUrls = await Promise.all(promisesArray);
			console.log(imageUrls);

            const altNamesArray = altNames.split(",")

            const product = {
                productId : productId,
                name : name,
                altNames : altNamesArray,
                description : description,
                images : imageUrls,
                labellePrice : labellePrice,
                price : price,
                stock : stock,
            }
            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products", product , {
              //send token to server check admin or coustomer
                headers : {
                    "Authorization" : "Bearer "+token
                }
            }).then(() => {
                toast.success("Product added successfully")
                navigate("/admin/products")
            }).catch((e) => {
                toast.error(e.response.data.message)
            })

		} catch (e) {
			console.log(e);
		}
	}
	return (
		    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Add New Product</h2>
              <Link
                to="/admin/products"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                ← Back to Products
              </Link>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="productId" className="block text-sm font-medium text-gray-700 mb-1">
                    Product ID *
                  </label>
                  <input
                    type="text"
                    id="productId"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="altNames" className="block text-sm font-medium text-gray-700 mb-1">
                  Alternative Names (comma separated)
                </label>
                <input
                  type="text"
                  id="altNames"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={altNames}
                  onChange={(e) => setAltNames(e.target.value)}
                  placeholder="e.g. name1, name2, name3"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Images *
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Upload files</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          multiple
                          className="sr-only"
                          onChange={(e) => setImages(e.target.files)}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label htmlFor="labellePrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Labelled Price ($)
                  </label>
                  <input
                    type="number"
                    id="labellePrice"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={labellePrice}
                    onChange={(e) => setLabelledPrice(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Selling Price ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    id="stock"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <Link
                to="/admin/products"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </Link>
              <button
                onClick={AddProduct}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

	);
}