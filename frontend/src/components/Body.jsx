import React from 'react'

function Body() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white text-center py-16">
        <h1 className="text-4xl font-bold">Welcome to My Website</h1>
        <p className="mt-4 text-xl">Your go-to platform for learning and growth.</p>
      </header>

      {/* Features Section */}
      <section className="px-6 py-16">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-medium text-blue-600">Interactive Tutorials</h3>
            <p className="mt-2 text-gray-600">Engage with our interactive lessons and tutorials designed to enhance your learning experience.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-medium text-blue-600">Real-Time Progress</h3>
            <p className="mt-2 text-gray-600">Track your learning progress in real-time and measure your growth over time.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-medium text-blue-600">Customized Learning Paths</h3>
            <p className="mt-2 text-gray-600">Create personalized learning paths tailored to your goals and preferences.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white text-center py-12">
        <h2 className="text-3xl font-semibold">Get Started</h2>
        <p className="mt-4 text-xl">Ready to start your learning journey? Sign up today and unlock all features!</p>
        <button
          onClick={() => alert('Sign up clicked!')}
          className="mt-6 px-8 py-3 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-500 transition"
        >
          Sign Up
        </button>
      </section>


    </div>
  )
}

export default Body