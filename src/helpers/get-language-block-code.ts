export function getLanguageBlockCode(text: string) {
  const matches = text.matchAll(/```(\w+)\n([\s\S]+?)```/g)
  let languageCode = ''

  for (const match of matches) {
    const [, language] = match
    languageCode = language
  }

  return languageCode
}
