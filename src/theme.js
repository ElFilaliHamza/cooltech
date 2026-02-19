import { createTheme } from "@mantine/core";

const TECH_BLUE = [
	"#e6f4ff",
	"#bae3ff",
	"#7cc4fa",
	"#47a3f3",
	"#2186eb",
	"#0967d2",
	"#0552b5",
	"#03449e",
	"#01337d",
	"#002159",
];

const CYBER_PURPLE = [
	"#f3e8ff",
	"#e9d5ff",
	"#d8b4fe",
	"#c084fc",
	"#a855f7",
	"#9333ea",
	"#7e22ce",
	"#6b21a8",
	"#581c87",
	"#3b0764",
];

const OCEAN_TEAL = [
	"#ccfbf1",
	"#99f6e4",
	"#5eead4",
	"#2dd4bf",
	"#14b8a6",
	"#0d9488",
	"#0f766e",
	"#115e59",
	"#134e4a",
	"#042f2e",
];

export const THEME_NAMES = {
	TECH_BLUE: "techBlue",
	CYBER_PURPLE: "cyberPurple",
	OCEAN_TEAL: "oceanTeal",
};

/** Primary shade (5) hex per theme for swatches in theme switcher */
export const THEME_SWATCH_COLORS = {
	techBlue: TECH_BLUE[5],
	cyberPurple: CYBER_PURPLE[5],
	oceanTeal: OCEAN_TEAL[5],
};

export const THEME_OPTIONS = [
	{ value: THEME_NAMES.TECH_BLUE, label: "Tech Blue" },
	{ value: THEME_NAMES.CYBER_PURPLE, label: "Cyber Purple" },
	{ value: THEME_NAMES.OCEAN_TEAL, label: "Ocean Teal" },
];

export function getTheme(primaryColorKey = THEME_NAMES.OCEAN_TEAL) {
	return createTheme({
		fontFamily:
			"system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
		fontFamilyMonospace: "monospace",
		headings: {
			fontFamily:
				"system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
		},
		colors: {
			techBlue: TECH_BLUE,
			cyberPurple: CYBER_PURPLE,
			oceanTeal: OCEAN_TEAL,
			brand:
				primaryColorKey === "techBlue"
					? TECH_BLUE
					: primaryColorKey === "cyberPurple"
						? CYBER_PURPLE
						: OCEAN_TEAL,
			dark: [
				"#C1C2C5",
				"#A6A7AB",
				"#909296",
				"#5C5F66",
				"#373A40",
				"#2C2E33",
				"#25262B",
				"#1A1B1E",
				"#141517",
				"#101113",
			],
			gray: [
				"#f8f9fa",
				"#f1f3f5",
				"#e9ecef",
				"#dee2e6",
				"#ced4da",
				"#adb5bd",
				"#868e96",
				"#495057",
				"#343a40",
				"#212529",
			],
		},
		primaryColor: primaryColorKey,
		primaryShade: 5,
		defaultGradient: {
			from: `${primaryColorKey}.4`,
			to: `${primaryColorKey}.7`,
			deg: 135,
		},
	});
}

export const mantineTheme = getTheme();
