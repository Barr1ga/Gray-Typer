import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment';
interface ResultState {
    completed: boolean,
    timeStarted: string,
    wpm: number,
    errorCount: number,
    typedCharactersCount: number,
    typedWordsCount: number,
    totalWordsCount: number,
    accuracy: number,
}

const initialState: ResultState = {
    completed: false,
    timeStarted: "",
    wpm: 0,
    errorCount: 0,
    typedCharactersCount: 0,
    typedWordsCount: 0,
    totalWordsCount: 0,
    accuracy: 0,
}

const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        resetResults: (state) => initialState,
        setTotalWordsCount: (state, action: PayloadAction<number>) => {
            state.totalWordsCount = action.payload;
        },
        setCompleted: (state) => {
            state.completed = true;
        },
        incrementTypedWordsCount: (state) => {
            state.typedWordsCount += 1;
        },
        decrementTypedWordsCount: (state) => {
            state.typedWordsCount -= 1;
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
        setInitialTime: (state) => {
            state.timeStarted = moment(new Date()).toString();
        },
        setWpm: (state) => {
            const timeNow = moment(new Date());
            const duration = moment.duration(timeNow.diff(state.timeStarted));
            const minutesDuration = duration.asMinutes();
            state.wpm = (state.typedCharactersCount / 5) / minutesDuration;
        }
    }
});

export const {
    resetResults,
    setTotalWordsCount,
    setCompleted,
    incrementTypedWordsCount,
    decrementTypedWordsCount,
    incrementErrorCount,
    incrementTypedCharactersCount,
    setAccuracy,
    setInitialTime,
    setWpm,
} = resultSlice.actions;
export default resultSlice.reducer;
