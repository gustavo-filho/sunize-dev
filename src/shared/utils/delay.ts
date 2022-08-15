export function delay(delay: number = 750) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
