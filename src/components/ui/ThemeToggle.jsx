import {
	Menu,
	UnstyledButton,
	Group,
	Text,
	ColorSwatch,
	Box,
} from "@mantine/core";
import { motion } from "framer-motion";
import { useThemeVariant } from "../../contexts/ThemeVariantContext";
import { THEME_OPTIONS, THEME_SWATCH_COLORS } from "../../theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCheck } from "@fortawesome/free-solid-svg-icons";

function ThemeToggle() {
	const { themeName, setThemeName } = useThemeVariant();
	const currentColor = THEME_SWATCH_COLORS[themeName];

	const glassTrigger = (theme) => ({
		display: "block",
		borderRadius: theme.radius.md,
		padding: "6px 10px",
		backdropFilter: "blur(12px)",
		WebkitBackdropFilter: "blur(12px)",
		backgroundColor: "rgba(26, 27, 30, 0.5)",
		border: "1px solid rgba(255, 255, 255, 0.08)",
		boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
	});

	const glassDropdown = {
		backdropFilter: "blur(16px)",
		WebkitBackdropFilter: "blur(16px)",
		backgroundColor: "rgba(26, 27, 30, 0.65)",
		border: "1px solid rgba(255, 255, 255, 0.08)",
		boxShadow: "0 8px 32px rgba(0, 0, 0, 0.24)",
	};

	return (
		<Menu
			shadow="none"
			width={220}
			position="bottom-end"
			offset={8}
			radius="md"
			styles={{ dropdown: glassDropdown }}
			transitionProps={{
				transition: "pop-top-right",
				duration: 150,
			}}
		>
			<Menu.Target>
					<UnstyledButton
						component={motion.button}
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.97 }}
						aria-label="Choose theme"
						style={(theme) => ({
							...glassTrigger(theme),
						})}
					>
						<Group gap="xs" wrap="nowrap">
							<ColorSwatch
								color={currentColor}
								size={22}
								radius="sm"
								withShadow={false}
								style={{ border: "2px solid var(--mantine-color-dark-3)" }}
							/>
							<Box visibleFrom="xs">
								<Text size="sm" fw={500} c="dimmed">
									Theme
								</Text>
							</Box>
							<Box component="span" style={{ opacity: 0.6 }}>
								<FontAwesomeIcon icon={faChevronDown} style={{ fontSize: 10 }} />
							</Box>
						</Group>
					</UnstyledButton>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>Theme</Menu.Label>
				{THEME_OPTIONS.map((opt) => {
					const isActive = themeName === opt.value;
					return (
						<Menu.Item
							key={opt.value}
							onClick={() => setThemeName(opt.value)}
							leftSection={
								<ColorSwatch
									color={THEME_SWATCH_COLORS[opt.value]}
									size={18}
									radius="xs"
									withShadow={false}
								/>
							}
							rightSection={
								isActive ? (
									<FontAwesomeIcon
										icon={faCheck}
										style={{ fontSize: 12, color: "var(--mantine-primary-color-5)" }}
									/>
								) : null
							}
							style={
								isActive
									? {
											backgroundColor: "var(--mantine-primary-color-9)",
										}
									: undefined
							}
						>
							<Text size="sm" fw={isActive ? 600 : 400}>
								{opt.label}
							</Text>
						</Menu.Item>
					);
				})}
			</Menu.Dropdown>
		</Menu>
	);
}

export default ThemeToggle;
