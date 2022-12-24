import { string, object, date, array, number, setLocale } from 'yup'
import { subYears, areIntervalsOverlapping } from 'date-fns'

setLocale({
  mixed: {
    required: 'errors.required',
  },
})

export const contactsValidation = object().shape({
  name: string().required(),
  lastName: string().required(),
  birthdate: date().required().max(subYears(new Date(), 3), 'errors.birthdate'),
})

export const educationsValidation = object().shape({
  educations: array().of(
    object()
      .shape({
        institution: string().required(),
        enrolledOn: date().required(),
        graduatedOn: date().required(),
      })
      .test('intervalsOverlapping', 'errors.educationsOverlapping', (value, { from, options }) => {
        const { educations } = from[1].value

        const currentInterval = { start: value.enrolledOn, end: value.graduatedOn }
        const otherIntervals = educations
          .filter(
            ({ enrolledOn, graduatedOn }, index) =>
              index !== options.index && enrolledOn && graduatedOn,
          )
          .map(({ enrolledOn, graduatedOn }) => ({
            start: enrolledOn,
            end: graduatedOn,
          }))
        if (!otherIntervals.length || !currentInterval.start || !currentInterval.end) {
          return true
        }

        return otherIntervals.every(
          (interval) => !areIntervalsOverlapping(interval, currentInterval),
        )
      }),
  ),
})

export const experiencesValidation = object().shape({
  experiences: array().of(
    object()
      .shape({
        companyName: string().required(),
        position: string().required(),
        hiredOn: date().required(),
        quitOn: date().required(),
      })
      .test(
        'intervalsOverlapping',
        'errors.experiencesOverlappingTwice',
        (value, { from, options }) => {
          const { experiences } = from[1].value

          const currentInterval = { start: value.hiredOn, end: value.quitOn }
          if (!currentInterval.start || !currentInterval.end) {
            return true
          }
          const overlappedIntervals = experiences
            .filter(({ hiredOn, quitOn }, index) => index !== options.index && hiredOn && quitOn)
            .map(({ hiredOn, quitOn }) => ({
              start: hiredOn,
              end: quitOn,
            }))
            .filter((interval) => areIntervalsOverlapping(interval, currentInterval))
          if (!overlappedIntervals.length) {
            return true
          }

          return overlappedIntervals.every(
            (interval, index, intervalsArray) =>
              !intervalsArray.some(
                (otherInterval, otherIndex) =>
                  index !== otherIndex && areIntervalsOverlapping(interval, otherInterval),
              ),
          )
        },
      ),
  ),
})

export const languagesValidation = (languagesLength) =>
  object().shape({
    languages: array()
      .of(
        object().shape({
          level: number().required(),
        }),
      )
      .test('notAllLanguages', 'errors.notAllLanguages', (value) => {
        return languagesLength === value.length
      }),
  })
