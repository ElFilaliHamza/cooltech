import {
	Modal,
	Text,
	Badge,
	Group,
	Stack,
	Anchor,
	ScrollArea,
	Box,
	useMantineTheme,
} from "@mantine/core";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const contentMotion = {
	initial: { opacity: 0, scale: 0.92, y: 16 },
	animate: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { type: "spring", damping: 26, stiffness: 280 },
	},
};

function Section({ title, children }) {
	if (children == null || (Array.isArray(children) && !children.length))
		return null;
	return (
		<Box>
			<Text size="xs" fw={700} tt="uppercase" c="dimmed" mb={6}>
				{title}
			</Text>
			{children}
		</Box>
	);
}

Section.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node,
};

export default function TechDetailModal({ app, opened, onClose }) {
	const theme = useMantineTheme();
	const primary = theme.colors[theme.primaryColor];
	const primaryShade = theme.primaryShade ?? 5;

	if (!app) return null;

	const categories = Array.isArray(app.categories)
		? app.categories
		: [app.category].filter(Boolean);
	const tags = Array.isArray(app.tags) ? app.tags : [];
	const links = app.links?.length ? app.links : [];
	const d = app.details;

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title={app.name}
			size="lg"
			radius="lg"
			withCloseButton
			closeButtonProps={{ "aria-label": "Close" }}
			transitionProps={{ transition: "pop", duration: 200 }}
			styles={{
				content: { overflow: "hidden", padding: 0 },
				body: { padding: 0 },
				header: { borderBottom: `1px solid ${theme.colors.dark[4]}40` },
			}}
		>
			<motion.div
				initial="initial"
				animate="animate"
				variants={contentMotion}
				style={{ position: "relative" }}
			>
				<Box
					px="xl"
					pt="md"
					pb="md"
					style={{
						background: primary?.[primaryShade]
							? `linear-gradient(135deg, ${primary[primaryShade]}18 0%, transparent 70%)`
							: undefined,
						borderBottom: `1px solid ${theme.colors.dark[4]}40`,
					}}
				>
					<Group gap="xs" wrap="wrap">
						{categories.map((c) => (
							<Badge
								key={c}
								size="sm"
								variant="light"
								color="primary"
							>
								{c}
							</Badge>
						))}
						{tags.map((t) => (
							<Badge key={t} size="xs" variant="dot" color="gray">
								{t}
							</Badge>
						))}
					</Group>
				</Box>

				<ScrollArea.Autosize mah={480} type="scroll" scrollbarSize="8">
					<Stack gap="lg" px="xl" py="lg">
						<Section title="Description">
							<Text size="sm" c="dark.1">
								{app.description}
							</Text>
						</Section>

						{d?.features && (
							<Section title="Features">
								<Text size="sm" c="dark.1">
									{d.features}
								</Text>
							</Section>
						)}

						{d?.whenToUse && (
							<Section title="When to use">
								<Text size="sm" c="dark.1">
									{d.whenToUse}
								</Text>
							</Section>
						)}

						{d?.whenNotToUse && (
							<Section title="When not to use">
								<Text size="sm" c="dark.1">
									{d.whenNotToUse}
								</Text>
							</Section>
						)}

						{d?.tips && (
							<Section title="Tips & tricks">
								<Text size="sm" c="dark.1">
									{d.tips}
								</Text>
							</Section>
						)}

						{app.latestNews?.url && (
							<Section title="Latest news">
								<Anchor
									href={app.latestNews.url}
									target="_blank"
									rel="noopener noreferrer"
									size="sm"
								>
									{app.latestNews.title || "Read more"}
								</Anchor>
								{app.latestNews.date && (
									<Text size="xs" c="dimmed" mt={4}>
										{app.latestNews.date}
									</Text>
								)}
							</Section>
						)}

						{links.length > 0 && (
							<Section title="Links">
								<Group gap="md" wrap="wrap">
									{links.map((l, i) => (
										<Anchor
											key={i}
											href={l.url}
											target="_blank"
											rel="noopener noreferrer"
											size="sm"
										>
											{l.label}
										</Anchor>
									))}
								</Group>
							</Section>
						)}
					</Stack>
				</ScrollArea.Autosize>
			</motion.div>
		</Modal>
	);
}

TechDetailModal.propTypes = {
	app: PropTypes.object,
	opened: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};
