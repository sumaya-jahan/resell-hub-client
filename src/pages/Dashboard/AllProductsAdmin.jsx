import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllProductsAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [products, setProducts] = useState([]);

    const loadProducts = () => {
        axiosSecure
            .get("/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axiosSecure.patch(`/products/approve/${id}`);
            alert("Product Approved");
            loadProducts();
        } catch (error) {
            console.error(error);
            alert("Approve failed");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/admin/products/${id}`);
            alert("Product Deleted");
            loadProducts();
        } catch (error) {
            console.error(error);
            alert("Delete failed");
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">
                Manage Products
            </h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.title}</td>

                                <td>{product.category}</td>

                                <td>৳{product.price}</td>

                                <td>
                                    {product.status || "pending"}
                                </td>

                                <td>
                                    {product.status !== "approved" && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleApprove(product._id)
                                            }
                                            className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer mr-2"
                                        >
                                            Approve
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(product._id)
                                        }
                                        className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllProductsAdmin;