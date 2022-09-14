import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface SettingState {
    sfxVolume: number,
    testLength: string
}

const initialState: SettingState = {
    sfxVolume: .1,
    testLength: "short"
}

const settingSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        setVolume: (state, action: PayloadAction<number>) => {
            state.sfxVolume = action.payload;
        },
        setTestLength: (state, action: PayloadAction<string>) => {
            state.testLength = action.payload;
        }
    }
});

export const {
    setVolume,
    setTestLength
} = settingSlice.actions;
export default settingSlice.reducer;
