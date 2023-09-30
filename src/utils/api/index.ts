import { IListResponse } from './types'

export * from './types'

export const GENERIC_ERROR: IListResponse<any>['error'] = {
    code: '500',
    message: 'Oops! Something went wrong',
}

const get = (url: string) => {
    const requestOptions = {
        method: 'GET',
    }

    return fetch(url, requestOptions).then(res => res.json())
}

/**
 * Adding only GET method here. Since for current use case we only have one GET call to get mock events data.
 * Similarly we can add other method like POST, DELETE, etc as per requirement
 */
export const callApi = {
    get,
}
