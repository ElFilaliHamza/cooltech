import { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const LanguageContext = createContext();

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
};

export const LanguageProvider = ({ children }) => {
	const { i18n } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
		setCurrentLanguage(lng);
	};

	useEffect(() => {
		setCurrentLanguage(i18n.language);
	}, [i18n.language]);

	const value = {
		currentLanguage,
		changeLanguage,
		languages: [
			{ code: "en", name: "English", nativeName: "English" },
			{ code: "fr", name: "French", nativeName: "Français" },
		],
	};

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
};

LanguageProvider.propTypes = {
	children: PropTypes.node,
};
