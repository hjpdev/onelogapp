export enum DataKey {
  bg = 'bgReadings',
  keto = 'ketoReadings',
  dose = 'doseReadings',
  macro = 'macroReadings',
  bgStats = 'bgStats',
  savedMacro = 'savedMacros'
}

export type MacroReadingKey = keyof MacroReadingData
export type Reading = BaseReading | DoseReading | MacroReading | SavedMacroReading

export interface MacroReadingData {
  kcal: number
  carbs: number
  sugar: number
  protein: number
  fat: number
}

export type StatsResponse = {
  [key: string]: {
    avg: number
    stddev: number
  }
  | string
}

export interface IPrototype { prototype: any }

export interface BaseReadingProps {
  id?: number
  created?: Date
}

export interface BgReadingProps extends BaseReadingProps {
  data: number
}

export interface KetoReadingProps extends BaseReadingProps {
  data: number
}

export interface DoseReadingProps extends BaseReadingProps {
  data: number
  long: boolean
}

export interface MacroReadingProps extends BaseReadingProps {
  data: MacroReadingData
}

export interface SavedMacroReadingProps extends MacroReadingProps {
  name: string
  amount: number
  unit: string
}

class BaseReading {
  id?: number
  created: Date

  constructor(props: BaseReadingProps) {
    const { id, created } = props
    this.id = id || undefined
    this.created = created || new Date()
  }
}

export class BgReading extends BaseReading {
  data: number

  constructor(props: BgReadingProps) {
    super(props)
    this.data = props.data
  }
}

export class KetoReading extends BaseReading {
  data: number

  constructor(props: KetoReadingProps) {
    super(props)
    this.data = props.data
  }
}

export class DoseReading extends BaseReading {
  data: number
  public long: boolean

  constructor(props: DoseReadingProps) {
    super(props)
    this.data = props.data
    this.long = props.long
  }
}

export class MacroReading extends BaseReading {
  data: MacroReadingData

  constructor(props: MacroReadingProps) {
    super(props)
    this.data = props.data
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
