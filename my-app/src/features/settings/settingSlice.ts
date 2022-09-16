import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { basicLight } from "../themes/themes";
interface SettingState {
    theme: any,
    sfxVolume: number,
    testLength: string
}

const initialState: SettingState = {
    theme: "",
    sfxVolume: .1,
    testLength: "short"
}

const settingSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            switch (action.payload) {
                case "basicLight":
                    state.theme = basicLight;
            }
        },
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
