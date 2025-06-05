export interface DataForListReportsVideo {
    endDate: string | null | any,
    listDepartmentId: number[],
    listTmcId: number[],
    startDate: string | null | any
}

export interface DataForListNeuronet {
    endDate: string | null | any,
    listDepartmentId: number[],
    startDate: string | null | any
}

export interface DataApiLogin {
    tokenResponse: {
        accessToken: string,
        refreshToken: string
    },
    userResponse: {
        userName: string,
        email: string
    }
}

export interface DataApiValidate {
    accessToken: string,
    refreshToken: string
}

export interface DataApi_list_reports_video {
    bagWeight: number | null,
    checkbox: string,
    comment: string,
    countBags: number | null,
    dateVideo: string,
    nameFile: string,
    numberСar: number | null,
    objectId: number | null,
    timeVideo: string,
    tmcItemName: string,
    tmcTypeName: string,
    trailerNumber: string,
    uploadDate: string,
    userName: string,
    video: string,
    videoLength: number | null,
    videoSize: number | null
}