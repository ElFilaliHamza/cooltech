import { Button, useMantineTheme } from "@mantine/core";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ButtonWithMotion = motion(Button);
const MotionButton = ({
	children,
	size = "lg",
	variant = "gradient",
	leftSection,
	rightSection,
	onClick,
	whileHover,
	whileTap = { scale: 0.95 },
	lightSweep = true,
}) => {
	const theme = useMantineTheme();
	const defaultWhileHover = {
		scale: 1.05,
		boxShadow: `0 8px 25px ${theme.colors.brand[5]}33`,
	};

	return (
		<ButtonWithMotion
			component={motion.button}
			size={size}
			variant={variant}
			leftSection={leftSection}
			rightSection={rightSection}
			onClick={onClick}
			whileHover={whileHover ?? defaultWhileHover}
			whileTap={whileTap}
		>
			{children}

			{/* Light Sweep Animation */}
			{lightSweep && (
				<motion.div
					style={{
						position: "absolute",
						top: 0,
						left: "-100%",
						width: "100%",
						height: "100%",
						background: `linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.4),
                transparent
              )`,
						transform: "skewX(-15deg)",
					}}
					animate={{
						left: ["-100%", "200%"],
					}}
					transition={{
						duration: 1,
						repeat: Infinity,
						repeatDelay: 2,
						ease: "easeInOut",
					}}
				/>
			)}
		</ButtonWithMotion>
	);
};

export default MotionButton;

MotionButton.propTypes = {
	children: PropTypes.node,
	size: PropTypes.string,
	variant: PropTypes.string,
	leftSection: PropTypes.node,
	rightSection: PropTypes.node,
	onClick: PropTypes.func,
	whileHover: PropTypes.object,
	whileTap: PropTypes.object,
	glassmorphism: PropTypes.bool,
	lightSweep: PropTypes.bool,
};
