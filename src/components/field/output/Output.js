import React, { useState, useEffect, Fragment, useRef } from 'react'
import { connect } from 'react-redux'

const Output = props => {
    const copyInput = useRef()
    const [show, setShow] = useState(false)
    const [copyBtnText, setCopyBtnText] = useState('Copy Output')
    const { platform, data, Inputs } = props
    const { dependent } = data
    let result = ''
    let shouldEncode = false
    if (!dependent) {
        result = data.format
        shouldEncode = data.encode
    } else {
        if (Inputs[platform] && Inputs[platform][dependent] && Inputs[platform][dependent].length !== 0) {
            let choice = data['case'][Inputs[platform][dependent][0]] || null
            if (choice) {
                result = choice.format
                shouldEncode = choice.encode
            }
        }

    }

    const handleCopy = () => {
        copyInput.current.select()
        window.document.execCommand('copy')
        window.getSelection().removeAllRanges()
        copyInput.current.blur()
        setCopyBtnText('Copied')
    }

    useEffect(() => {
        if (copyBtnText !== 'Copy') {
            setTimeout(() => {
                setCopyBtnText('Copy')
            }, 1000)
        }
    }, [copyBtnText])

    if (result) {
        let temp = result.match(/\[(.*?)\]/g).map(item => item.substring(1, item.length - 1))
        for (let i = 0; i < temp.length; i++) {
            let item = temp[i]
            if (!Inputs[platform][item] || !Inputs[platform][item][0] || !Inputs[platform][item][1]) {
                if (show) {
                    setShow(false)
                }
                break;
            } else {
                let info = Inputs[platform][item][1]
                result = result.replace(`[${temp[i]}]`, info)
            }
            if (i === temp.length - 1) {
                if (!show) {
                    setShow(true)
                }
            }
        }
    } else if (show) {
        setShow(false)
    }

    result = shouldEncode ? encodeURI(result) : result
    return (
        <Fragment>
            {
                show ?
                    <div className="col-12">
                        <p className="mb-1"><sub>Output</sub></p>
                        <textarea className="form-control" value={result} readOnly ref={copyInput}/>
                        <button className="mt-3 btn btn-primary" onClick={handleCopy} disabled={copyBtnText === 'Copied'}>{copyBtnText}</button>
                    </div>
                    : null

            }
        </Fragment>

    )
}

Output.defaultProps = {
    platform: [],
    data: {
    },
    Inputs: {}
}


export default connect(state => ({ ...state }))(Output)