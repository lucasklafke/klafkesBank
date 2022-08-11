import { calculateCardLimit, cardRequestFilter } from "../utils/calcAlgorithms.js";
import { compareBcrypt } from "../utils/bcryptFunctions.js";
import {getById, getAccountByAssociateId, getCardAccountByAccountId} from "../repositories/associateRepository.js"
import {cardRepository} from "../repositories/cardRepository.js"
import { formatTimestampToBirthdate, nameFormatter, getDateToCard } from "../utils/dataFormatters.js";
import {receivedData} from "../controllers/cardController.js"
import { faker } from '@faker-js/faker';
import { Associate } from "@prisma/client";
import { Card } from "@prisma/client";

export type createCardData = Omit<Card, "id" | "createdAt" | "blockDate" | "isMainCard">

export interface createCardAccountData {
    associateId : number,
    accountId: number,
    selected_limit: number,
    approved_limit: number,
    dueday: Date,
    logo: string,
    status: string,
    block_code: string,
    default_code: string
}

export async function validateIdentity(associateId:number, password: string){
    const associate = await getById(associateId)
    if(!associate){
        throw {type: "not_found", message:"associate not found"}
    }
    const comparedPassword = compareBcrypt(password, associate.password)
    if(!comparedPassword){
        throw {type : "unauthorized", message : "Invalid password"}
    }
    return associate
}

function generateCard(){
    const number = faker.finance.creditCardNumber()
    const cvv = faker.finance.creditCardCVV()
    const expirationDate = getDateToCard()
    return {
        number, cvv, expirationDate
    }



}

export async function createCard(receivedCardData : receivedData, associate: Associate){

    const generatedInfos = generateCard()
    const cardData = {
        number: generatedInfos.number,
        name: receivedCardData.name,
        cvv: generatedInfos.cvv,
        expirationDate: generatedInfos.expirationDate,
        logo: receivedCardData.logo,
        limit: Number(receivedCardData.limit),
        block_code: "ready_to_working123",
        type: receivedCardData.type,
        password: receivedCardData.cardPassword,
        cpf: associate.cpf
    }
    const card =  await cardRepository.createCard(cardData)
    
    return card

}

export async function createVirtualCard(card: any){
    let number = faker.finance.creditCardNumber()

    const cvv = faker.finance.creditCardCVV()
    delete card.id
    card["block_code"] = "working123"
    card["type"] = "virtual" 
    card["cvv"] = cvv
    
    let cardExist = await cardRepository.getCardByNumber(number)
    if(cardExist){
        do {
            number = faker.finance.creditCardNumber()
            cardExist = await cardRepository.getCardByNumber(number)
        } while(cardExist)
    }
    card["number"] = number

    return await cardRepository.createCard(card)
     
}

export async function createCardAccount(cardAccountData : receivedData, associateId : number){
    const {id} = await getAccountByAssociateId(associateId)
    const cardAccount = await getCardAccountByAccountId(id)
    if(cardAccount){
        return cardAccount
    }


    const date = new Date()
    const year = date.getFullYear() + 5
    const month = date.getMonth()
    const dueday = new Date(`${year}-${month}-${cardAccountData.invoice_dueday}`)
    const createCardAccountData = {
        associateId,
        accountId: id,
        selected_limit: Number(cardAccountData.limit),
        approved_limit: 700,
        dueday: dueday,
        logo: cardAccountData.logo,
        status: "working",
        block_code: "working123",
        default_code: "working123"
    }
    return await cardRepository.createCardAccount(createCardAccountData)
}

export async function createRequest(data : receivedData, associate : Associate){
    const account = await getAccountByAssociateId(associate.id)
    const physicalCards = await cardRepository.getManyPhysicalCardsByAssociateCPF(associate.cpf)

    physicalCards.forEach(card => {
        if(card.block_code === "working123" || card.block_code === "ready_to_working123"){
            throw {type: "conflict", message: "You already have a physical card"}
        }
    })
    const age = formatTimestampToBirthdate(associate.birthdate)
    const status = await cardRequestFilter(data.income, age)
    if(!account){
        throw {type: "not_found"}
    }



    const end_date = new Date()
    const requestData = {
        logo: data.logo,
        account_number: String(account.account_number),
        end_date,
        current_status: status,
        describe: status,
        push_describe: `Your card request is ${status}`
    }
    return await cardRepository.createCardRequest(requestData)
}

export async function getCards(associateId: number){
    const {cpf} = await getById(associateId)
    const cards = await cardRepository.getCardsByAssociateCpf(cpf)
    return cards
}

export async function getCard(cardId: number){
    const card = await cardRepository.getCardById(cardId)
    return card
}