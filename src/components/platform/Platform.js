import React, { Fragment } from 'react'
import Field from '../field/Field'
import Output from '../field/output/Output'

const Platform = props => {
    const { data, name, show } = props
    const fields = Object.keys(data.fields || [])
    return (
        <Fragment>
            {
                fields.length ?
                    <div className={`card mb-3 mt-3 ${show ? '' : 'd-none'}`} >
                        <div className={"card-body"}>
                            <div className="row">
                                {
                                    fields.map(key => (
                                        <Field data={data['fields'][key]} key={key} name={key} platform={name|| ''} />
                                    ))
                                }
                                {
                                    <Output platform={name} data={data['output']} />
                                }
                            </div>
                        </div>
                    </div> : null
            }
        </Fragment>
    )
}

Platform.defaultProps = {
    name: '',
    data: {
        fields: []
    },
    key: '',
    show: true
}

export default Platform