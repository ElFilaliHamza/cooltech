import { useRef, useEffect } from "react";
import {
	TextInput,
	Box,
	Switch,
	Group,
	Text,
	Loader,
	useMantineTheme,
} from "@mantine/core";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";

function hexToRgba(hex, alpha) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r},${g},${b},${alpha})`;
}

export default function SearchBar({
	query,
	setQuery,
	useSemantic,
	setUseSemantic,
	isSemanticLoading,
	semanticError,
}) {
	const inputRef = useRef(null);
	const theme = useMantineTheme();
	const primary = theme.colors[theme.primaryColor];
	const primaryShade = theme.primaryShade ?? 5;
	const primaryColor = primary?.[primaryShade] ?? theme.colors.blue[5];
	const primaryBg = primary?.[9] ?? theme.colors.dark[8];

	useEffect(() => {
		const handler = (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "k") {
				e.preventDefault();
				inputRef.current?.focus();
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, []);

	const inputStyles = {
		input: {
			transition:
				"border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
			backgroundColor: hexToRgba(primaryBg, 0.12),
			borderColor: hexToRgba(primaryColor, 0.35),
			borderWidth: 1.5,
			fontSize: "1rem",
		},
	};

	return (
		<Box id="search" py={24} as="section">
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.1 }}
				className="search-input-wrapper"
			>
				<TextInput
					ref={inputRef}
					placeholder="Type a keyword..."
					value={query}
					onChange={(e) => setQuery(e.currentTarget.value)}
					size="lg"
					radius="xl"
					variant="filled"
					color="primary"
					leftSection={
						<span
							style={{ fontSize: "1.1rem", opacity: 0.8 }}
							aria-hidden
						>
							<FontAwesomeIcon icon={faSearchengin} />
						</span>
					}
					styles={{
						...inputStyles,
						input: {
							...inputStyles.input,
							"&:focus": {
								borderColor: primaryColor,
								boxShadow: `0 0 0 3px ${hexToRgba(primaryColor, 0.25)}`,
								backgroundColor: hexToRgba(primaryBg, 0.18),
							},
							"&::placeholder": {
								color: primaryColor,
								opacity: 0.8,
							},
						},
					}}
					rightSection={
						query ? (
							<Box
								component="button"
								type="button"
								onClick={() => setQuery("")}
								style={{
									background: "none",
									border: "none",
									cursor: "pointer",
									padding: 6,
									fontSize: "1rem",
									color: "var(--mantine-color-text)",
									opacity: 0.7,
									borderRadius: theme.radius.sm,
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.opacity = "1";
									e.currentTarget.style.backgroundColor =
										hexToRgba(primaryColor, 0.15);
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.opacity = "0.7";
									e.currentTarget.style.backgroundColor =
										"transparent";
								}}
								aria-label="Clear search"
							>
								✕
							</Box>
						) : null
					}
					aria-label="Search tech apps"
				/>
				<Group mt="sm" gap="sm" wrap="nowrap" align="center">
					<Switch
						label="Semantic search (AI)"
						checked={useSemantic}
						onChange={(e) =>
							setUseSemantic(e.currentTarget.checked)
						}
						size="sm"
						color="primary"
					/>
					{isSemanticLoading && (
						<Group gap={4}>
							<Loader size="xs" color="primary" />
							<Text size="xs" c="dimmed">
								Loading model…
							</Text>
						</Group>
					)}
					{semanticError && (
						<Text size="xs" c="red">
							{semanticError.message}
						</Text>
					)}
				</Group>
				<Text size="xs" c="dimmed" mt={4}>
					Ctrl+K to focus search
				</Text>
			</motion.div>
		</Box>
	);
}
