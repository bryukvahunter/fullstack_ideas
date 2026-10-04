import { zSignUpTrpcInput } from '@fullstack/backend/src/router/sign-up/input'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import z from 'zod'
import { trpc } from '@/lib/create-trpc'
import { useForm } from '@/lib/hooks/form'
import { CustomAlert } from '@/shared/components/alert'
import { CustomButton } from '@/shared/components/button'
import { FormItems } from '@/shared/components/form-items'
import { CustomInput } from '@/shared/components/input/input'
import { routes } from '@/shared/routes'
import { Segment } from '@/widgets/segment'

export function SignUpPage() {
  const navigate = useNavigate()

  const trpcUtils = trpc.useUtils()

  const signUp = trpc.signUp.useMutation()
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: zSignUpTrpcInput
      .extend({
        passwordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.password !== val.passwordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password must be the same',
            path: ['passwordAgain'],
          })
        }
      }),
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values)

      Cookie.set('token', token, { expires: 99999 })
      await trpcUtils.invalidate()
      navigate(routes.getAllIdeas())
    },
    showValidationAlert: true,
    successMessage: 'Thanks for sign up!',
  })

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <CustomInput label="Nick" name="nick" formik={formik} />
          <CustomInput label="Password" name="password" type="password" formik={formik} />
          <CustomInput label="Password" name="passwordAgain" type="password" formik={formik} />

          <CustomAlert {...alertProps} />

          <CustomButton {...buttonProps}>Sign Up!</CustomButton>
        </FormItems>
      </form>
    </Segment>
  )
}
