import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { signupValidator } from '#validators/auth'

export default class AuthController {
  async home({ view }: HttpContext) {
    return view.render('pages/home')
  }

  async showSignup({ view }: HttpContext) {
    return view.render('pages/auth/signup')
  }

  async signup({ request, response }: HttpContext) {
    const data = await request.validateUsing(signupValidator)

    await User.create(data)
    return response.redirect('/')
  }

  async showLogin({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async login({ request, auth, response }: HttpContext) {
    const { username, password } = request.all()

    try {
      const user = await User.verifyCredentials(username, password)

      await auth.use('web').login(user)
      return response.redirect('/')
    } catch {
      return response.redirect().back()
    }
  }
}
