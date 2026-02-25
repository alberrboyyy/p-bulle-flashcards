/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')

router.get('/', async ({ auth, view }) => {
  await auth.check()
  return view.render('pages/home')
})

//router.get('/', [AuthController, 'home'])

router.get('/signup', [AuthController, 'showSignup'])
router.post('/signup', [AuthController, 'signup'])

router.get('/login', [AuthController, 'showLogin'])
router.post('/login', [AuthController, 'login'])
