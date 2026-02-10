import Lottie from "react-lottie";
import errorAnimation from "../../assets/Lottie Animations/404 Animation.json";
import { Link } from "react-router";
const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Lottie
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: errorAnimation,
                }}
                height={300}
                width={300}
            ></Lottie>
            <h1 className="text-3xl mt-8 mb-3 font-bold text-red-500">
                The page you are trying to access is not found.
            </h1>
            <p className="text-lg text-gray-600 mt-2 mb-6">
                Please contact the administrator if you believe this is an error.
            </p>
            <div className="my-3 space-x-3">
                <Link to="/" className="btn btn-primary text-accent">
                    {" "}
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default Error;