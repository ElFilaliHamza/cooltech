import { Link } from "react-router-dom";
import { Anchor, UnstyledButton } from "@mantine/core";
import PropTypes from "prop-types";

const SmartLink = ({
	to,
	href,
	children,
	external = false,
	unstyled = false,
	...props
}) => {
	if (href || external) {
		return (
			<Anchor
				href={href || to}
				target="_blank"
				rel="noopener noreferrer"
				{...props}
			>
				{children}
			</Anchor>
		);
	}
	if (unstyled) {
		return (
			<UnstyledButton component={Link} to={to} {...props}>
				{children}
			</UnstyledButton>
		);
	}
	return (
		<Anchor component={Link} to={to} {...props}>
			{children}
		</Anchor>
	);
};
export default SmartLink;

SmartLink.propTypes = {
	to: PropTypes.string,
	href: PropTypes.string,
	children: PropTypes.node,
	external: PropTypes.bool,
	unstyled: PropTypes.bool,
};
