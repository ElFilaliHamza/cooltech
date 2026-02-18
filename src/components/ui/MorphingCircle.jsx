// ui/MorphingCircle.jsx
import { motion } from "framer-motion";

export default function MorphingCircle({ isActive, color, size = 30 }) {
	const circleVariants = {
		inactive: {
			scale: 1,
			borderRadius: "50%",
			rotate: 0,
			transition: {
				duration: 0.3,
				ease: "easeInOut",
			},
		},
		active: {
			scale: [1, 1.2, 0.9, 1.1, 1],
			borderRadius: ["50%", "40%", "50%", "45%", "50%"],
			rotate: [0, 180, 360],
			transition: {
				duration: 2,
				repeat: Infinity,
				repeatType: "reverse",
				ease: "easeInOut",
			},
		},
	};

	const pulseVariants = {
		inactive: { scale: 1, opacity: 0.5 },
		active: {
			scale: [1, 1.5, 1],
			opacity: [0.5, 0.8, 0.5],
			transition: {
				duration: 1.5,
				repeat: Infinity,
				ease: "easeInOut",
			},
		},
	};

	return (
		<div style={{ position: "relative", width: size, height: size }}>
			{/* Pulse effect */}
			<motion.div
				variants={pulseVariants}
				animate={isActive ? "active" : "inactive"}
				style={{
					position: "absolute",
					width: "100%",
					height: "100%",
					backgroundColor: color,
					borderRadius: "50%",
					opacity: 0.3,
				}}
			/>

			{/* Main circle */}
			<motion.div
				variants={circleVariants}
				animate={isActive ? "active" : "inactive"}
				style={{
					position: "absolute",
					width: "100%",
					height: "100%",
					backgroundColor: color,
					boxShadow: `0 0 20px ${color}`,
				}}
			/>

			{/* Inner dot */}
			<motion.div
				animate={{
					scale: isActive ? [1, 1.2, 1] : 1,
				}}
				transition={{
					duration: 1,
					repeat: isActive ? Infinity : 0,
				}}
				style={{
					position: "absolute",
					top: "25%",
					left: "25%",
					width: "50%",
					height: "50%",
					backgroundColor: "white",
					borderRadius: "50%",
				}}
			/>
		</div>
	);
}
