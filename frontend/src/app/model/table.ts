import { ItemStats } from "./itemStats"

export class Table{
    id: number
    companyName: string
    companyPIB: number
    storeName: string
    type: string
    x: number
    y: number
    w: number
    h: number
    items: Array<ItemStats>
    taken: boolean
    department: string
}