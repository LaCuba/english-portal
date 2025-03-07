export const safeJsonParse = <T = unknown>(
  str: string | null | undefined,
): T | undefined => {
  if (!str) {
    return undefined
  }
  try {
    return JSON.parse(str)
  } catch (_) {
    return undefined
  }
}
