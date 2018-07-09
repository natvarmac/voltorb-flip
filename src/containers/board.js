import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../reducers/actions';
import * as vars from '../vars';
import Tile from '../components/tile';

class Board extends Component {
	getLoadingDiv = () => {
		return (
			<div className="container">
				<h1>Loading...</h1>
			</div>
		);
	}

	onTileClick = key => {
		this.props.flipTile(key);

		// do something according to tile contents
		const tile = this.props.tiles[key];
		console.log("clicked tile: ",tile);
		if (tile.contents === vars.VOLTORB) {
			console.log("lose!");
			this.props.stopGame();
			this.props.showGameOverScreen();
			this.props.flipAllTiles();
			this.props.setLevel(1);
		} else if (tile.contents > 1) {
			const valueTilesLeft = this.props.num_value_tiles_left - 1;
			this.props.setNumValueTilesLeft(valueTilesLeft);

			if (valueTilesLeft === 0) {
				// TODO level win
				console.log("win!");
				this.props.setLevel(this.props.level + 1);
				this.props.stopGame();
			}
		}
	}

	generateTile = tile => {
		const clickFunc = this.props.game_running? () => {this.onTileClick(`${tile.x}.${tile.y}`)} : null;
		return (
			<Tile key={tile.id}
				onClick={clickFunc}
				flipped={tile.flipped}
				contents={tile.contents}
			/>
		);
	}
	generateHeaderTile = (value = '', key = '') => {
		return (
			<Tile key={key}
				header={true}
				contents={value}
			/>
		);
	}
	generateRow = (tempTileArr, rowNumber, headerValue) => {
		return (
			<div key={rowNumber} className="row">
				{tempTileArr.map(tile => {return this.generateTile(tile)})}
				{this.generateHeaderTile(headerValue)}
			</div>
		);
	}
	generateColumnHeadersRow = (rowNumber) => {
		const columnHeaders = [];
		for (let i = 0; i < this.props.num_cols; i++) {
			columnHeaders.push(this.generateHeaderTile(this.props.headers[`${i}xh`], i));
		}
		return (
			<div key={rowNumber} className="row">
				{columnHeaders}
			</div>
		);
	}

	getBoard = () => {
		const rowsArr = [];
		let currRow = 0;
		let i = 0;
		let tempTileArr = [];
		const keys = Object.keys(this.props.tiles);
		while (keys[i]) {
			const tile = this.props.tiles[keys[i]];
			if (tile.y !== currRow) {
				rowsArr.unshift(this.generateRow(tempTileArr, currRow, this.props.headers[`${currRow}yh`]));
				currRow = tile.y;
				tempTileArr = [tile];
			} else {
				tempTileArr.push(tile);
			}
			i++;
		}
		rowsArr.unshift(this.generateRow(tempTileArr, currRow, this.props.headers[`${currRow}yh`]));
		rowsArr.push(this.generateColumnHeadersRow(currRow + 1));

		return rowsArr;
	}

	render() {
		if (!this.props.tiles)
			return this.getLoadingDiv();

		return (
			<div className="container">
				{this.getBoard()}
			</div>
		);
	}
}

Board.propTypes = {
	stopGame: PropTypes.func.isRequired,
	flipTile: PropTypes.func.isRequired,
	flipAllTiles: PropTypes.func.isRequired,
	showGameOverScreen: PropTypes.func.isRequired,
	setLevel: PropTypes.func.isRequired,
	
	tiles: PropTypes.object,
	num_value_tiles_left: PropTypes.number.isRequired,
	num_cols: PropTypes.number.isRequired,
	num_rows: PropTypes.number.isRequired,
	level: PropTypes.number.isRequired,
	game_running: PropTypes.bool.isRequired
};


function mapStateToProps(state) {
	return {
		headers: state.board_headers,
		tiles: state.tiles,
		level: state.game.level,
		num_value_tiles_left: state.game.num_value_tiles_left,
		num_rows: state.game.num_rows,
		num_cols: state.game.num_cols,
		game_running: state.game.game_running
	};
}

export default connect(mapStateToProps, actions)(Board);
