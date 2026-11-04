import type { Course, CourseId, Exercise, Lesson, Unit } from '../types'
import { uxUnits1 } from './ux1'
import { uxUnits2 } from './ux2'
import { dirUnits1 } from './dir1'
import { dirUnits2 } from './dir2'

export const courses: Record<CourseId, Course> = {
  ux: {
    id: 'ux',
    title: 'UX Design',
    short: 'UX',
    icon: '🎨',
    tagline: 'Fundamentos, research, UI, design system e mais',
    units: [...uxUnits1, ...uxUnits2],
  },
  direcao: {
    id: 'direcao',
    title: 'Teoria de Direção',
    short: 'CNH',
    icon: '🚗',
    tagline: 'Legislação, sinalização, direção defensiva e exame',
    units: [...dirUnits1, ...dirUnits2],
  },
}

export const courseList = [courses.ux, courses.direcao]

export type LessonRef = { course: Course; unit: Unit; lesson: Lesson; index: number }

const lessonIndex = new Map<string, LessonRef>()
for (const course of courseList) {
  let i = 0
  for (const unit of course.units) for (const lesson of unit.lessons) lessonIndex.set(lesson.id, { course, unit, lesson, index: i++ })
}

export const getLesson = (id: string) => lessonIndex.get(id)
export const allLessons = (c: CourseId) => courses[c].units.flatMap((u) => u.lessons)
export const exKey = (lessonId: string, i: number) => `${lessonId}#${i}`
export function getExercise(key: string): { ex: Exercise; ref: LessonRef } | undefined {
  const [id, i] = key.split('#')
  const ref = lessonIndex.get(id)
  if (!ref) return
  const ex = ref.lesson.ex[Number(i)]
  return ex ? { ex, ref } : undefined
}
/** Questões aptas para simulado de prova (múltipla escolha) */
export function simuladoPool(): string[] {
  const keys: string[] = []
  for (const l of allLessons('direcao')) l.ex.forEach((e, i) => { if (e.t === 'mc' && e.o.length >= 3) keys.push(exKey(l.id, i)) })
  return keys
}
