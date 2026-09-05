import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const {
    createUser,
    updateUser,
    googleSignIn,
    loading,
  } = useAuth();

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "buyer",
    },
  });

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await createUser(data.email, data.password);

      await updateUser({
        displayName: data.name,
        photoURL: data.photo || "",
      });

      const userInfo = {
        name: data.name,
        email: data.email,
        photo: data.photo || "",
        role:
          data.role === "seller"
            ? "seller"
            : "buyer",
      };

      await axiosSecure.post("/users", userInfo);

      const jwtResponse =
        await axiosSecure.post("/jwt");

      localStorage.setItem(
        "access-token",
        jwtResponse.data.token
      );

      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Registration failed"
      );
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const selectedRole =
        getValues("role") === "seller"
          ? "seller"
          : "buyer";

      localStorage.setItem(
        "pending-google-role",
        selectedRole
      );

      await googleSignIn();
    } catch (error) {
      alert(
        error?.message ||
          "Google registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          Register
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              {...register("name", {
                required: "Name is required",
              })}
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered w-full"
              {...register("photo")}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <select
              className="select select-bordered w-full"
              {...register("role")}
            >
              <option value="buyer">
                Buyer
              </option>

              <option value="seller">
                Seller
              </option>
            </select>
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message:
                    "Password must be at least 6 characters",
                },
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              {...register("confirmPassword", {
                required:
                  "Confirm Password is required",
              })}
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          type="button"
          onClick={handleGoogleRegister}
          disabled={loading}
          className="btn btn-outline w-full"
        >
          Continue with Google
        </button>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;