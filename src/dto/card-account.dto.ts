export interface CreateCardAccount {
    accountId:  number
    approved_limit: number 
    available_limit:  number
    dueday: Date 
    invoice_value:  number 
    status: string 
    block_code: string  
    logo: string 
    default_code: string
    associateId:  number
}
export interface receivedCardAccountInfo {
    dueday: Date 
    logo: string 
    associateId:  number
}