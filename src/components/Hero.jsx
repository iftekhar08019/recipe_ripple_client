import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const slides = [
  {
    url: "https://www.allrecipes.com/thmb/vKNCJ1HzhbSbVMKQpl5WMKmQd2o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/140286_HomemadeDogFood_DDMFS_Beauty_011-c71737ec9ea144b19a2a308e6dc1c90a.jpg",
    title: "Homemade Dog Food",
    description: "Nutritious and delicious meals for your furry friend.",
  },
  {
    url: "https://img.freepik.com/free-photo/top-view-delicious-cooked-vegetables-sliced-with-different-seasonings-dark-background-sauce-soup-food-meal-vegetable_140725-85840.jpg?semt=ais_hybrid&w=740",
    title: "Cooked Vegetables",
    description: "Freshly prepared vegetables with perfect seasoning.",
  },
  {
    url: "https://www.foodandwine.com/thmb/_hAGHWoWp1DjuwBFEpgYLd_8Fvc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Lightnin-Fast-Weeknight-Skillet-Chili-XL-RECIPE0124-db836a8ab3534b2eb9f337be8de9f21e.jpg",
    title: "Skillet Chili",
    description: "Quick and easy skillet chili for busy weeknights.",
  },
  {
    url: "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/spring_pea_salad_with_84930_16x9.jpg",
    title: "Spring Pea Salad",
    description: "Refreshing salad perfect for spring and summer days.",
  },
  {
    url: "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/chicken_lemon_potatoes_54019_16x9.jpg",
    title: "Chicken Lemon Potatoes",
    description: "Delicious lemon chicken paired with crispy potatoes.",
  },
];

const HeroSlider = () => {
  return (
    <div className="w-full flex justify-center py-12 bg-gray-100">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="max-w-[1100px]"
      >
        {slides.map(({ url, title, description }, index) => (
          <SwiperSlide
            key={index}
            className="relative bg-white rounded-lg overflow-hidden cursor-pointer"
            style={{ width: "650px", height: "410px", boxShadow: "0 8px 15px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.06)" }}
          >
            <img
              src={url}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Text overlay */}
            <div className="hero-overlay absolute inset-0 flex flex-col justify-center items-center p-4 text-center text-white">
              <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
              <p className="text-sm sm:text-base mt-1">{description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
