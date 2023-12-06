<script>
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	export let provCode = 'AB';
	export let provName = 'Alberta';
	export let partiesInCurrentYear = [];
	export let currentYear = "1867";
	export let provincialResults = {};
	export let partiesRunning = [];

	$:finalPartiesRunning = partiesRunning?.map((party, index) => ({ id: index, party }) )
	$:console.log('finalPartiesRunning', finalPartiesRunning)
	const MAX_NODE_HEIGHT = 2;

	let tlNode0 = gsap.timeline();
	let tlNode1 = gsap.timeline();
	let tlNode2 = gsap.timeline();
	let tlNode3 = gsap.timeline();
	let tlNode4 = gsap.timeline();
	let tlNode5 = gsap.timeline();

	let node0, node1, node2, node3, node4, node5;
	let nodes = [node0, node1, node2, node3, node4, node5]
	

	function calculateScale(partiesRunningIndex) {
		const percentage = provincialResults[partiesRunning[partiesRunningIndex]]?.percentage ?? 0;
		// return Math.round((percentage / 100) * MAX_NODE_HEIGHT);
		return ((percentage / 100) * MAX_NODE_HEIGHT);
	}


	onMount(() => {
		// console.log('mount prov')
		// partiesRunning = partiesRunning.map((party, index) => ({ id: index, party }) )
		// console.log('partiesRunning', partiesRunning)
		// console.log('provCode', provCode)
		console.log(provName, provincialResults)
		// console.log("partiesRunning", partiesRunning.map((party, index) => ({ id: index, party }) ));

		// console.log('partiesRunning', partiesRunning)
		// partySeats = results.filter(result => result.prov === provCode)[seats];

		// tlNode1 = gsap.timeline();
		// tlNode2 = gsap.timeline();
		// tlNode3 = gsap.timeline();
		// tlNode4 = gsap.timeline();
		// tlNode5 = gsap.timeline();
		// tlNode6 = gsap.timeline();

		// console.log('========= prov nodes ===========');
		// console.log('========= prov nodes ===========');
		// console.log('I am mounted prov node ', provCode);
		// console.log("node1", node1.getAttribute("class"));
		// for(let i = 0; 6 >= i; ++i) {
		// 	tlNode1.to(nodes[i], { duration: 0.5, height: 70, width: 70 });
		// }
		
		if(partiesRunning[0]) {
			const scale = calculateScale(0);
			console.log(scale)
			tlNode0.to(node0, { duration: 0.5, scale: scale});
		}
		if(partiesRunning[1]) {
			const scale = calculateScale(1);
			tlNode1.to(node1, { duration: 0.5, scale: scale });
		}
		if(partiesRunning[2]) {
			const scale = calculateScale(2);
			tlNode2.to(node2, { duration: 0.5, scale: scale });
		}
		if(partiesRunning[3]) {
			const scale = calculateScale(3);
			tlNode3.to(node3, { duration: 0.5, scale: scale });
		}
		if(partiesRunning[4]) {
			const scale = calculateScale(4);
			tlNode4.to(node4, { duration: 0.5, scale: scale });
		}
		if(partiesRunning[5]) {
			const scale = calculateScale(5);
			tlNode5.to(node5, { duration: 0.5, scale: scale });
		}

		// tlNode1.to(node1, { duration: 0.5, height: 0 });
		// tlNode2.to(node2, { duration: 0.5, height: 0 });
		// tlNode3.to(node3, { duration: 0.5, height: 0 });
		// tlNode4.to(node4, { duration: 0.5, height: 0 });
		// tlNode5.to(node5, { duration: 0.5, height: 0 });

	});
</script>

<div class="prov" id={provCode}>
		<!-- {#each finalPartiesRunning as {id, party}, i }
			<div class="node node-1 bg-red-400" bind:this={node1}>{i}</div>
		{/each} -->
	
	<div class="node node-1 bg-red-400" bind:this={node0}>1</div>
	 <div class="node node-2 bg-blue-400" bind:this={node1}>2</div>
	<!-- <div class="node node-3 bg-yellow-400" bind:this={node2}>3</div> -->
	<!-- <div class="node node-4 bg-orange-400" bind:this={node3}>4</div> -->
	<!-- <div class="node node-5 bg-violet-400" bind:this={node4}>5</div> -->
	<!-- <div class="node node-5 bg-green-400" bind:this={node5}>6</div> -->
	<!-- <div class="w-full bg-slate-600 text-center">{provCode}</div>  -->
</div>
