import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/my-products/${user.email}`)
                .then((res) => {
                    console.log("Products:", res.data);
                    setProducts(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user, axiosSecure]);

    const handleDelete = (id) => {
        const proceed = confirm(
            "Are you sure you want to delete this product?"
        );

        if (!proceed) return;

        axiosSecure
            .delete(`/products/${id}`)
            .then((res) => {
                if (res.data.deletedCount > 0) {
                    alert("Product deleted successfully!");

                    const remainingProducts = products.filter(
                        (product) => product._id !== id
                    );

                    setProducts(remainingProducts);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h2 className="text-4xl font-bold text-center mb-10">
                My Products
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

                            <div className="card-actions justify-end">
                                <button
                                    onClick={() =>
                                        handleDelete(product._id)
                                    }
                                    className="btn btn-error"
                                >
                                    Delete
                                </button>

                                <Link
                                    to={`/dashboard/updateProduct/${product._id}`}
                                    className="btn btn-warning"
                                >
                                    Update
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProducts;