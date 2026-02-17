import React, { useEffect } from "react";
import {
	Container,
	Stack,
	Title,
	Text,
	Anchor,
	Paper,
	Group,
	useMantineTheme,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";

const Page404 = () => {
	const theme = useMantineTheme();
	const { t } = useTranslation();
	useEffect(() => {
		document.title = `${t("error.title")} | ${t("layout.portfolio.name")}`;
	}, []);
	return (
		<React.Fragment>
			<Container size="sm" py="xl">
				<Paper shadow="md" p="xl" radius="lg" withBorder>
					<Stack gap="lg">
						<Group justify="center" gap="sm">
							<Title order={1}>{t("error.title")}</Title>
							<FontAwesomeIcon icon={faFaceSadTear} />
						</Group>
						<Stack gap="md">
							<Text size="lg">{t("error.description")}</Text>
							<Text size="sm" c={theme.colors.gray[6]}>
								{t("error.urlNotFound", {
									url: window.location.href,
								})}
							</Text>
						</Stack>
						<Anchor href="/" size="lg" fw={600}>
							{t("error.goHome")}
						</Anchor>
					</Stack>
				</Paper>
			</Container>
		</React.Fragment>
	);
};
export default Page404;
