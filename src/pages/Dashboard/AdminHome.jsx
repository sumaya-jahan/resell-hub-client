import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminHome = () => {

    const axiosSecure = useAxiosSecure();

    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        orders: 0,
    });


    useEffect(() => {

        axiosSecure.get("/users")
            .then(res => {

                setStats(prev => ({
                    ...prev,
                    users: res.data.length
                }));

            });


        axiosSecure.get("/products")
            .then(res => {

                setStats(prev => ({
                    ...prev,
                    products: res.data.length
                }));

            });


        axiosSecure.get("/orders")
            .then(res => {

                setStats(prev => ({
                    ...prev,
                    orders: res.data.length
                }));

            });


    }, [axiosSecure]);



    return (

        <div>

            <h2 className="text-3xl font-bold mb-6">
                Admin Dashboard
            </h2>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


                <div className="p-6 bg-white shadow rounded-lg">

                    <h3 className="text-xl font-bold">
                        Total Users
                    </h3>

                    <p className="text-4xl mt-3">
                        {stats.users}
                    </p>

                </div>



                <div className="p-6 bg-white shadow rounded-lg">

                    <h3 className="text-xl font-bold">
                        Total Products
                    </h3>

                    <p className="text-4xl mt-3">
                        {stats.products}
                    </p>

                </div>



                <div className="p-6 bg-white shadow rounded-lg">

                    <h3 className="text-xl font-bold">
                        Total Orders
                    </h3>

                    <p className="text-4xl mt-3">
                        {stats.orders}
                    </p>

                </div>


            </div>


        </div>

    );

};


export default AdminHome;