<script>
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

	let allProvinces = [];
	let allParties = [];
	let electionYears = [];
	let partiesInYears = [];
	let provincesInYears = [];
	let allResults = [];
	let currentYear = null;

	$: partiesInCurrentYear = partiesInYears[currentYear];
	$: resultsInCurrentYear = allResults.filter((result) => result.year === currentYear)[0];
	// $: provincesInCurrentYear = (provincesInYears[currentYear])?.map((prov, index) => {id: index, prov });
	$: tempProvincesInCurrentYear = provincesInYears[currentYear];
	$: provincesInCurrentYear =
		tempProvincesInCurrentYear?.map((prov, index) => ({ id: index, code: prov })) ?? [];

	$: console.log('currentYear', currentYear);
	$: console.log('partiesInCurrentYear', partiesInCurrentYear);
	$: console.log('resultsInCurrentYear', resultsInCurrentYear);
	$: console.log('provincesInCurrentYear', provincesInCurrentYear);

	onMount(() => {
		console.log("I'm mounted");
		allProvinces = getProvinces();
		allParties = getParties();
		electionYears = getElectionYears();
		partiesInYears = getPartiesInYears();
		provincesInYears = getProvincesInYears();
		allResults = getResults();
		currentYear = electionYears[0] ?? '1867';

		// console.log('-------- onMount --------');
		// console.log('electionYears', electionYears);
		// console.log('partiesInYears', partiesInYears);
		// console.log('allResults', allResults);
		// console.log('provincesInYears', provincesInYears);
		// console.log('-------- onMount --------');
	});

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
							<!-- {provincesInCurrentYear} -->
							<!-- {#each allProvinces as province }
								<ProvNodes provCode={province} provName={province} />
							{/each} -->
							{#key currentYear}
								{#each provincesInCurrentYear as province}
									<ProvNodes
										provCode={province.code}
										provName={province.code}
										electionYear={currentYear}
										provincialResults={getResultInThisProvince(resultsInCurrentYear, province.code)}
										partiesRunning={partiesInCurrentYear}
									/>
								{/each}
							{/key}
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
