import { Card, useMantineTheme } from "@mantine/core";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";

const CardWithMotion = motion(Card);

const MotionCard = ({
	children,
	variants,
	padding = "lg",
	radius = "xl",
	whileHover,
	whileTap = { scale: 0.98 },
	initial = "hidden",
	animate = "visible",
	lightSweep = true,
	...props
}) => {
	const theme = useMantineTheme();
	const [showSweep, setShowSweep] = useState(false);
	const hasInitialized = useRef(false);

	// Initialize random sweep on mount
	useEffect(() => {
		if (!hasInitialized.current && lightSweep) {
			setShowSweep(Math.random() > 0.5);
			hasInitialized.current = true;
		}
	}, [lightSweep]);

	const defaultVariants = {
		hidden: { y: 30, opacity: 0, scale: 0.9 },
		visible: {
			y: 0,
			opacity: 1,
			scale: 1,
			transition: {
				type: "spring",
				stiffness: 100,
				duration: 0.8,
			},
		},
	};

	const defaultWhileHover = {
		y: -5,
		scale: 1.03,
		boxShadow: `0 20px 40px ${theme.colors.dark[6]}25`,
		transition: {
			type: "spring",
			stiffness: 300,
		},
	};

	return (
		<CardWithMotion
			padding={padding}
			radius={radius}
			variants={variants ?? defaultVariants}
			whileHover={whileHover ?? defaultWhileHover}
			whileTap={whileTap}
			initial={initial}
			animate={animate}
			withBorder
			{...props}
		>
			{children}
			{/* Light Sweep Animation */}
			{lightSweep && showSweep && (
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
							rgba(255, 255, 255, 0.03),
							transparent
						)`,
						transform: "skewX(-15deg)",
						pointerEvents: "none",
						zIndex: 1,
					}}
					animate={{
						left: ["-100%", "200%"],
					}}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						repeatDelay: Math.random() * 3 + 2, // Random delay between 2-5 seconds
						ease: "easeInOut",
					}}
				/>
			)}
		</CardWithMotion>
	);
};

export default MotionCard;

MotionCard.propTypes = {
	children: PropTypes.node.isRequired,
	variants: PropTypes.object,
	padding: PropTypes.string,
	radius: PropTypes.string,
	whileHover: PropTypes.object,
	whileTap: PropTypes.object,
	initial: PropTypes.string,
	animate: PropTypes.string,
	lightSweep: PropTypes.bool,
};
