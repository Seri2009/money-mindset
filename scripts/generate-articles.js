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
var fs = require("fs");
var path = require("path");
var matter = require("gray-matter");
var articlesDir = path.join(__dirname, "../src/articles");
var outputFile = path.join(__dirname, "../src/data/generated-articles.ts");
function getAllMarkdownFiles(dir) {
    return fs.readdirSync(dir)
        .filter(function (file) { return file.endsWith(".md"); })
        .map(function (file) { return path.join(dir, file); });
}
function parseArticle(filePath) {
    var raw = fs.readFileSync(filePath, "utf-8");
    var _a = matter(raw), data = _a.data, content = _a.content;
    return __assign(__assign({}, data), { content: content.trim(), id: data.slug || path.basename(filePath, ".md") });
}
function main() {
    var files = getAllMarkdownFiles(articlesDir);
    var articles = files.map(parseArticle);
    var ts = "// This file is auto-generated. Do not edit manually.\nimport { Article } from '../types/article';\n\nexport const articles: Article[] = ".concat(JSON.stringify(articles, null, 2), ";\n");
    fs.writeFileSync(outputFile, ts, "utf-8");
    console.log("Generated ".concat(outputFile, " with ").concat(articles.length, " articles."));
}
main();
