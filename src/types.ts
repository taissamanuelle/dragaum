export type CourseId = 'ux' | 'direcao'

export type MC = { t: 'mc'; q: string; o: string[]; a: number; e?: string; placa?: string }
export type TF = { t: 'tf'; q: string; a: boolean; e?: string; placa?: string }
export type Match = { t: 'match'; q: string; pairs: [string, string][]; e?: string }
export type Order = { t: 'order'; q: string; items: string[]; e?: string }
export type Exercise = MC | TF | Match | Order

export type Card = { h: string; b: string; placa?: string }

export type Lesson = {
  id: string
  title: string
  cards: Card[]
  ex: Exercise[]
}

export type Unit = {
  id: string
  title: string
  desc: string
  icon: string
  color: string
  lessons: Lesson[]
}

export type Course = {
  id: CourseId
  title: string
  short: string
  icon: string
  tagline: string
  units: Unit[]
}
