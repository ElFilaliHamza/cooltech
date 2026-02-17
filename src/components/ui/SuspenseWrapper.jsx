import { Suspense } from "react";
import AutoSkeleton from "./AutoSkeleton";
import PropTypes from "prop-types";

const SuspenseWrapper = ({ children }) => (
	<Suspense fallback={<AutoSkeleton />}>{children}</Suspense>
);

export default SuspenseWrapper;

SuspenseWrapper.propTypes = {
	children: PropTypes.node,
};
