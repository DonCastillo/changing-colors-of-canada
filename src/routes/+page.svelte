<script>
	import { getResultsByParty } from './../lib/functions/data.js';
	import { nextState, prevState } from './../lib/functions/node.js';
	import { tooltip } from '$lib/functions/node.js';
	import gsap from 'gsap';

	import {
		getElectionYears,
		getResults,
		getPartiesInYears,
		getProvincesInYears,
		getResultInThisProvince,
		getPartyInformation,
		calculateScale
	} from '$lib/functions/data.js';
	import { getParties, getProvinces } from '$lib/functions/data.js';
	import parliamentBg from '$lib/images/parliament-bg.jpg';
	import Map from '$lib/graphics/Map.svelte';
	import ProvNodes from '$lib/components/ProvNodes.svelte';
	import { onMount } from 'svelte';
	import ElectionYearButton from '../lib/components/ElectionYearButton.svelte';

	let electionYears = getElectionYears();
	let partiesInYears = getPartiesInYears();
	let provincesInYears = getProvincesInYears();
	let allResults = getResults();
	let currentYear = electionYears[0] ?? '1867';

	const NUMBER_OF_NODES = 6;

	// BC
	let BCNode0, BCNode1, BCNode2, BCNode3, BCNode4, BCNode5;
	let BCNodes = [];
	let BCTimelines = [
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline()
	];

	$: partiesInCurrentYear = getFinalPartiesInYears(partiesInYears, currentYear);
	$: resultsInCurrentYear = allResults.filter((result) => result.year === currentYear)[0];
	$: tempProvincesInCurrentYear = provincesInYears[currentYear];
	$: provincesInCurrentYear =
		tempProvincesInCurrentYear?.map((prov, index) => ({ id: index, code: prov })) ?? [];

	$: console.log('currentYear', currentYear);
	$: console.log('partiesInCurrentYear', partiesInCurrentYear);
	$: console.log('resultsInCurrentYear', resultsInCurrentYear);
	$: console.log('provincesInCurrentYear', provincesInCurrentYear);
	$: animateBCNodes(currentYear);

	onMount(() => {
		BCNodes = [BCNode0, BCNode1, BCNode2, BCNode3, BCNode4, BCNode5];
	});

	function getFinalPartiesInYears(partiesInYears, currentYear) {
		let tempPartyInYears = partiesInYears[currentYear];
		let finalPartyInYears = [];
		for (let i = 0; NUMBER_OF_NODES - 1 > i; ++i) {
			if (tempPartyInYears[i]) {
				finalPartyInYears.push(tempPartyInYears[i]);
			} else {
				finalPartyInYears.push(undefined);
			}
		}
		finalPartyInYears.push('OTHER');
		return finalPartyInYears;
	}

	function animateBCNodes(currentYear) {
		if (!currentYear) return;
		if (!partiesInCurrentYear || partiesInCurrentYear.length === 0) return;
		if (!resultsInCurrentYear || Object.keys(resultsInCurrentYear).length === 0) return;
		const provincialResultsThisYear = getResultInThisProvince(resultsInCurrentYear, 'BC');

		for (let i = 0; NUMBER_OF_NODES > i; ++i) {
			const currentParty = partiesInCurrentYear[i];
			const newScale = calculateScale(provincialResultsThisYear, currentParty);
			const resultsByParty = getResultsByParty(provincialResultsThisYear, currentParty);
			const { color, fullName } = getPartyInformation(currentParty);

			if (BCNodes[i]) {
				BCNodes[i].textContent = `${currentParty}`;
				BCNodes[i].title = tooltip(fullName, resultsByParty.count, resultsByParty.percentage);
			}
			if (BCTimelines[i]) {
				BCTimelines[i].to(BCNodes[i], nextState(newScale, color));
			} else {
				BCTimelines[i]?.to(BCNodes[i], prevState());
			}
		}
	}

	function changeYearHandler(year) {
		currentYear = year;
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div id="home" class="min-h-screen text-white relative">
	<!-- <div class="bg-drop absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center" style="background-image:url({parliamentBg})"></div> -->
	<!-- <div class="bg-filter absolute top-0 left-0 w-full h-full bg-black opacity-95"></div> -->
	<!-- <div class="z-10">Don</div> -->
	<div class="min-h-screen bg-blue-300 flex flex-col justify-between">
		<header class="bg-lime-200"></header>
		<div class="bg-pink-100 flex-1">
			<div class="h-full flex flex-col md:flex-row bg-lime-700">
				<aside class="md:w-[230px] bg-red-300 max-h-screen overflow-y-auto">
					{#each electionYears as year}
						<ElectionYearButton {year} on:click={() => changeYearHandler(year)} />
					{/each}
				</aside>
				<main class="flex-1 bg-indigo-400">
					<div class="max-w-[1500px] m-auto h-full flex flex-col justify-center bg-amber-100">
						<div class="bg-amber-100 relative">
							<Map />
							<!-- BC Nodes -->
							<div class="prov" id="BC">
								<div class="node node-1" bind:this={BCNode0}></div>
								<div class="node node-2" bind:this={BCNode1}></div>
								<div class="node node-3" bind:this={BCNode2}></div>
								<div class="node node-4" bind:this={BCNode3}></div>
								<div class="node node-5" bind:this={BCNode4}></div>
								<div class="node node-5" bind:this={BCNode5}></div>
								<div class="w-full bg-slate-900 text-center z-10">BC</div>
							</div>

							
						</div>
					</div>
				</main>
			</div>
		</div>
		<footer class="bg-slate-500"></footer>
	</div>
</div>

<style>
	.bg-drop {
		background-blend-mode: luminosity;
		background-color: black;
		filter: opacity(5%);
	}
</style>
