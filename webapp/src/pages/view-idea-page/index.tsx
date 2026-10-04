import format from 'date-fns/format'
import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import { trpc } from '@/lib/create-trpc'
import { LinkButton } from '@/shared/components/link-button'
import { routes, type ViewIdeaRouteParams } from '@/shared/routes'
import { Segment } from '@/widgets/segment'

export function ViewIdeaPage() {
  const { ideaNick } = useParams() as ViewIdeaRouteParams

  const getIdeaResult = trpc.getIdea.useQuery({ ideaNick })

  const getMeResult = trpc.getMe.useQuery()

  if (getIdeaResult.isLoading || getIdeaResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>...Loading</span>
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  if (!getIdeaResult.data.idea) {
    return <span>Idea not found</span>
  }

  const idea = getIdeaResult.data.idea
  const me = getMeResult.data.me

  return (
    <Segment title={idea.name} description={idea.description}>
      <div className={styles.createdAt}>Created AT: {format(new Date(idea.createdAt), 'yyyy-MM-dd')}</div>

      <div className={styles.author}>Author: {idea.author.nick}</div>

      <div className={styles.text} dangerouslySetInnerHTML={{ __html: idea.text }} />

      {me?.id === idea.authorId && (
        <div className={styles.editButton}>
          <LinkButton to={routes.getEditIdea({ ideaNick: idea.nick })}>Edit Idea</LinkButton>
        </div>
      )}
    </Segment>
  )
}
