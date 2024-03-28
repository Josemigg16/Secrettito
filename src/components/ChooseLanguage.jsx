'use client'
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Switch } from '@nextui-org/react'
import { Lang } from './svg/Lang'
export default function ChooseLanguage({ className }) {

  return (
    <Switch
      className={className}
      classNames={{
        thumb: 'bg-transparent',
        
      }}
      size="lg"
      color="default"
      startContent={<p>En</p>}
      endContent={<p>Es</p>}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <Lang className={className} />
        ) : (
          <Lang className={className} />
        )}
    >
    </Switch>
  )
}
