export const isIrrelevantMessage = (text: string): boolean => {
  const keywords = ['chistes', 'cine', 'tarot', 'fútbol'];
  return keywords.some((kw) => text.toLowerCase().includes(kw));
};

export const isCompetitorMentioned = (text: string): boolean => {
  const competitors = ['agencia xyz', 'otra empresa de marketing', 'chat gpt', 'openai'];
  return competitors.some((name) => text.toLowerCase().includes(name));
};

export const isUnsafeResponse = (text: string): boolean => {
  const forbiddenWords = ['tarjeta de crédito', 'contraseña', 'lesiones'];
  return forbiddenWords.some((word) => text.toLowerCase().includes(word));
};
