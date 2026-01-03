import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, setStep, reset, fetchInitialCounter } from "../features/counter/counterSlice";

export default function Counter() {
    // const value = useSelector((state) => state.counterFromStore.value);
    // const step = useSelector((state) => state.counterFromStore.step);
    const { value, step, loading, error } = useSelector((state) => state.counterFromStore);
    const dispatch = useDispatch();
    // console.log(typeof localStorage.getItem("counter"))

    useEffect(() => {
        // Load initial value (simulate API)
        dispatch(fetchInitialCounter());
    }, []);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div>
            <h1>Counter</h1>
            <p>{value}</p>
            <input type="number" value={step} onChange={(e) => dispatch(setStep(Number(e.target.value)))} />
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(incrementByAmount(step))}>Increment by Amount</button>
            <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
    )
}