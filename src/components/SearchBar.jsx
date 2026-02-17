import { useRef, useEffect } from "react";
import { TextInput, Box, Switch, Group, Text, Loader } from "@mantine/core";
import { motion } from "framer-motion";

export default function SearchBar({
	query,
	setQuery,
	useSemantic,
	setUseSemantic,
	isSemanticLoading,
	semanticError,
}) {
	const inputRef = useRef(null);

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

	return (
		<Box id="search" py={24} as="section">
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.1 }}
			>
				<TextInput
					ref={inputRef}
					placeholder="Search by name, category, or description…"
					value={query}
					onChange={(e) => setQuery(e.currentTarget.value)}
					size="md"
					radius="xl"
					styles={{ input: { transition: "box-shadow 0.2s" } }}
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
									padding: 4,
									fontSize: "1.25rem",
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
					/>
					{isSemanticLoading && (
						<Group gap={4}>
							<Loader size="xs" />
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
