const LABEL_TRANSLATIONS: Record<string, string> = {
  "Branco/nulo/não vai votar": "Blank/null/will not vote",
  "Não sabe": "Don't know",
}

export function translateLabel(value: string): string {
  return LABEL_TRANSLATIONS[value] ?? value
}
