import vine from '@vinejs/vine'

export const createCardValidator = vine.compile(
  vine.object({
    question: vine
      .string()
      .minLength(10)
      .unique(async (db, value, field) => {
        const deckId = field.meta.deckId

        const card = await db
          .from('cards')
          .where('deck_id', deckId)
          .where('question', value)
          .first()

        return !card
      }),
    answer: vine.string().trim().minLength(1),
  })
)
