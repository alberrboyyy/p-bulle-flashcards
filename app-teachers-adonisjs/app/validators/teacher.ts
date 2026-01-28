import vine from '@vinejs/vine'

export const teacherValidator = vine.compile(
  vine.object({
    gender: vine.enum(['woman', 'man', 'other']),

    firstname: vine.string().trim().minLength(2),
    lastname: vine.string().trim().minLength(2),
    nickname: vine.string().trim().minLength(2),
    origine: vine.string().trim().minLength(2),

    sectionId: vine.number().positive(),
  })
)
