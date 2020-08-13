import { IStatsReading } from '../Components/Carousel/Readings/Stats'
import { padLeft } from './General'

export const newDate = ({ m, d, h, min, sec }: {[key: string]: number}): string => {
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
