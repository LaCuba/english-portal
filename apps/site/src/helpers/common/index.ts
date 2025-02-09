export const safeJsonParse = <T = unknown>(
  str: string | null | undefined,
): T | undefined => {
  if (!str) {
    return undefined
  }
  try {
    return JSON.parse(str)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return undefined
  }
}
