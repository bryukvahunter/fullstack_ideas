import { ErrorPageComponent } from '@/shared/components/input'

type Props = {
  title?: string
  message?: string
}

export function NotFoundPage({ title = 'Not found', message = 'This page does not exist' }: Props) {
  return <ErrorPageComponent title={title} message={message} />
}
