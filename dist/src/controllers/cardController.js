var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import * as cardService from "../services/cardService.js";
export function createCard(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, income, password, logo, limit, invoice_dueday, type, name, cardPassword, associateId, associate, request, cardAccount, card, copyCard, virtualCard;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, income = _a.income, password = _a.password, logo = _a.logo, limit = _a.limit, invoice_dueday = _a.invoice_dueday, type = _a.type, name = _a.name, cardPassword = _a.cardPassword;
                    associateId = res.locals.jwtData.associateId;
                    return [4 /*yield*/, cardService.validateIdentity(associateId, password)];
                case 1:
                    associate = _b.sent();
                    return [4 /*yield*/, cardService.createRequest({ income: income, password: password, logo: logo, limit: limit, invoice_dueday: invoice_dueday, type: type, name: name, cardPassword: cardPassword }, associate)];
                case 2:
                    request = _b.sent();
                    if (request.current_status === "declined") {
                        return [2 /*return*/, res.status(400).send(request.push_describe)];
                    }
                    return [4 /*yield*/, cardService.createCardAccount({ income: income, password: password, logo: logo, limit: limit, invoice_dueday: invoice_dueday, type: type, name: name, cardPassword: cardPassword }, associateId)];
                case 3:
                    cardAccount = _b.sent();
                    return [4 /*yield*/, cardService.createCard({ income: income, password: password, logo: logo, limit: limit, invoice_dueday: invoice_dueday, type: type, name: name, cardPassword: cardPassword }, associate)];
                case 4:
                    card = _b.sent();
                    copyCard = __assign({}, card);
                    return [4 /*yield*/, cardService.createVirtualCard(copyCard)];
                case 5:
                    virtualCard = _b.sent();
                    res.status(201).send({ card: card, virtualCard: virtualCard });
                    return [2 /*return*/];
            }
        });
    });
}
export function getCards(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var associateId, cards;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    associateId = res.locals.jwtData.associateId;
                    return [4 /*yield*/, cardService.getCards(associateId)];
                case 1:
                    cards = _a.sent();
                    res.send(cards);
                    return [2 /*return*/];
            }
        });
    });
}
export function getCard(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var cardId, card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cardId = req.params.cardId;
                    return [4 /*yield*/, cardService.getCard(Number(cardId))];
                case 1:
                    card = _a.sent();
                    res.send(card);
                    return [2 /*return*/];
            }
        });
    });
}
