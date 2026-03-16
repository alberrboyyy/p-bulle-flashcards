import vine from '@vinejs/vine'

export const signupValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(1).unique({ table: 'users', column: 'username' }),
    password: vine.string().minLength(8).confirmed({ confirmationField: 'password_confirmation' }),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
    password: vine.string(),
  })
)
