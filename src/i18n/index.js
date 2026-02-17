import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "./locales/en/common.json";
import frCommon from "./locales/fr/common.json";
import enUi from "./locales/en/ui.json";
import frUi from "./locales/fr/ui.json";

const resources = {
	en: {
		translation: {
			common: enCommon,
			ui: enUi,
		},
	},
	fr: {
		translation: {
			common: frCommon,
			ui: frUi,
		},
	},
};

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: "en",
		debug: process.env.NODE_ENV === "development",
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ["localStorage", "navigator", "htmlTag"],
			caches: ["localStorage"],
		},
	});

export default i18n;
