import { Button as MantineButton } from "@mantine/core";
import PropTypes from "prop-types";

const Button = ({
	children,
	onClick,
	variant = "filled",
	color = null,
	size = "md",
	fullWidth = false,
	leftSection,
	rightSection,
	disabled = false,
	loading = false,
	...props
}) => {
	return (
		<MantineButton
			onClick={onClick}
			variant={variant}
			color={color}
			size={size}
			fullWidth={fullWidth}
			leftSection={leftSection}
			rightSection={rightSection}
			disabled={disabled}
			loading={loading}
			{...props}
		>
			{children}
		</MantineButton>
	);
};
export default Button;

Button.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
	variant: PropTypes.string,
	color: PropTypes.string,
	size: PropTypes.string,
	fullWidth: PropTypes.bool,
	leftSection: PropTypes.node,
	rightSection: PropTypes.node,
	disabled: PropTypes.bool,
	loading: PropTypes.bool,
};
