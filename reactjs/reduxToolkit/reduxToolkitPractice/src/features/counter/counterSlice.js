import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// --- Load initial state from localStorage ---
const savedCounter = Number(localStorage.getItem("counter")) || 0;
const initialState = {
    value: savedCounter,
    step: 1,
    loading: false,
    error: null,
}

// ---- Async Thunk (simulate API call) ----
export const fetchInitialCounter = createAsyncThunk(
    "counter/fetchInitialCounter",
    async () => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Simulate incoming value from server
        return 42;
    }
)

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += state.step;
        },
        decrement: (state) => {
            state.value -= state.step;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
        setStep: (state, action) => {
            state.step = action.payload;
        },
        reset: (state) => {
            state.value = 0;
            state.step = 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInitialCounter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInitialCounter.fulfilled, (state, action) => {
                state.loading = false;
                state.value = action.payload;
            })
            .addCase(fetchInitialCounter.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch initial counter value";
            })
    }
})

export const { increment, decrement, incrementByAmount, setStep, reset } = counterSlice.actions;
export default counterSlice.reducer;



// https://chatgpt.com/c/69216460-1f7c-8330-a91e-67c6b0147c0a