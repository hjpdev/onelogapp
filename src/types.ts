interface MacroReadingData {
  kcal: number
  carbs: number
  sugar: number
  protein: number
  fat: number
}

export type Reading = SimpleReading | DoseReading | SavedMacroReading | StatsResponse

export interface ReadingProps {
  id: number
  created?: Date
  data: number | MacroReadingData
}

export interface DoseReadingProps extends ReadingProps {
  long: boolean
}

export interface SavedMacroReadingProps extends ReadingProps {
  name: string
  amount: number
  unit: string
}

export class SimpleReading {
  public id: number
  public created: Date
  public data: number | MacroReadingData

  constructor(props: ReadingProps) {
    const { data, created, id } = props
    this.id = id
    this.created = created || new Date()
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

export class SavedMacroReading extends SimpleReading {
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
