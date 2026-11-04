import type { Card, Exercise, Lesson, MC, TF, Match, Order } from '../types'

/** helpers compactos para escrever conteúdo */
export const mc = (q: string, o: string[], a: number, e?: string, placa?: string): MC => ({ t: 'mc', q, o, a, e, placa })
export const tf = (q: string, a: boolean, e?: string, placa?: string): TF => ({ t: 'tf', q, a, e, placa })
export const match = (q: string, pairs: [string, string][], e?: string): Match => ({ t: 'match', q, pairs, e })
export const order = (q: string, items: string[], e?: string): Order => ({ t: 'order', q, items, e })
export const card = (h: string, b: string, placa?: string): Card => ({ h, b, placa })
export const L = (id: string, title: string, cards: Card[], ex: Exercise[]): Lesson => ({ id, title, cards, ex })
