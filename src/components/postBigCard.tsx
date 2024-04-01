import type { ExtendedPost } from "@/types"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Input,
} from "@nextui-org/react"

export default function PostBigCard({ title, content, author }: ExtendedPost) {
  return (
    <Card className="max-w-[600px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-xl">{title}</p>
          <p className="text-small text-default-500">@{author?.username}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        {content?.split("\n").map((line, index) => (
          <p key={index} className="text-base">
            {line}
          </p>
        ))}
      </CardBody>
      <Divider />
      <CardFooter>
        <Input label="Dejar mensaje anonimo" />
      </CardFooter>
    </Card>
  )
}
