/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Switch } from '@nextui-org/react'
import Image from 'next/image'

export default function ChooseLanguage({ className }) {

  return (
    <Switch
      className={className}
      size="lg"
      color="default"
      startContent={<p>En</p>}
      endContent={<p>Es</p>}
    >
      <Image src={'/lang.svg'} width='30' height='30' />
    </Switch>
  )
}
