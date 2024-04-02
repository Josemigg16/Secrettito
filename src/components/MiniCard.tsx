import { useRouter, useSearchParams } from 'next/navigation'
import DropdownMiniCard from '@/components/DropdownMiniCard'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
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
    <article className="relative transition-transform hover:scale-105">
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
            <div className="flex flex-col">
              <p className="text-3xl">{post.title}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-pretty text-lg">{post.content}</p>
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
      </Button>
    </article>
  )
}
