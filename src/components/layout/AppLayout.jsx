import { Box, Container } from "@mantine/core";
import ThemeToggle from "../ui/ThemeToggle";
import HeroSection from "../HeroSection";
import SearchBar from "../SearchBar";
import ResultsGrid from "../ResultsGrid";
import { useAISearch } from "../../search/useAISearch";
import APPS from "../../data/apps";

export default function AppLayout() {
	const {
		query,
		setQuery,
		results,
		similarityMap,
		useSemantic,
		setUseSemantic,
		isSemanticLoading,
		semanticError,
	} = useAISearch(APPS);

	return (
		<Box component="main" style={{ minHeight: "100vh" }}>
			<Box
				component="header"
				style={{
					position: "sticky",
					top: 0,
					zIndex: 100,
					display: "flex",
					justifyContent: "flex-end",
					padding: "1rem 1.5rem",
				}}
			>
				<ThemeToggle />
			</Box>
			<Container size="lg" py="xl">
				<HeroSection />
				<SearchBar
					query={query}
					setQuery={setQuery}
					useSemantic={useSemantic}
					setUseSemantic={setUseSemantic}
					isSemanticLoading={isSemanticLoading}
					semanticError={semanticError}
				/>
				<ResultsGrid results={results} similarityMap={similarityMap} />
			</Container>
		</Box>
	);
}
