<script>
	import { getPartiesInCurrentYear, getResultsByParty } from '$lib/functions/data.js';
	import { nextState, prevState } from '$lib/functions/node.js';
	import { tooltip } from '$lib/functions/node.js';
	import { gsap } from 'gsap';

	import {
		getElectionYears,
		getResults,
		getPartiesInYears,
		getProvincesInYears,
		getResultInThisProvince,
		getPartyInformation,
		calculateScale
	} from '$lib/functions/data.js';
	import parliamentBg from '$lib/images/parliament-bg.jpg';
	import Map from '$lib/graphics/Map.svelte';
	import { onMount } from 'svelte';
	import ElectionYearButton from '$lib/components/ElectionYearButton.svelte';

	let electionYears = getElectionYears();
	let partiesInYears = getPartiesInYears();
	let provincesInYears = getProvincesInYears();
	let allResults = getResults();
	let currentYear = electionYears[0] ?? '1867';

	const NUMBER_OF_NODES = 6;

	// BC Nodes
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

	// AB Nodes
	let ABNode0, ABNode1, ABNode2, ABNode3, ABNode4, ABNode5;
	let ABNodes = [];
	let ABTimelines = [
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline()
	];

	// SK Nodes
	let SKNode0, SKNode1, SKNode2, SKNode3, SKNode4, SKNode5;
	let SKNodes = [];
	let SKTimelines = [
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline()
	];

	// MB Nodes
	let MBNode0, MBNode1, MBNode2, MBNode3, MBNode4, MBNode5;
	let MBNodes = [];
	let MBTimelines = [
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline()
	];

	// ON Nodes
	let ONNode0, ONNode1, ONNode2, ONNode3, ONNode4, ONNode5;
	let ONNodes = [];
	let ONTimelines = [
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline()
	];

	// QC Nodes
	let QCNode0, QCNode1, QCNode2, QCNode3, QCNode4, QCNode5;
	let QCNodes = [];
	let QCTimelines = [
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline()
	];

	// NB Nodes
	let NBNode0, NBNode1, NBNode2, NBNode3, NBNode4, NBNode5;
	let NBNodes = [];
	let NBTimelines = [
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline()
	];

	// NS Nodes
	let NSNode0, NSNode1, NSNode2, NSNode3, NSNode4, NSNode5;
	let NSNodes = [];
	let NSTimelines = [
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline()
	];

	// PE Nodes
	let PENode0, PENode1, PENode2, PENode3, PENode4, PENode5;
	let PENodes = [];
	let PETimelines = [
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline()
	];

	// NL Nodes
	let NLNode0, NLNode1, NLNode2, NLNode3, NLNode4, NLNode5;
	let NLNodes = [];
	let NLTimelines = [
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline()
	];

	// YK Nodes
	let YKNode0, YKNode1, YKNode2, YKNode3, YKNode4, YKNode5;
	let YKNodes = [];
	let YKTimelines = [
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline()
	];

	// NT Nodes
	let NTNode0, NTNode1, NTNode2, NTNode3, NTNode4, NTNode5;
	let NTNodes = [];
	let NTTimelines = [
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline()
	];

	// NU Nodes
	let NUNode0, NUNode1, NUNode2, NUNode3, NUNode4, NUNode5;
	let NUNodes = [];
	let NUTimelines = [
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline(),
		gsap.timeline()
	];

	$: partiesInCurrentYear = getPartiesInCurrentYear(partiesInYears, currentYear, NUMBER_OF_NODES);
	$: resultsInCurrentYear = allResults.filter((result) => result.year === currentYear)[0];
	$: tempProvincesInCurrentYear = provincesInYears[currentYear];
	$: provincesInCurrentYear =
		tempProvincesInCurrentYear?.map((prov, index) => ({ id: index, code: prov })) ?? [];

	$: console.log('currentYear', currentYear);
	$: console.log('partiesInCurrentYear', partiesInCurrentYear);
	$: console.log('resultsInCurrentYear', resultsInCurrentYear);
	$: console.log('provincesInCurrentYear', provincesInCurrentYear);
	$: animateBCNodes(currentYear);
	$: animateABNodes(currentYear);
	$: animateSKNodes(currentYear);
	$: animateMBNodes(currentYear);
	$: animateONNodes(currentYear);
	$: animateQCNodes(currentYear);
	$: animateNBNodes(currentYear);
	$: animateNSNodes(currentYear);
	$: animatePENodes(currentYear);
	$: animateNLNodes(currentYear);
	$: animateYKNodes(currentYear);
	$: animateNTNodes(currentYear);
	$: animateNUNodes(currentYear);

	onMount(() => {
		BCNodes = [BCNode0, BCNode1, BCNode2, BCNode3, BCNode4, BCNode5];
		ABNodes = [ABNode0, ABNode1, ABNode2, ABNode3, ABNode4, ABNode5];
		SKNodes = [SKNode0, SKNode1, SKNode2, SKNode3, SKNode4, SKNode5];
		MBNodes = [MBNode0, MBNode1, MBNode2, MBNode3, MBNode4, MBNode5];
		ONNodes = [ONNode0, ONNode1, ONNode2, ONNode3, ONNode4, ONNode5];
		QCNodes = [QCNode0, QCNode1, QCNode2, QCNode3, QCNode4, QCNode5];
		NBNodes = [NBNode0, NBNode1, NBNode2, NBNode3, NBNode4, NBNode5];
		NSNodes = [NSNode0, NSNode1, NSNode2, NSNode3, NSNode4, NSNode5];
		PENodes = [PENode0, PENode1, PENode2, PENode3, PENode4, PENode5];
		NLNodes = [NLNode0, NLNode1, NLNode2, NLNode3, NLNode4, NLNode5];
		YKNodes = [YKNode0, YKNode1, YKNode2, YKNode3, YKNode4, YKNode5];
		NTNodes = [NTNode0, NTNode1, NTNode2, NTNode3, NTNode4, NTNode5];
		NUNodes = [NUNode0, NUNode1, NUNode2, NUNode3, NUNode4, NUNode5];
		animateBCNodes(currentYear);
		animateABNodes(currentYear);
		animateSKNodes(currentYear);
		animateMBNodes(currentYear);
		animateONNodes(currentYear);
		animateQCNodes(currentYear);
		animateNBNodes(currentYear);
		animateNSNodes(currentYear);
		animatePENodes(currentYear);
		animateNLNodes(currentYear);
		animateYKNodes(currentYear);
		animateNTNodes(currentYear);
		animateNUNodes(currentYear);
	});

	// BC Nodes Animations
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

			// GSAP Animations for BC Nodes
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

	// AB Nodes Animations
	function animateABNodes(currentYear) {
		if (!currentYear) return;
		if (!partiesInCurrentYear || partiesInCurrentYear.length === 0) return;
		if (!resultsInCurrentYear || Object.keys(resultsInCurrentYear).length === 0) return;
		const provincialResultsThisYear = getResultInThisProvince(resultsInCurrentYear, 'AB');

		for (let i = 0; NUMBER_OF_NODES > i; ++i) {
			const currentParty = partiesInCurrentYear[i];
			const newScale = calculateScale(provincialResultsThisYear, currentParty);
			const resultsByParty = getResultsByParty(provincialResultsThisYear, currentParty);
			const { color, fullName } = getPartyInformation(currentParty);

			// GSAP Animations for AB Nodes
			if (ABNodes[i]) {
				ABNodes[i].textContent = `${currentParty}`;
				ABNodes[i].title = tooltip(fullName, resultsByParty.count, resultsByParty.percentage);
			}
			if (ABTimelines[i]) {
				ABTimelines[i].to(ABNodes[i], nextState(newScale, color));
			} else {
				ABTimelines[i]?.to(ABNodes[i], prevState());
			}
		}
	}

	// SK Nodes Animations
	function animateSKNodes(currentYear) {
		if (!currentYear) return;
		if (!partiesInCurrentYear || partiesInCurrentYear.length === 0) return;
		if (!resultsInCurrentYear || Object.keys(resultsInCurrentYear).length === 0) return;
		const provincialResultsThisYear = getResultInThisProvince(resultsInCurrentYear, 'SK');

		for (let i = 0; NUMBER_OF_NODES > i; ++i) {
			const currentParty = partiesInCurrentYear[i];
			const newScale = calculateScale(provincialResultsThisYear, currentParty);
			const resultsByParty = getResultsByParty(provincialResultsThisYear, currentParty);
			const { color, fullName } = getPartyInformation(currentParty);

			// GSAP Animations for SK Nodes
			if (SKNodes[i]) {
				SKNodes[i].textContent = `${currentParty}`;
				SKNodes[i].title = tooltip(fullName, resultsByParty.count, resultsByParty.percentage);
			}
			if (SKTimelines[i]) {
				SKTimelines[i].to(SKNodes[i], nextState(newScale, color));
			} else {
				SKTimelines[i]?.to(SKNodes[i], prevState());
			}
		}
	}

	// MB Nodes Animations
	function animateMBNodes(currentYear) {
		if (!currentYear) return;
		if (!partiesInCurrentYear || partiesInCurrentYear.length === 0) return;
		if (!resultsInCurrentYear || Object.keys(resultsInCurrentYear).length === 0) return;
		const provincialResultsThisYear = getResultInThisProvince(resultsInCurrentYear, 'MB');

		for (let i = 0; NUMBER_OF_NODES > i; ++i) {
			const currentParty = partiesInCurrentYear[i];
			const newScale = calculateScale(provincialResultsThisYear, currentParty);
			const resultsByParty = getResultsByParty(provincialResultsThisYear, currentParty);
			const { color, fullName } = getPartyInformation(currentParty);

			// GSAP Animations for MB Nodes
			if (MBNodes[i]) {
				MBNodes[i].textContent = `${currentParty}`;
				MBNodes[i].title = tooltip(fullName, resultsByParty.count, resultsByParty.percentage);
			}
			if (MBTimelines[i]) {
				MBTimelines[i].to(MBNodes[i], nextState(newScale, color));
			} else {
				MBTimelines[i]?.to(MBNodes[i], prevState());
			}
		}
	}

	// ON Nodes Animations
	function animateONNodes(currentYear) {
		if (!currentYear) return;
		if (!partiesInCurrentYear || partiesInCurrentYear.length === 0) return;
		if (!resultsInCurrentYear || Object.keys(resultsInCurrentYear).length === 0) return;
		const provincialResultsThisYear = getResultInThisProvince(resultsInCurrentYear, 'ON');

		for (let i = 0; NUMBER_OF_NODES > i; ++i) {
			const currentParty = partiesInCurrentYear[i];
			const newScale = calculateScale(provincialResultsThisYear, currentParty);
			const resultsByParty = getResultsByParty(provincialResultsThisYear, currentParty);
			const { color, fullName } = getPartyInformation(currentParty);

			// GSAP Animations for ON Nodes
			if (ONNodes[i]) {
				ONNodes[i].textContent = `${currentParty}`;
				ONNodes[i].title = tooltip(fullName, resultsByParty.count, resultsByParty.percentage);
			}
			if (ONTimelines[i]) {
				ONTimelines[i].to(ONNodes[i], nextState(newScale, color));
			} else {
				ONTimelines[i]?.to(ONNodes[i], prevState());
			}
		}
	}

	// ON Nodes Animations
	function animateQCNodes(currentYear) {
		if (!currentYear) return;
		if (!partiesInCurrentYear || partiesInCurrentYear.length === 0) return;
		if (!resultsInCurrentYear || Object.keys(resultsInCurrentYear).length === 0) return;
		const provincialResultsThisYear = getResultInThisProvince(resultsInCurrentYear, 'QC');

		for (let i = 0; NUMBER_OF_NODES > i; ++i) {
			const currentParty = partiesInCurrentYear[i];
			const newScale = calculateScale(provincialResultsThisYear, currentParty);
			const resultsByParty = getResultsByParty(provincialResultsThisYear, currentParty);
			const { color, fullName } = getPartyInformation(currentParty);

			// GSAP Animations for ON Nodes
			if (QCNodes[i]) {
				QCNodes[i].textContent = `${currentParty}`;
				QCNodes[i].title = tooltip(fullName, resultsByParty.count, resultsByParty.percentage);
			}
			if (QCTimelines[i]) {
				QCTimelines[i].to(QCNodes[i], nextState(newScale, color));
			} else {
				QCTimelines[i]?.to(QCNodes[i], prevState());
			}
		}
	}

	// NB Nodes Animations
	function animateNBNodes(currentYear) {
		if (!currentYear) return;
		if (!partiesInCurrentYear || partiesInCurrentYear.length === 0) return;
		if (!resultsInCurrentYear || Object.keys(resultsInCurrentYear).length === 0) return;
		const provincialResultsThisYear = getResultInThisProvince(resultsInCurrentYear, 'NB');

		for (let i = 0; NUMBER_OF_NODES > i; ++i) {
			const currentParty = partiesInCurrentYear[i];
			const newScale = calculateScale(provincialResultsThisYear, currentParty);
			const resultsByParty = getResultsByParty(provincialResultsThisYear, currentParty);
			const { color, fullName } = getPartyInformation(currentParty);

			// GSAP Animations for ON Nodes
			if (NBNodes[i]) {
				NBNodes[i].textContent = `${currentParty}`;
				NBNodes[i].title = tooltip(fullName, resultsByParty.count, resultsByParty.percentage);
			}
			if (NBTimelines[i]) {
				NBTimelines[i].to(NBNodes[i], nextState(newScale, color));
			} else {
				NBTimelines[i]?.to(NBNodes[i], prevState());
			}
		}
	}

	// NS Nodes Animations
	function animateNSNodes(currentYear) {
		if (!currentYear) return;
		if (!partiesInCurrentYear || partiesInCurrentYear.length === 0) return;
		if (!resultsInCurrentYear || Object.keys(resultsInCurrentYear).length === 0) return;
		const provincialResultsThisYear = getResultInThisProvince(resultsInCurrentYear, 'NS');

		for (let i = 0; NUMBER_OF_NODES > i; ++i) {
			const currentParty = partiesInCurrentYear[i];
			const newScale = calculateScale(provincialResultsThisYear, currentParty);
			const resultsByParty = getResultsByParty(provincialResultsThisYear, currentParty);
			const { color, fullName } = getPartyInformation(currentParty);

			// GSAP Animations for ON Nodes
			if (NSNodes[i]) {
				NSNodes[i].textContent = `${currentParty}`;
				NSNodes[i].title = tooltip(fullName, resultsByParty.count, resultsByParty.percentage);
			}
			if (NSTimelines[i]) {
				NSTimelines[i].to(NSNodes[i], nextState(newScale, color));
			} else {
				NSTimelines[i]?.to(NSNodes[i], prevState());
			}
		}
	}

	// PE Nodes Animations
	function animatePENodes(currentYear) {
		if (!currentYear) return;
		if (!partiesInCurrentYear || partiesInCurrentYear.length === 0) return;
		if (!resultsInCurrentYear || Object.keys(resultsInCurrentYear).length === 0) return;
		const provincialResultsThisYear = getResultInThisProvince(resultsInCurrentYear, 'PE');

		for (let i = 0; NUMBER_OF_NODES > i; ++i) {
			const currentParty = partiesInCurrentYear[i];
			const newScale = calculateScale(provincialResultsThisYear, currentParty);
			const resultsByParty = getResultsByParty(provincialResultsThisYear, currentParty);
			const { color, fullName } = getPartyInformation(currentParty);

			// GSAP Animations for ON Nodes
			if (PENodes[i]) {
				PENodes[i].textContent = `${currentParty}`;
				PENodes[i].title = tooltip(fullName, resultsByParty.count, resultsByParty.percentage);
			}
			if (PETimelines[i]) {
				PETimelines[i].to(PENodes[i], nextState(newScale, color));
			} else {
				PETimelines[i]?.to(PENodes[i], prevState());
			}
		}
	}

	// NL Nodes Animations
	function animateNLNodes(currentYear) {
		if (!currentYear) return;
		if (!partiesInCurrentYear || partiesInCurrentYear.length === 0) return;
		if (!resultsInCurrentYear || Object.keys(resultsInCurrentYear).length === 0) return;
		const provincialResultsThisYear = getResultInThisProvince(resultsInCurrentYear, 'NL');

		for (let i = 0; NUMBER_OF_NODES > i; ++i) {
			const currentParty = partiesInCurrentYear[i];
			const newScale = calculateScale(provincialResultsThisYear, currentParty);
			const resultsByParty = getResultsByParty(provincialResultsThisYear, currentParty);
			const { color, fullName } = getPartyInformation(currentParty);

			// GSAP Animations for ON Nodes
			if (NLNodes[i]) {
				NLNodes[i].textContent = `${currentParty}`;
				NLNodes[i].title = tooltip(fullName, resultsByParty.count, resultsByParty.percentage);
			}
			if (NLTimelines[i]) {
				NLTimelines[i].to(NLNodes[i], nextState(newScale, color));
			} else {
				NLTimelines[i]?.to(NLNodes[i], prevState());
			}
		}
	}

	// YK Nodes Animations
	function animateYKNodes(currentYear) {
		if (!currentYear) return;
		if (!partiesInCurrentYear || partiesInCurrentYear.length === 0) return;
		if (!resultsInCurrentYear || Object.keys(resultsInCurrentYear).length === 0) return;
		const provincialResultsThisYear = getResultInThisProvince(resultsInCurrentYear, 'YK');

		for (let i = 0; NUMBER_OF_NODES > i; ++i) {
			const currentParty = partiesInCurrentYear[i];
			const newScale = calculateScale(provincialResultsThisYear, currentParty);
			const resultsByParty = getResultsByParty(provincialResultsThisYear, currentParty);
			const { color, fullName } = getPartyInformation(currentParty);

			// GSAP Animations for ON Nodes
			if (YKNodes[i]) {
				YKNodes[i].textContent = `${currentParty}`;
				YKNodes[i].title = tooltip(fullName, resultsByParty.count, resultsByParty.percentage);
			}
			if (YKTimelines[i]) {
				YKTimelines[i].to(YKNodes[i], nextState(newScale, color));
			} else {
				YKTimelines[i]?.to(YKNodes[i], prevState());
			}
		}
	}

	// NT Nodes Animations
	function animateNTNodes(currentYear) {
		if (!currentYear) return;
		if (!partiesInCurrentYear || partiesInCurrentYear.length === 0) return;
		if (!resultsInCurrentYear || Object.keys(resultsInCurrentYear).length === 0) return;
		const provincialResultsThisYear = getResultInThisProvince(resultsInCurrentYear, 'NT');

		for (let i = 0; NUMBER_OF_NODES > i; ++i) {
			const currentParty = partiesInCurrentYear[i];
			const newScale = calculateScale(provincialResultsThisYear, currentParty);
			const resultsByParty = getResultsByParty(provincialResultsThisYear, currentParty);
			const { color, fullName } = getPartyInformation(currentParty);

			// GSAP Animations for ON Nodes
			if (NTNodes[i]) {
				NTNodes[i].textContent = `${currentParty}`;
				NTNodes[i].title = tooltip(fullName, resultsByParty.count, resultsByParty.percentage);
			}
			if (NTTimelines[i]) {
				NTTimelines[i].to(NTNodes[i], nextState(newScale, color));
			} else {
				NTTimelines[i]?.to(NTNodes[i], prevState());
			}
		}
	}

	// NU Nodes Animations
	function animateNUNodes(currentYear) {
		if (!currentYear) return;
		if (!partiesInCurrentYear || partiesInCurrentYear.length === 0) return;
		if (!resultsInCurrentYear || Object.keys(resultsInCurrentYear).length === 0) return;
		const provincialResultsThisYear = getResultInThisProvince(resultsInCurrentYear, 'NU');

		for (let i = 0; NUMBER_OF_NODES > i; ++i) {
			const currentParty = partiesInCurrentYear[i];
			const newScale = calculateScale(provincialResultsThisYear, currentParty);
			const resultsByParty = getResultsByParty(provincialResultsThisYear, currentParty);
			const { color, fullName } = getPartyInformation(currentParty);

			// GSAP Animations for ON Nodes
			if (NUNodes[i]) {
				NUNodes[i].textContent = `${currentParty}`;
				NUNodes[i].title = tooltip(fullName, resultsByParty.count, resultsByParty.percentage);
			}
			if (NUTimelines[i]) {
				NUTimelines[i].to(NUNodes[i], nextState(newScale, color));
			} else {
				NUTimelines[i]?.to(NUNodes[i], prevState());
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
	<div
		class="bg-drop absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center"
		style="background-image:url({parliamentBg})"
	></div>
	<!-- <div class="bg-filter absolute top-0 left-0 w-full h-full bg-black opacity-95"></div> -->
	<!-- <div class="z-10">Don</div> -->
	<div class="min-h-screen flex flex-col justify-between relative z-10">
		<header class="p-4 py-10 pt-12 text-center">
			<h1 class="font-playfair-display font-bold text-3xl md:text-5xl">
				Changing Colors of Canada
			</h1>
			<p class="font-cormorant font-light text-2xl md:text-3xl">
				Explore how each province or territory has voted through the years.
			</p>
		</header>
		<div class="flex-1">
			<div class="h-full flex flex-col md:flex-row">
				<aside class="flex py-5 px-5 md:block md:w-[170px] max-h-screen overflow-y-auto">
					{#each electionYears as year}
						<ElectionYearButton {year} {currentYear} on:click={() => changeYearHandler(year)} />
					{/each}
				</aside>
				<main class="flex-1">
					<div class="max-w-[1000px] m-auto h-full flex flex-col justify-start">
						<div class="flex flex-row flex-wrap justify-center items-center px-5 py-2">
							{#each partiesInCurrentYear as party, i}
								{#if party}
									{@const { color, fullName } = getPartyInformation(party)}
									<div class="text-sm mr-5 mb-2 flex flex-row justify-center items-center">
										<div class="w-7 h-7 mr-1" style:background-color={color}></div>
										<div>{party} - {fullName}</div>
									</div>
								{/if}
							{/each}
						</div>
						<div class="relative">
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

							<!-- AB Nodes -->
							<div class="prov" id="AB">
								<div class="node node-1" bind:this={ABNode0}></div>
								<div class="node node-2" bind:this={ABNode1}></div>
								<div class="node node-3" bind:this={ABNode2}></div>
								<div class="node node-4" bind:this={ABNode3}></div>
								<div class="node node-5" bind:this={ABNode4}></div>
								<div class="node node-5" bind:this={ABNode5}></div>
								<div class="w-full bg-slate-900 text-center z-10">AB</div>
							</div>

							<!-- SK Nodes -->
							<div class="prov" id="SK">
								<div class="node node-1" bind:this={SKNode0}></div>
								<div class="node node-2" bind:this={SKNode1}></div>
								<div class="node node-3" bind:this={SKNode2}></div>
								<div class="node node-4" bind:this={SKNode3}></div>
								<div class="node node-5" bind:this={SKNode4}></div>
								<div class="node node-5" bind:this={SKNode5}></div>
								<div class="w-full bg-slate-900 text-center z-10">SK</div>
							</div>

							<!-- MB Nodes -->
							<div class="prov" id="MB">
								<div class="node node-1" bind:this={MBNode0}></div>
								<div class="node node-2" bind:this={MBNode1}></div>
								<div class="node node-3" bind:this={MBNode2}></div>
								<div class="node node-4" bind:this={MBNode3}></div>
								<div class="node node-5" bind:this={MBNode4}></div>
								<div class="node node-5" bind:this={MBNode5}></div>
								<div class="w-full bg-slate-900 text-center z-10">MB</div>
							</div>

							<!-- ON Nodes -->
							<div class="prov" id="ON">
								<div class="node node-1" bind:this={ONNode0}></div>
								<div class="node node-2" bind:this={ONNode1}></div>
								<div class="node node-3" bind:this={ONNode2}></div>
								<div class="node node-4" bind:this={ONNode3}></div>
								<div class="node node-5" bind:this={ONNode4}></div>
								<div class="node node-5" bind:this={ONNode5}></div>
								<div class="w-full bg-slate-900 text-center z-10">ON</div>
							</div>

							<!-- QC Nodes -->
							<div class="prov" id="QC">
								<div class="node node-1" bind:this={QCNode0}></div>
								<div class="node node-2" bind:this={QCNode1}></div>
								<div class="node node-3" bind:this={QCNode2}></div>
								<div class="node node-4" bind:this={QCNode3}></div>
								<div class="node node-5" bind:this={QCNode4}></div>
								<div class="node node-5" bind:this={QCNode5}></div>
								<div class="w-full bg-slate-900 text-center z-10">QC</div>
							</div>

							<!-- NB Nodes -->
							<div class="prov" id="NB">
								<div class="node node-1" bind:this={NBNode0}></div>
								<div class="node node-2" bind:this={NBNode1}></div>
								<div class="node node-3" bind:this={NBNode2}></div>
								<div class="node node-4" bind:this={NBNode3}></div>
								<div class="node node-5" bind:this={NBNode4}></div>
								<div class="node node-5" bind:this={NBNode5}></div>
								<div class="w-full bg-slate-900 text-center z-10">NB</div>
							</div>

							<!-- NS Nodes -->
							<div class="prov" id="NS">
								<div class="node node-1" bind:this={NSNode0}></div>
								<div class="node node-2" bind:this={NSNode1}></div>
								<div class="node node-3" bind:this={NSNode2}></div>
								<div class="node node-4" bind:this={NSNode3}></div>
								<div class="node node-5" bind:this={NSNode4}></div>
								<div class="node node-5" bind:this={NSNode5}></div>
								<div class="w-full bg-slate-900 text-center z-10">NS</div>
							</div>

							<!-- PE Nodes -->
							<div class="prov" id="PE">
								<div class="node node-1" bind:this={PENode0}></div>
								<div class="node node-2" bind:this={PENode1}></div>
								<div class="node node-3" bind:this={PENode2}></div>
								<div class="node node-4" bind:this={PENode3}></div>
								<div class="node node-5" bind:this={PENode4}></div>
								<div class="node node-5" bind:this={PENode5}></div>
								<div class="w-full bg-slate-900 text-center z-10">PE</div>
							</div>

							<!-- NL Nodes -->
							<div class="prov" id="NL">
								<div class="node node-1" bind:this={NLNode0}></div>
								<div class="node node-2" bind:this={NLNode1}></div>
								<div class="node node-3" bind:this={NLNode2}></div>
								<div class="node node-4" bind:this={NLNode3}></div>
								<div class="node node-5" bind:this={NLNode4}></div>
								<div class="node node-5" bind:this={NLNode5}></div>
								<div class="w-full bg-slate-900 text-center z-10">NL</div>
							</div>

							<!-- YK Nodes -->
							<div class="prov" id="YK">
								<div class="node node-1" bind:this={YKNode0}></div>
								<div class="node node-2" bind:this={YKNode1}></div>
								<div class="node node-3" bind:this={YKNode2}></div>
								<div class="node node-4" bind:this={YKNode3}></div>
								<div class="node node-5" bind:this={YKNode4}></div>
								<div class="node node-5" bind:this={YKNode5}></div>
								<div class="w-full bg-slate-900 text-center z-10">YK</div>
							</div>

							<!-- NT Nodes -->
							<div class="prov" id="NT">
								<div class="node node-1" bind:this={NTNode0}></div>
								<div class="node node-2" bind:this={NTNode1}></div>
								<div class="node node-3" bind:this={NTNode2}></div>
								<div class="node node-4" bind:this={NTNode3}></div>
								<div class="node node-5" bind:this={NTNode4}></div>
								<div class="node node-5" bind:this={NTNode5}></div>
								<div class="w-full bg-slate-900 text-center z-10">NT</div>
							</div>

							<!-- NU Nodes -->
							<div class="prov" id="NU">
								<div class="node node-1" bind:this={NUNode0}></div>
								<div class="node node-2" bind:this={NUNode1}></div>
								<div class="node node-3" bind:this={NUNode2}></div>
								<div class="node node-4" bind:this={NUNode3}></div>
								<div class="node node-5" bind:this={NUNode4}></div>
								<div class="node node-5" bind:this={NUNode5}></div>
								<div class="w-full bg-slate-900 text-center z-10">NU</div>
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
		filter: opacity(15%);
	}
</style>
