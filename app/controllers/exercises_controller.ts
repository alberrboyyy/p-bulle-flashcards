import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'

export default class ExercisesController {
  // Affiche la page de démarrage
  async start({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    return view.render('pages/exercises/start', { deck })
  }

  // Initialise la session d'exercice
  async setup({ params, session, response }: HttpContext) {
    const deck = await Deck.query().where('id', params.id).preload('cards').firstOrFail()

    if (deck.cards.length === 0) {
      session.flash('error', "Ce deck n'a pas de cartes à exercer.")
      return response.redirect().back()
    }

    session.put('exercise', {
      deckId: deck.id,
      cardIds: deck.cards.map((c) => c.id),
      currentIndex: 0,
      score: 0,
    })

    return response.redirect().toRoute('exercises.question')
  }

  // Affiche la question actuelle
  async question({ session, view, response }: HttpContext) {
    const state = session.get('exercise')
    if (!state) return response.redirect('/')

    const deck = await Deck.query()
      .where('id', state.deckId)
      .preload('cards', (q) => {
        q.where('id', state.cardIds[state.currentIndex])
      })
      .firstOrFail()

    const card = deck.cards[0]
    return view.render('pages/exercises/question', { card, deck })
  }

  // Affiche la réponse
  async answer({ session, view, response }: HttpContext) {
    const state = session.get('exercise')
    const deck = await Deck.query()
      .where('id', state.deckId)
      .preload('cards', (q) => {
        q.where('id', state.cardIds[state.currentIndex])
      })
      .firstOrFail()

    return view.render('pages/exercises/answer', { card: deck.cards[0], deck })
  }

  // Enregistre le résultat
  async evaluate({ request, session, response }: HttpContext) {
    const state = session.get('exercise')
    const isCorrect = request.input('result') === 'juste'

    if (isCorrect) state.score++
    state.currentIndex++

    if (state.currentIndex >= state.cardIds.length) {
      return response.redirect().toRoute('exercises.finish')
    }

    session.put('exercise', state)
    return response.redirect().toRoute('exercises.question')
  }

  // Affiche le résultat final
  async finish({ session, view }: HttpContext) {
    const state = session.get('exercise')
    const total = state.cardIds.length
    const score = state.score

    session.forget('exercise') // Nettoyage de la session
    return view.render('pages/exercises/finish', { score, total })
  }
}
