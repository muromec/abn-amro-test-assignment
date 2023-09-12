type Link = {
  href: string
}

export type Show = {
  id: number
  name: string
  genres: Array<string>
  image: {
    original: string
    medium: string
  }
  summary: string
  language: string
  premiered: string
  _links: {
    self: Link
  }
}
