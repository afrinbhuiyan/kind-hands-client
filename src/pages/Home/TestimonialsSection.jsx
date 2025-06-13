import React from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "Fringillo phasellus faucibus scelerisque eleifend donec pretium. Nunc congue nisi vitae suscipit tellus duis ultricies lacus sed turpis tincidunt id.",
      name: "Brusilee",
      role: "Doctor",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      quote:
        "Ut diam quam nulla porttitor. Diam volutpat commodo sed egestas aliquam sem fringilla ut. Lacus vel facilisis volutpat est velit egestas dui.",
      name: "Cathrine",
      role: "Manager",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    },
    {
      id: 3,
      quote:
        "Mattis molestie a loculis at erat pellentesque adipiscing commodo. Cursus magna fermentum loculis eu non diam phasellus.",
      name: "Edward",
      role: "Lawyer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif font-medium text-center text-gray-900 dark:text-white mb-16 px-8 relative">
          <span className="relative inline-block px-6 py-2">
            <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#074c61] dark:border-[#6bd3f3]"></span>
            <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#074c61] dark:border-[#6bd3f3]"></span>
            Hear Their Stories
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative px-8 py-6 bg-white dark:bg-gray-800 h-full group  border border-[#6bd3f3bb] overflow-hidden transition-all duration-300 hover:border-transparent hover:scale-[1.02]"
            >
              {/* Animated borders */}
              <div className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#074c61] to-[#6bd3f3] group-hover:w-full transition-all duration-500"></div>
              <div className="absolute bottom-0 right-0 h-0.5 w-0 bg-gradient-to-l from-[#074c61] to-[#6bd3f3] group-hover:w-full transition-all duration-500 delay-100"></div>
              <div className="absolute top-0 left-0 w-0 h-0 bg-gradient-to-b from-[#074c61] to-[#6bd3f3] group-hover:h-full group-hover:w-0.5 transition-all duration-500 delay-200"></div>
              <div className="absolute bottom-0 right-0 w-0 h-0 bg-gradient-to-t from-[#074c61] to-[#6bd3f3] group-hover:h-full group-hover:w-0.5 transition-all duration-500 delay-300"></div>

              <div className="relative h-full flex flex-col z-10">
                <div className="absolute -top-4 -left-4 text-8xl opacity-10 text-[#074c61] dark:text-[#6bd3f3] font-serif">
                  "
                </div>

                <p className="text-gray-700 dark:text-gray-300 italic text-lg mb-6 leading-relaxed flex-grow relative z-10">
                  {testimonial.quote}
                </p>

                <div className="flex flex-row-reverse justify-between items-center mt-6">
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-[#074c61] dark:border-[#6bd3f3] transition-all duration-300 group-hover:scale-110 group-hover:shadow-md"
                      loading="lazy"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#074c61] dark:bg-[#6bd3f3] rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold dark:text-white text-xl text-[#074c61] dark:text-[#6bd3f3]">
                      {testimonial.name}
                    </h3>
                    <p className="text-[#074c61] dark:text-[#6bd3f3] text-sm opacity-80">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
