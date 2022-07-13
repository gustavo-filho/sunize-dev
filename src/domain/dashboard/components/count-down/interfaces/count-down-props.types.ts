export interface CountdownPropsType {
    header:
    | {
        allowed: true
        color?: string
    }
    | undefined
    timer:
    | {
        allowed: boolean
        time?: number
    }
    | undefined
}