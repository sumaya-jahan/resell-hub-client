const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-blue-50 py-20">
                <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">

                    <div className="space-y-6">
                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                            Buy & Sell <br />
                            Second-Hand Products
                        </h1>

                        <p className="text-gray-600 max-w-xl">
                            ReSell Hub helps you buy quality used products and sell
                            unused items quickly, safely and affordably.
                        </p>

                        <button className="btn btn-primary">
                            Explore Products
                        </button>
                    </div>

                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=700"
                            alt="Marketplace"
                            className="rounded-xl shadow-lg"
                        />
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Home;