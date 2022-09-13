import { createSlice } from '@reduxjs/toolkit'

interface CriteriaState {
    language: string,
    keyboard: boolean,
    punctuations: boolean,
    uppercase: boolean,
    lowercase: boolean,
    numbers: boolean,
    time: boolean,
}

const initialState: CriteriaState = {
    language: "english",
    keyboard: false,
    punctuations: false,
    uppercase: false,
    lowercase: true,
    numbers: false,
    time: false,
}

const criteriaSlice = createSlice({
    name: "criteria",
    initialState,
    reducers: {
        toggleKeyboard: (state) => {
            state.keyboard = !state.keyboard;
        },
        togglePunctuation: (state) => {
            state.punctuations = !state.punctuations;
        },
        toggleUpperCase: (state) => {
            state.uppercase = !state.uppercase;
        },
        toggleLowerCase: (state) => {
            state.lowercase = !state.lowercase;
        },
        toggleNumbers: (state) => {
            state.numbers = !state.numbers;
        },
        toggleTime: (state) => {
            state.time = !state.time;
        },
    }
});

export const {
    toggleKeyboard, togglePunctuation,
    toggleUpperCase,
    toggleLowerCase,
    toggleNumbers,
    toggleTime
} = criteriaSlice.actions;
export default criteriaSlice.reducer;
