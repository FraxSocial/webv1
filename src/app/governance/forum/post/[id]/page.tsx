import { ForumPost, ForumComment } from '@/types/forum'
import ForumPostDetail from '@/components/governance/ForumPostDetail'

// Mock data - Replace with actual API calls
const mockPost: ForumPost = {
  id: '1',
  title: 'Proposal for New Governance Model',
  content:
    'I think we should consider implementing a new governance model that better represents our international community...',
  authorId: '1',
  authorName: 'Alice Chen',
  language: 'en',
  createdAt: new Date('2024-02-14T10:00:00'),
  updatedAt: new Date('2024-02-14T10:00:00'),
  likes: 42,
  dislikes: 5,
  commentCount: 15,
  tags: ['governance', 'proposal', 'community'],
}

const mockComments: ForumComment[] = [
  {
    id: '1',
    postId: '1',
    content: 'This is a great proposal! I especially like the focus on international representation.',
    authorId: '2',
    authorName: 'Bob Smith',
    createdAt: new Date('2024-02-14T11:00:00'),
    updatedAt: new Date('2024-02-14T11:00:00'),
    likes: 12,
    dislikes: 1,
  },
  {
    id: '2',
    postId: '1',
    content: 'I agree with the general direction, but we need more specific details.',
    authorId: '3',
    authorName: 'Carol White',
    createdAt: new Date('2024-02-14T12:00:00'),
    updatedAt: new Date('2024-02-14T12:00:00'),
    likes: 8,
    dislikes: 2,
  },
]

export default async function PostPage({ params }: { params: { id: string } }) {
  // TODO: Fetch post and comments from API
  return <ForumPostDetail post={mockPost} initialComments={mockComments} />
}
