export const delay = async (ms: number) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => { resolve() }, ms)
  })
}
