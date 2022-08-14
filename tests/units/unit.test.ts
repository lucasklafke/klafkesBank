import { jest } from "@jest/globals";
import * as cardService from "../../src/services/cardService.js"
// import {associateRepository} from "../../src/repositories/associateRepository.js"
import bcrypt from "bcrypt"
import { cardRepository, createCard } from "../../src/repositories/cardRepository.js";
import { getCardAccountByAccountId, getAccountByAssociateId, associateRepository } from "../../src/repositories/associateRepository.js";
describe("card tests", () => {
        it("should return a not_found error when validate identity", async () => {
                jest.spyOn(associateRepository, "getById").mockImplementation(():any => {
                        return false
                })
                try{
                        await cardService.validateIdentity(1, "123")
                }catch(err){
                        expect(err).toBeDefined()
                        expect(err.type).toBe("not_found")
                        expect(err.message).toBe("associate not found")
                }
        })

        it("should return an unauthorized error when validate identity", async () => {
                jest.spyOn(associateRepository, "getById").mockImplementation(():any => {
                        return true
                })
                jest.spyOn(bcrypt, "compare").mockImplementation(():any => {
                        return true
                })
                try{
                        await cardService.validateIdentity(1, "123")
                }catch(err){
                        expect(err).toThrowError("Invalid password")
                        expect(err).toBeDefined()
                        expect(err.type).toBe("unauthorized")
                        expect(err.message).toBe("Invalid password")
                }
        })

        it("should return an associate when validate identity", async () => {
                jest.spyOn(associateRepository, "getById").mockImplementation(():any => {
                        return {id:1}
                })
                jest.spyOn(bcrypt, "compare").mockImplementation(():any => {
                        return true
                })
                try{
                        const associate = await cardService.validateIdentity(1,"123")
                        expect(associate.id).toBe(1)

                }catch(err){
                        expect(err).toBeUndefined()
                }
        })

        it("should return a card when create card", async () => {
                jest.spyOn(cardRepository, "createCard").mockImplementation(():any => {
                        return {}
                })

                const associate = {
                        id:1,
                        name:"String",
                        cpf:"String",
                        birthdate:      new Date(2020,1,1),
                        createdAt:      "String",
                        latitude:       "String",
                        longitude:      "String",
                        vigencyDate:    new Date(2020,1,1),
                        vigencyEndDate: null,
                        password:       "String"
                }
                const receivedCard = {
                        "income": 2000,
                        "password": "123456",
                        "logo": "gold",
                        "limit": 500,
                        "invoice_dueday": "31",
                        "name": "LUCAS KLAFKE",
                        "type": "physical",
                        "cardPassword": "3142"
                }
                try{
                        const card = await cardService.createCard(receivedCard,associate)

                        expect(card).toBeDefined()
                }catch(err){
                        expect(err).toBeUndefined()
                }
        })

        it("should return a virtual card", async () => {
                jest.spyOn(cardRepository, "createCard").mockImplementation(():any => {
                        return {id:1}
                })

                const receivedCard = {
                        number: "string",
                        name: "string",
                        cvv: "string",
                        expirationDate: new Date(2020,1,1),
                        logo: "string",
                        limit: 2000,
                        type: "string",
                        password: "string",
                        cpf: "string"
                }
                
                try{
                        const card = await cardService.createVirtualCard(receivedCard)
                }catch(err){
                        expect(err).toBeUndefined()
                }     
        })

        it("should return a conflict error in card request", async () => {

                jest.spyOn(associateRepository, "getAccountByAssociateId").mockImplementation(():any => {
                        return {id:1}
                })
                jest.spyOn(cardRepository, "getManyPhysicalCardsByAssociateCPF").mockImplementation(():any => {
                        return true
                })
                const associate = {
                        id:1,
                        name:"String",
                        cpf:"String",
                        birthdate:      new Date(2020,1,1),
                        createdAt:      "String",
                        latitude:       "String",
                        longitude:      "String",
                        vigencyDate:    new Date(2020,1,1),
                        vigencyEndDate: null,
                        password:       "String"
                }
                const receivedData= {
                        "income": 2000,
                        "password": "123456",
                        "logo": "gold",
                        "limit": 500,
                        "invoice_dueday": "31",
                        "name": "LUCAS KLAFKE",
                        "type": "physical",
                        "cardPassword": "3142"
                }

                try{
                        const request = await cardService.createRequest(receivedData,associate)

                }catch(err){
                        expect(err).toBeDefined()
                        expect(err.type).toBe("conflict")
                        expect(err.message).toBe("You already have a physical card")
                }
        })

        it("should return declined in card request", async () => {

                jest.spyOn(associateRepository, "getAccountByAssociateId").mockImplementation(():any => {
                        return {id:1}
                })
                jest.spyOn(cardRepository, "getManyPhysicalCardsByAssociateCPF").mockImplementation(():any => {
                        return false
                })

                jest.spyOn(cardRepository, "createCardRequest").mockImplementation((infos):any => {
                        return infos
                })

                const associate = {
                        id:1,
                        name:"String",
                        cpf:"String",
                        birthdate:      new Date(2020,1,1),
                        createdAt:      "String",
                        latitude:       "String",
                        longitude:      "String",
                        vigencyDate:    new Date(2020,1,1),
                        vigencyEndDate: null,
                        password:       "String"
                }
                const receivedData= {
                        "income": 2000,
                        "password": "123456",
                        "logo": "gold",
                        "limit": 500,
                        "invoice_dueday": "31",
                        "name": "LUCAS KLAFKE",
                        "type": "physical",
                        "cardPassword": "3142"
                }

                try{
                        const request = await cardService.createRequest(receivedData,associate)
                        expect(request.describe).toBe("declined")
                }catch(err){
                        expect(err).toBeUndefined()
                        
                }
        })

        it("should return accepted in card request", async () => {

                jest.spyOn(associateRepository, "getAccountByAssociateId").mockImplementation(():any => {
                        return {id:1}
                })
                jest.spyOn(cardRepository, "getManyPhysicalCardsByAssociateCPF").mockImplementation(():any => {
                        return false
                })

                jest.spyOn(cardRepository, "createCardRequest").mockImplementation((infos):any => {
                        return infos
                })

                const associate = {
                        id:1,
                        name:"String",
                        cpf:"String",
                        birthdate:      new Date(2000,1,1),
                        createdAt:      "String",
                        latitude:       "String",
                        longitude:      "String",
                        vigencyDate:    new Date(2000,1,1),
                        vigencyEndDate: null,
                        password:       "String"
                }
                const receivedData= {
                        "income": 2000,
                        "password": "123456",
                        "logo": "gold",
                        "limit": 500,
                        "invoice_dueday": "31",
                        "name": "LUCAS KLAFKE",
                        "type": "physical",
                        "cardPassword": "3142"
                }

                try{
                        const request = await cardService.createRequest(receivedData,associate)
                        expect(request.describe).toBe("accepted")
                }catch(err){
                        expect(err).toBeUndefined()
                        
                }
        })

        
})