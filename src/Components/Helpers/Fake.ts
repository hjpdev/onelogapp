import { BgReadings, DoseReadings, MacroReadings, StatsReadings } from './Data'

export const testGetReadings = (table: string): any => {
  const map: {[key: string]: any} = {
    bg: BgReadings,
    dose: DoseReadings,
    macro: MacroReadings
  }
  console.log('Fake readings for: ', table)

  return map[table]
}

export const testGetStats = (): any => {
  console.log('Fake readings for stats')
  return StatsReadings
}