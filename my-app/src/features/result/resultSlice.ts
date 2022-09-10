import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ResultState {
    errorCount: number,
    typedCharactersCount: number,
    typedWordsCount: number,
    accuracy: number,
}

const initialState: ResultState = {
    errorCount: 0,
    typedCharactersCount: 0,
    typedWordsCount: 0,
    accuracy: 100,
}

const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        incrementTypedWordsCount: (state) => {
            state.typedWordsCount += 1;
        },
        incrementErrorCount: (state) => {
            state.errorCount += 1;
        },
        incrementTypedCharactersCount: (state) => {
            state.typedCharactersCount += 1;
        },
        setAccuracy: (state) => {
            state.accuracy = 100 - ((state.errorCount / state.typedCharactersCount) * 100);
        },
    }
});

export const {
    incrementTypedWordsCount,
    incrementErrorCount,
    incrementTypedCharactersCount,
    setAccuracy,
} = resultSlice.actions;
export default resultSlice.reducer;
