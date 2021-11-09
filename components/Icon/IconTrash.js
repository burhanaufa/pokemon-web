import React from "react";

import PropTypes from "prop-types";

const IconTrash = ({ size = 16, color = "grey" }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 10 13"
	>
		<g fill={color}>
			<path d="M.733 11.378c0 .786.637 1.422 1.423 1.422h5.688c.786 0 1.423-.636 1.423-1.422V2.844H.733v8.534zM7.489.711L6.778 0 3.222 0 2.511.711.022.711.022 2.133 9.978 2.133 9.978.711z" />
		</g>
	</svg>
);

IconTrash.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string,
};

export default IconTrash;
