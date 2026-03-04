import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'

export default class DecksController {
  // Affiche la liste des decks
  async index({ view, auth }: HttpContext) {
    const decks = await auth.user!.related('decks').query()
    return view.render('pages/decks/index', { decks })
  }

  // Affiche le formulaire de création
  async create({ view }: HttpContext) {
    return view.render('pages/decks/create')
  }

  // Enregistre un nouveau deck
  async store({ request, response, auth, session }: HttpContext) {
    const data = request.only(['title', 'description'])
    await auth.user!.related('decks').create(data)

    session.flash('success', 'Le deck a été créé')
    return response.redirect().toRoute('decks.index')
  }

  // Affiche un deck et ses cartes
  async show({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    await deck.load('cards')
    return view.render('pages/decks/show', { deck })
  }
}
