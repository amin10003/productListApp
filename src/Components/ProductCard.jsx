import React from "react";

function ProductCard({ product, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-3">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mx-auto"
      />

      <h3 className="font-bold text-lg">{product.title}</h3>

      <p className="text-sm text-gray-600 line-clamp-3">
        {product.description}
      </p>

      <div className="flex justify-between items-center">
        <span className="font-semibold text-green-600">${product.price}</span>
        

        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
