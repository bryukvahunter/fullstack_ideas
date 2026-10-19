import { zUpdateProfileTrpcInput } from '@fullstack/backend/src/router/auth/update-profile/input'
import { trpc } from '@/lib/create-trpc'
import { useForm } from '@/lib/hooks/form'
import { withPageWrapper } from '@/lib/wrappers/page-wrapper'
import { CustomAlert } from '@/shared/components/alert'
import { CustomButton } from '@/shared/components/button'
import { FormItems } from '@/shared/components/form-items'
import { CustomInput } from '@/shared/components/input/input'
import { Segment } from '@/widgets/segment'

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  // setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
  //   const idea = checkExists(queryResult.data.idea, 'Idea not found')
  //   checkAccess(ctx.me?.id === idea.authorId, 'An idea can only be edited by the author')
  //   return { idea }
  // },
  setProps: ({ ctx }) => ({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    me: ctx.me!,
  }),
})(({ me }) => {
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
    <Segment title={`Edit profile: ${me.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <CustomInput label="Nick" name="nick" formik={formik} />
          <CustomInput label="Name" name="name" formik={formik} />
          <CustomAlert {...alertProps} />
          <CustomButton {...buttonProps}>Update profile</CustomButton>
        </FormItems>
      </form>
    </Segment>
  )
})
