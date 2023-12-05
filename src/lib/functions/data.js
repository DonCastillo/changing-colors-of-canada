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
	return allResults;
};

export const getElectionYears = () => {
	const years = allResults.map((result) => result.year);
	return [...new Set(years)];
};
