export const padLeft = (value: number | string) => `${value}`.length === 1 ? `0${value}` : value

export const delay = async (ms: number) => {
  await new Promise((resolve) => {
    setTimeout(() => { resolve() }, ms)
  })
}

export const capitalise = (word: string) => {
  return`${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`
}