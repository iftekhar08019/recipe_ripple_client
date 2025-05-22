import React from "react";

const QAPhoneMockup = () => {
  return (
    <>
      <h1 className="lg:text-4xl text-xl font-bold text-center mt-15">
        Frequently Asked Questions
      </h1>
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto p-6 md:p-12 gap-10">
        {/* Left side: Q&A */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="space-y-4 text-gray-700">
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
                <h1 className="text-2xl text-center">Come and Cook <br />With <br />Recipe Ripple</h1>
              <img
                alt="wallpaper"
                src="https://cdn.dribbble.com/userupload/27165894/file/original-0a90d009f3864792265734f1ddfed3a5.gif"
               
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QAPhoneMockup;
