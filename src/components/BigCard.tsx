import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Input,
  Spinner,
} from '@nextui-org/react'
import type { ExtendedPost } from '@/types'

export default function PostBigCard({
  title,
  content,
  author,
  id,
}: ExtendedPost) {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PATCH',
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
    <form onSubmit={handleSubmit}>
      <Card className="min-h-[279px] max-w-[600px] lg:scale-125">
        {sending ? (
          <>
            <Spinner className="h-[210px]" />
          </>
        ) : (
          <>
            <CardHeader className="flex min-h-[76px] gap-3">
              <div className="flex flex-col">
                <p className="min-h-[32px] text-2xl font-bold">
                  {!success ? title : 'Felicidades!'}
                </p>
                <p className="text-small text-default-500">
                  {!success ? `@${author?.username}` : ''}
                </p>
              </div>
            </CardHeader>
            <Divider />
            {!success ? (
              <>
                <CardBody className="min-h-12">
                  {content?.split('\n')?.map((line, index) => (
                    <p key={index} className="text-base">
                      {line}
                    </p>
                  ))}
                </CardBody>
                <Divider />
                <CardBody>
                  <Input
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value)
                    }}
                    size="lg"
                    label="Dejar mensaje anonimo"
                  />
                </CardBody>
              </>
            ) : (
              <CardBody>
                <p>Tu mensaje anonimo se ha enviado satisfactoriamente.</p>
                <p>
                  Considera crearte una cuenta para tambien recibir mensajes!
                </p>
              </CardBody>
            )}
          </>
        )}
        <Divider />
        <CardFooter>
          {!success ? (
            <>
              <Button
                onClick={() => {
                  router.push('/')
                }}
                variant="faded"
              >
                Crear Cuenta
              </Button>

              <Button
                isDisabled={sending}
                type="submit"
                className="bg-ig hover:gradient-hover ml-auto text-white"
              >
                Publicar
              </Button>
            </>
          ) : (
            <Button
              className="bg-ig hover:gradient-hover ml-auto text-white"
              onClick={() => {
                router.push('/')
              }}
            >
              Crear Cuenta
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  )
}
