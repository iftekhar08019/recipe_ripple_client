import React from "react";
import logo from "../assets/logo.png";
import Lottie from "lottie-react";
import cookingAnimation from "../assets/Animation - 1748030630533.json";

const QAPhoneMockup = () => {
  return (
    <>
      <h1 className="lg:text-4xl text-xl font-bold text-center mt-15">
        Frequently Asked Questions
      </h1>
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto p-6 md:p-12 gap-10">
        {/* Left side: Q&A */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="space-y-4 ">
            <div>
              <h3 className="font-semibold text-xl">What is Recipe Ripple?</h3>
              <p>
                Recipe Ripple is a platform where you can find and share amazing
                recipes from around the world.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl">
                How do I submit a recipe?
              </h3>
              <p>
                You can submit recipes by registering and using the "Add Recipe"
                feature in your dashboard.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl">
                Can I save my favorite recipes?
              </h3>
              <p>
                Yes! You can like and save recipes to your profile for easy
                access later.
              </p>
            </div>
          </div>
        </div>

        {/* Right side: Phone mockup */}

        <div className="flex-1 justify-center md:justify-end hidden lg:block">
          <div className="mockup-phone border-primary ">
            <div className="mockup-phone-camera"></div>
            <div className="mockup-phone-display bg-[#fbfbfb] flex flex-col justify-center items-center">
                {" "}
                <a className="btn btn-ghost text-xl">
                  <img className="w-9" src={logo}></img>
                  <h1 className="text-sm">Recipe Ripple</h1>
                </a>
                <h1 className="text-2xl text-center">
                  Come and Cook <br />
                  With <br />
                  Recipe Ripple
                </h1>
                <div className="w-80 md:w-96">
                  <Lottie animationData={cookingAnimation} loop={true} />
                </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QAPhoneMockup;
