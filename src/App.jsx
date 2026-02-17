import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "./components/ui/ErrorBoundaryFallback";
import AppLayout from "./components/layout/AppLayout";

function App() {
	return (
		<ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
			<AppLayout />
		</ErrorBoundary>
	);
}

export default App;
