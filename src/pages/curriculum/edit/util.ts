export type PriorityCardData = {
    name: string
    code: string
    tag: CourseTag
    isTop: boolean
}

export enum CourseTag {
    Curr,
    Next,
    Custom
}