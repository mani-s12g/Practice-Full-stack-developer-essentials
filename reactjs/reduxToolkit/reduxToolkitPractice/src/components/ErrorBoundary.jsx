import React from "react";

export default class ErrorBoundry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError() {
        return {
            hasError: true
        }
    }

    componentDidCatch(error, info) {
        // Log to monitoring tool here: Sentry, LogRocket, Datadog, etc.
        console.error("ErrorBoundary caught an error:", error, info);
        // Optional: Sentry.captureException(error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: 20 }}>
                    <h3>Failed to load this page.</h3>
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            )
        }
        return this.props.children;
    }
}


// 🤖 9. Auto Retry Lazy Loading (Recommended Production Pattern)
// You can wrap import() with a retry function.

// Retry wrapper function (PRODUCTION-GRADE)

// function retryImport(fn, retries = 3, delay = 1000) {
//   return new Promise((resolve, reject) => {
//     fn()
//       .then(resolve)
//       .catch((error) => {
//         if (retries === 0) {
//           reject(error);
//         } else {
//           setTimeout(() => {
//             retryImport(fn, retries - 1, delay).then(resolve, reject);
//           }, delay);
//         }
//       });
//   });
// }


// https://chatgpt.com/c/692150b0-9cd8-8323-9eba-3c45e40529f0