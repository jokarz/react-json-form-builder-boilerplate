import cFetch from 'cross-fetch'

export default async url => {

    let response = await cFetch(url)
    let result = await response.json()
    return result

}