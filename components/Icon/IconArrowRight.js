import React from "react";

import PropTypes from "prop-types";

const IconArrowRight = ({ height = 16, width = 10, color = "#455dc7" }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width}
		height={height}
		viewBox="0 0 10 16"
	>
		<path
			fill={color}
			fillRule="evenodd"
			d="M8.496 6.095L3.01.44a1.423 1.423 0 0 0-2.057 0 1.535 1.535 0 0 0 0 2.12L6.02 7.784.788 13.18a1.59 1.59 0 0 0 0 2.204c.59.61 1.547.61 2.138 0l5.703-5.879c.5-.516.551-1.288.205-1.887.164-.52.062-1.11-.338-1.522z"
		/>
	</svg>
);

IconArrowRight.propTypes = {
	height: PropTypes.number,
	width: PropTypes.number,
	color: PropTypes.string,
};

export default IconArrowRight;
