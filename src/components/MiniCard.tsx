import { useRouter } from 'next/navigation'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link
} from '@nextui-org/react'
import type { ExtendedPost } from '@/types'

interface Props {
  post: ExtendedPost
}

export default function PostMiniCard ({ post }: Props) {
  const router = useRouter()

  return (
    <button
    onClick={() => { router.push(`/dashboard?post=${post?.url}`) }}
    className="w-full block">
      <Card id="post-card" className="max-w-[450px] cursor-pointer">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-xl">{post.title}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{post.content}</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            Visit source code on GitHub.
          </Link>
        </CardFooter>
      </Card>
    </button>
  )
}
