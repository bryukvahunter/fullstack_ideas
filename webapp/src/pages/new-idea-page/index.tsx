import { Segment } from '@/widgets/segment'
import { CustomInput } from '@/shared/components/input/input'
import { CustomTextarea } from '@/shared/components/textarea/textarea'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'

export function NewIdeaPage() {
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(
      z.object({
        name: z.string().min(3).max(15),
        nick: z
          .string()
          .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, number and dashes')
          .min(1)
          .max(30),
        description: z.string().min(3).max(50),
        text: z.string().min(0).max(100, 'The text must contain no more than 100 characters'),
      })
    ),
    onSubmit: (values) => {
      console.info('submitted', values)
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
