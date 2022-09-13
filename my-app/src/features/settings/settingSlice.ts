import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SettingState {
    sfxVolume: number,
}

const initialState: SettingState = {
    sfxVolume: .1,
}

const settingSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        setVolume: (state, action: PayloadAction<number>) => {
            state.sfxVolume = action.payload;
        }
    }
});

export const {
    setVolume
} = settingSlice.actions;
export default settingSlice.reducer;
