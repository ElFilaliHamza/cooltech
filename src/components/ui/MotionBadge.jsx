import { Badge } from "@mantine/core";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const BadgeWithMotion = motion(Badge);
const MotionBadge = ({
	children,
	size = "lg",
	variant = "gradient",
	variants,
	whileHover,
	custom,
}) => {
	const defaultBadgeVariants = {
		hidden: { scale: 0, opacity: 0 },
		visible: {
			scale: 1,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 200,
			},
		},
	};
	const defaultWhileHover = {
		scale: 1.05,
		transition: {
			type: "spring",
			stiffness: 400,
		},
	};

	return (
		<BadgeWithMotion
			size={size}
			variant={variant}
			variants={variants ?? defaultBadgeVariants}
			whileHover={whileHover ?? defaultWhileHover}
			custom={custom}
		>
			{children}
		</BadgeWithMotion>
	);
};

export default MotionBadge;

MotionBadge.propTypes = {
	children: PropTypes.node,
	size: PropTypes.string,
	variant: PropTypes.string,
	variants: PropTypes.object,
	whileHover: PropTypes.object,
	custom: PropTypes.object,
};
