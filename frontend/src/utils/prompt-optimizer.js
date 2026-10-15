const formatInstructions = {
  'Bullet points': 'Use scannable bullet points rather than long paragraphs.',
  'Step-by-step guide': 'Organize the response as clear, numbered, actionable steps.',
  'Short paragraphs': 'Use brief, connected paragraphs with one main idea each.',
  Table: 'Present the key information in a table with clear column headings.',
  Report: 'Use a concise title and clearly labeled sections suited to the topic.',
  'Code with explanation': 'Provide relevant code first, then explain how it works.',
}

const detailInstructions = {
  Short: 'Include only the essential information and avoid unnecessary examples or background.',
  Medium: 'Give a balanced explanation with the key details and a relevant example when useful.',
  Detailed: 'Explain the important details thoroughly, define unfamiliar terms, and include useful examples and caveats without repeating yourself.',
}

export function createOptimizedPrompt(task, context, format, length) {
  const normalizedTask = task
    .trim()
    .replace(/^explain\s+me\s+/i, 'Explain ')
    .replace(/\bjavascript\b/gi, 'JavaScript')
  const learningRequest =
    /\b(explain|teach|learn|understand|introduction to|walk me through|what is|how does)\b/i.test(
      normalizedTask,
    )
  const webDevelopmentTopic =
    /\b(javascript|html|css|react|typescript|node\.?js|web development|programming|coding)\b/i.test(
      normalizedTask,
    )
  const audienceSpecified =
    /\b(beginner|student|learner|developer|expert|audience|team|customer|teacher|professional|manager|children|kids)\b/i.test(
      `${normalizedTask} ${context}`,
    )
  const outputRequirements = [
    `Output format: ${format}. ${formatInstructions[format] || `Use ${format.toLowerCase()} formatting.`}`,
    `Level of detail: ${length}. ${detailInstructions[length] || `Use a ${length.toLowerCase()} level of detail.`}`,
  ].join(' ')

  if (!learningRequest) {
    return [
      normalizedTask,
      context ? `Context: ${context}` : '',
      `${outputRequirements} Be clear and accurate, avoid unsupported claims, and state uncertainty when relevant. If essential information is missing, ask a concise clarifying question before answering.`,
    ]
      .filter(Boolean)
      .join('\n\n')
  }

  const audience = audienceSpecified
    ? ''
    : webDevelopmentTopic
      ? 'Audience: A beginner student who understands basic web development.'
      : 'Audience: A beginner student with no assumed specialist knowledge.'
  const teachingInstructions = webDevelopmentTopic
    ? 'Teach the topic patiently, starting with the fundamentals and building toward practical use. Define technical terms in simple language, include short JavaScript or relevant code examples, and explain what each example does. Connect new ideas to familiar web-development concepts and finish with a small practice task and a brief recap.'
    : 'Teach the topic patiently, starting with the fundamentals and building toward practical understanding. Define unfamiliar terms, use a relatable example, and finish with a brief recap.'
  return [
    normalizedTask,
    audience,
    context ? `Additional context: ${context}` : '',
    `${teachingInstructions} ${outputRequirements} Avoid unsupported claims.`,
  ]
    .filter(Boolean)
    .join('\n\n')
}
