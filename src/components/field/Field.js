import React, { Fragment } from 'react'
import actions from '../../redux/actions'
import { connect } from 'react-redux'
import DropdownInput from './input/DropdownInput'
import ManualInput from './input/ManualInput'
import DisabledInput from './input/DisabledInput'
//if field not dependent, type can only be dropdown, manual
//if field is dependent, type can only be case, lookup
//for most JSON it looks like 
// {
//  "item1": "Value1", 
//  "item2": "Value2"
// }
// for lookup, the data looks like the above but with additional layer , 
// where the item is the items being lookedup
// {
//  "item1":{
//           "subItem1": "Value1"
//           "subItem2": "Value2"
//           },
//  "item2":{
//           "subItem1": "Value1"
//           "subItem2": "Value2"
//           }
// }


const Field = props => {
    const { data, name, updateInput, platform, Inputs } = props
    const { displayName, width, placeholder, dependent, type, show } = data
    let isEmpty = false
    let element = []
    const update = pick => {
        updateInput(platform, name, pick)
    }
    if (dependent) {
        if (!Inputs[platform] || !Inputs[platform][dependent] || Inputs[platform][dependent].length === 0) {
            element = <DisabledInput />
            isEmpty = true
        } else {
            if (type === 'case') {
                let choice = data['case'][Inputs[platform][dependent][0]] || null
                if (choice) {
                    if (choice.type === 'dropdown') {
                        element = <DropdownInput
                            update={update}
                            data={choice['data']}
                            name={name}
                            placeholder={choice.placeholder}
                        />
                    } else {
                        element = <ManualInput
                            update={update}
                            prefix={choice.prefix}
                            suffix={choice.suffix}
                            name={name}
                            regex={choice.regex}
                            placeholder={choice.placeholder}
                        />
                    }

                } else {
                    if (Inputs[platform][name].length !== 0) {
                        updateInput(platform, name, [])
                    }
                    element = <DisabledInput />
                    isEmpty = true
                }
            } else if (type === 'lookup') {
                if (data['data'][Inputs[platform][dependent][0]] && data['data'][Inputs[platform][dependent][0]].length !== 0) {
                    let choices = data['data'][Inputs[platform][dependent][0]]
                    element = <DropdownInput
                        update={update}
                        data={choices}
                        name={name}
                        placeholder={placeholder}
                    />
                } else {
                    element = <DisabledInput />
                    isEmpty = true
                }
            }
        }
    } else {
        if (type === 'dropdown') {
            element = <DropdownInput
                update={update}
                data={data['data']}
                name={name}
                placeholder={placeholder}
            />
        } else {
            element = <ManualInput
                update={update}
                prefix={data.prefix}
                suffix={data.suffix}
                regex={data.regex}
                name={name}
                placeholder={placeholder}
            />
        }
    }

    return (
        <Fragment>
            {
                typeof show != 'undefined' && !show && isEmpty ?
                    null :
                    <div className={`col-12 col-md-${width}`}>
                        <p className="mb-1"><sub>{displayName}</sub></p>
                        {element}
                    </div>
            }
        </Fragment>
    )
}

Field.defaultProps = {
    data: {
        displayName: 'Default',
        width: 12,
        placeholder: '',
        dependent: null,
        show: true,
        type: 'manual',
        case: {},
        data: {},
        prefix: '',
        suffix: '',
        regex: '.*'
    }
}

const mapStateToProps = state => ({
    Inputs: state.Inputs
})

const mapDispatchToProps = dispatch => ({
    updateInput: (platform, field, value) => dispatch(actions.Update({ platform, field, value }))
})
export default connect(mapStateToProps, mapDispatchToProps)(Field)