import {
	Container,
	Title,
	Text,
	Button,
	Stack,
	Paper,
	Center,
	Group,
	Code,
	Box,
	useMantineTheme,
} from "@mantine/core";
import PropTypes from "prop-types";

const ErrorBoundaryFallback = ({
	error,
	resetErrorBoundary,
	componentStack,
}) => {
	const theme = useMantineTheme();
	const handleGoHome = () => {
		window.location.href = "/";
	};
	const handleReload = () => {
		window.location.reload();
	};
	return (
		<Center>
			<Container size="sm">
				<Paper shadow="md" p="xl" radius="md" withBorder>
					<Stack gap="lg" align="center">
						<span aria-hidden style={{ fontSize: "2rem" }}>
							⚠️
						</span>
						<Title order={2}>Something went wrong</Title>
						<Text size="md" ta="center">
							An error occurred. You can try again, go home, or
							reload the page.
						</Text>
						{(error || componentStack) && (
							<Paper p="md" bg="gray.1" radius="sm">
								<Stack gap="xs">
									{error && (
										<Box>
											<Text size="sm" fw={600} c="red">
												Error
											</Text>
											<Code block color="red">
												{error.message}
											</Code>
										</Box>
									)}
									{componentStack && (
										<Box>
											<Text size="sm" fw={600} c="orange">
												Component stack
											</Text>
											<Code block color="orange">
												{componentStack}
											</Code>
										</Box>
									)}
								</Stack>
							</Paper>
						)}
						<Group gap="md">
							<Button
								onClick={resetErrorBoundary}
								variant="filled"
								size="md"
							>
								Try again
							</Button>
							<Button
								onClick={handleGoHome}
								variant="light"
								color="blue"
								size="md"
							>
								Go home
							</Button>
							<Button
								onClick={handleReload}
								variant="outline"
								color="gray"
								size="md"
							>
								Reload page
							</Button>
						</Group>
						<Text size="xs" c={theme.colors.gray[6]} mt="md">
							If this keeps happening, try a hard refresh or
							clear cache.
						</Text>
					</Stack>
				</Paper>
			</Container>
		</Center>
	);
};
export default ErrorBoundaryFallback;

ErrorBoundaryFallback.propTypes = {
	error: PropTypes.object,
	resetErrorBoundary: PropTypes.func,
	componentStack: PropTypes.string,
};
