import { zUpdateIdeaTrpcInput } from '@fullstack/backend/src/router/ideas/update-idea/input'
import { pick } from 'lodash'
import { useNavigate, useParams } from 'react-router-dom'
import { trpc } from '@/lib/create-trpc'
import { useForm } from '@/lib/hooks/form'
import { withPageWrapper } from '@/lib/wrappers/page-wrapper'
import { CustomAlert } from '@/shared/components/alert'
import { CustomButton } from '@/shared/components/button'
import { CustomInput } from '@/shared/components/input/input'
import { CustomTextarea } from '@/shared/components/textarea/textarea'
import { routes, type ViewIdeaRouteParams } from '@/shared/routes'
import { Segment } from '@/widgets/segment'

const maxWidth = 500

export const EditIdeaPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { ideaNick } = useParams() as ViewIdeaRouteParams
    return trpc.getIdea.useQuery({ ideaNick })
  },
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const idea = checkExists(queryResult.data.idea, 'Idea not found')
    checkAccess(ctx.me?.id === idea.authorId, 'An idea can only be edited by the author')
    return { idea }
  },
})(({ idea }) => {
  const navigate = useNavigate()

  const updateIdea = trpc.updateIdea.useMutation()

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
})
