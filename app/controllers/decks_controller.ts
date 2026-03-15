import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import { createDeckValidator } from '#validators/deck'

export default class DecksController {
  // Affiche la liste des decks
  async index({ view, auth }: HttpContext) {
    const decks = await auth.user!.related('decks').query().preload('cards')

    return view.render('pages/home', { decks })
  }

  // Affiche un deck et ses cartes
  async show({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    await deck.load('cards')
    return view.render('pages/decks/show', { deck })
  }

  // Affiche le formulaire de création
  async create({ view }: HttpContext) {
    return view.render('pages/decks/create')
  }

  // Stocke un nouveau deck
  async store({ request, response, auth, session }: HttpContext) {
    const payload = await request.validateUsing(createDeckValidator)

    await auth.user!.related('decks').create(payload)

    session.flash('success', 'Le deck a été créé avec succès !')
    return response.redirect().toRoute('decks.index')
  }

  // Affiche le formulaire d'édition
  async edit({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    return view.render('pages/decks/edit', { deck })
  }

  // Met à jour le deck
  async update({ params, request, response, session }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    const payload = await request.validateUsing(createDeckValidator)

    deck.merge(payload)
    await deck.save()

    session.flash('success', 'Le deck a été modifié avec succès !')
    return response.redirect().toRoute('decks.index')
  }

  // Supprime le deck
  async destroy({ params, response, session }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    await deck.delete()

    session.flash('success', 'Le deck a été supprimé avec succès !')
    return response.redirect().toRoute('decks.index')
  }
}
