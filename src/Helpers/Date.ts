import { padLeft } from './General'

export const newDate = ({ m, d, h, min }: {[key: string]: number}): Date => {
  const date = new Date()
  const month = padLeft(m) || padLeft(date.getMonth() + 1)
  const day = padLeft(d) || padLeft(date.getDate())
  const hours = padLeft(h) || padLeft(date.getHours())
  const minutes = padLeft(min) || padLeft(date.getMinutes())
  const dateString = [date.getFullYear(), month, day].join('-')
  const timeString = [hours, minutes].join(':')

  return new Date([dateString, timeString].join('T'))
}

export const generateCreatedDate = (date: string): string => {
  if (date.split(' ')[1] === 'Day') return date

  const today = new Date()
  const todayMonth = today.getMonth() + 1
  const todayDay = today.getDate()

  const month: (string | number) = new Date(date).getMonth() + 1
  const day: (string | number) = new Date(date).getDate()
  const hours: (string | number) = padLeft(new Date(date).getHours())
  const minutes: (string | number) = padLeft(new Date(date).getMinutes())
  
  return (month === todayMonth && day === todayDay)
    ? `${hours}:${minutes}`
    : `${padLeft(day)}/${padLeft(month)} ${hours}:${minutes}`
}

export const generateCreatedDay = (date: string): string => {
  const day = padLeft(new Date(date).getDate())
  const month = padLeft(new Date(date).getMonth() + 1)

  return `${day}/${month}`
}

export const generateCreatedTime = (date: string): string => {
  const hours = padLeft(new Date(date).getHours())
  const minutes = padLeft(new Date(date).getMinutes())

  return `${hours}:${minutes}`
}

export const statsDateTitleCompare = ( a: IStatsReading, b: IStatsReading ) => {
  const aNumber = parseInt(a.created.split(' ')[0])
  const bNumber = parseInt(b.created.split(' ')[0])

  if ( aNumber < bNumber ){
    return -1;
  }
  if ( aNumber > bNumber ){
    return 1;
  }
  return 0;
}

export const generateLastSevenDays = (): Date[] => {
  const days = []
  const today = new Date().getDate()

  if (today < 7) {
    for(let i = today; i > 0; i -= 1) {
      const date = new Date().setDate(i)
      days.push(new Date(date))
    }
    const diff = 7 - today
    for(let i = 0; i < diff; i++) {
      const date = new Date().setDate(-i)
      days.push(new Date(date))
    }
  }

  if (today >= 7) {
    for(let i = today; i > today - 7; i -= 1) {
      const date = new Date().setDate(i)
      days.push(new Date(date))
    }
  }

  return days
}

export const getDaysAndMonthsForLastSevenDays = (): any => {
  const lastSevenDays = generateLastSevenDays()
  const days = []
  for(const date of lastSevenDays) {
    days.push(`${date.getDate().toString()} / ${(date.getMonth() + 1).toString()}`)
  }

  return days
}
