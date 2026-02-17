import { Card, Text, Badge, Group } from "@mantine/core";
import MotionCard from "./ui/MotionCard";
import PropTypes from "prop-types";

export default function AppCard({ app, similarity }) {
	return (
		<MotionCard padding="lg" radius="xl" lightSweep={true}>
			<Group justify="space-between" mb="xs">
				<Text fw={600} size="lg">
					{app.name}
				</Text>
				{typeof similarity === "number" && (
					<Badge size="sm" variant="light" color="gray">
						{similarity}% match
					</Badge>
				)}
			</Group>
			<Badge size="xs" variant="outline" mb="xs">
				{app.category}
			</Badge>
			<Text size="sm" c="dimmed" lineClamp={2}>
				{app.description}
			</Text>
		</MotionCard>
	);
}

AppCard.propTypes = {
	app: PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string,
		category: PropTypes.string,
		description: PropTypes.string,
	}).isRequired,
	similarity: PropTypes.number,
};
