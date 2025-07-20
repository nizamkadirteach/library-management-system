import { Link } from 'react-router-dom'

// Added optional `to` prop so logo link can be customized
export default function Logo({ size = 'medium', variant = 'navbar', to = '/' }) {
  const sizeClasses = {
    small: 'w-8',
    medium: 'w-16',
    large: 'w-40',
  }

  const variantClasses = {
    hero: 'mx-auto mb-4 drop-shadow-lg hover:drop-shadow-xl transition',
    navbar: 'inline-block',
    auth: 'mx-auto mb-4',
  }

  const sizeClass = sizeClasses[size] || sizeClasses.medium
  const variantClass = variantClasses[variant] || ''

  return (
    // 📌 Reusable logo for all pages
    <Link to={to} className={variant === 'navbar' ? 'block' : undefined}>
      <img
        src="/logo.png"
        alt="Library Logo"
        className={`${sizeClass} ${variantClass}`}
      />
    </Link>
  )
}
