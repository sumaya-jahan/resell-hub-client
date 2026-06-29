const Register = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Register
                </h2>

                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="input input-bordered w-full"
                    />

                    <input
                        type="text"
                        placeholder="Photo URL"
                        className="input input-bordered w-full"
                    />

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

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="input input-bordered w-full"
                    />

                    <button className="btn btn-primary w-full">
                        Register
                    </button>
                </form>

                <button className="btn btn-outline w-full mt-4">
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default Register;