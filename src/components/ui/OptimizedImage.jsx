import { useState } from "react";
import { Image, useMantineTheme } from "@mantine/core";
import PropTypes from "prop-types";
import { useThemeValues } from "../../hooks/useThemeValues";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const OptimizedImage = ({ src, alt, ...props }) => {
	const [loading, setLoading] = useState(true);
	const theme = useMantineTheme();
	const { baseSkeletonColor, highlightSkeletonColor } = useThemeValues();

	return (
		<>
			{loading && (
				<SkeletonTheme
					baseColor={baseSkeletonColor}
					highlightColor={highlightSkeletonColor}
				>
					<Skeleton
						height={500}
						style={{
							marginTop: theme.spacing.md,
							marginBottom: theme.spacing.md,
						}}
					/>
				</SkeletonTheme>
			)}
			<Image
				src={src}
				alt={alt}
				onLoad={() => setLoading(false)}
				onError={() => setLoading(false)}
				style={{ display: loading ? "none" : "block" }}
				{...props}
			/>
		</>
	);
};

export default OptimizedImage;

OptimizedImage.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
};
