import React from 'react';

function AboutUs() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white text-center py-16">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-4 text-xl">Learn more about our mission and the team behind the platform.</p>
      </header>

      {/* Our Mission Section */}
      <section className="px-6 py-16">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Our Mission</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center">
          At [Company Name], our mission is to provide accessible, high-quality learning resources that empower individuals
          to achieve their full potential. We aim to create an inclusive learning environment where students can
          grow, learn, and succeed at their own pace.
        </p>
      </section>

      {/* Our Team Section */}
      <section className="bg-white px-6 py-16">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-medium text-blue-600">John Doe</h3>
            <p className="mt-2 text-gray-600">CEO & Founder</p>
            <p className="mt-2 text-gray-500">
              John is passionate about creating innovative learning solutions. He started the company to help people learn
              in a more engaging and accessible way.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-medium text-blue-600">Jane Smith</h3>
            <p className="mt-2 text-gray-600">CTO & Co-Founder</p>
            <p className="mt-2 text-gray-500">
              Jane focuses on the technical side of our platform, ensuring that everything runs smoothly and users have the
              best experience possible.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-medium text-blue-600">Sam Wilson</h3>
            <p className="mt-2 text-gray-600">Lead Developer</p>
            <p className="mt-2 text-gray-500">
              Sam leads the development team, working to improve and expand our platform, ensuring its scalability and
              reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-16 bg-blue-600 text-white">
        <h2 className="text-3xl font-semibold text-center mb-8">Get In Touch</h2>
        <p className="text-lg text-center max-w-2xl mx-auto mb-6">
          If you have any questions or would like to collaborate, feel free to contact us. We’d love to hear from you!
        </p>
        <div className="text-center">
          <button
            onClick={() => alert('Contact Us clicked!')}
            className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-500 transition"
          >
            Contact Us
          </button>
        </div>
      </section>


    </div>
  );
}

export default AboutUs;
