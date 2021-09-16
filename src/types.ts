export interface Instruction {
  targetFile: string
  sourceTypes: InstructionSourceType | InstructionSourceType[]
}

export type Instructions = Instruction[]

export interface InstructionSourceType {
  file: string
  type: string | string[]
}
