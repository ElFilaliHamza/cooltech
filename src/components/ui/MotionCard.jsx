import { Card, useMantineTheme } from "@mantine/core";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";

const CardWithMotion = motion.create(Card);

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

	const primary = theme.colors[theme.primaryColor];
	const primaryShade = theme.primaryShade ?? 5;
	const primaryBorder = primary?.[primaryShade] ?? theme.colors.blue[5];
	const primaryDark = primary?.[9] ?? theme.colors.dark[8];
	const hexToRgba = (hex, alpha) => {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		return `rgba(${r},${g},${b},${alpha})`;
	};

	const defaultWhileHover = {
		y: -5,
		scale: 1.03,
		boxShadow: `0 20px 40px ${primaryBorder}40`,
		transition: {
			type: "spring",
			stiffness: 300,
		},
	};

	const cardStyles = {
		root: {
			borderColor: primaryBorder,
			borderWidth: 1,
			backgroundColor: hexToRgba(primaryDark, 0.15),
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
			styles={cardStyles}
			{...props}
		>
			{children}
			{/* Light Sweep Animation */}
			{lightSweep && showSweep && primary && (
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
							${hexToRgba(primary[primaryShade] ?? primary[5], 0.06)},
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
