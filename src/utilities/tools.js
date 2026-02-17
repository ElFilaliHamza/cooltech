// Function to truncate the description
const truncateText = (text, maxLength) => {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength) + "...";
};

export { truncateText };
