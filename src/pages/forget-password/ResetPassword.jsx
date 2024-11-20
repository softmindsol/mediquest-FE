import { Link } from "react-router-dom";

const ResetPassword = () => {
  //   const location = useLocation();
  //   const email = location.state?.email || "";
  //   console.log("🚀 ~ ResetPassword ~ email:", email);

  return (
    <section className="flex h-[100vh] items-center">
      <div className="w-[75%] mx-auto rounded-3xl bg-white shadow-[0px_-4px_10px_rgba(0,0,0,0.1)] drop-shadow-xl">
        <form className="flex flex-col items-center justify-center w-full py-12">
          <div className="max-w-screen-md w-[70%]">
            <div className="flex flex-col items-center justify-center">
              <h1 className="mb-6 font-semibold text-center lg:text-[32px] text-title-md text-black-2 ">
                Reset Email
              </h1>
              <p className="text-center lg:text-title-xsm text-title-p text-secondary mb-13">
                Please check your email for a message with the link to reset
                your password.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center mt-6 font-sans text-gray-700">
              <p>We sent the link to:</p>
              <p>{"taimoorhussain985@gmail.com"}</p>
            </div>

            <div className="flex justify-center">
              <Link to="/sign-in">
                <button
                  type="button"
                  className="bg-[#007AFF] hover:bg-[rgb(0,94,255)] text-white rounded-[20px]  text-2xl font-semibold mb-8 py-4 px-16 mt-6"
                >
                  Back
                </button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4 mb-4">
              <p className="text-center text-text-p font-normal text-[#3F3F3F] mt-12">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-[#0047FF] whitespace-nowrap"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
