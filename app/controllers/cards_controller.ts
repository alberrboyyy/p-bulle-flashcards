import type { HttpContext } from '@adonisjs/core/http'
import { createCardValidator } from '#validators/card'
import Deck from '#models/deck'
import Card from '#models/card'

export default class CardsController {
  // Creation de la carte
  async create({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.deckId)
    return view.render('pages/cards/create', { deck })
  }

  // Enregistrement de la carte
  async store({ params, request, response, session }: HttpContext) {
    const deck = await Deck.findOrFail(params.deckId)

    const payload = await request.validateUsing(createCardValidator)

    await deck.related('cards').create(payload)

    session.flash('success', 'La carte a été ajoutée au deck !')
    return response.redirect().toRoute('decks.show', { id: deck.id })
  }

  // Affiche la page de modification
  async edit({ params, view }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    await card.load('deck')
    return view.render('pages/cards/edit', { card })
  }

  // Met à jour la carte
  async update({ params, request, response, session }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    const payload = await request.validateUsing(createCardValidator)

    card.merge(payload)
    await card.save()

    session.flash('success', 'La carte a été modifiée !')
    return response.redirect().toRoute('decks.show', { id: card.deckId })
  }

  // Supprime la carte
  async destroy({ params, response, session }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    const deckId = card.deckId
    await card.delete()

    session.flash('success', 'La carte a été supprimée !')
    return response.redirect().toRoute('decks.show', { id: deckId })
  }
}
