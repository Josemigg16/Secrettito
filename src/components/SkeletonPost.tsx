import { Card, CardHeader, CardFooter, Divider } from '@nextui-org/react'

export default function SkeletonPost() {
  return (
    <Card>
      <CardHeader>
        <div className="bg-skeleton h-12 w-4/5 rounded-lg bg-gray-200"></div>
      </CardHeader>
      <Divider />
      <CardFooter>
        <div className="h-8 w-3/5 rounded-lg bg-gray-200"></div>
      </CardFooter>
    </Card>
  )
}
