export enum ERequestState {
    INITIAL,
    REQUESTING,
    SUCCESS,
    FAILED,
}

export interface IListResponse<T>  {
    list: T[];
    requestState: ERequestState;
    error?: {
        code: string;
        message: string;
    };
}
