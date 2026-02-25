import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async home({ view }: HttpContext) {
    return view.render('pages/home')
  }

  async showSignup({ view }: HttpContext) {
    return view.render('pages/auth/signup')
  }

  async signup({ request, response }: HttpContext) {
    const data = request.only(['username', 'password'])

    await User.create(data)
    return response.redirect('/')
  }
}
