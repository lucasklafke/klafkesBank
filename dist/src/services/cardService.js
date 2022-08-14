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
import { cardRequestFilter } from "../utils/calcAlgorithms.js";
import { compareBcrypt } from "../utils/bcryptFunctions.js";
import { getById, getAccountByAssociateId, getCardAccountByAccountId } from "../repositories/associateRepository.js";
import { cardRepository } from "../repositories/cardRepository.js";
import { formatTimestampToBirthdate, getDateToCard } from "../utils/dataFormatters.js";
import { faker } from '@faker-js/faker';
export function validateIdentity(associateId, password) {
    return __awaiter(this, void 0, void 0, function () {
        var associate, comparedPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getById(associateId)];
                case 1:
                    associate = _a.sent();
                    if (!associate) {
                        throw { type: "not_found", message: "associate not found" };
                    }
                    comparedPassword = compareBcrypt(password, associate.password);
                    if (!comparedPassword) {
                        throw { type: "unauthorized", message: "Invalid password" };
                    }
                    return [2 /*return*/, associate];
            }
        });
    });
}
function generateCard() {
    var number = faker.finance.creditCardNumber('63[7-9]#-####-####-###L');
    var cvv = faker.finance.creditCardCVV();
    var expirationDate = getDateToCard();
    return {
        number: number,
        cvv: cvv,
        expirationDate: expirationDate
    };
}
export function createCard(receivedCardData, associate) {
    return __awaiter(this, void 0, void 0, function () {
        var generatedInfos, cardData, card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    generatedInfos = generateCard();
                    cardData = {
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
                    };
                    return [4 /*yield*/, cardRepository.createCard(cardData)];
                case 1:
                    card = _a.sent();
                    return [2 /*return*/, card];
            }
        });
    });
}
export function createVirtualCard(card) {
    return __awaiter(this, void 0, void 0, function () {
        var number, cvv, cardExist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    number = faker.finance.creditCardNumber('63[7-9]#-####-####-###L');
                    cvv = faker.finance.creditCardCVV();
                    delete card.id;
                    card["block_code"] = "working123";
                    card["type"] = "virtual";
                    card["cvv"] = cvv;
                    return [4 /*yield*/, cardRepository.getCardByNumber(number)];
                case 1:
                    cardExist = _a.sent();
                    if (!cardExist) return [3 /*break*/, 5];
                    _a.label = 2;
                case 2:
                    number = faker.finance.creditCardNumber('63[7-9]#-####-####-###L');
                    return [4 /*yield*/, cardRepository.getCardByNumber(number)];
                case 3:
                    cardExist = _a.sent();
                    _a.label = 4;
                case 4:
                    if (cardExist) return [3 /*break*/, 2];
                    _a.label = 5;
                case 5:
                    card["number"] = number;
                    return [4 /*yield*/, cardRepository.createCard(card)];
                case 6: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
export function createCardAccount(cardAccountData, associateId) {
    return __awaiter(this, void 0, void 0, function () {
        var id, cardAccount, date, year, month, dueday, createCardAccountData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAccountByAssociateId(associateId)];
                case 1:
                    id = (_a.sent()).id;
                    return [4 /*yield*/, getCardAccountByAccountId(id)];
                case 2:
                    cardAccount = _a.sent();
                    if (cardAccount) {
                        return [2 /*return*/, cardAccount];
                    }
                    date = new Date();
                    year = date.getFullYear() + 5;
                    month = date.getMonth();
                    dueday = new Date("".concat(year, "-").concat(month, "-").concat(cardAccountData.invoice_dueday));
                    createCardAccountData = {
                        associateId: associateId,
                        accountId: id,
                        selected_limit: Number(cardAccountData.limit),
                        approved_limit: 700,
                        dueday: dueday,
                        logo: cardAccountData.logo,
                        status: "working",
                        block_code: "working123",
                        default_code: "working123"
                    };
                    return [4 /*yield*/, cardRepository.createCardAccount(createCardAccountData)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
export function createRequest(data, associate) {
    return __awaiter(this, void 0, void 0, function () {
        var account, physicalCards, age, status, end_date, requestData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAccountByAssociateId(associate.id)];
                case 1:
                    account = _a.sent();
                    return [4 /*yield*/, cardRepository.getManyPhysicalCardsByAssociateCPF(associate.cpf)];
                case 2:
                    physicalCards = _a.sent();
                    physicalCards.forEach(function (card) {
                        if (card.block_code === "working123" || card.block_code === "ready_to_working123") {
                            throw { type: "conflict", message: "You already have a physical card" };
                        }
                    });
                    age = formatTimestampToBirthdate(associate.birthdate);
                    return [4 /*yield*/, cardRequestFilter(data.income, age)];
                case 3:
                    status = _a.sent();
                    if (!account) {
                        throw { type: "not_found" };
                    }
                    end_date = new Date();
                    requestData = {
                        logo: data.logo,
                        account_number: String(account.account_number),
                        end_date: end_date,
                        current_status: status,
                        describe: status,
                        push_describe: "Your card request is ".concat(status)
                    };
                    return [4 /*yield*/, cardRepository.createCardRequest(requestData)];
                case 4: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
export function getCards(associateId) {
    return __awaiter(this, void 0, void 0, function () {
        var cpf, cards;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getById(associateId)];
                case 1:
                    cpf = (_a.sent()).cpf;
                    return [4 /*yield*/, cardRepository.getCardsByAssociateCpf(cpf)];
                case 2:
                    cards = _a.sent();
                    return [2 /*return*/, cards];
            }
        });
    });
}
export function getCard(cardId) {
    return __awaiter(this, void 0, void 0, function () {
        var card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.getCardById(cardId)];
                case 1:
                    card = _a.sent();
                    return [2 /*return*/, card];
            }
        });
    });
}
