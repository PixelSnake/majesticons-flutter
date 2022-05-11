const fs = require('fs')
const path = require('path')

const codeTemplate = "majesticon_flutter.template.dart"
const sourceTarget = "lib"
const iconpath = "majesticons"
const styles = ["line", "solid"]

const iconDefinitions = [];
styles.forEach(style => {
    const iconsInFirstStyle = fs.readdirSync(getStylePath(style))
    iconsInFirstStyle.forEach(icon => {
        const fullPath = path.join(getStylePath(style), icon)
        const iconData = fs.readFileSync(fullPath)
        let nameCamelCase = kebabToCamelCase(icon.replace(".svg", "")) + (style === "solid" ? "Solid" : "")
        const dartCode = `static Uint8List ${ nameCamelCase } = Uint8List.fromList([${ Uint8Array.from(iconData) }]);`
        iconDefinitions.push(dartCode)
    })
})

let template = fs.readFileSync(path.join(__dirname, codeTemplate)).toString()
template = template.replace("//ICONS", iconDefinitions.join("\n"))
const outputPath = path.join(__dirname, sourceTarget, codeTemplate.replace(".template", ""))
console.log(outputPath)
fs.writeFileSync(outputPath, template)

function getStylePath(style) {
    if (style === "solid") return path.join(__dirname, iconpath, style)
    return path.join(__dirname, iconpath, style)
}

function kebabToCamelCase(kebabStr) {
    let camelStr = ""
    let startIndex = 0

    while (true) {
        let dashIndex = kebabStr.indexOf("-", startIndex)
        let end = false
        if (dashIndex < 0) {
            dashIndex = kebabStr.length + 1
            end = true
        }

        let part = kebabStr.substring(startIndex, dashIndex)
        if (startIndex > 0) part = part[0].toUpperCase() + part.substr(1)

        camelStr += part

        startIndex = dashIndex + 1
        if (end) break
    }

    return camelStr
}

kebabToCamelCase("this-is-kebab-case")