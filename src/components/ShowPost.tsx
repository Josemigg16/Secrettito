import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react"
import type { Session } from "next-auth"
import type { ExtenderedPost } from "@/types"

interface Props {
  session: Session | null
}

export default function ShowPost({ session }: Props) {
  const pathname = usePathname()
  const [, , link] = pathname?.split("/")
  const [post, setPost] = useState({} as ExtenderedPost)

  useEffect(() => {
    if (session) {
      const getPost = async () => {
        const res = await fetch(`/api/posts/${link}`)
        const post = await res.json()
        setPost(post)
      }
      getPost()
    }
  }, [session])

  return (
    <Card className="max-w-[450px] cursor-pointer">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-xl">{post.title}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{post.content}</p>
      </CardBody>
      <CardBody>
        <h3>Mensajes:</h3>
        <Divider />
        {post.messages?.map((message) => (
          <>
            <p key={message.id}>{message.content}</p>
            <Divider />
          </>
        ))}
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Ir a la publicación
        </Link>
      </CardFooter>
    </Card>
  )
}
