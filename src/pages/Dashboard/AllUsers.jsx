import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);

    const loadUsers = () => {
        axiosSecure.get("/users")
            .then(res => {
                setUsers(res.data);
            });
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleDelete = async (id) => {
        await axiosSecure.delete(`/users/${id}`);
        loadUsers();
    };

    const handleRole = async (id, role) => {
        await axiosSecure.patch(`/users/${id}`, { role });
        loadUsers();
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-5">
                Manage Users
            </h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>

                                <td className="space-x-2">
                                    <button
                                        onClick={() =>
                                            handleRole(user._id, "admin")
                                        }
                                        className="btn btn-sm btn-primary"
                                    >
                                        Make Admin
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(user._id)
                                        }
                                        className="btn btn-sm btn-error"
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

export default AllUsers;