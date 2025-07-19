import Card from './ui/Card'

export default function MemberCard({ member, children }) {
  return (
    <Card className="space-y-1">
      <h3 className="font-semibold">{member.fullName}</h3>
      <p className="text-sm text-gray-600">{member.contactInfo}</p>
      {children}
    </Card>
  )
}
