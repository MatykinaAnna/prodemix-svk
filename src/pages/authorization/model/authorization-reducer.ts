import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { toLogin } from './thunks'

const loginReducer = createSlice({
    name: 'loginReducer',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            toLogin.fulfilled,
            (state, action)=>{

            }
        )
    }
})

export default loginReducer.reducer
export const {} = loginReducer.actions