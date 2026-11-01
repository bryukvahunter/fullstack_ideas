import type { TrpcRouterOutput } from '@fullstack/backend/src/router'
import { zUpdatePasswordTrpcInput } from '@fullstack/backend/src/router/auth/update-password/input'
import { zUpdateProfileTrpcInput } from '@fullstack/backend/src/router/auth/update-profile/input'
import z from 'zod'
import { trpc } from '@/lib/create-trpc'
import { useForm } from '@/lib/hooks/form'
import { withPageWrapper } from '@/lib/wrappers/page-wrapper'
import { CustomAlert } from '@/shared/components/alert'
import { CustomButton } from '@/shared/components/button'
import { FormItems } from '@/shared/components/form-items'
import { CustomInput } from '@/shared/components/input/input'
import { Segment } from '@/widgets/segment'

const General = ({ me }: { me: NonNullable<TrpcRouterOutput['getMe']['me']> }) => {
  const trpcUtils = trpc.useUtils()
  const updateProfile = trpc.updateProfile.useMutation()

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: me.nick,
      name: me.name,
    },
    validationSchema: zUpdateProfileTrpcInput,
    onSubmit: async (values) => {
      const updateMe = await updateProfile.mutateAsync(values)
      trpcUtils.getMe.setData(undefined, { me: updateMe })
    },
    successMessage: 'Profile updated!',
    resetOnSuccess: false,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <CustomInput label="Nick" name="nick" formik={formik} />
        <CustomInput label="Name" name="name" formik={formik} />
        <CustomAlert {...alertProps} />
        <CustomButton {...buttonProps}>Update profile</CustomButton>
      </FormItems>
    </form>
  )
}

const Password = () => {
  const updatePassword = trpc.updatePassword.useMutation()

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    validationSchema: zUpdatePasswordTrpcInput
      .extend({
        newPasswordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.newPassword !== val.newPasswordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password must be the ',
            path: ['newPasswordAgain'],
          })
        }
      }),

    onSubmit: async ({ newPassword, oldPassword }) => {
      await updatePassword.mutateAsync({ newPassword, oldPassword })
    },
    successMessage: 'Password updated!',
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <CustomInput label="Old password" name="oldPassword" type="password" formik={formik} />
        <CustomInput label="New password" name="newPassword" type="password" formik={formik} />
        <CustomInput label="New password again" name="newPasswordAgain" type="password" formik={formik} />
        <CustomAlert {...alertProps} />
        <CustomButton {...buttonProps}>Update password</CustomButton>
      </FormItems>
    </form>
  )
}

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ getAuthorizedMe }) => ({
    me: getAuthorizedMe(),
  }),
})(({ me }) => {
  return (
    <>
      <Segment title="Edit profile">
        <Segment size={2} title="General">
          <General me={me} />
        </Segment>

        <Segment size={2} title="Password">
          <Password />
        </Segment>
      </Segment>
    </>
  )
})
