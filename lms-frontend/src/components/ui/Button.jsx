export default function Button({ as = 'button', children, className = '', ...props }) {
  const Component = as
  return (
    <Component
      className={`px-6 py-3 rounded-md font-semibold text-white transition-colors hover:opacity-90 active:opacity-80 ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
