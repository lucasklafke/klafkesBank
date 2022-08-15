import { Purchase } from "@prisma/client"
export async function calculateCardLimit(income : number,age: number ){
    if(age < 18){
        if(income >= 1000){
            return 1500
        } else{
            return 500
        }
    } else if(age >= 18 && age < 30){
        if(income >= 1500 && income >= 3000){
            return 2500
        } else if(income >= 3000){
            return income + 1000
        } else{
            return income
        }
    } else if(age >= 30 && age <= 60){
        if(income >= 1500 && income >= 3000){
            return 3000
        } else if(income >= 3000){
            return income + 1500
        }
    } else{
        return income
    }
    return income
}

export async function cardRequestFilter(income : number,age: number){
    
        if(age >= 16 && income >= 1000){
            return "accepted"
        }
        return "declined"
}

export async function calculateInvoice(purchases: Purchase[]){
    let invoice = 0
    purchases.forEach(purchase => {
        invoice += purchase.amount
    })
    return invoice
}