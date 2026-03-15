/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const DecksController = () => import('#controllers/decks_controller')
const CardsController = () => import('#controllers/cards_controller')
const ExercisesController = () => import('#controllers/exercises_controller')

router.get('/', [DecksController, 'index']).use(middleware.auth())

//router.get('/', [AuthController, 'home'])

router.get('/signup', [AuthController, 'showSignup'])
router.post('/signup', [AuthController, 'signup'])

router.get('/login', [AuthController, 'showLogin'])
router.post('/login', [AuthController, 'login'])
router.post('/logout', [AuthController, 'logout']).use(middleware.auth())

router
  .group(() => {
    router.get('/decks', [DecksController, 'index']).as('decks.index')
    router.get('/decks/create', [DecksController, 'create']).as('decks.create')
    router.post('/decks', [DecksController, 'store']).as('decks.store')
    router.get('/decks/:id', [DecksController, 'show']).as('decks.show')
    router.get('/decks/:id/edit', [DecksController, 'edit']).as('decks.edit')
    router.post('/decks/:id/update', [DecksController, 'update']).as('decks.update')
    router.post('/decks/:id/delete', [DecksController, 'destroy']).as('decks.destroy')

    router.get('/decks/:deckId/cards/create', [CardsController, 'create']).as('cards.create')
    router.post('/decks/:deckId/cards', [CardsController, 'store']).as('cards.store')

    router.get('/cards/:id/edit', [CardsController, 'edit']).as('cards.edit')
    router.post('/cards/:id/update', [CardsController, 'update']).as('cards.update')
    router.post('/cards/:id/delete', [CardsController, 'destroy']).as('cards.destroy')

    router.get('/decks/:id/exercise', [ExercisesController, 'start']).as('exercises.start')
    router.post('/decks/:id/exercise/setup', [ExercisesController, 'setup']).as('exercises.setup')

    router.get('/exercise/question', [ExercisesController, 'question']).as('exercises.question')
    router.get('/exercise/answer', [ExercisesController, 'answer']).as('exercises.answer')
    router.post('/exercise/evaluate', [ExercisesController, 'evaluate']).as('exercises.evaluate')
    router.get('/exercise/finish', [ExercisesController, 'finish']).as('exercises.finish')
  })
  .use(middleware.auth())
