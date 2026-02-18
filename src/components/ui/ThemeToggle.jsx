import {
	Menu,
	UnstyledButton,
	Group,
	Text,
	ColorSwatch,
	Tooltip,
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

	return (
		<Menu
			shadow="lg"
			width={220}
			position="bottom-end"
			offset={8}
			radius="md"
			transitionProps={{
				transition: "pop-top-right",
				duration: 150,
			}}
		>
			<Menu.Target>
				<Tooltip label="Theme" position="bottom" withArrow>
					<UnstyledButton
						component={motion.button}
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.97 }}
						aria-label="Choose theme"
						style={(theme) => ({
							display: "block",
							borderRadius: theme.radius.md,
							padding: "6px 10px",
							border: `1px solid ${theme.colors.dark[4]}50`,
							backgroundColor: theme.colors.dark[7],
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
				</Tooltip>
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
