import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header
        className="relative h-96 bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?library')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Our Library
          </h1>
          <p className="mb-6 text-lg md:text-xl max-w-2xl">
            Explore, manage and borrow books with ease through our Library
            Management System.
          </p>
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="flex-1 py-12 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">
              Book Search and Borrowing
            </h3>
            <p className="text-gray-600">
              Find the books you need quickly and check them out effortlessly.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Member Management</h3>
            <p className="text-gray-600">
              Manage library members, their information and privileges with
              ease.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">
              Borrowing Records Tracking
            </h3>
            <p className="text-gray-600">
              Keep track of borrowed books and due dates in one convenient
              place.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <div className="font-semibold">Library Management System</div>
        <div>contact@library.com</div>
        <div className="text-sm mt-1">
          &copy; {new Date().getFullYear()} Library
        </div>
      </footer>
    </div>
  )
}
