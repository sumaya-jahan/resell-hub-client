import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset } = useForm();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        axiosSecure
            .get(`/products/${id}`)
            .then((res) => {
                setProduct(res.data);

                reset({
                    title: res.data.title,
                    category: res.data.category,
                    condition: res.data.condition,
                    price: res.data.price,
                    image: res.data.image,
                    description: res.data.description,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id, axiosSecure, reset]);

    const onSubmit = (data) => {
        axiosSecure
            .patch(`/products/${id}`, data)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    alert("Product updated successfully!");
                    navigate("/dashboard/myProducts");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

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

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <input
                    type="text"
                    className="input input-bordered w-full"
                    {...register("title", { required: true })}
                />

                <input
                    type="text"
                    className="input input-bordered w-full"
                    {...register("category", { required: true })}
                />

                <input
                    type="text"
                    className="input input-bordered w-full"
                    {...register("condition", { required: true })}
                />

                <input
                    type="number"
                    className="input input-bordered w-full"
                    {...register("price", { required: true })}
                />

                <input
                    type="text"
                    className="input input-bordered w-full"
                    {...register("image", { required: true })}
                />

                <textarea
                    className="textarea textarea-bordered w-full"
                    {...register("description", {
                        required: true,
                    })}
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