import { ItemStats } from "./itemStats"

export class Receipt{
    companyName: string
    selectedItems: Array<ItemStats>
    paymentType: string
    amountToPay: number
    tax: number
    change: number
    idCard: string
    firstNameBuyer: string
    lastNameBuyer: string
    creditCardSlip: string
    virmanCustor: string
    date: Date
}