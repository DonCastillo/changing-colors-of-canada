<script>
	import { getParties, getProvinces } from '$lib/functions/data.js';
	import parliamentBg from '$lib/images/parliament-bg.jpg';
	import Map from '$lib/graphics/Map.svelte';
	import ProvNodes from '$lib/components/ProvNodes.svelte';

	const provinces = getProvinces();
	const parties = getParties();
	console.log('provinces', provinces);
	console.log('parties', parties);
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
				<aside class="md:w-[230px] bg-red-300">
					{#each Array(20) as _}
						<div class="px-3 mb-1">1999</div>
					{/each}
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur enim aliquam beatae similique
					incidunt earum, ratione, facere architecto atque ducimus eos quia sapiente necessitatibus voluptate
					ullam. Dignissimos minus animi quod.
				</aside>
				<main class="flex-1 bg-indigo-400">
					<div class="max-w-[1500px] m-auto h-full flex flex-col justify-center bg-amber-100">
						<div class="bg-amber-100 relative">
							<Map />
							{#each provinces as province}
								<ProvNodes provCode={province.code} provName={province.name} />
							{/each}
							<!-- <div class="prov" id="BC">
								<div class="node node-1 bg-red-400">1</div>
								<div class="node node-2 bg-blue-400">2</div>
								<div class="node node-3 bg-yellow-400">3</div>
								<div class="node node-4 bg-orange-400">4</div>
								<div class="node node-5 bg-violet-400">5</div>
								<div>BC</div>
							</div>

							<div class="prov" id="AB">
								<div class="node node-1 bg-red-400">1</div>
								<div class="node node-2 bg-blue-400">2</div>
								<div class="node node-3 bg-yellow-400">3</div>
								<div class="node node-4 bg-orange-400">4</div>
								<div class="node node-5 bg-violet-400">5</div>
							</div>

							<div class="prov" id="SK">
								<div class="node node-1 bg-red-400">1</div>
								<div class="node node-2 bg-blue-400">2</div>
								<div class="node node-3 bg-yellow-400">3</div>
								<div class="node node-4 bg-orange-400">4</div>
								<div class="node node-5 bg-violet-400">5</div>
							</div>

							<div class="prov" id="MB">
								<div class="node node-1 bg-red-400">1</div>
								<div class="node node-2 bg-blue-400">2</div>
								<div class="node node-3 bg-yellow-400">3</div>
								<div class="node node-4 bg-orange-400">4</div>
								<div class="node node-5 bg-violet-400">5</div>
							</div> -->
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
