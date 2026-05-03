import React, { useState } from "react";

function AddProductForm({ onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: crypto.randomUUID(),
      name,
      price,
      image,
      description,
    };

    onAdd(newProduct);

    setName("");
    setPrice("");
    setImage("");
    setDescription("");
  };

  return (
    <form
      className="grid grid-cols-2 grid-rows-2 font-semibold p-6 gap-3 shadow-md  "
      onSubmit={handleSubmit}
    > 
    <h2 className="tex-3xl font-bold text-center  col-span-2">Add Product Form</h2>
      <input
        className="focus:outline-none focus:ring-2 p-2 rounded-md focus:ring-blue-500"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="focus:outline-none focus:ring-2  p-2 rounded-md focus:ring-blue-500"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="focus:outline-none focus:ring-2  p-2 rounded-md focus:ring-blue-500"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <input
        className="focus:outline-none focus:ring-2  p-2 rounded-md focus:ring-blue-500"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="px-4 py-2 text-white rounded-md font-semibold my-2 bg-blue-500 col-span-2 mx-auto " type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;
