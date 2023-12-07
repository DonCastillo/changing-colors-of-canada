<script>
	import gsap from 'gsap';

	import {
		getElectionYears,
		getResults,
		getPartiesInYears,
		getProvincesInYears,
		getResultInThisProvince
	} from './../lib/functions/data.js';
	import { getParties, getProvinces } from '$lib/functions/data.js';
	import parliamentBg from '$lib/images/parliament-bg.jpg';
	import Map from '$lib/graphics/Map.svelte';
	import ProvNodes from '$lib/components/ProvNodes.svelte';
	import { onMount } from 'svelte';
	import ElectionYearButton from '../lib/components/ElectionYearButton.svelte';

	let allProvinces = getProvinces();;
	let allParties = getParties();
	let electionYears = getElectionYears();
	let partiesInYears = getPartiesInYears();
	let provincesInYears = getProvincesInYears();
	let allResults = getResults();
	let currentYear = electionYears[0] ?? '1867';

	const NUMBER_OF_NODES = 6;
	const MAX_NODE_HEIGHT = 200;

	// BC 
	let BCNode0, BCNode1, BCNode2, BCNode3, BCNode4, BCNode5;
	let BCNodes = [];
	let BCTimelines = [gsap.timeline(), gsap.timeline(), gsap.timeline(), gsap.timeline(), gsap.timeline(), gsap.timeline()]

	// let tlBCNode0 = gsap.timeline();
	// let tlBCNode1 = gsap.timeline();
	// let tlBCNode2 = gsap.timeline();
	// let tlBCNode3 = gsap.timeline();
	// let tlBCNode4 = gsap.timeline();
	// let tlBCNode5 = gsap.timeline();

	$: partiesInCurrentYear = getFinalPartiesInYears(partiesInYears, currentYear);
	$: resultsInCurrentYear = allResults.filter((result) => result.year === currentYear)[0];
	// $: provincesInCurrentYear = (provincesInYears[currentYear])?.map((prov, index) => {id: index, prov });
	$: tempProvincesInCurrentYear = provincesInYears[currentYear];
	$: provincesInCurrentYear =
		tempProvincesInCurrentYear?.map((prov, index) => ({ id: index, code: prov })) ?? [];

	$: console.log('currentYear', currentYear);
	$: console.log('partiesInCurrentYear', partiesInCurrentYear);
	$: console.log('resultsInCurrentYear', resultsInCurrentYear);
	$: console.log('provincesInCurrentYear', provincesInCurrentYear);
	$: animateBCNodes(currentYear)

	onMount(() => {
		console.log("I'm mounted");
		BCNodes = [BCNode0, BCNode1, BCNode2, BCNode3, BCNode4, BCNode5];
		// animateBCNodes(currentYear)
		

		// console.log("BCNode0", BCNode0);

		// allProvinces = getProvinces();
		// allParties = getParties();
		// electionYears = getElectionYears();
		// partiesInYears = getPartiesInYears();
		// provincesInYears = getProvincesInYears();
		// allResults = getResults();
		// currentYear = electionYears[0] ?? '1867';

		// console.log('-------- onMount --------');
		// console.log('electionYears', electionYears);
		// console.log('partiesInYears', partiesInYears);
		// console.log('allResults', allResults);
		// console.log('provincesInYears', provincesInYears);
		// console.log('-------- onMount --------');
	});

	function getFinalPartiesInYears(partiesInYears, currentYear) {
		let tempPartyInYears = partiesInYears[currentYear];
		let finalPartyInYears = [];
		for(let i = 0; NUMBER_OF_NODES - 1 > i; ++i) {
			if(tempPartyInYears[i]) {
				finalPartyInYears.push(tempPartyInYears[i]);
			} else {
				finalPartyInYears.push(undefined);
			}
		}
		finalPartyInYears.push("OTHER");
		return finalPartyInYears;
	}

	function calculateScale(provincialResults, currentParty) {
		const currentPartyPercentage = provincialResults[currentParty]?.percentage ?? 0;
		return (currentPartyPercentage / 100) * MAX_NODE_HEIGHT;
	}

	function animateBCNodes(currentYear) {
		if(!currentYear) return;
		if(!partiesInCurrentYear || partiesInCurrentYear.length === 0) return;
		if(!resultsInCurrentYear || Object.keys(resultsInCurrentYear).length === 0) return;
		console.log("inside province: ", partiesInCurrentYear)

		const BCResultsThisYear = getResultInThisProvince(resultsInCurrentYear, "BC")

		for(let i = 0; NUMBER_OF_NODES > i; ++i) {
			console.log("node: ", i);
			console.log("partiesInCurrentYear[i]", partiesInCurrentYear[i]);
			const currentParty = partiesInCurrentYear[i];
			const newScale = calculateScale(BCResultsThisYear, currentParty);
			// console.log("newScale", newScale);
			// console.log("BCTimelines[i]", BCTimelines[i]);
			if(BCTimelines[i]) {
				BCTimelines[i].to(BCNodes[i], { duration: 0.5, opacity: 1, height: newScale })
			} else {
				BCTimelines[i]?.to(BCNodes[i], { duration: 0.5, opacity: 0, height: 0 })
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
		<header class="bg-lime-200">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam harum voluptate laudantium fugiat
			quos deserunt, neque iusto iure voluptas. Sunt soluta deserunt esse sed alias placeat
			voluptate similique veniam in!
		</header>
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
								<div class="node node-1 bg-red-400" bind:this={BCNode0}></div>
								<div class="node node-2 bg-blue-400" bind:this={BCNode1}></div>
								<div class="node node-3 bg-yellow-400" bind:this={BCNode2}></div>
								<div class="node node-4 bg-orange-400" bind:this={BCNode3}></div>
								<div class="node node-5 bg-violet-400" bind:this={BCNode4}></div>
								<div class="node node-5 bg-green-400" bind:this={BCNode5}></div>
								<!-- <div class="w-full bg-slate-600 text-center z-10">{provCode}</div>  -->
							</div>





							<!-- {provincesInCurrentYear} -->
							<!-- {#each allProvinces as province }
								<ProvNodes provCode={province} provName={province} />
							{/each} -->
							<!-- {#key currentYear}
								{#each provincesInCurrentYear as province}
									<ProvNodes
										provCode={province.code}
										provName={province.code}
										electionYear={currentYear}
										provincialResults={getResultInThisProvince(resultsInCurrentYear, province.code)}
										partiesRunning={partiesInCurrentYear}
									/>
								{/each}
							{/key} -->
						</div>
					</div>
				</main>
			</div>
		</div>
		<footer class="bg-slate-500">
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, architecto non. Dolor aliquid
			voluptatibus et ex obcaecati ratione architecto enim dolorem voluptatum corporis consectetur
			impedit odit iure odio, sit autem?
		</footer>
		<!-- <section id="map-based-seats" class="container px-3 m-auto bg-amber-200">
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi quo doloribus debitis aliquam quia? Recusandae cumque modi cum eveniet tempore tempora porro quam corrupti repellat! Voluptate sit recusandae ipsam? Sed? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ut sunt dignissimos quam doloribus voluptates, esse facilis facere molestiae minus perspiciatis error veniam omnis placeat eaque provident ipsam eum nesciunt?
		</section> -->
	</div>
</div>

<style>
	.bg-drop {
		background-blend-mode: luminosity;
		background-color: black;
		filter: opacity(5%);
	}
</style>
