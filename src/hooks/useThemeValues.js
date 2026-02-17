import { useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const useThemeValues = () => {
	const { colorScheme } = useMantineColorScheme();
	const theme = useMantineTheme();

	const isDark = colorScheme === "dark";
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

	const glassStyles1 = {
		backdropFilter: "blur(16px) saturate(180%)",
		backgroundColor: isDark
			? `rgba(${parseInt(theme.colors.dark[7].substring(1, 3), 16)}, ${parseInt(theme.colors.dark[7].substring(3, 5), 16)}, ${parseInt(theme.colors.dark[7].substring(5, 7), 16)}, 0.7)`
			: `rgba(255, 255, 255, 0.1)`,
		border: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[3]}`,
	};

	const glassStyles2 = {
		backdropFilter: "blur(7px) saturate(180%)",
		backgroundColor: isDark
			? `rgba(${parseInt(theme.colors.dark[7].substring(1, 3), 16)}, ${parseInt(theme.colors.dark[7].substring(3, 5), 16)}, ${parseInt(theme.colors.dark[7].substring(5, 7), 16)}, 0.5)`
			: `rgba(255, 255, 255, 0.15)`,
		borderBottom: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[3]}`,
	};

	const baseSkeletonColor = isDark
		? theme.colors.dark[8]
		: theme.colors.brand[1];

	const highlightSkeletonColor = isDark
		? theme.colors.brand[9]
		: theme.colors.brand[2];

	return {
		glassStyles: [glassStyles1, glassStyles2],
		baseSkeletonColor: baseSkeletonColor,
		highlightSkeletonColor: highlightSkeletonColor,
		isDark: isDark,
		isMobile: isMobile,
		theme,
	};
};
