<script>
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	export let provCode = 'AB';
	export let provName = 'Alberta';

	let tlNode1 = gsap.timeline();
	let tlNode2 = gsap.timeline();
	let tlNode3 = gsap.timeline();
	let tlNode4 = gsap.timeline();
	let tlNode5 = gsap.timeline();
	let tlNode6 = gsap.timeline();

	let node1, node2, node3, node4, node5, node6;

	onMount(() => {
		console.log("========= prov nodes ===========")
		console.log("========= prov nodes ===========")
		// console.log('I am mounted prov node ', provCode);
		// console.log("node1", node1.getAttribute("class"));
	});
</script>

<div class="prov" id={provCode}>
	<div class="node node-1 bg-red-400" bind:this={node1}>1</div>
	<div class="node node-2 bg-blue-400" bind:this={node2}>2</div>
	<div class="node node-3 bg-yellow-400" bind:this={node3}>3</div>
	<div class="node node-4 bg-orange-400" bind:this={node4}>4</div>
	<div class="node node-5 bg-violet-400" bind:this={node5}>5</div>
	<div class="node node-5 bg-green-400" bind:this={node6}>6</div>
	<div class="w-full bg-slate-600 text-center">{provCode}</div>
</div>
