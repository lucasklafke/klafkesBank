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
import * as authRepository from "../repositories/authRepository.js";
import * as associateRepository from "../repositories/associateRepository.js";
import { compareBcrypt, encrypt } from "../utils/bcryptFunctions.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
dotenv.config();
function verifyCpfExist(cpf) {
    return __awaiter(this, void 0, void 0, function () {
        var associate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authRepository.getByCpf(cpf)];
                case 1:
                    associate = _a.sent();
                    return [2 /*return*/, associate];
            }
        });
    });
}
function generateJWT(cpf, associateId, associateName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, jwt.sign({ cpf: cpf, associateId: associateId, associateName: associateName }, process.env.JWT_SECRET, { expiresIn: "12h" })];
        });
    });
}
function validateSignIn(associate, password) {
    if (!associate) {
        throw { type: "not_found", message: "cpf not registered" };
    }
    var isPasswordValid = compareBcrypt(password, associate.password);
    if (!isPasswordValid) {
        throw { type: "invalid password", message: "invalid password" };
    }
}
export function signUp(data) {
    return __awaiter(this, void 0, void 0, function () {
        var associate, hashedPassword, register;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, verifyCpfExist(data.cpf)];
                case 1:
                    associate = _a.sent();
                    if (associate) {
                        throw { type: "conflict", message: "Cpf already registered" };
                    }
                    hashedPassword = encrypt(data.password);
                    data.password = hashedPassword;
                    return [4 /*yield*/, authRepository.create(data)];
                case 2:
                    register = _a.sent();
                    if (!register) return [3 /*break*/, 4];
                    return [4 /*yield*/, createAccount(register.id)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function signIn(cpf, password) {
    return __awaiter(this, void 0, void 0, function () {
        var associate, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authRepository.getByCpf(cpf)];
                case 1:
                    associate = _a.sent();
                    validateSignIn(associate, password);
                    return [4 /*yield*/, generateJWT(cpf, associate.id, associate.name)];
                case 2:
                    token = _a.sent();
                    console.log("tok", token);
                    return [2 /*return*/, token];
            }
        });
    });
}
export function createAccount(associateId) {
    return __awaiter(this, void 0, void 0, function () {
        var account_number, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    account_number = faker.finance.account(10);
                    data = {
                        account_number: account_number,
                        status: "readyToWork",
                        associateId: associateId,
                        balance: 0,
                        account_type: "current"
                    };
                    return [4 /*yield*/, associateRepository.createAccount(data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var authService = {
    signUp: signUp,
    signIn: signIn
};
export default authService;
