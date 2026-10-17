import { zCreateIdeaTrpcInput } from '@fullstack/backend/src/router/ideas/create-idea/input'
import { trpc } from '@/lib/create-trpc'
import { useForm } from '@/lib/hooks/form'
import { withPageWrapper } from '@/lib/wrappers/page-wrapper'
import { CustomAlert } from '@/shared/components/alert'
import { CustomButton } from '@/shared/components/button'
import { FormItems } from '@/shared/components/form-items'
import { CustomInput } from '@/shared/components/input/input'
import { CustomTextarea } from '@/shared/components/textarea/textarea'
import { Segment } from '@/widgets/segment'

export const NewIdeaPage = withPageWrapper({
  authorizedOnly: true,
})(() => {
  const createIdea = trpc.createIdea.useMutation()

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: zCreateIdeaTrpcInput,
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values)
    },
    successMessage: 'Idea created!',
  })

  return (
    <Segment title={'New idea'}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <CustomInput name="name" label="Name" formik={formik} />

          <CustomInput name="nick" label="Nick" formik={formik} />

          <CustomInput name="description" label="Description" formik={formik} maxWidth={500} />

          <CustomTextarea name="text" label="Text" formik={formik} />

          <CustomAlert {...alertProps} />

          <CustomButton {...buttonProps}>Create idea</CustomButton>
        </FormItems>
      </form>
    </Segment>
  )
})
