import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import ProductList from "./Components/ProductList";
import AddProductForm from "./Components/AddProductForm";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH PRODUCTS FROM API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // DELETE PRODUCT
  const deleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  // ADD PRODUCT
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: crypto.randomUUID(), // temporary ID
    };

    setProducts([productWithId, ...products]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header />

      <div className="max-w-3xl mx-auto my-6">
        <AddProductForm onAdd={addProduct} />
      </div>

      <div className="max-w-6xl mx-auto">
        <ProductList products={products} onDelete={deleteProduct} />
      </div>
    </div>
  );
}

export default App;
