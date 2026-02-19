import {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from "react";
import PropTypes from "prop-types";
import { THEME_NAMES } from "../theme";

const STORAGE_KEY = "cooltech-theme-variant";

const ThemeVariantContext = createContext(null);

export function useThemeVariant() {
	const ctx = useContext(ThemeVariantContext);
	if (!ctx)
		throw new Error(
			"useThemeVariant must be used within ThemeVariantProvider",
		);
	return ctx;
}

export function ThemeVariantProvider({ children }) {
	const [themeName, setThemeNameState] = useState(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored && Object.values(THEME_NAMES).includes(stored))
				return stored;
		} catch {
			// ignore
		}
		return THEME_NAMES.TECH_BLUE;
	});

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, themeName);
		} catch {
			// ignore
		}
	}, [themeName]);

	const setThemeName = useCallback((name) => {
		if (Object.values(THEME_NAMES).includes(name)) setThemeNameState(name);
	}, []);

	return (
		<ThemeVariantContext.Provider value={{ themeName, setThemeName }}>
			{children}
		</ThemeVariantContext.Provider>
	);
}

ThemeVariantProvider.propTypes = {
	children: PropTypes.node,
};
