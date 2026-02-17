import { SegmentedControl } from "@mantine/core";
import { motion } from "framer-motion";
import { useThemeVariant } from "../../contexts/ThemeVariantContext";
import { THEME_NAMES } from "../../theme";

const OPTIONS = [
	{ value: THEME_NAMES.TECH_BLUE, label: "Tech Blue" },
	{ value: THEME_NAMES.CYBER_PURPLE, label: "Cyber Purple" },
	{ value: THEME_NAMES.OCEAN_TEAL, label: "Ocean Teal" },
];

function ThemeToggle() {
	const { themeName, setThemeName } = useThemeVariant();

	return (
		<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
			<SegmentedControl
				value={themeName}
				onChange={setThemeName}
				data={OPTIONS}
				size="sm"
				aria-label="Choose theme color"
			/>
		</motion.div>
	);
}

export default ThemeToggle;
