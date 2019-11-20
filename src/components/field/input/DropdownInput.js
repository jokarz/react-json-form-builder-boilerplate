import React from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'

const DropdownInput = props => {
    const { update, data, name, placeholder } = props
    const displayData = Object.keys(data)
    const change = pick => {
        update([pick[0], data[pick[0]]])
    }
    return (
        <Typeahead
            className="mb-3"
            placeholder={placeholder}
            multiple={false}
            paginationText={'More results...'}
            name={name}
            id={name}
            options={displayData}
            flip={true}
            highlightOnlyResult={true}
            selectHintOnEnter={true}
            onChange={change}
        />
    )
}

DropdownInput.defaultProps = {
    update: () => { },
    data: {},
    name: '',
    placeholder: ''
}


export default DropdownInput