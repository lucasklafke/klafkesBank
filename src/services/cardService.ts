import { calculateCardLimit, cardRequestFilter } from "../utils/calcAlgorithms.js";
import { compareBcrypt } from "../utils/bcryptFunctions.js";
import {getById} from "../repositories/associateRepository.js"
import {cardRepository} from "../repositories/cardRepository.js"
import { formatTimestampToBirthdate, nameFormatter, getDateToCard } from "../utils/dataFormatters.js";
import { CreateCardData } from "../dto/card.dto.js"
import { faker } from '@faker-js/faker';
import { Associate } from "@prisma/client";
import { Card } from "@prisma/client";
import { accountRepository } from "../repositories/accountRepository.js";

export type createCardData = Omit<Card, "id" | "createdAt" | "blockDate" | "isMainCard">

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
    const number = faker.finance.creditCardNumber('63[7-9]#-####-####-###L')
    const cvv = faker.finance.creditCardCVV()
    const expirationDate = getDateToCard()
    return {
        number, cvv, expirationDate
    }



}

export async function createCard(receivedCardData : CreateCardData, associate: Associate,card_account_id:number){

    const generatedInfos = generateCard()
    const cardData = {
        number: generatedInfos.number,
        name: receivedCardData.name,
        cvv: generatedInfos.cvv,
        expirationDate: generatedInfos.expirationDate,
        logo: receivedCardData.logo,
        block_code: "ready_to_working123",
        type: receivedCardData.type,
        password: receivedCardData.cardPassword,
        cpf: associate.cpf,
        card_account_id
    }
    const card =  await cardRepository.createCard(cardData)
    
    return card

}

export async function createVirtualCard(card: any){
    let number = faker.finance.creditCardNumber('63[7-9]#-####-####-###L')

    const cvv = faker.finance.creditCardCVV()
    delete card.id
    card["block_code"] = "working123"
    card["type"] = "virtual" 
    card["cvv"] = cvv
    
    let cardExist = await cardRepository.getCardByNumber(number)
    if(cardExist){
        do {
            number = faker.finance.creditCardNumber('63[7-9]#-####-####-###L')
            cardExist = await cardRepository.getCardByNumber(number)
        } while(cardExist)
    }
    card["number"] = number

    return await cardRepository.createCard(card)
     
}

export async function createRequest(data : CreateCardData, associate : Associate){
    const account = await accountRepository.getAccountByAssociateId(associate.id)
    const physicalCards = await cardRepository.getManyPhysicalCardsByAssociateCPF(associate.cpf)
    if(physicalCards.length !== 0){
        physicalCards.forEach(card => {
            if(card.block_code === "working123" || card.block_code === "ready_to_working123"){
                throw {type: "conflict", message: "You already have a physical card"}
            }
        })
    }

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
    if(!cpf) throw {message: 'cpf not found', type: "not_found"}
    const cards = await cardRepository.getCardsByAssociateCpf(cpf)
    if(cards.length === 0) throw { message: 'you have no cards', type: 'conflict'}
    return cards
}

export async function getCard(cardId: number){
    const card = await cardRepository.getCardById(cardId)
    if(!card) throw { message: 'card not found', type: 'not_found'}
    return card
}