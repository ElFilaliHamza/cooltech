import { Modal, Progress, Stack, Text, Group, Button } from "@mantine/core";

export function SemanticConfirmModal({
	opened,
	onClose,
	onConfirm,
	progress,
	status,
	error,
	loading,
}) {
	const isConfirmPhase = !loading && !error;

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title={isConfirmPhase ? "Enable AI search" : "Setting up AI search"}
			withCloseButton={!loading}
			closeOnClickOutside={!loading}
			closeOnEscape={!loading}
		>
			<Stack gap="md">
				{isConfirmPhase ? (
					<>
						<Text size="sm" c="dimmed">
							Search by meaning, not just keywords. A small model
							(~25 MB) will be downloaded to your device once and
							cached for future use.
						</Text>
						<Group justify="flex-end" gap="xs">
							<Button variant="default" onClick={onClose}>
								Cancel
							</Button>
							<Button onClick={onConfirm}>Enable</Button>
						</Group>
					</>
				) : (
					<>
						{error ? (
							<Text size="sm" c="red">
								{error.message}
							</Text>
						) : (
							<>
								<Progress value={progress} size="sm" />
								<Text size="sm" c="dimmed">
									{status}
								</Text>
							</>
						)}
						<Group justify="flex-end">
							<Button
								variant="default"
								onClick={onClose}
								disabled={loading}
							>
								{error ? "Close" : "Cancel"}
							</Button>
						</Group>
					</>
				)}
			</Stack>
		</Modal>
	);
}
