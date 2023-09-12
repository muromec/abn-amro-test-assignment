import type { Show } from '@/stores/types'

function makeLinks(id: number) {
  return { self: { href: `/api/show/${id}` } }
}

function makeImages(id: number) {
  return {
    original: `/assets/shows/original/${id}.png`,
    medium: `/assets/shows/medium/${id}.png`
  }
}

const ShowBoilerPlate: Show = {
  id: 0,
  name: 'Something',
  summary: 'Bolerplate summary',
  genres: ['Drama'],
  language: 'English',
  premiered: '2014-01-1',
  _links: makeLinks(0),
  image: makeImages(0)
}

function spreadShow(update: Partial<Show>): Show {
  const id: number = update.id || ShowBoilerPlate.id
  const links = { self: { href: `/api/show/${id}` } }
  return { ...ShowBoilerPlate, ...update, _links: makeLinks(id), image: makeImages(id) }
}

export const MOCK_SHOW_LIST: Show[] = [
  { id: 0, genres: ['Drama'] },
  { id: 1, genres: ['Drama', 'Sci-Fi'] },
  { id: 2, genres: ['Mystery', 'Sci-Fi'] },
  { id: 3, genres: ['Mystery'] }
].map(spreadShow)
