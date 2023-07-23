import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice ({
    name: 'users',
    initialState: {
        isAuth: false,
        token: '',
        data: {},
        amount: '',
        note: '',
        transactionLog: {}
    },
    reducers: {
        login(state, actions) {
            return {
                ...state,
                isAuth: true,
                token: actions.payload
            }
        },
        logout(state, actions) {
            return {
                ...state,
                isAuth: false,
                token: '',
                data: {}
            }
        },
        addData(state, actions) {
            return {
                ...state,
                data: actions.payload
            }
        },
        confirmation(state, actions) {
            return {
                ...state,
                amount: actions.payload.amount,
                note: actions.payload.note
            }
        },
        addTransactionLog(state, actions){
            return{
                ...state,
                transactionLog: actions.payload
            }
        }
    }
})

export const { login, logout, addData, confirmation, addTransactionLog } = userSlice.actions

export default userSlice.reducer