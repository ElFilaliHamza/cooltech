import { useMantineTheme } from "@mantine/core";
import { useThemeValues } from "../../hooks/useThemeValues";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const AutoSkeleton = () => {
	const theme = useMantineTheme();
	const { baseSkeletonColor, highlightSkeletonColor } = useThemeValues();

	return (
		<SkeletonTheme
			baseColor={baseSkeletonColor}
			highlightColor={highlightSkeletonColor}
		>
			<div style={{ padding: theme.spacing.md }}>
				<Skeleton
					height={40}
					width="60%"
					style={{ marginBottom: theme.spacing.md }}
				/>
				<Skeleton
					count={3}
					style={{ marginBottom: theme.spacing.xs }}
				/>
				<Skeleton
					height={200}
					style={{
						marginTop: theme.spacing.md,
						marginBottom: theme.spacing.md,
					}}
				/>
				<Skeleton count={2} style={{ marginTop: theme.spacing.md }} />
			</div>
		</SkeletonTheme>
	);
};

export default AutoSkeleton;
