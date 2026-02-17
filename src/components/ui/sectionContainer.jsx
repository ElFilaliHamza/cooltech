import {
	Container,
	Stack,
	Title,
	Box,
	Text,
	useMantineTheme,
} from "@mantine/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const SectionContainer = ({
	title,
	description,
	children,
	className = "",
	size = "xl",
	spacing = "xl",
	titleOrder = 2,
	centered = false,
	...props
}) => {
	const theme = useMantineTheme();
	const { t } = useTranslation();
	return (
		<Box className={className} mb="lg" {...props}>
			<Container size={size}>
				<Stack gap={spacing} align={centered ? "center" : "flex-start"}>
					{(title || description) && (
						<Stack gap="md">
							{title && (
								<Title order={titleOrder}>{t(title)}</Title>
							)}
							{description && (
								<Text size="lg" c={theme.colors.gray[6]}>
									{t(description)}
								</Text>
							)}
						</Stack>
					)}
					<Box w="100%" p="lg">
						{children}
					</Box>
				</Stack>
			</Container>
		</Box>
	);
};
export default SectionContainer;

SectionContainer.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
	size: PropTypes.string,
	spacing: PropTypes.string,
	titleOrder: PropTypes.number,
	noPadding: PropTypes.bool,
	centered: PropTypes.bool,
};
