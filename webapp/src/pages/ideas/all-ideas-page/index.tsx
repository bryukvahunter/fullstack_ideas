import { zGetIdeasTrpcRoute } from '@fullstack/backend/src/router/ideas/get-ideas/input'
import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import { useDebounceValue } from 'usehooks-ts'
import styles from './index.module.scss'
import { trpc } from '@/lib/create-trpc'
import { useForm } from '@/lib/hooks/form'
import { CustomAlert } from '@/shared/components/alert'
import { CustomInput } from '@/shared/components/input/input'
import { Loader } from '@/shared/components/loader'
import { routes } from '@/shared/routes'
import { layoutContentElRef } from '@/widgets/layout'
import { Segment } from '@/widgets/segment'

export function AllIdeasPage() {
  const { formik } = useForm({
    initialValues: { search: '' },
    validationSchema: zGetIdeasTrpcRoute.pick({ search: true }),
  })

  const [debounceSearch] = useDebounceValue(formik.values.search, 500)

  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getIdeas.useInfiniteQuery(
      { search: debounceSearch },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  return (
    <Segment title={'All ideas'}>
      <div className={styles.filters}>
        <CustomInput maxWidth={'100%'} label="Search" name="search" formik={formik} />
      </div>

      {isLoading || isRefetching ? (
        <Loader type={'section'} />
      ) : isError ? (
        <CustomAlert color="red">{error.message}</CustomAlert>
      ) : !data.pages[0].ideas.length ? (
        <CustomAlert color="brown">Nothing found by search</CustomAlert>
      ) : (
        <div className={styles.ideas}>
          <InfiniteScroll
            threshold={100}
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                void fetchNextPage()
              }
            }}
            hasMore={hasNextPage}
            loader={<Loader type="section" />}

            getScrollParent={() => layoutContentElRef.current}
            useWindow={(layoutContentElRef.current && getComputedStyle(layoutContentElRef.current).overflow) !== 'auto'}
          >
            {data.pages
              .flatMap((page) => page.ideas)
              .map((idea) => (
                <div className={styles.idea} key={idea.nick}>
                  <Segment
                    size={2}
                    description={idea.description}
                    title={
                      <Link className={styles.ideaLink} to={routes.getViewIdea({ ideaNick: idea.nick })}>
                        {idea.name}
                      </Link>
                    }
                  >
                    Likes: {idea.likesCount}
                  </Segment>
                </div>
              ))}
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  )
}
