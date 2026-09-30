import { MenuItem } from '../menu-item'
import { trpc } from '@/lib/create-trpc'
import { routes } from '@/shared/routes'

export function AuthItems() {
  const { data, isLoading } = trpc.getMe.useQuery()

  if (isLoading) {
    return null
  }
  if (data?.me) {
    return (
      <>
        <MenuItem name="Add Idea" to={routes.getNewIdea()} />
        <MenuItem name={`Log Out (${data.me.nick})`} to={routes.getSignOut()} />
      </>
    )
  } else {
    return (
      <>
        <MenuItem name="Sign Up" to={routes.getSignUp()} />
        <MenuItem name="Sign In" to={routes.getSignIn()} />
      </>
    )
  }
}
