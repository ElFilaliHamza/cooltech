import { Box } from "@mantine/core";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const BoxWithMotion = motion(Box);

const MotionBox = ({
	children,
	variants,
	whileHover,
	whileTap,
	initial = "hidden",
	animate = "visible",
	...props
}) => {
	const defaultVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 100,
			},
		},
	};

	const defaultWhileHover = {};

	return (
		<BoxWithMotion
			variants={variants ?? defaultVariants}
			whileHover={whileHover ?? defaultWhileHover}
			whileTap={whileTap}
			initial={initial}
			animate={animate}
			{...props}
		>
			{children}
		</BoxWithMotion>
	);
};

export default MotionBox;

MotionBox.propTypes = {
	children: PropTypes.node.isRequired,
	variants: PropTypes.object,
	whileHover: PropTypes.object,
	whileTap: PropTypes.object,
	initial: PropTypes.string,
	animate: PropTypes.string,
};
