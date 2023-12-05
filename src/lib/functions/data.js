import ProvinceData from '$lib/data/provinces.json';
import PartyData from '$lib/data/parties.json';
import results1 from '$lib/data/results/1867_1882.json';
import results2 from '$lib/data/results/1887_1917.json';
import results3 from '$lib/data/results/1921_1953.json';
import results4 from '$lib/data/results/1957_1979.json';
import results5 from '$lib/data/results/1980_2000.json';
import results6 from '$lib/data/results/2004_2021.json';

const allResults = [...results1];

export const getProvinces = () => {
	return ProvinceData;
};

export const getParties = () => {
	return PartyData;
};

export const getResults = () => {
	// return [...results1, ...results2, ...results3, ...results4, ...results5, ...results6]
	const computedResults = allResults.map(election => {
		const results = election.results.map(results => {
			const totalSeats = results.seats.reduce((acc, obj) => { return acc + obj.count }, 0);
			const provSeats = results.seats.map(seat => {
				const partySeats = seat.count;
				const partySeatsPercent = Math.round((partySeats / totalSeats) * 100);
				return { ...seat, percentage: partySeatsPercent }
			})
			return { ...results, seats: provSeats, totalSeats }; 
		})
		return {...election, results } 
	})
	return computedResults;
};

export const getElectionYears = () => {
	const years = allResults.map((result) => result.year);
	return [...new Set(years)];
};
