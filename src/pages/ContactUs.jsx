import { useState } from "react";
import Swal from "sweetalert2";

export const ContactUs = () => {
  const images = [
    {
      url: "https://www.allrecipes.com/thmb/vKNCJ1HzhbSbVMKQpl5WMKmQd2o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/140286_HomemadeDogFood_DDMFS_Beauty_011-c71737ec9ea144b19a2a308e6dc1c90a.jpg",
    },
    {
      url: "https://img.freepik.com/free-photo/top-view-delicious-cooked-vegetables-sliced-with-different-seasonings-dark-background-sauce-soup-food-meal-vegetable_140725-85840.jpg?semt=ais_hybrid&w=740",
    },
    {
      url: "https://www.foodandwine.com/thmb/_hAGHWoWp1DjuwBFEpgYLd_8Fvc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Lightnin-Fast-Weeknight-Skillet-Chili-XL-RECIPE0124-db836a8ab3534b2eb9f337be8de9f21e.jpg",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here you could add actual send logic (e.g., API call)...

    // Show success alert
    await Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for contacting us. We'll get back to you soon.",
      confirmButtonColor: "#7c3aed", // matches your purple accent
    });

    // Clear form fields after alert closes
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-8"
          noValidate
        >
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple-accent-400"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple-accent-400"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-700 font-semibold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-deep-purple-accent-400"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 w-full"
          >
            Send
          </button>
        </form>

        {/* Images */}
        <div className="space-y-8 flex flex-col items-center">
          {images.map(({ url }, idx) => (
            <img
              key={idx}
              src={url}
              alt={`Image ${idx + 1}`}
              className="w-64 h-40 rounded-lg object-cover shadow-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
