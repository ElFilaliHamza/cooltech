import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Text } from "@mantine/core";
import PropTypes from "prop-types";

const TypingText = ({
	children,
	speed = 50,
	delay = 0,
	className = "",
	...props
}) => {
	const [displayText, setDisplayText] = useState("");
	const [showCursor, setShowCursor] = useState(true);

	const fullText = String(children);

	useEffect(() => {
		// Start typing after delay
		const startTimeout = setTimeout(() => {
			let currentIndex = 0;

			const typeInterval = setInterval(() => {
				if (currentIndex <= fullText.length) {
					setDisplayText(fullText.substring(0, currentIndex));
					currentIndex++;
				} else {
					clearInterval(typeInterval);
					// Hide cursor after typing completes
					setTimeout(() => setShowCursor(false), 1000);
				}
			}, speed);

			return () => clearInterval(typeInterval);
		}, delay);

		return () => clearTimeout(startTimeout);
	}, [fullText, speed, delay]);

	return (
		<Text {...props} className={className}>
			{displayText}
			{showCursor && displayText.length < fullText.length && (
				<motion.span
					animate={{ opacity: [1, 0] }}
					transition={{ duration: 0.5, repeat: Infinity }}
					style={{ marginLeft: "2px" }}
				>
					|
				</motion.span>
			)}
		</Text>
	);
};

TypingText.propTypes = {
	children: PropTypes.node,
	speed: PropTypes.number,
	delay: PropTypes.number,
	className: PropTypes.string,
};

export default TypingText;
