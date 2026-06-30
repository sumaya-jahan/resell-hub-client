import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ProductDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const [product, setProduct] = useState({});

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

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <div className="card lg:card-side bg-base-100 shadow-xl">

                <figure className="lg:w-1/2">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                    />
                </figure>

                <div className="card-body">
                    <h2 className="card-title text-3xl">
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

                    <p>
                        <span className="font-semibold">
                            Seller:
                        </span>{" "}
                        {product.sellerName}
                    </p>

                    <p>
                        <span className="font-semibold">
                            Email:
                        </span>{" "}
                        {product.sellerEmail}
                    </p>

                    <p>
                        <span className="font-semibold">
                            Description:
                        </span>
                    </p>

                    <p>{product.description}</p>

                    <div className="card-actions mt-4">
                        <button className="btn btn-primary">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;