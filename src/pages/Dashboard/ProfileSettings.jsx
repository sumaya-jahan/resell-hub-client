import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";

const ProfileSettings = () => {
  const { user, updateUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role] = useRole();

  const [name, setName] = useState(
    user?.displayName || user?.name || ""
  );

  const [photo, setPhoto] = useState(
    user?.photoURL || user?.image || ""
  );

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      await axiosSecure.patch("/profile", {
        name,
        photo,
      });

      await updateUser({
        displayName: name,
        photoURL: photo,
      });

      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Profile Settings
      </h2>

      <div className="bg-white text-gray-900 rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <img
            src={
              photo ||
              "https://i.ibb.co/2Y0P8LT/user.png"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-orange-200"
          />

          <h3 className="text-2xl font-bold mt-4 text-gray-900">
            {name || "ReSell Hub User"}
          </h3>

          <span className="badge badge-primary mt-2 capitalize">
            {role || "user"}
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="input input-bordered w-full bg-white text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              Email
            </label>

            <input
              type="email"
              value={user?.email || ""}
              className="input input-bordered w-full bg-gray-100 text-gray-700"
              disabled
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              Photo URL
            </label>

            <input
              type="url"
              value={photo}
              onChange={(e) =>
                setPhoto(e.target.value)
              }
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full bg-white text-gray-900"
            />
          </div>

          {message && (
            <p
              className={`font-medium ${
                message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary w-full"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;