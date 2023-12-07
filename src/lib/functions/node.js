export const tooltip = (partyFullName, count, percentage) => {
	return `${partyFullName.toUpperCase()} - seats: ${count}, percentage: ${percentage}%`;
};

export const nextState = (height, bgColor) => {
	return {
		duration: 0.5,
		opacity: 1,
		height: height,
		backgroundColor: bgColor
	};
};

export const prevState = () => {
	return {
		duration: 0.5,
		opacity: 0,
		height: 0,
		backgroundColor: 'fff'
	};
};
