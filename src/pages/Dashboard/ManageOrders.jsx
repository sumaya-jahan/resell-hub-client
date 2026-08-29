import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // ================================
    // LOAD SELLER ORDERS
    // ================================
    useEffect(() => {
        if (!user?.email) {
            setLoading(false);
            return;
        }

        setLoading(true);

        axiosSecure
            .get(
                `/seller-orders?email=${encodeURIComponent(
                    user.email
                )}`
            )
            .then((res) => {
                console.log("SELLER ORDERS:", res.data);

                setOrders(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("LOAD ORDERS ERROR:", error);
                setLoading(false);
            });
    }, [user?.email, axiosSecure]);

    // ================================
    // UPDATE ORDER STATUS
    // ================================
    const updateStatus = async (id, newStatus) => {
        try {
            const res = await axiosSecure.patch(
                `/orders/${id}`,
                {
                    status: newStatus,
                    orderStatus: newStatus,
                }
            );

            console.log("UPDATE RESPONSE:", res.data);

            if (res.data.modifiedCount > 0) {
                setOrders((previousOrders) =>
                    previousOrders.map((order) =>
                        order._id === id
                            ? {
                                ...order,
                                status: newStatus,
                                orderStatus: newStatus,
                            }
                            : order
                    )
                );

                alert(`Order ${newStatus}`);
            } else {
                alert("Order status was not changed");
            }
        } catch (error) {
            console.log("UPDATE STATUS ERROR:", error);
            alert("Failed to update order");
        }
    };

    // ================================
    // LOADING
    // ================================
    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    // ================================
    // PAGE
    // ================================
    return (
        <div className="w-full">

            <h2 className="text-3xl font-bold mb-6">
                Manage Orders
            </h2>

            {orders.length === 0 ? (
                <div className="p-6 bg-white shadow rounded-lg">
                    <p className="text-lg">
                        No orders found.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white shadow rounded-lg">

                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Buyer</th>
                                <th>Email</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => {

                                const currentStatus =
                                    order.status ||
                                    order.orderStatus ||
                                    "Pending";

                                return (
                                    <tr key={order._id}>

                                        {/* PRODUCT */}
                                        <td>
                                            <div className="font-semibold">
                                                {order.productTitle ||
                                                    "Product"}
                                            </div>
                                        </td>

                                        {/* BUYER */}
                                        <td>
                                            {order.buyerName ||
                                                "Buyer"}
                                        </td>

                                        {/* EMAIL */}
                                        <td>
                                            {order.buyerEmail ||
                                                "N/A"}
                                        </td>

                                        {/* PRICE */}
                                        <td>
                                            ৳{order.price || 0}
                                        </td>

                                        {/* STATUS */}
                                        <td>
                                            <span className="font-semibold">
                                                {currentStatus}
                                            </span>
                                        </td>

                                        {/* ACTION */}
                                        <td>
                                            <div className="flex flex-wrap gap-2">

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            order._id,
                                                            "Accepted"
                                                        )
                                                    }
                                                    className="btn btn-sm btn-success"
                                                >
                                                    Accept
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            order._id,
                                                            "Rejected"
                                                        )
                                                    }
                                                    className="btn btn-sm btn-error"
                                                >
                                                    Reject
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            order._id,
                                                            "Processing"
                                                        )
                                                    }
                                                    className="btn btn-sm btn-warning"
                                                >
                                                    Processing
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            order._id,
                                                            "Shipped"
                                                        )
                                                    }
                                                    className="btn btn-sm btn-info"
                                                >
                                                    Shipped
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            order._id,
                                                            "Delivered"
                                                        )
                                                    }
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    Delivered
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageOrders;