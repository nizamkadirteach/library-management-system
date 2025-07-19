export default function FineNotice({ amount }) {
  if (amount == null) return null
  const exceed = parseFloat(amount) > 10
  const base = 'text-sm font-medium px-2 py-1 rounded'
  const classes = exceed
    ? `bg-red-100 text-red-700 ${base}`
    : `bg-yellow-100 text-yellow-700 ${base}`
  return <div className={classes}>Fines: ${amount.toFixed(2)}</div>
}
