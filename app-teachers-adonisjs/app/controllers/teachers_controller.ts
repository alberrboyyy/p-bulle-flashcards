import { teacherValidator } from '#validators/teacher'
import Section from '#models/section'
import Teacher from '#models/teacher'
import type { HttpContext } from '@adonisjs/core/http'
//import { dd } from '@adonisjs/core/services/dumper'

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
  async create({ view }: HttpContext) {
    const sections = await Section.query().orderBy('name', 'asc')
    return view.render('pages/teachers/create', { title: "Ajout d'un enseignant", sections })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(teacherValidator)
    await Teacher.create(payload)
    session.flash('success', 'Enseignant ajouté avec succès !')
    return response.redirect().toRoute('home')
  }

  async show({ params, view }: HttpContext) {
    const teacher = await Teacher.query().where('id', params.id).preload('section').firstOrFail()

    return view.render('pages/teachers/show', { title: "Détail d'un enseignant", teacher })
  }

  async edit({ params, view }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)
    const sections = await Section.query().orderBy('name', 'asc')
    return view.render('pages/teachers/edit', {
      title: `Modifier l'enseignant ${teacher.firstname} ${teacher.lastname}`,
      teacher,
      sections,
    })
  }

  async update({ params, request, response, session }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)

    const payload = await request.validateUsing(teacherValidator)
    teacher.merge(payload)
    await teacher.save()
    session.flash('success', 'Enseignant modifié avec succès')
    return response.redirect().toRoute('home')
  }

  async destroy({ params, session, response }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)
    await teacher.delete()

    session.flash(
      'success',
      `L'enseignant ${teacher.lastname} ${teacher.firstname} a été supprimé avec succès!`
    )

    return response.redirect().toRoute('home')
  }
}
