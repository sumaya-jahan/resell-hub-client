import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const AddProduct = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const onSubmit = (data) => {
        const productInfo = {
            title: data.title,
            category: data.category,
            condition: data.condition,
            price: parseFloat(data.price),
            image: data.image,
            description: data.description,
            sellerName: user?.displayName,
            sellerEmail: user?.email,
            status: "available",
            createdAt: new Date(),
        };

        axiosSecure
            .post("/products", productInfo)
            .then((res) => {
                if (res.data.insertedId) {
                    alert("Product Added Successfully");
                    reset();
                }
            })
            .catch((error) => {
                alert(error.message);
            });

    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
            <h2 className="text-3xl font-bold text-center mb-6">
                Add Product
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <input
                    type="text"
                    placeholder="Product Title"
                    className="input input-bordered w-full"
                    {...register("title", { required: true })}
                />

                <input
                    type="text"
                    placeholder="Category"
                    className="input input-bordered w-full"
                    {...register("category", { required: true })}
                />

                <select
                    className="select select-bordered w-full"
                    {...register("condition", { required: true })}
                >
                    <option value="">Select Condition</option>
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                </select>

                <input
                    type="number"
                    placeholder="Price"
                    className="input input-bordered w-full"
                    {...register("price", { required: true })}
                />

                <input
                    type="text"
                    placeholder="Image URL"
                    className="input input-bordered w-full"
                    {...register("image", { required: true })}
                />

                <textarea
                    placeholder="Description"
                    className="textarea textarea-bordered w-full"
                    {...register("description", { required: true })}
                ></textarea>

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;