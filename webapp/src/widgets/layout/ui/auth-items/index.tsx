import { MenuItem } from '../menu-item'
import { useMe } from '@/lib/context/me'
import { routes } from '@/shared/routes'

export function AuthItems() {
  const me = useMe()

  if (me) {
    return (
      <>
        <MenuItem name="Add Idea" to={routes.getNewIdea()} />
        <MenuItem name={`Log Out (${me.nick})`} to={routes.getSignOut()} />
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
