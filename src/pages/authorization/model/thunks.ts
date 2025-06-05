import { apiInstance } from '../../../shared/axios-instance'
import { createAsyncThunk } from '@reduxjs/toolkit'

const toLogin: any = createAsyncThunk(
    'paste/api',
    async (data: {login: string, pass: string}) => {
        const loginResult = await apiInstance({
            method: 'post',
            url: `/api/paste/api/login`,
        }).then((result)=>result.data)
        return toLogin
    }
)

export { toLogin }