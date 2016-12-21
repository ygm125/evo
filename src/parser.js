import htmlparser from 'htmlparser2'

let parser = new htmlparser.Parser({
    onopentag: function (name, attribs) {
        if (name === "script" && attribs.type === "text/javascript") {
            console.log("JS! Hooray!")
        }
    },
    ontext: function (text) {
        console.log("-->", text)
    },
    onclosetag: function (tagname) {
        if (tagname === "script") {
            console.log("That's it?!")
        }
    }
}, { decodeEntities: true })

export function compileToFunctions(template, vm) {
    parser.write(template)
    parser.end()
}