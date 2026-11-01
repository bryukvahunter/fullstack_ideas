import type { TrpcRouterOutput } from '@fullstack/backend/src/router'
import format from 'date-fns/format'
import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import { trpc } from '@/lib/create-trpc'
import { withPageWrapper } from '@/lib/wrappers/page-wrapper'
import { Icon } from '@/shared/components/icon/icon'
import { LinkButton } from '@/shared/components/link-button'
import { routes, type ViewIdeaRouteParams } from '@/shared/routes'
import { Segment } from '@/widgets/segment'

const LikeButton = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const trpcUtils = trpc.useUtils()
  const setIdeaLike = trpc.setIdeaLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetIdeaData = trpcUtils.getIdea.getData({ ideaNick: idea.nick })
      if (oldGetIdeaData?.idea) {
        const newGetIdeaData = {
          ...oldGetIdeaData,
          idea: {
            ...oldGetIdeaData.idea,
            isLikedByMe,
            likesCount: oldGetIdeaData.idea.likesCount + (isLikedByMe ? 1 : -1),
          },
        }
        trpcUtils.getIdea.setData({ ideaNick: idea.nick }, newGetIdeaData)
      }
    },
    onSuccess: () => {
      void trpcUtils.getIdea.invalidate({ ideaNick: idea.nick })
    },
  })
  return (
    <button
      className={styles.likeButton}
      onClick={() => {
        void setIdeaLike.mutateAsync({ ideaId: idea.id, isLikedByMe: !idea.isLikedByMe })
        // .then(({ idea: { isLikedByMe } }) => {
        //   if (isLikedByMe) {
        //     mixpanelSetIdeaLike(idea)
        //   }
        // })
      }}
    >
      <Icon size={32} className={styles.likeIcon} name={idea.isLikedByMe ? 'likeFilled' : 'likeEmpty'} />
    </button>
  )
}

// const BlockIdea = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
//   const blockIdea = trpc.blockIdea.useMutation()
//   const trpcUtils = trpc.useContext()
//   const { formik, alertProps, buttonProps } = useForm({
//     onSubmit: async () => {
//       await blockIdea.mutateAsync({ ideaId: idea.id })
//       await trpcUtils.getIdea.refetch({ ideaNick: idea.nick })
//     },
//   })
//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <FormItems>
//         <Alert {...alertProps} />
//         <Button color="red" {...buttonProps}>
//           Block Idea
//         </Button>
//       </FormItems>
//     </form>
//   )
// }

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = useParams() as ViewIdeaRouteParams
    return trpc.getIdea.useQuery({ ideaNick })
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    idea: checkExists(queryResult.data.idea, 'Idea not found'),
    me: ctx.me,
  }),
  showLoaderOnFetching: false,
})(({ idea, me }) => {
  return (
    <Segment title={idea.name} description={idea.description}>
      <div className={styles.createdAt}>Created AT: {format(new Date(idea.createdAt), 'yyyy-MM-dd')}</div>

      <div className={styles.author}>
        Author: {idea.author.nick}
        {idea.author.name ? ` (${idea.author.name})` : ''}
      </div>

      <div className={styles.text} dangerouslySetInnerHTML={{ __html: idea.text }} />

      <div className={styles.likes}>
        Likes: {idea.likesCount}
        {me && (
          <>
            <br />

            <LikeButton idea={idea} />
          </>
        )}
      </div>

      {me?.id === idea.authorId && (
        <div className={styles.editButton}>
          <LinkButton to={routes.getEditIdea({ ideaNick: idea.nick })}>Edit Idea</LinkButton>
        </div>
      )}
    </Segment>
  )
})
