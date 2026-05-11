function cleanJsonResponse(content) {
  if (!content || typeof content !== 'string') {
    throw new Error('Respuesta vacía o inválida del modelo');
  }

  const withoutCodeFence = content
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  try {
    return JSON.parse(withoutCodeFence);
  } catch {
    const firstBrace = withoutCodeFence.indexOf('{');
    const lastBrace = withoutCodeFence.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error('No se encontró un JSON válido en la respuesta del modelo');
    }

    const jsonCandidate = withoutCodeFence.slice(firstBrace, lastBrace + 1);
    return JSON.parse(jsonCandidate);
  }
}

module.exports = { cleanJsonResponse };
