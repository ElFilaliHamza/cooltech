import { Box, useMantineTheme } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";

export default function ScrollToTop({ visible, onClick }) {
	const theme = useMantineTheme();
	const primary =
		theme.colors[theme.primaryColor]?.[theme.primaryShade ?? 5] ??
		theme.colors.blue[5];

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		onClick?.();
	};

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					initial={{ opacity: 0, scale: 0.5, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.5, y: 20 }}
					transition={{ type: "spring", stiffness: 300, damping: 24 }}
					style={{
						position: "fixed",
						bottom: 24,
						right: 24,
						zIndex: 100,
					}}
				>
					<motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
					>
						<Box
							component="button"
							type="button"
							aria-label="Scroll to top"
							onClick={scrollToTop}
							style={{
								width: 48,
								height: 48,
								borderRadius: "50%",
								border: `1px solid ${primary}40`,
								background: "rgba(0, 0, 0, 0.25)",
								backdropFilter: "blur(12px)",
								WebkitBackdropFilter: "blur(12px)",
								color: primary,
								cursor: "pointer",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "1.25rem",
								boxShadow: `0 4px 24px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05) inset`,
							}}
						>
							↑
						</Box>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
