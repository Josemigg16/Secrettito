import { useRouter } from "next/navigation"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react"

interface Props {
  title: string | null
  content: string | null
  url: string | null
}

export default function PostMiniCard({ title, content, url }: Props) {
  const router = useRouter()

  return (
    <button
    onClick={()=> router.push(`/dashboard/${url}`)}
    className="w-full block">
      <Card id="post-card" className="max-w-[450px] cursor-pointer">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-xl">{title}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{content}</p>
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
