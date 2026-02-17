import { Menu, Button, Group, Text } from "@mantine/core";
import { useLanguage } from "../../contexts/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
	const { currentLanguage, changeLanguage, languages } = useLanguage();
	const { t } = useTranslation();
	return (
		<Menu shadow="md" width={200} position="bottom-end">
			<Menu.Target>
				<Button
					variant="light"
					leftSection={<FontAwesomeIcon icon={faGlobe} />}
					rightSection={<FontAwesomeIcon icon={faChevronDown} />}
					size="sm"
				>
					<Text span transform="uppercase" size="sm">
						{currentLanguage}
					</Text>
				</Button>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Label>{t("common.selectLanguage")}</Menu.Label>
				{languages.map((language) => (
					<Menu.Item
						key={language.code}
						onClick={() => changeLanguage(language.code)}
					>
						<Group>
							<Text fw={500}>{language.nativeName}</Text>
							<Text size="sm">
								{t(`common.${language.code}`)}
							</Text>
						</Group>
					</Menu.Item>
				))}
			</Menu.Dropdown>
		</Menu>
	);
};

export default LanguageSelector;
