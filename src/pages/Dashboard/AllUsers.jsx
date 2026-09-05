import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadUsers = async (searchText = "") => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/users", {
        params: { search: searchText },
      });
      setUsers(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadUsers(search);
  };

  const handleStatus = async (user) => {
    if (user.email === currentUser?.email) {
      alert("You cannot block your own admin account");
      return;
    }

    const status = user.status === "blocked" ? "active" : "blocked";

    try {
      await axiosSecure.patch(`/users/status/${user._id}`, { status });
      alert(status === "blocked" ? "User blocked successfully" : "User unblocked successfully");
      loadUsers(search);
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to update user status");
    }
  };

  const handleDelete = async (user) => {
    if (user.email === currentUser?.email) {
      alert("You cannot delete your own admin account");
      return;
    }

    if (!window.confirm(`Delete ${user.name || user.email}?`)) return;

    try {
      await axiosSecure.delete(`/users/${user._id}`);
      alert("User deleted successfully");
      loadUsers(search);
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-5">Manage Users</h2>

      <form onSubmit={handleSearch} className="flex flex-wrap gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
        <button type="submit" className="btn btn-primary">Search</button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setSearch("");
            loadUsers("");
          }}
        >
          Reset
        </button>
      </form>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isCurrentAdmin = user.email === currentUser?.email;
                const isBlocked = user.status === "blocked";

                return (
                  <tr key={user._id}>
                    <td>{user.name || "N/A"}</td>
                    <td>{user.email}</td>
                    <td className="capitalize">{user.role || "buyer"}</td>
                    <td className={isBlocked ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>
                      {isBlocked ? "Blocked" : "Active"}
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleStatus(user)}
                          disabled={isCurrentAdmin}
                          className={isBlocked ? "btn btn-sm btn-success" : "btn btn-sm btn-warning"}
                        >
                          {isBlocked ? "Unblock" : "Block"}
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          disabled={isCurrentAdmin}
                          className="btn btn-sm btn-error"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
