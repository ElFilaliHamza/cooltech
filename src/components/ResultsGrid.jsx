import { Grid, Text, Box } from "@mantine/core";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import AppCard from "./AppCard";

const container = {
	hidden: { opacity: 0 },
	visible: (i = 1) => ({
		opacity: 1,
		transition: {
			staggerChildren: 0.06,
			delayChildren: 0.1,
		},
	}),
};

const item = {
	hidden: { y: 16, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { type: "spring", stiffness: 120, damping: 18 },
	},
};

export default function ResultsGrid({ results, similarityMap }) {
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
			<motion.div
				variants={container}
				initial="hidden"
				animate="visible"
				style={{ width: "100%" }}
			>
				<Grid>
					{results.map((app, index) => (
						<Grid.Col
							key={app.id}
							span={{ base: 12, sm: 6, lg: 4 }}
							style={{ display: "flex" }}
						>
							<motion.div
								variants={item}
								style={{ width: "100%", minWidth: 0 }}
							>
								<AppCard
									app={app}
									similarity={similarityMap?.get(app.id)}
								/>
							</motion.div>
						</Grid.Col>
					))}
				</Grid>
			</motion.div>
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
