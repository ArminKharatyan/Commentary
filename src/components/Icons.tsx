import { LucideProps, MessageSquare, User } from 'lucide-react'

export const Icons = {
  user: User,
  google: (props: LucideProps) => (
    <svg {...props} viewBox='0 0 24 24'>
      {/* Google icon paths */}
    </svg>
  ),
  commentReply: MessageSquare,
}
