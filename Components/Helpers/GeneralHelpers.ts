export const padLeft = (value: number | string) => `${value}`.length === 1 ? `0${value}` : value
export const decimalPadRight = (value: number | string) => `${value}`.length === 1 ? `${value}.0` : value

export const delay = async (ms: number) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => { resolve() }, ms)
  })
}
