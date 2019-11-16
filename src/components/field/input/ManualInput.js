import React from 'react'

const ManualInput = props => {
    const { prefix, suffix, update, name, regex, placeholder } = props
    const change = e => {
        if (e.currentTarget.checkValidity()) {
            update([e.target.value, prefix + e.target.value + suffix])
        } else {
            e.currentTarget.reportValidity()
        }
    }
    return (
        <div className="input-group mb-3">
            {
                prefix ?
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">{prefix}</span>
                    </div> : null
            }
            <input type="text"
                className="form-control"
                name={name}
                pattern={regex}
                placeholder={placeholder}
                onChange={change}
            />
            {
                suffix ?
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">{suffix}</span>
                    </div> : null
            }
        </div>
    )
}

ManualInput.defaultProps = {
    prefix: '',
    suffix: '',
    update: () => { },
    name: '',
    regex: '.*',
    placeholder: '...'
}

export default ManualInput