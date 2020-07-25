export const padLeft = (value: number | string) => `${value}`.length === 1 ? `0${value}` : value

export const newDate = ({ m, d, h, min, sec }): string => {
  const date = new Date()
  const month = padLeft(m) || padLeft(date.getMonth() + 1)
  const day = padLeft(d) || padLeft(date.getDate())
  const hours = padLeft(h) || padLeft(date.getHours())
  const minutes = padLeft(min) || padLeft(date.getMinutes())
  const seconds = padLeft(sec) || padLeft(date.getSeconds())
  const dateString = [date.getFullYear(), month, day].join('-')
  const timeString = [hours, minutes, seconds, '000000'].join(':')

  return `${dateString} ${timeString}`
}
