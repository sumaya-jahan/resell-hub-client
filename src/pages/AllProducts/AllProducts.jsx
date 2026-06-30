import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllProducts = () => {
    const axiosSecure = useAxiosSecure();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axiosSecure
            .get("/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [axiosSecure]);

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h2 className="text-4xl font-bold text-center mb-10">
                All Products
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="card bg-base-100 shadow-xl"
                    >
                        <figure>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-56 w-full object-cover"
                            />
                        </figure>

                        <div className="card-body">
                            <h2 className="card-title">
                                {product.title}
                            </h2>

                            <p>
                                <span className="font-semibold">
                                    Category:
                                </span>{" "}
                                {product.category}
                            </p>

                            <p>
                                <span className="font-semibold">
                                    Condition:
                                </span>{" "}
                                {product.condition}
                            </p>

                            <p>
                                <span className="font-semibold">
                                    Price:
                                </span>{" "}
                                ${product.price}
                            </p>

                            <p className="line-clamp-2">
                                {product.description}
                            </p>

                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;