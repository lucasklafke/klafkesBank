var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jest } from "@jest/globals";
import * as cardService from "../../src/services/cardService.js";
// import {associateRepository} from "../../src/repositories/associateRepository.js"
import bcrypt from "bcrypt";
import { cardRepository } from "../../src/repositories/cardRepository.js";
import { associateRepository } from "../../src/repositories/associateRepository.js";
describe("card tests", function () {
    it("should return a not_found error when validate identity", function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(associateRepository, "getById").mockImplementation(function () {
                        return false;
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, cardService.validateIdentity(1, "123")];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    expect(err_1).toBeDefined();
                    expect(err_1.type).toBe("not_found");
                    expect(err_1.message).toBe("associate not found");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("should return an unauthorized error when validate identity", function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(associateRepository, "getById").mockImplementation(function () {
                        return true;
                    });
                    jest.spyOn(bcrypt, "compare").mockImplementation(function () {
                        return true;
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, cardService.validateIdentity(1, "123")];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    expect(err_2).toThrowError("Invalid password");
                    expect(err_2).toBeDefined();
                    expect(err_2.type).toBe("unauthorized");
                    expect(err_2.message).toBe("Invalid password");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("should return an associate when validate identity", function () { return __awaiter(void 0, void 0, void 0, function () {
        var associate, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(associateRepository, "getById").mockImplementation(function () {
                        return { id: 1 };
                    });
                    jest.spyOn(bcrypt, "compare").mockImplementation(function () {
                        return true;
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, cardService.validateIdentity(1, "123")];
                case 2:
                    associate = _a.sent();
                    expect(associate.id).toBe(1);
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    expect(err_3).toBeUndefined();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("should return a card when create card", function () { return __awaiter(void 0, void 0, void 0, function () {
        var associate, receivedCard, card, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(cardRepository, "createCard").mockImplementation(function () {
                        return {};
                    });
                    associate = {
                        id: 1,
                        name: "String",
                        cpf: "String",
                        birthdate: new Date(2020, 1, 1),
                        createdAt: "String",
                        latitude: "String",
                        longitude: "String",
                        vigencyDate: new Date(2020, 1, 1),
                        vigencyEndDate: null,
                        password: "String"
                    };
                    receivedCard = {
                        "income": 2000,
                        "password": "123456",
                        "logo": "gold",
                        "limit": 500,
                        "invoice_dueday": "31",
                        "name": "LUCAS KLAFKE",
                        "type": "physical",
                        "cardPassword": "3142"
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, cardService.createCard(receivedCard, associate)];
                case 2:
                    card = _a.sent();
                    expect(card).toBeDefined();
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    expect(err_4).toBeUndefined();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("should return a virtual card", function () { return __awaiter(void 0, void 0, void 0, function () {
        var receivedCard, card, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(cardRepository, "createCard").mockImplementation(function () {
                        return { id: 1 };
                    });
                    receivedCard = {
                        number: "string",
                        name: "string",
                        cvv: "string",
                        expirationDate: new Date(2020, 1, 1),
                        logo: "string",
                        limit: 2000,
                        type: "string",
                        password: "string",
                        cpf: "string"
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, cardService.createVirtualCard(receivedCard)];
                case 2:
                    card = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_5 = _a.sent();
                    expect(err_5).toBeUndefined();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("should return a conflict error in card request", function () { return __awaiter(void 0, void 0, void 0, function () {
        var associate, receivedData, request, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(associateRepository, "getAccountByAssociateId").mockImplementation(function () {
                        return { id: 1 };
                    });
                    jest.spyOn(cardRepository, "getPhysicalCardByAssociateCPF").mockImplementation(function () {
                        return true;
                    });
                    associate = {
                        id: 1,
                        name: "String",
                        cpf: "String",
                        birthdate: new Date(2020, 1, 1),
                        createdAt: "String",
                        latitude: "String",
                        longitude: "String",
                        vigencyDate: new Date(2020, 1, 1),
                        vigencyEndDate: null,
                        password: "String"
                    };
                    receivedData = {
                        "income": 2000,
                        "password": "123456",
                        "logo": "gold",
                        "limit": 500,
                        "invoice_dueday": "31",
                        "name": "LUCAS KLAFKE",
                        "type": "physical",
                        "cardPassword": "3142"
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, cardService.createRequest(receivedData, associate)];
                case 2:
                    request = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_6 = _a.sent();
                    expect(err_6).toBeDefined();
                    expect(err_6.type).toBe("conflict");
                    expect(err_6.message).toBe("You already have a physical card");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("should return declined in card request", function () { return __awaiter(void 0, void 0, void 0, function () {
        var associate, receivedData, request, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(associateRepository, "getAccountByAssociateId").mockImplementation(function () {
                        return { id: 1 };
                    });
                    jest.spyOn(cardRepository, "getPhysicalCardByAssociateCPF").mockImplementation(function () {
                        return false;
                    });
                    jest.spyOn(cardRepository, "createCardRequest").mockImplementation(function (infos) {
                        return infos;
                    });
                    associate = {
                        id: 1,
                        name: "String",
                        cpf: "String",
                        birthdate: new Date(2020, 1, 1),
                        createdAt: "String",
                        latitude: "String",
                        longitude: "String",
                        vigencyDate: new Date(2020, 1, 1),
                        vigencyEndDate: null,
                        password: "String"
                    };
                    receivedData = {
                        "income": 2000,
                        "password": "123456",
                        "logo": "gold",
                        "limit": 500,
                        "invoice_dueday": "31",
                        "name": "LUCAS KLAFKE",
                        "type": "physical",
                        "cardPassword": "3142"
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, cardService.createRequest(receivedData, associate)];
                case 2:
                    request = _a.sent();
                    expect(request.describe).toBe("declined");
                    return [3 /*break*/, 4];
                case 3:
                    err_7 = _a.sent();
                    expect(err_7).toBeUndefined();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("should return accepted in card request", function () { return __awaiter(void 0, void 0, void 0, function () {
        var associate, receivedData, request, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(associateRepository, "getAccountByAssociateId").mockImplementation(function () {
                        return { id: 1 };
                    });
                    jest.spyOn(cardRepository, "getPhysicalCardByAssociateCPF").mockImplementation(function () {
                        return false;
                    });
                    jest.spyOn(cardRepository, "createCardRequest").mockImplementation(function (infos) {
                        return infos;
                    });
                    associate = {
                        id: 1,
                        name: "String",
                        cpf: "String",
                        birthdate: new Date(2000, 1, 1),
                        createdAt: "String",
                        latitude: "String",
                        longitude: "String",
                        vigencyDate: new Date(2000, 1, 1),
                        vigencyEndDate: null,
                        password: "String"
                    };
                    receivedData = {
                        "income": 2000,
                        "password": "123456",
                        "logo": "gold",
                        "limit": 500,
                        "invoice_dueday": "31",
                        "name": "LUCAS KLAFKE",
                        "type": "physical",
                        "cardPassword": "3142"
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, cardService.createRequest(receivedData, associate)];
                case 2:
                    request = _a.sent();
                    expect(request.describe).toBe("accepted");
                    return [3 /*break*/, 4];
                case 3:
                    err_8 = _a.sent();
                    expect(err_8).toBeUndefined();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
