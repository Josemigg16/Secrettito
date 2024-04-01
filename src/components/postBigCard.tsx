import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Input,
  Spinner,
} from "@nextui-org/react"
import type { ExtendedPost } from "@/types"

export default function PostBigCard({
  title,
  content,
  author,
  id,
}: ExtendedPost) {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    const res = await fetch(`/api/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        message,
      }),
    })
    if (res.ok) {
      setSuccess(true)
      setSending(false)
    }
  }

  return (
    <Card className="max-w-[600px] min-h-[279px]">
      {sending ? (
        <>
          <Spinner className="h-[210px]" />
        </>
      ) : (
        <>
          <CardHeader className="flex gap-3 min-h-[76px]">
            <div className="flex flex-col">
              <p className="text-2xl font-bold min-h-[32px]">
                {!success ? title : "Felicidades!"}
              </p>
              <p className="text-small text-default-500">
                {!success ? `@${author?.username}` : ""}
              </p>
            </div>
          </CardHeader>
          <Divider />
          {!success ? (
            <>
              <CardBody className="min-h-12">
                {content?.split("\n").map((line, index) => (
                  <p key={index} className="text-base">
                    {line}
                  </p>
                ))}
              </CardBody>
              <Divider />
              <CardBody>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  size="lg"
                  label="Dejar mensaje anonimo"
                />
              </CardBody>
            </>
          ) : (
            <CardBody>
              <p>Tu mensaje anonimo se ha enviado satisfactoriamente.</p>
              <p>Considera crearte una cuenta para tambien recibir mensajes!</p>
            </CardBody>
          )}
        </>
      )}
      <Divider />
      <CardFooter>
        {!success ? (
          <>
            <Button onClick={() => router.push("/")} variant="faded">
              Crear Cuenta
            </Button>
            <form onSubmit={handleSubmit} className="ml-auto">
              <Button
                isDisabled={sending}
                type="submit"
                className="bg-ig text-white hover:gradient-hover"
              >
                Publicar
              </Button>
            </form>
          </>
        ) : (
          <Button
            className="bg-ig text-white hover:gradient-hover ml-auto"
            onClick={() => router.push("/")}
          >
            Crear Cuenta
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
