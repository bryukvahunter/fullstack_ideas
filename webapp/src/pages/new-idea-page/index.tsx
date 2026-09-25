import { zCreateIdeaTrpcInput } from '@fullstack/backend/src/router/create-idea/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { trpc } from '@/lib/create-trpc'
import { CustomAlert } from '@/shared/components/alert'
import { CustomButton } from '@/shared/components/button'
import { FormItems } from '@/shared/components/form-items'
import { CustomInput } from '@/shared/components/input/input'
import { CustomTextarea } from '@/shared/components/textarea/textarea'
import { Segment } from '@/widgets/segment'

const visibleTime = 3000

export function NewIdeaPage() {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)

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
      try {
        await createIdea.mutateAsync(values)
        formik.resetForm()
        setSuccessMessageVisible(true)

        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, visibleTime)
      } catch (error) {
        if (error instanceof Error) {
          setSubmittingError(error.message)

          setTimeout(() => {
            setSubmittingError(null)
          }, visibleTime)
        }
      }
    },
  })

  return (
    <Segment title={'New idea'}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <CustomInput name="name" label="Name" formik={formik} />

          <CustomInput name="nick" label="Nick" formik={formik} />

          <CustomInput name="description" label="Description" formik={formik} maxWidth={500} />

          <CustomTextarea name="text" label="Text" formik={formik} />

          {!formik.isValid && !!formik.submitCount && <CustomAlert color={'red'}>Some fields are invalid</CustomAlert>}
          {successMessageVisible && <CustomAlert color={'green'}>Idea created!</CustomAlert>}
          {!!submittingError && <CustomAlert color={'red'}>{submittingError}</CustomAlert>}

          <CustomButton loading={formik.isSubmitting}>Create idea</CustomButton>
        </FormItems>
      </form>
    </Segment>
  )
}
