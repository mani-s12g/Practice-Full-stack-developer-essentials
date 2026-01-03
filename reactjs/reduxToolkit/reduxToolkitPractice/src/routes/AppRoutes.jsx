import { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from '../components/ErrorBoundary';

// Lazy load pages
const HomePage = lazy(() => import('../pages/HomePage'));
const UserPage = lazy(() => import('../pages/UserPage'));
const DataPage = lazy(() => import('../pages/DataPage'));
const CounterPage = lazy(() => import('../pages/CounterPage'));
const DynamicCounterPage = lazy(() => import('../pages/DynamicCounterPage'));
const TodosPage = lazy(() => import('../pages/TodosPage'));

export default function AppRoutes() {
    return (
        <ErrorBoundary>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/data" element={<DataPage />} />
                    <Route path="/counter" element={<CounterPage />} />
                    <Route path="/dynamic-counter" element={<DynamicCounterPage />} />
                    <Route path="/todos" element={<TodosPage />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
}


// ✔ This is code-splitting.
// Each page is loaded only when you hit the route
// /users, /data, /todos.


// 🧠 Advanced Production Tip (Optional but Highly Recommended)

// You can wrap EACH lazy-loaded route inside its own ErrorBoundary:

// <Route
//   path="/users"
//   element={
//     <ErrorBoundary>
//       <UserPage />
//     </ErrorBoundary>
//   }
// />


// This isolates failures and makes debugging easier.