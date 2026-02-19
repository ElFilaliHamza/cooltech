import { useState, memo } from "react";
import { Grid, Text, Box } from "@mantine/core";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import AppCard from "./AppCard";
import TechDetailModal from "./TechDetailModal";

function ResultsGrid({ results, similarityMap }) {
	const [selectedApp, setSelectedApp] = useState(null);
	const modalOpened = selectedApp != null;

	if (!results?.length) {
		return (
			<Box id="results" py={48} as="section">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					<Text ta="center" c="dark.1" size="md">
						No results. Try a different query or clear the search.
					</Text>
				</motion.div>
			</Box>
		);
	}

	return (
		<Box id="results" py={24} as="section">
			<motion.div style={{ width: "100%" }}>
				<Grid>
					{results.map((app) => (
						<Grid.Col
							key={app.id}
							span={{ base: 12, sm: 6, lg: 4 }}
							style={{ display: "flex", minHeight: 0 }}
						>
							<motion.div
								initial={{ y: 24, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									type: "spring",
									stiffness: 120,
									damping: 18,
								}}
								style={{
									width: "100%",
									minWidth: 0,
									minHeight: 260,
									flex: 1,
									display: "flex",
									flexDirection: "column",
								}}
							>
								<AppCard
									app={app}
									similarity={similarityMap?.get(app.id)}
									onClick={() => setSelectedApp(app)}
								/>
							</motion.div>
						</Grid.Col>
					))}
				</Grid>
			</motion.div>
			<TechDetailModal
				app={selectedApp}
				opened={modalOpened}
				onClose={() => setSelectedApp(null)}
			/>
		</Box>
	);
}

ResultsGrid.propTypes = {
	results: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			category: PropTypes.string,
			description: PropTypes.string,
		}),
	),
	similarityMap: PropTypes.instanceOf(Map),
};

export default memo(ResultsGrid);
