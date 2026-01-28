import Teacher from '#models/teacher'
import type { HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper'

export default class TeachersController {
  /**
   * Afficher la liste des enseignants
   */
  async index({ view }: HttpContext) {
    //
    // Récupérer la liste des enseignants triés par ordre alphabétique sur le nom et le prénom
    const teachers = await Teacher.query().orderBy('lastname', 'asc').orderBy('firstname', 'asc')
    // Appel de la vue
    //dd(teachers)
    return view.render('pages/home', { teachers })
  }
  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}
  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}
  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const teacher = await Teacher.query().where('id', params.id).preload('section').firstOrFail()

    return view.render('pages/teachers/show', { title: "Détail d'un enseignant", teacher })
  }
  async edit({ params }: HttpContext) {}
  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}
  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    // 1. On cherche l'enseignant à supprimer
    const teacher = await Teacher.findOrFail(params.id)

    // 2. On le supprime
    await teacher.delete()

    // 3. On prépare un message de succès (Flash message)
    session.flash(
      'success',
      `L'enseignant ${teacher.lastname} ${teacher.firstname} a été supprimé avec succès!`
    )

    // 4. On redirige vers l'accueil
    return response.redirect().toRoute('home')
  }
}
