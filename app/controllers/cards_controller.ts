import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import { createCardValidator } from '#validators/card'

export default class CardsController {
  async create({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.deckId)
    return view.render('pages/cards/create', { deck })
  }

  async store({ params, request, response, session }: HttpContext) {
    const deck = await Deck.findOrFail(params.deckId)

    const payload = await request.validateUsing(createCardValidator)

    await deck.related('cards').create(payload)

    session.flash('success', 'La carte a été ajoutée au deck !')
    return response.redirect().toRoute('decks.show', { id: deck.id })
  }
}
