import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, signupValidator } from '#validators/auth'

export default class AuthController {
  async home({ view }: HttpContext) {
    return view.render('pages/home')
  }

  async showSignup({ view }: HttpContext) {
    return view.render('pages/auth/signup')
  }

  async signup({ request, response }: HttpContext) {
    const data = await request.validateUsing(signupValidator)

    await User.create({
      username: data.username,
      password: data.password,
    })

    return response.redirect().toRoute('decks.index')
  }

  async showLogin({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async login({ request, auth, response, session }: HttpContext) {
    const { username, password } = await request.validateUsing(loginValidator)

    try {
      const user = await User.verifyCredentials(username, password)
      await auth.use('web').login(user)
      return response.redirect('/')
    } catch {
      session.flash('errors', { login: 'Identifiants invalides' })
      return response.redirect().back()
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}
