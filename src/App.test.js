/* eslint-disable */
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { ThemeVariantProvider } from "./contexts/ThemeVariantContext";
import { getTheme } from "./theme";
import App from "./App";

function TestWrapper({ children }) {
	return (
		<ThemeVariantProvider>
			<MantineProvider theme={getTheme()} defaultColorScheme="dark">
				{children}
			</MantineProvider>
		</ThemeVariantProvider>
	);
}

test("renders main content", () => {
	render(
		<TestWrapper>
			<App />
		</TestWrapper>,
	);
	expect(screen.getByRole("main")).toBeInTheDocument();
});
