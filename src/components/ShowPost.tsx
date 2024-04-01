/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from '@nextui-org/react'
import type { Session } from 'next-auth'
import type { ExtenderedPost } from '@/types'

interface Props {
  session: Session | null
}

export default function ShowPost({ session }: Props) {
  const searchParams = useSearchParams()
  const url = searchParams.get('post')
  const [post, setPost] = useState({} as ExtenderedPost)
  console.log(url)

  useEffect(() => {
    if (session) {
      const getPost = async () => {
        const res = await fetch(`/api/posts/${url}`)
        const post = (await res.json()) as ExtenderedPost
        setPost(post)
      }
      void getPost()
    }
  }, [session, url])

  return (
    <>
      {!url ? (
        <article className="col-start-2 col-end-6 hidden items-center justify-center rounded-xl border-2 border-dashed border-gray-200 md:flex">
          <h2 className="h-fit select-none text-center text-6xl text-gray-200">
            Haz click en una publicacion para verla
          </h2>
        </article>
      ) : (
        <article className="col-start-2 col-end-6 hidden items-center justify-center rounded-xl border-2 border-dashed border-gray-200 md:flex">
          <Card className="max-w-[450px] cursor-pointer">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-xl">{post?.title}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>{post?.content}</p>
            </CardBody>
            <CardBody>
              <h3>Mensajes:</h3>
              <Divider />
              {post?.messages?.map((message) => (
                <>
                  <p key={message?.id}>{message?.content}</p>
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
        </article>
      )}
    </>
  )
}
