import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Wishlist = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/wishlist/${user.email}`)
                .then((res) => {
                    setWishlist(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user, axiosSecure]);

    const handleRemove = (id) => {
        const proceed = confirm(
            "Are you sure you want to remove this item?"
        );

        if (!proceed) return;

        axiosSecure
            .delete(`/wishlist/${id}`)
            .then((res) => {
                if (res.data.deletedCount > 0) {
                    alert("Removed from wishlist!");

                    const remaining = wishlist.filter(
                        (item) => item._id !== id
                    );

                    setWishlist(remaining);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h2 className="text-4xl font-bold text-center mb-10">
                Wishlist
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item) => (
                    <div
                        key={item._id}
                        className="card bg-base-100 shadow-xl"
                    >
                        <figure>
                            <img
                                src={item.productImage}
                                alt={item.productTitle}
                                className="h-56 w-full object-cover"
                            />
                        </figure>

                        <div className="card-body">
                            <h2 className="card-title">
                                {item.productTitle}
                            </h2>

                            <p>
                                <span className="font-semibold">
                                    Price:
                                </span>{" "}
                                ${item.price}
                            </p>

                            <p>
                                <span className="font-semibold">
                                    Seller:
                                </span>{" "}
                                {item.sellerName}
                            </p>

                            <div className="card-actions justify-end">
                                <button
                                    onClick={() =>
                                        handleRemove(item._id)
                                    }
                                    className="btn btn-error"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;