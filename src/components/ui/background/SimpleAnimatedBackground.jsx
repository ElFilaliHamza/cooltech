import { Box, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useReducedMotion } from "framer-motion";

export default function SimpleAnimatedBackground() {
	const { colorScheme } = useMantineColorScheme();
	const theme = useMantineTheme();
	const reducedMotion = useReducedMotion();
	const isDark = colorScheme === "dark";

	const primary = theme.colors[theme.primaryColor];
	const darkPrimary = primary?.[9] ?? "#101113";
	const midPrimary = primary?.[8] ?? "#141517";
	const lightPrimary = primary?.[0] ?? "#f8f9fa";
	const lightMid = primary?.[1] ?? "#e9ecef";

	const bg = isDark
		? `linear-gradient(180deg, ${darkPrimary} 0%, ${midPrimary} 50%, ${darkPrimary} 100%)`
		: `linear-gradient(180deg, ${lightPrimary} 0%, ${lightMid} 50%, ${lightPrimary} 100%)`;

	const gridOpacity = reducedMotion ? 0.08 : 0.12;
	const primaryRgb = primary?.[5] ?? "#2186eb";
	const r = parseInt(primaryRgb.slice(1, 3), 16);
	const g = parseInt(primaryRgb.slice(3, 5), 16);
	const b = parseInt(primaryRgb.slice(5, 7), 16);
	const gridColor = isDark ? `rgba(${r},${g},${b},` : `rgba(${r},${g},${b},`;

	return (
		<Box
			aria-hidden
			style={{
				position: "fixed",
				inset: 0,
				zIndex: -1,
				background: bg,
				overflow: "hidden",
			}}
		>
			<Box
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage: `
            linear-gradient(${gridColor}${gridOpacity}) 1px 0 transparent 1px,
            linear-gradient(90deg, ${gridColor}${gridOpacity}) 0 1px transparent 1px
          `,
					backgroundSize: "24px 24px",
				}}
			/>
		</Box>
	);
}
