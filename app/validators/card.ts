import vine from '@vinejs/vine'

export const createCardValidator = vine.compile(
  vine.object({
    question: vine.string().minLength(10),
    answer: vine.string().trim().minLength(1),
  })
)
