"use strict";
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
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var readline_1 = require("readline");
var rl = readline_1["default"].createInterface({
    input: process.stdin,
    output: process.stdout
});
function ask(question) {
    return new Promise(function (resolve) { return rl.question(question, resolve); });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var title, slug, excerpt, content, category, image, publicationDate, featuredInput, featured, article, articlesPath, file, insertIndex, articleStr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ask("Article Title: ")];
                case 1:
                    title = _a.sent();
                    return [4 /*yield*/, ask("Slug (e.g. my-article-slug): ")];
                case 2:
                    slug = _a.sent();
                    return [4 /*yield*/, ask("Excerpt: ")];
                case 3:
                    excerpt = _a.sent();
                    return [4 /*yield*/, ask("Content (use \n for new lines): ")];
                case 4:
                    content = _a.sent();
                    return [4 /*yield*/, ask("Category (e.g. personal-finance): ")];
                case 5:
                    category = _a.sent();
                    return [4 /*yield*/, ask("Image path (default: /placeholder.svg): ")];
                case 6:
                    image = (_a.sent()) || "/placeholder.svg";
                    return [4 /*yield*/, ask("Publication Date (YYYY-MM-DD): ")];
                case 7:
                    publicationDate = _a.sent();
                    return [4 /*yield*/, ask("Featured? (yes/no): ")];
                case 8:
                    featuredInput = _a.sent();
                    featured = featuredInput.trim().toLowerCase() === "yes";
                    article = __assign({ id: Date.now().toString(), title: title, slug: slug, excerpt: excerpt, content: content.replace(/\\n/g, "\n"), category: category, image: image, publicationDate: publicationDate }, (featured ? { featured: true } : {}));
                    articlesPath = path_1["default"].join(__dirname, "src/data/articles.ts");
                    file = fs_1["default"].readFileSync(articlesPath, "utf-8");
                    insertIndex = file.indexOf("];");
                    if (insertIndex === -1) {
                        console.error("Could not find articles array in articles.ts");
                        process.exit(1);
                    }
                    articleStr = "  ".concat(JSON.stringify(article, null, 2), ",\n");
                    file = file.slice(0, insertIndex) + articleStr + file.slice(insertIndex);
                    fs_1["default"].writeFileSync(articlesPath, file, "utf-8");
                    console.log("Article added successfully!");
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
main();
