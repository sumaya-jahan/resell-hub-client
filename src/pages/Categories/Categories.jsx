import { Link } from "react-router-dom";

const Categories = () => {
  const categories = ["Electronics", "Furniture", "Fashion", "Books", "Sports", "Others"];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-3">Product Categories</h1>
      <p className="text-gray-600 mb-8">Browse second-hand products by category.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/products?category=${encodeURIComponent(category)}`}
            className="border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{category}</h2>
            <p className="text-gray-500 mt-2">Explore available {category.toLowerCase()} items.</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
