import { ItemStats } from "./itemStats"

export class StorageUnit{
    id: number
    name: string
    companyPIB: number
    items: Array<ItemStats>
}