import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { MotionConfig } from "framer-motion";

import "@mantine/core/styles.css";
import "./index.css";

import App from "./App";
import { getTheme } from "./theme";
import reportWebVitals from "./reportWebVitals";
import {
	ThemeVariantProvider,
	useThemeVariant,
} from "./contexts/ThemeVariantContext";
import SimpleAnimatedBackground from "./components/ui/background/SimpleAnimatedBackground";

function ThemedApp() {
	const { themeName } = useThemeVariant();
	const theme = getTheme(themeName);

	return (
		<MantineProvider
			theme={theme}
			withGlobalStyles
			withNormalizeCSS
			withCSSVariables
			defaultColorScheme="dark"
		>
			<MotionConfig reducedMotion="user">
				<SimpleAnimatedBackground />
				<App />
			</MotionConfig>
		</MantineProvider>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<ColorSchemeScript />
		<ThemeVariantProvider>
			<ThemedApp />
		</ThemeVariantProvider>
	</React.StrictMode>,
);

reportWebVitals();
