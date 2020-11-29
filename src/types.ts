export interface MacroReadingData {
  kcal: number
  carbs: number
  sugar: number
  protein: number
  fat: number
}

export type Reading = SimpleReading | DoseReading | MacroReading | SavedMacroReading
export type DataKey = 'bgReadings' | 'ketoReadings' | 'doseReadings' | 'macroReadings' | 'bgStats' | 'savedMacros'
export type MacroReadingKey = keyof MacroReadingData

export interface ReadingProps {
  id: number
  created?: Date
}

export interface SimpleReadingProps extends ReadingProps {
  data: number
}

export interface DoseReadingProps extends SimpleReadingProps {
  long: boolean
}

export interface MacroReadingProps extends ReadingProps {
  data: MacroReadingData
}

export interface SavedMacroReadingProps extends MacroReadingProps {
  name: string
  amount: number
  unit: string
}

class BaseReading {
  public id: number
  public created: Date

  constructor(props: ReadingProps) {
    const { id, created } = props
    this.id = id
    this.created = created || new Date()
  }
}

export class SimpleReading extends BaseReading {
  public data: number

  constructor(props: SimpleReadingProps) {
    super(props)
    const { data } = props
    this.data = data
  }
}

export class DoseReading extends SimpleReading {
  public long: boolean

  constructor(props: DoseReadingProps) {
    super(props)
    const { long } = props
    this.long = long
  }
}

export class MacroReading extends BaseReading {
  public data: MacroReadingData

  constructor(props: MacroReadingProps) {
    super(props)
    const { data } = props
    this.data = data
  }
}

export class SavedMacroReading extends MacroReading {
  public name: string
  public amount: number
  public unit: string

  constructor(props: SavedMacroReadingProps) {
    super(props)
    const { name, amount, unit } = props
    this.name = name
    this.amount = amount
    this.unit = unit
  }
}

export type StatsResponse = {
  [key: string]: {
    avg: number
    stddev: number
  }
  | string
}
