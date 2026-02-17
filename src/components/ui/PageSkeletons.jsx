// File: src/components/ui/PageSkeletons.jsx
import { Box, Skeleton, Stack, Grid, SimpleGrid } from "@mantine/core";

// Generic Page Skeleton
export const RouteSkeleton = () => (
	<Box p="md">
		<Skeleton height={50} circle mb="xl" />
		<Skeleton height={8} radius="xl" />
		<Skeleton height={8} mt={6} radius="xl" />
		<Skeleton height={8} mt={6} width="70%" radius="xl" />
		<Skeleton height={300} mt="xl" radius="md" />
		<Skeleton height={8} mt="lg" radius="xl" />
		<Skeleton height={8} mt={6} radius="xl" />
		<Skeleton height={8} mt={6} width="60%" radius="xl" />
	</Box>
);

// Homepage Skeleton
export const HomepageSkeleton = () => (
	<Box p="md">
		{/* Hero Section Skeleton */}
		<Grid gutter="xl" mb="xl">
			<Grid.Col span={{ base: 12, md: 7 }}>
				<Stack gap="lg">
					<Skeleton height={40} width="60%" />
					<Skeleton height={20} />
					<Skeleton height={20} width="80%" />
					<Skeleton height={20} width="70%" />
					<Skeleton height={40} width="200px" />
				</Stack>
			</Grid.Col>
			<Grid.Col span={{ base: 12, md: 5 }}>
				<Skeleton height={300} radius="xl" />
			</Grid.Col>
		</Grid>

		{/* Timeline Section Skeleton */}
		<Skeleton height={30} width="40%" mb="lg" />
		<Stack gap="md" mb="xl">
			{[...Array(3)].map((_, i) => (
				<Skeleton key={i} height={80} radius="md" />
			))}
		</Stack>

		{/* Skills Section Skeleton */}
		<Skeleton height={30} width="30%" mb="lg" />
		<SimpleGrid
			cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
			spacing="lg"
			mb="xl"
		>
			{[...Array(8)].map((_, i) => (
				<Skeleton key={i} height={100} radius="md" />
			))}
		</SimpleGrid>

		{/* Projects Section Skeleton */}
		<Skeleton height={30} width="35%" mb="lg" />
		<SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg" mb="xl">
			{[...Array(3)].map((_, i) => (
				<Skeleton key={i} height={200} radius="md" />
			))}
		</SimpleGrid>

		{/* Articles Section Skeleton */}
		<Skeleton height={30} width="30%" mb="lg" />
		<SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
			{[...Array(3)].map((_, i) => (
				<Skeleton key={i} height={150} radius="md" />
			))}
		</SimpleGrid>
	</Box>
);

// Projects Page Skeleton
export const ProjectsSkeleton = () => (
	<Box p="md">
		<Skeleton height={40} width="50%" mb="lg" />
		<Skeleton height={20} width="80%" mb="xl" />
		<SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
			{[...Array(6)].map((_, i) => (
				<Skeleton key={i} height={250} radius="md" />
			))}
		</SimpleGrid>
	</Box>
);

// Articles Page Skeleton
export const ArticlesSkeleton = () => (
	<Box p="md">
		<Skeleton height={40} width="40%" mb="lg" />
		<Skeleton height={20} width="70%" mb="xl" />
		<SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
			{[...Array(6)].map((_, i) => (
				<Skeleton key={i} height={200} radius="md" />
			))}
		</SimpleGrid>
	</Box>
);

// Skills Page Skeleton
export const SkillsSkeleton = () => (
	<Box p="md">
		<Skeleton height={40} width="35%" mb="lg" />
		<Skeleton height={20} width="60%" mb="xl" />

		{/* Skills Wall Skeleton */}
		<SimpleGrid
			cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
			spacing="lg"
			mb="xl"
		>
			{[...Array(8)].map((_, i) => (
				<Skeleton key={i} height={100} radius="md" />
			))}
		</SimpleGrid>

		{/* Skills Cards Skeleton */}
		<SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
			{[...Array(6)].map((_, i) => (
				<Skeleton key={i} height={150} radius="md" />
			))}
		</SimpleGrid>
	</Box>
);

// About Page Skeleton
export const AboutSkeleton = () => (
	<Box p="md">
		<Grid gutter="xl">
			<Grid.Col span={{ base: 12, lg: 6 }}>
				<Stack gap="lg">
					<Skeleton height={50} width="80%" />
					<Skeleton height={20} />
					<Skeleton height={20} />
					<Skeleton height={20} width="90%" />
					<Skeleton height={20} width="70%" />
				</Stack>
			</Grid.Col>
			<Grid.Col span={{ base: 12, lg: 6 }}>
				<Skeleton height={400} radius="xl" />
			</Grid.Col>
		</Grid>
	</Box>
);

// Contact Page Skeleton
export const ContactSkeleton = () => (
	<Box p="md">
		<Skeleton height={300} radius="lg" mb="xl" />
		<Skeleton height={100} radius="md" width="60%" mx="auto" />
	</Box>
);
