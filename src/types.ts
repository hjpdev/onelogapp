// eslint-disable-line max-classes-per-file
export enum DoseText {
  long = 'Long',
  short = 'Short'
}

export enum Table {
  bg = 'bg',
  keto = 'keto',
  dose = 'dose',
  macro = 'macro',
  savedMacro = 'saved-macro'
}

export enum DataKey {
  bg = 'bgReadings',
  keto = 'ketoReadings',
  dose = 'doseReadings',
  macro = 'macroReadings',
  savedMacro = 'savedMacros',
  bgStats = 'bgStats'
}

export enum NewReadingHeaderText {
  bg = 'Bg',
  keto = 'Keto',
  dose = 'Dose',
  macro = 'Macro',
  savedMacro = 'Saved Macro'
}

export type MacroReadingKey = keyof MacroReadingData
export type Reading = BgReading | KetoReading | DoseReading | MacroReading | SavedMacroReading
export type ReadingProps =
  | BgReadingProps
  | KetoReadingProps
  | DoseReadingProps
  | MacroReadingProps
  | SavedMacroReadingProps
export type StoredReading =
  | StoredBgReading
  | StoredKetoReading
  | StoredDoseReading
  | StoredMacroReading
  | StoredSavedMacroReading

export interface MacroReadingData {
  kcal: number
  carbs: number
  sugar: number
  protein: number
  fat: number

  [macro: string]: number
}

export type StatsResponse = {
  [key: string]:
    | {
        avg: number
        stddev: number
      }
    | string
}

export interface BaseReadingProps {
  created?: Date
}

export interface BgReadingProps extends BaseReadingProps {
  data: number
}

export interface StatsReadingProps extends BaseReadingProps {
  avg: number
  stddev: number
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
  created: Date

  constructor(props: BaseReadingProps) {
    const { created } = props
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

export class StatsReading extends BaseReading {
  avg: number

  stddev: number

  constructor(props: StatsReadingProps) {
    super(props)
    this.avg = props.avg
    this.stddev = props.stddev
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

export class StoredBgReading extends BgReading {
  constructor(public id: number, props: BgReadingProps) {
    super(props)
  }
}

export class StoredStatsReading extends StatsReading {
  constructor(public id: number, props: StatsReadingProps) {
    super(props)
  }
}

export class StoredKetoReading extends KetoReading {
  constructor(public id: number, props: KetoReadingProps) {
    super(props)
  }
}

export class StoredDoseReading extends DoseReading {
  constructor(public id: number, props: DoseReadingProps) {
    super(props)
  }
}

export class StoredMacroReading extends MacroReading {
  constructor(public id: number, props: MacroReadingProps) {
    super(props)
  }
}

export class StoredSavedMacroReading extends SavedMacroReading {
  constructor(public id: number, props: SavedMacroReadingProps) {
    super(props)
  }
}
