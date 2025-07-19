import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import BookIcon from '../assets/icons/BookIcon'
import UserIcon from '../assets/icons/UserIcon'
import RecordIcon from '../assets/icons/RecordIcon'
import Card from '../components/ui/Card'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header
        className="relative h-96 bg-center bg-cover"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?library')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Library</h1>
          <p className="mb-6 text-lg md:text-xl max-w-2xl">
            Explore, manage and borrow books with ease through our Library Management System.
          </p>
          <div className="flex gap-4">
            <Button as={Link} to="/login" className="bg-primary">
              Login
            </Button>
            <Button as={Link} to="/register" className="bg-secondary">
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="flex-1 py-12 px-4 bg-background">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          <Card className="text-center space-y-2">
            <BookIcon className="w-10 h-10 mx-auto text-primary" />
            <h3 className="text-xl font-semibold">Book Search and Borrowing</h3>
            <p className="text-gray-600">Find books quickly and check them out effortlessly.</p>
          </Card>
          <Card className="text-center space-y-2">
            <UserIcon className="w-10 h-10 mx-auto text-primary" />
            <h3 className="text-xl font-semibold">Member Management</h3>
            <p className="text-gray-600">Manage library members and privileges with ease.</p>
          </Card>
          <Card className="text-center space-y-2">
            <RecordIcon className="w-10 h-10 mx-auto text-primary" />
            <h3 className="text-xl font-semibold">Borrowing Records Tracking</h3>
            <p className="text-gray-600">Keep track of borrowed books and due dates in one place.</p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-4 mt-auto">
        <div className="font-semibold">Library Management System</div>
        <div>contact@library.com</div>
        <div className="text-sm mt-1">&copy; {new Date().getFullYear()} Library</div>
      </footer>
    </div>
  )
}
