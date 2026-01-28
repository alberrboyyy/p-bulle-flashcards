import factory from '@adonisjs/lucid/factories'
import Teacher from '#models/teacher'

export const TeacherFactory = factory
  .define(Teacher, async ({ faker }) => {
    const firstname = faker.person.firstName()
    const lastname = faker.person.lastName()

    return {
      firstname: firstname,
      lastname: lastname,
      // Génère le surnom (ex: GCR)
      nickname: `${firstname.charAt(0)}${lastname.charAt(0)}${lastname.slice(-1)}`,
      gender: faker.helpers.arrayElement(['man', 'woman', 'other']),
      origine: faker.lorem.word(4),
      sectionId: faker.number.int({ min: 1, max: 6 }),
    }
  })
  .build()
