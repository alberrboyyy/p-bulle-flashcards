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
  })
  .use(middleware.auth()) // Seuls les utilisateurs connectés y accèdent
