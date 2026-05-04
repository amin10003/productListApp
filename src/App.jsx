import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import ProductList from "./Components/ProductList";
import AddProductForm from "./Components/AddProductForm";

function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // FETCH PRODUCTS FROM API
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await fetch("https://fakestoreapi.com/products");
  //       const data = await res.json();
  //       setProducts(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (products.length === 0) {
          const res = await fetch("https://fakestoreapi.com/products");
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  //saving local storage

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

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
  const filteredProducts = products
    .filter((p) => (category === "all" ? true : p.category === category))
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header />

      <div className="max-w-3xl mx-auto my-6">
        <AddProductForm onAdd={addProduct} />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="max-w-6xl mx-auto mb-6 flex flex-col gap-4">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />

          {/* CATEGORY FILTER */}
          <div className="flex gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded ${
                  category === cat ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <ProductList products={filteredProducts} onDelete={deleteProduct} />
      </div>
    </div>
  );
}

export default App;
