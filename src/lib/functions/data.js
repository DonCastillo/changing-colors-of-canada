import ProvinceData from '$lib/data/provinces.json';
import PartyData from '$lib/data/parties.json';
import results1 from '$lib/data/results/1867_1882.json';
import results2 from '$lib/data/results/1887_1917.json';
import results3 from '$lib/data/results/1921_1953.json';
import results4 from '$lib/data/results/1957_1979.json';
import results5 from '$lib/data/results/1980_2000.json';
import results6 from '$lib/data/results/2004_2021.json';

const MAX_NODE_HEIGHT = 300;
const allResults = [...results1, ...results2, ...results3, ...results4, ...results5, ...results6];
// const allResults = [...results1];

export const getProvinces = () => {
	return ProvinceData;
};

export const getParties = () => {
	return PartyData;
};

export const getPartiesInYears = () => {
	let newNodes = {};
	allResults.forEach(({ year, nodes }) => {
		newNodes[year] = nodes;
	});
	return newNodes;
};

export const getResultInThisProvince = (results, provCode) => {
	// console.log("getResultInThisProvince", results, provCode)
	// console.log(results, provCode)
	let newSeats = {};
	const provincialResults = results.results.find((result) => result.prov === provCode);
	if (!provincialResults) return newSeats;

	provincialResults.seats.forEach((seat) => {
		newSeats[seat.party] = { count: seat.count, percentage: seat.percentage };
	});
	// console.log("provincialResults", provincialResults)
	return newSeats;
};

export const getProvincesInYears = () => {
	let newNodes = {};
	allResults.forEach(({ year, results }) => {
		const provinces = results.map(({ prov }) => prov);
		newNodes[year] = [...new Set(provinces)];
	});
	return newNodes;
};

export const getResults = () => {
	const computedResults = allResults.map((election) => {
		const results = election.results.map((results) => {
			const totalSeats = results.seats.reduce((acc, obj) => {
				return acc + obj.count;
			}, 0);
			const provSeats = results.seats.map((seat) => {
				const partySeats = seat.count;
				const partySeatsPercent = Math.round((partySeats / totalSeats) * 100);
				return { ...seat, percentage: partySeatsPercent };
			});
			return { ...results, seats: provSeats, totalSeats };
		});
		return { ...election, results };
	});
	return computedResults;
};

export const getElectionYears = () => {
	const years = allResults.map((result) => result.year);
	return [...new Set(years)];
};

export const getPartyInformation = (partyCode) => {
	const partyInformation = getParties().find((party) => party.code === partyCode);
	return { color: partyInformation?.color ?? '#fff', fullName: partyInformation?.name ?? '' };
};

export const calculateScale = (provincialResults, currentParty) => {
	const currentPartyPercentage = provincialResults[currentParty]?.percentage ?? 0;
	return (currentPartyPercentage / 100) * MAX_NODE_HEIGHT;
};

export const getResultsByParty = (provincialResults, currentParty) => {
	if (provincialResults[currentParty]) {
		return provincialResults[currentParty];
	} else {
		return { count: 0, percentage: 0 };
	}
};

export const getPartiesInCurrentYear = (partiesInYears, currentYear, numberOfNodes) => {
	let partiesInCurrentYear = partiesInYears[currentYear];
	let finalPartiesInCurrentYear = [];
	for (let i = 0; numberOfNodes - 1 > i; ++i) {
		if (partiesInCurrentYear[i]) {
			finalPartiesInCurrentYear.push(partiesInCurrentYear[i]);
		} else {
			finalPartiesInCurrentYear.push(undefined);
		}
	}
	finalPartiesInCurrentYear.push('OTHER');
	return finalPartiesInCurrentYear;
}