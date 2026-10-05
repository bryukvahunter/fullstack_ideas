import type { TrpcRouterOutput } from '@fullstack/backend/src/router'
import { zUpdateIdeaTrpcInput } from '@fullstack/backend/src/router/update-idea/input'
import { pick } from 'lodash'
import { useNavigate, useParams } from 'react-router-dom'
import { useMe } from '@/lib/context/me'
import { trpc } from '@/lib/create-trpc'
import { useForm } from '@/lib/hooks/form'
import { CustomAlert } from '@/shared/components/alert'
import { CustomButton } from '@/shared/components/button'
import { CustomInput } from '@/shared/components/input/input'
import { CustomTextarea } from '@/shared/components/textarea/textarea'
import { routes, type ViewIdeaRouteParams } from '@/shared/routes'
import { Segment } from '@/widgets/segment'

const maxWidth = 500

function EditIdeaComponent({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) {
  const navigate = useNavigate()

  const updateIdea = trpc.updateIdeaTrpcRoute.useMutation()

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdateIdeaTrpcInput.omit({ ideaId: true }),
    onSubmit: async (values) => {
      await updateIdea.mutateAsync({ ideaId: idea.id, ...values })
      navigate(routes.getEditIdea({ ideaNick: values.nick }))
    },
    successMessage: 'Updated!',
    resetOnSuccess: false,
    showValidationAlert: true,
  })

  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <CustomInput label="Name" name="name" formik={formik} />
        <CustomInput label="Nick" name="nick" formik={formik} />
        <CustomInput label="Description" name="description" formik={formik} maxWidth={maxWidth} />

        <CustomTextarea name="text" label="Text" formik={formik} />

        <CustomAlert {...alertProps} />

        <CustomButton {...buttonProps}>Update idea</CustomButton>
      </form>
    </Segment>
  )
}

export function EditIdeaPage() {
  const { ideaNick } = useParams() as ViewIdeaRouteParams

  const getIdeaResult = trpc.getIdea.useQuery({
    ideaNick,
  })

  const getMeResult = useMe()

  if (getIdeaResult.isLoading || getIdeaResult.isFetching) {
    return <span>...Loading</span>
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>
  }

  if (!getIdeaResult.data.idea) {
    return <span>Idea not found</span>
  }

  const idea = getIdeaResult.data.idea

  if (!getMeResult) {
    return <span>Only for authorized</span>
  }

  if (getMeResult.id !== idea.authorId) {
    return <span>An Idea can only be edit by the author</span>
  }

  return <EditIdeaComponent idea={idea} />
}
