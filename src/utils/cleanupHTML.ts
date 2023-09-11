export function cleanupHTML(text: string) {
  return text.replace(/<\/?[A-Za-z]+>/g, '')
}
