// AnimatedSearchBar.jsx
import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
	TextInput,
	Box,
	Switch,
	Group,
	Text,
	Loader,
	useMantineTheme,
} from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import MorphingCircle from "./ui/MorphingCircle";

function hexToRgba(hex, alpha) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r},${g},${b},${alpha})`;
}

export default function SearchBar({
	setSearchQuery,
	useSemantic,
	handleSemanticChange,
	isSemanticLoading,
	semanticError,
}) {
	const inputRef = useRef(null);
	const [inputValue, setInputValue] = useState("");
	const theme = useMantineTheme();
	const [isFocused, setIsFocused] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

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

	// Animation variants for the search container
	const containerVariants = {
		initial: { opacity: 0, y: 20, scale: 0.9 },
		animate: { opacity: 1, y: 0, scale: 1 },
		hover: {
			scale: 1.02,
			transition: { duration: 0.3, ease: "easeOut" },
		},
	};

	// Animation variants for the glow effect
	const glowVariants = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 0.6, scale: 1.05 },
		exit: { opacity: 0, scale: 0.95 },
	};

	const inputStyles = {
		input: {
			transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
			backgroundColor: hexToRgba(primaryBg, 0.12),
			borderColor: hexToRgba(primaryColor, 0.35),
			borderWidth: 1.5,
			fontSize: "1rem",
			paddingLeft: "3.5rem", // Make room for the morphing circle
		},
	};

	return (
		<Box id="search" py={24} as="section">
			<motion.div
				variants={containerVariants}
				initial="initial"
				animate="animate"
				whileHover="hover"
				onHoverStart={() => setIsHovered(true)}
				onHoverEnd={() => setIsHovered(false)}
				className="search-input-wrapper"
				style={{ position: "relative" }}
			>
				{/* Animated glow effect behind the search bar */}
				<AnimatePresence>
					{(isFocused || isHovered) && (
						<motion.div
							variants={glowVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							style={{
								position: "absolute",
								top: -5,
								left: -5,
								right: -5,
								bottom: -5,
								borderRadius: theme.radius.xl,
								background: `radial-gradient(circle at 50% 50%, ${hexToRgba(primaryColor, 0.3)} 0%, transparent 70%)`,
								zIndex: -1,
							}}
						/>
					)}
				</AnimatePresence>

				{/* Morphing Circle positioned in the left section */}
				<Box
					style={{
						position: "absolute",
						left: 16,
						top: "50%",
						transform: "translateY(-50%)",
						zIndex: 2,
						pointerEvents: "none",
					}}
				>
					<motion.div
						animate={{
							rotate: isFocused ? 360 : 0,
							scale: isFocused ? 1.2 : 1,
						}}
						transition={{
							duration: 2,
							repeat: isFocused ? Infinity : 0,
							ease: "linear",
						}}
					>
						<MorphingCircle
							isActive={isFocused}
							color={primaryColor}
							size={20}
						/>
					</motion.div>
				</Box>

				<TextInput
					ref={inputRef}
					placeholder="Type a keyword..."
					value={inputValue}
					onChange={(e) => {
						const v = e.currentTarget.value;
						setInputValue(v);
						setSearchQuery(v);
					}}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					size="lg"
					radius="xl"
					variant="filled"
					color="primary"
					leftSection={null} // Remove default left section
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
								transform: isFocused
									? "translateX(5px)"
									: "none",
								transition: "transform 0.3s ease",
							},
						},
					}}
					rightSection={
						inputValue ? (
							<motion.div
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0, opacity: 0 }}
								transition={{
									type: "spring",
									stiffness: 500,
									damping: 30,
								}}
							>
								<Box
									component="button"
									type="button"
									onClick={() => {
										setInputValue("");
										setSearchQuery("");
									}}
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
							</motion.div>
						) : null
					}
					aria-label="Search tech apps"
				/>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<Group mt="sm" gap="sm" wrap="nowrap" align="center">
					<Switch
						label="Semantic search (AI)"
						checked={useSemantic}
						onChange={(e) =>
							handleSemanticChange(e.currentTarget.checked)
						}
						size="sm"
						color="primary"
					/>
					{isSemanticLoading && (
						<motion.div
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -10 }}
						>
							<Group gap={4}>
								<Loader size="xs" color="dark.1" />
								<Text size="xs" c="dark.1">
									Loading model…
								</Text>
							</Group>
						</motion.div>
					)}
					{semanticError && (
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ type: "spring" }}
						>
							<Text size="xs" c="red">
								{semanticError.message}
							</Text>
						</motion.div>
					)}
				</Group>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.7 }}
				whileHover={{ opacity: 1 }}
			>
				<Text size="xs" c="dark.1" mt={4}>
					Ctrl+K to focus search
				</Text>
			</motion.div>
		</Box>
	);
}

SearchBar.propTypes = {
	setSearchQuery: PropTypes.func.isRequired,
	useSemantic: PropTypes.bool,
	handleSemanticChange: PropTypes.func.isRequired,
	isSemanticLoading: PropTypes.bool,
	semanticError: PropTypes.shape({ message: PropTypes.string }),
};
