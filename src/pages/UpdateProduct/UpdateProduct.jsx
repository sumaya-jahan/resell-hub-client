import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateProduct = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        axiosSecure
            .get(`/products/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id, axiosSecure]);

    if (!product) {
        return (
            <div className="text-center py-10">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
            <h2 className="text-3xl font-bold text-center mb-6">
                Update Product
            </h2>
            <form className="space-y-4">
                <input
                    type="text"
                    defaultValue={product.title}
                    className="input input-bordered w-full"
                />

                <input
                    type="text"
                    defaultValue={product.category}
                    className="input input-bordered w-full"
                />

                <input
                    type="text"
                    defaultValue={product.condition}
                    className="input input-bordered w-full"
                />

                <input
                    type="number"
                    defaultValue={product.price}
                    className="input input-bordered w-full"
                />

                <input
                    type="text"
                    defaultValue={product.image}
                    className="input input-bordered w-full"
                />

                <textarea
                    defaultValue={product.description}
                    className="textarea textarea-bordered w-full"
                ></textarea>

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;