import { Text } from "@mantine/core";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const TextWithMotion = motion(Text);

const MotionText = ({
	children,
	variants,
	whileHover,
	whileTap = { scale: 0.95 },
	initial = "hidden",
	animate = "visible",
	...props
}) => {
	const defaultVariants = {
		hidden: { y: 10, opacity: 0 },
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
		<TextWithMotion
			variants={variants ?? defaultVariants}
			whileHover={whileHover ?? defaultWhileHover}
			whileTap={whileTap}
			initial={initial}
			animate={animate}
			{...props}
		>
			{children}
		</TextWithMotion>
	);
};

export default MotionText;

MotionText.propTypes = {
	children: PropTypes.node.isRequired,
	variants: PropTypes.object,
	whileHover: PropTypes.object,
	whileTap: PropTypes.object,
	initial: PropTypes.string,
	animate: PropTypes.string,
};
