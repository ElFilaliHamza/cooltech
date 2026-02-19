import { Box, Container, useMantineTheme } from "@mantine/core";
import ThemeToggle from "../ui/ThemeToggle";
import HeroSection from "../HeroSection";
import SearchBar from "../SearchBar";
import ResultsGrid from "../ResultsGrid";
import { useAISearch } from "../../search/useAISearch";
import TECH_DATA from "../../data/apps";
import ScrollToTop from "../ui/ScrollToTop";
import { useWindowScroll } from "@mantine/hooks";

const baseUrl = import.meta.env.BASE_URL;
const headerLogoSrc = `${baseUrl}cooltech/cooltech-only.png`;

export default function AppLayout() {
	const theme = useMantineTheme();
	const [scroll] = useWindowScroll();
	const showScrollTop = scroll.y > 400;
	const {
		setSearchQuery,
		results,
		similarityMap,
		useSemantic,
		setUseSemantic,
		isSemanticLoading,
		semanticError,
	} = useAISearch(TECH_DATA);

	const primary = theme.colors[theme.primaryColor];
	const primaryShade = theme.primaryShade ?? 5;
	const headerBg = primary?.[9]
		? (() => {
				const hex = primary[9];
				const r = parseInt(hex.slice(1, 3), 16);
				const g = parseInt(hex.slice(3, 5), 16);
				const b = parseInt(hex.slice(5, 7), 16);
				return `rgba(${r},${g},${b},0.25)`;
			})()
		: "rgba(0,0,0,0.2)";

	return (
		<Box component="main" style={{ minHeight: "100vh" }}>
			<Box
				component="header"
				style={{
					position: "sticky",
					top: 0,
					zIndex: 100,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "1rem 1.5rem",
					backdropFilter: "blur(12px)",
					backgroundColor: headerBg,
					borderBottom: `1px solid ${primary?.[primaryShade] ?? theme.colors.dark[4]}40`,
				}}
			>
				<Box
					component="a"
					href="#hero"
					style={{
						display: "block",
						lineHeight: 0,
						textDecoration: "none",
					}}
					aria-label="CoolTech home"
				>
					<img
						src={headerLogoSrc}
						alt=""
						style={{
							height: 32,
							width: "auto",
							display: "block",
						}}
					/>
				</Box>
				<ThemeToggle />
			</Box>
			<Container size="lg" py="xl">
				<HeroSection />
				<SearchBar
					setSearchQuery={setSearchQuery}
					useSemantic={useSemantic}
					setUseSemantic={setUseSemantic}
					isSemanticLoading={isSemanticLoading}
					semanticError={semanticError}
				/>
				<ResultsGrid results={results} similarityMap={similarityMap} />
			</Container>
			<ScrollToTop visible={showScrollTop} />
		</Box>
	);
}
