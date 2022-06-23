import { ActivityCode } from "./activityCode"
import { BankAccount } from "./bankAccount"
import { Register } from "./register"

export class Company{
    firstname: string
    lastname: string
    username: string
    password: string
    telephoneNumber: string
    email: string
    name: string
    country: string
    city: string
    postNumber: Number
    streetName: string
    streetNumber: Number
    PIB: Number
    JMBP: string
    imageData: string
    status: string
    firstTime: boolean
    active: boolean
    category: string
    activityCodes: Array<ActivityCode>
    PDV: Boolean
    bankAccounts: Array<BankAccount>
    storageUnits: number
    registers: Array<Register>
}