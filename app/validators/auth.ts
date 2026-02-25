import vine from '@vinejs/vine'

export const signupValidator = vine.compile(
  vine.object({
    username: vine.string().unique(async (db, value) => {
      const user = await db.from('users').where('username', value).first()
      return !user
    }),
    password: vine.string().minLength(8).confirmed(),
  })
)
