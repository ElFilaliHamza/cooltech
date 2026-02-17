import { Title } from "@mantine/core";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const TitleWithMotion = motion(Title);

const MotionTitle = ({
	children,
	order = 1,
	size = "3.5rem",
	variants,
	whileHover,
	whileTap = { scale: 0.95 },
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
				stiffness: 80,
				duration: 0.6,
			},
		},
	};

	const defaultWhileHover = {};

	return (
		<TitleWithMotion
			order={order}
			size={size}
			variants={variants ?? defaultVariants}
			whileHover={whileHover ?? defaultWhileHover}
			whileTap={whileTap}
			initial={initial}
			animate={animate}
			{...props}
		>
			{children}
		</TitleWithMotion>
	);
};

export default MotionTitle;

MotionTitle.propTypes = {
	children: PropTypes.node.isRequired,
	order: PropTypes.number,
	size: PropTypes.string,
	variants: PropTypes.object,
	whileHover: PropTypes.object,
	whileTap: PropTypes.object,
	initial: PropTypes.string,
	animate: PropTypes.string,
};
