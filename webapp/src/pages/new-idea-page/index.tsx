import { zCreateIdeaTrpcInput } from '@fullstack/backend/src/router/create-idea/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { trpc } from '@/lib/create-trpc'
import { CustomInput } from '@/shared/components/input/input'
import { CustomTextarea } from '@/shared/components/textarea/textarea'
import { Segment } from '@/widgets/segment'

export function NewIdeaPage() {
  const createIdea = trpc.createIdea.useMutation()

  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(zCreateIdeaTrpcInput),
    onSubmit: async (values) => {
      return await createIdea.mutateAsync(values)
    },
  })

  return (
    <Segment title={'New idea'}>
      <form onSubmit={formik.handleSubmit}>
        <CustomInput name="name" label="Name" formik={formik} />
        <CustomInput name="nick" label="Nick" formik={formik} />
        <CustomInput name="description" label="Description" formik={formik} />
        <CustomTextarea name="text" label="Text" formik={formik} />

        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        <button type="submit">Create idea</button>
      </form>
    </Segment>
  )
}
