import React from "react";

import PropTypes from "prop-types";

const IconArrowLeft = ({ height = 16, width = 10, color = "#455dc7" }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width}
		height={height}
		viewBox="0 0 10 16"
	>
		<path
			fill={color}
			fillRule="evenodd"
			d="M.558 7.766A1.43 1.43 0 0 1 .91 6.27L6.613.718a1.54 1.54 0 0 1 2.138 0c.59.576.59 1.508 0 2.083l-5.268 5.13 5.44 5.296a1.499 1.499 0 0 1 0 2.164 1.6 1.6 0 0 1-2.223 0L.77 9.619C.252 9.112.199 8.354.559 7.766z"
		/>
	</svg>
);

IconArrowLeft.propTypes = {
	height: PropTypes.number,
	width: PropTypes.number,
	color: PropTypes.string,
};

export default IconArrowLeft;
