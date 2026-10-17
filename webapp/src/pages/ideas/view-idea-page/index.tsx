import format from 'date-fns/format'
import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import { trpc } from '@/lib/create-trpc'
import { withPageWrapper } from '@/lib/wrappers/page-wrapper'
import { LinkButton } from '@/shared/components/link-button'
import { routes, type ViewIdeaRouteParams } from '@/shared/routes'
import { Segment } from '@/widgets/segment'

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = useParams() as ViewIdeaRouteParams
    return trpc.getIdea.useQuery({ ideaNick })
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    idea: checkExists(queryResult.data.idea, 'Idea not found'),
    me: ctx.me,
  }),
})(({ idea, me }) => {
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
})
