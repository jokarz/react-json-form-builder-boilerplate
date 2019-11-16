const fs = require('fs')

const parseJSON = filePath => {
    let fileName = ''
    try {
        fileName = filePath.lastIndexOf('/') == -1 ? filePath : filePath.substring(filePath.lastIndexOf('/') + 1);
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    } catch (error) {
        throw new Error(`"${fileName}" is not a valid json file`)
    }
}

let schema = parseJSON('./src/schema/outline.json');

Object.keys(schema).map(platform => {
    if (schema[platform]['fields']) {
        Object.keys(schema[platform]['fields']).map(field => {
            if (schema[platform]['fields'][field]['dependent']) {
                if (schema[platform]['fields'][field]['type'].toLowerCase() === 'case') {
                    Object.keys(schema[platform]['fields'][field]['case']).map(c => {
                        if (schema[platform]['fields'][field]['case'][c]['data']) {
                            let dataPath = schema[platform]['fields'][field]['case'][c]['data']
                            schema[platform]['fields'][field]['case'][c]['data'] = parseJSON(`./src/data/${dataPath}`)
                        }
                    })
                } else if (schema[platform]['fields'][field]['data']) {
                    let dataPath = schema[platform]['fields'][field]['data']
                    schema[platform]['fields'][field]['data'] = parseJSON(`./src/data/${dataPath}`)
                }
            } else {
                if (schema[platform]['fields'][field]['data']) {
                    let dataPath = schema[platform]['fields'][field]['data']
                    schema[platform]['fields'][field]['data'] = parseJSON(`./src/data/${dataPath}`)
                }
            }
        })
    }

})

fs.writeFileSync('./src/data/processed/overall.json', JSON.stringify(schema, null, 2), 'utf8', err => { });
