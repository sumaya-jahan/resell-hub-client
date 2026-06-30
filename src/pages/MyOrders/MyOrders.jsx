import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/orders/${user.email}`)
                .then((res) => {
                    setOrders(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user, axiosSecure]);

    const handleCancelOrder = (id) => {
        const proceed = confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!proceed) return;

        axiosSecure
            .delete(`/orders/${id}`)
            .then((res) => {
                if (res.data.deletedCount > 0) {
                    alert("Order cancelled successfully!");

                    const remaining = orders.filter(
                        (order) => order._id !== id
                    );

                    setOrders(remaining);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h2 className="text-4xl font-bold text-center mb-10">
                My Orders
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="card bg-base-100 shadow-xl"
                    >
                        <figure>
                            <img
                                src={order.productImage}
                                alt={order.productTitle}
                                className="h-56 w-full object-cover"
                            />
                        </figure>

                        <div className="card-body">
                            <h2 className="card-title">
                                {order.productTitle}
                            </h2>
                            <p>
                                <span className="font-semibold">
                                    Price:
                                </span>{" "}
                                ${order.price}
                            </p>

                            <p>
                                <span className="font-semibold">
                                    Seller:
                                </span>{" "}
                                {order.sellerName}
                            </p>

                            <p>
                                <span className="font-semibold">
                                    Status:
                                </span>{" "}
                                {order.orderStatus}
                            </p>

                            <p>
                                <span className="font-semibold">
                                    Payment:
                                </span>{" "}
                                {order.paymentStatus}
                            </p>

                            <div className="card-actions justify-end">
                                <button
                                    onClick={() =>
                                        handleCancelOrder(order._id)
                                    }
                                    className="btn btn-error"
                                >
                                    Cancel Order
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;