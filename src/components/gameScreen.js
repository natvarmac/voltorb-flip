import React from 'react';
import PropTypes from 'prop-types';

const GameScreen = (props) => {
	return (
		<div className="container">
			<h2>Level [TODO]</h2>
			{props.children}
			{props.pencilModeButton}
			{props.giveUpButton}
		</div>
	);
}

GameScreen.propTypes = {
	children: PropTypes.any.isRequired,
	pencilModeButton: PropTypes.element.isRequired,
	giveUpButton: PropTypes.element.isRequired
};

GameScreen.defaultProps = {};

export default GameScreen;
