import { Text, Badge, Group, Stack, Anchor, Box } from "@mantine/core";
import MotionCard from "./ui/MotionCard";
import PropTypes from "prop-types";
import { memo } from "react";

function AppCard({ app, similarity, onClick }) {
	const links = app.links?.length ? app.links : [];
	const hasDetails =
		app.details && (app.details.features || app.details.tips);
	const categories = Array.isArray(app.categories)
		? app.categories
		: [app.category].filter(Boolean);
	const tags = Array.isArray(app.tags) ? app.tags : [];

	const cardContent = (
		<>
			<Group justify="space-between" mb="xs" wrap="nowrap">
				<Text fw={600} size="lg" lineClamp={1}>
					{app.name}
				</Text>
				{typeof similarity === "number" && (
					<Badge
						size="sm"
						variant="light"
						color="primary"
						style={{ flexShrink: 0 }}
					>
						{similarity}% match
					</Badge>
				)}
			</Group>
			<Group gap="xs" mb="xs" wrap="wrap">
				{categories.map((c) => (
					<Badge key={c} size="xs" variant="light" color="primary">
						{c}
					</Badge>
				))}
				{tags.slice(0, 4).map((t) => (
					<Badge key={t} size="xs" variant="dot" color="gray">
						{t}
					</Badge>
				))}
				{tags.length > 4 && (
					<Badge size="xs" variant="dot" color="gray">
						+{tags.length - 4}
					</Badge>
				)}
			</Group>
			<Text
				size="sm"
				c="dark.1"
				lineClamp={3}
				style={{ flex: 1, minHeight: 0 }}
			>
				{app.description}
			</Text>
			{hasDetails && (
				<Stack gap={4} mt="xs" style={{ flexShrink: 0 }}>
					{app.details.features && (
						<Text size="xs" c="dark.2" lineClamp={1}>
							{app.details.features}
						</Text>
					)}
					{app.details.tips && (
						<Text size="xs" c="dark.2" lineClamp={1}>
							Tip: {app.details.tips}
						</Text>
					)}
				</Stack>
			)}
			<Box mt="xs" style={{ flexShrink: 0 }}>
				{links.length > 0 && (
					<Group gap="xs" wrap="wrap">
						{links.slice(0, 3).map((l, i) => (
							<Anchor
								key={i}
								href={l.url}
								target="_blank"
								rel="noopener noreferrer"
								size="xs"
								onClick={(e) => e.stopPropagation()}
							>
								{l.label}
							</Anchor>
						))}
						{links.length > 3 && (
							<Text size="xs" c="dark.2">
								+{links.length - 3}
							</Text>
						)}
					</Group>
				)}
				{onClick && (
					<Text size="xs" c="dimmed" mt={4}>
						Click for full details
					</Text>
				)}
			</Box>
		</>
	);

	const card = (
		<MotionCard
			padding="lg"
			radius="xl"
			lightSweep={true}
			style={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			{cardContent}
		</MotionCard>
	);

	if (onClick) {
		return (
			<Box
				style={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
					cursor: "pointer",
				}}
				onClick={onClick}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						onClick();
					}
				}}
			>
				{card}
			</Box>
		);
	}
	return card;
}

AppCard.propTypes = {
	app: PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string,
		category: PropTypes.string,
		categories: PropTypes.arrayOf(PropTypes.string),
		tags: PropTypes.arrayOf(PropTypes.string),
		description: PropTypes.string,
		details: PropTypes.shape({
			features: PropTypes.string,
			whenToUse: PropTypes.string,
			whenNotToUse: PropTypes.string,
			tips: PropTypes.string,
		}),
		links: PropTypes.arrayOf(
			PropTypes.shape({ label: PropTypes.string, url: PropTypes.string }),
		),
	}).isRequired,
	similarity: PropTypes.number,
	onClick: PropTypes.func,
};

const areEqual = (prevProps, nextProps) => {
	return (
		prevProps.app.id === nextProps.app.id &&
		prevProps.similarity === nextProps.similarity
	);
};

export default memo(AppCard, areEqual);
