import { CustomAlert } from '../alert'
import { Segment } from '@/widgets/segment'

export const ErrorPageComponent = ({
  title = 'Oops, error',
  message = 'Something went wrong',
  children,
}: {
  title?: string
  message?: string
  children?: React.ReactNode
}) => {
  return (
    <Segment title={title}>
      <CustomAlert color="red">{message}</CustomAlert>
      {children}
    </Segment>
  )
}
