import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
    const { signIn, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(() => {
                return axiosSecure.patch("/users", {
                    email: data.email,
                });
            })
            .then(() => {
                return axiosSecure.post("/jwt", {
                    email: data.email,
                });
            })
            .then((res) => {
                console.log(res.data);

                localStorage.setItem(
                    "access-token",
                    res.data.token
                );

                alert("Login Successful");
                navigate("/");
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const loggedUser = result.user;

                return axiosSecure
                    .patch("/users", {
                        email: loggedUser.email,
                    })
                    .then(() => loggedUser);
            })
            .then((loggedUser) => {
                return axiosSecure.post("/jwt", {
                    email: loggedUser.email,
                });
            })
            .then((res) => {
                console.log(res.data);

                localStorage.setItem(
                    "access-token",
                    res.data.token
                );

                alert("Google Login Successful");
                navigate("/");
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Login
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                    >
                        Login
                    </button>
                </form>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="btn btn-outline w-full mt-4"
                >
                    Continue with Google
                </button>

                <p className="text-center mt-5">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;