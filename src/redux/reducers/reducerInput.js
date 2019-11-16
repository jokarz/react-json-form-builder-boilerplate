import overallData from '../../data/processed/overall.json'

let startState = {}
Object.keys(overallData).forEach(platform => {
    if (overallData[platform]['fields']) {
        Object.keys(overallData[platform]['fields']).forEach(field => {
            if (!startState[platform]) {
                startState[platform] = {}
            }
            startState[platform][field] = []
        })
    }
})

export const initialState = () => {
    let startState = {}
    Object.keys(overallData).forEach(platform => {
        if (overallData[platform]['fields']) {
            Object.keys(overallData[platform]['fields']).forEach(field => {
                if (!startState[platform]) {
                    startState[platform] = {}
                }
                startState[platform][field] = []
            })
        }
    })
    return startState
}

export default (state = startState, action) => {
    switch (action.type) {
        case "UpdateInputs":
            const { platform, field, value } = action
            let temp = JSON.parse(JSON.stringify(state))
            temp[platform][field] = value
            return temp
        default:
            return state
    }
}





