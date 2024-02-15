export function getHasMarkdown(text: string) {
  const markdownExpressions = [
    /^#+\s/, // Heading
    /^[*-]\s/, // List (bullets)
    /^\d+\.\s/, // Ordered list
    /\[.*\]\(.*\)/, // Link
    /[*_]{1,2}.*[*_]{1,2}/, // Emphasis (italic or bold)
    /^```.*[\s\S]*```/, // Code block
    /`.*`/, // Inline code
    /^---$/, // Horizontal rule
  ]

  // Check if the text contains any of the Markdown regular expressions
  for (let i = 0; i < markdownExpressions.length; i++) {
    if (markdownExpressions[i].test(text)) return true
  }

  return false
}
