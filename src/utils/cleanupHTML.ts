export function cleanupHTML(text) {
  return text.replace(/<\/?[A-Za-z]+>/g, '')
}
