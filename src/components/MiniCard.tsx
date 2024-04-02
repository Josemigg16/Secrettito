import { useRouter, useSearchParams } from 'next/navigation'
import DropdownMiniCard from '@/components/DropdownMiniCard'
import {
  Card,
  CardHeader,
  CardFooter,
  Divider,
  Button,
} from '@nextui-org/react'
import type { ExtendedPost } from '@/types'

interface Props {
  post: ExtendedPost
}

export default function PostMiniCard({ post }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  return (
    <article
      id={post.id}
      className="relative transition-transform hover:scale-105"
    >
      <DropdownMiniCard post={post} />
      <Button
        variant="light"
        isDisabled={searchParams.get('post') === post?.url}
        onClick={() => {
          router.push(`/dashboard?post=${post?.url}`)
        }}
        className="block h-fit w-full px-0"
      >
        <Card id="post-card" className="max-w-[450px] cursor-pointer">
          <CardHeader className="flex gap-3">
            <div className="flex w-full flex-col">
              <h3 className="w-2/3 overflow-hidden text-ellipsis text-start text-3xl">
                {post.title}
              </h3>
            </div>
          </CardHeader>
          <Divider />
          <CardFooter>
            <p className="text-pretty break-all text-lg">{post.content}</p>
          </CardFooter>
          <Divider />
        </Card>
      </Button>
    </article>
  )
}
