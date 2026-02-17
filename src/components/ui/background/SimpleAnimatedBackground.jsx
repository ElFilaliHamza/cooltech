import { Box, useMantineColorScheme } from "@mantine/core";
import { useReducedMotion } from "framer-motion";

export default function SimpleAnimatedBackground() {
	const { colorScheme } = useMantineColorScheme();
	const reducedMotion = useReducedMotion();
	const isDark = colorScheme === "dark";

	const bg = isDark
		? "linear-gradient(180deg, #0a0c10 0%, #141517 50%, #0a0c10 100%)"
		: "linear-gradient(180deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)";

	const gridOpacity = reducedMotion ? 0.06 : 0.08;
	const gridColor = isDark ? "rgba(255,255,255," : "rgba(0,0,0,";

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
