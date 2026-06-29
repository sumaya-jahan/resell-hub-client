import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Login
                </h2>

                <form className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="input input-bordered w-full"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="input input-bordered w-full"
                    />

                    <button className="btn btn-primary w-full">
                        Login
                    </button>
                </form>

                <button className="btn btn-outline w-full mt-4">
                    Continue with Google
                </button>

                <p className="text-center mt-5">
                    New here?{" "}
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