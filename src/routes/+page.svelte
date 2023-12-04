<script>
	import parliamentBg from '$lib/images/parliament-bg.jpg';
	import Map from '$lib/graphics/Map.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div id="home" class="min-h-screen text-white relative">
	<div class="bg-drop absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center" style="background-image:url({parliamentBg})"></div>
	<!-- <div class="bg-filter absolute top-0 left-0 w-full h-full bg-black opacity-95"></div> -->
	<!-- <div class="z-10">Don</div> -->
	<div class="min-h-screen bg-blue-300 flex flex-col justify-between">
		<header class="bg-lime-200">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam harum voluptate laudantium fugiat quos deserunt, neque iusto iure voluptas. Sunt soluta deserunt esse sed alias placeat voluptate similique veniam in!
		</header>
		<div class="bg-pink-100 flex-1">
			<div class="h-full flex flex-col md:flex-row bg-lime-700">
				<aside class="md:w-[230px] bg-red-300">
					{#each Array(10) as _}
						<div class="p-3 mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</div>
					{/each}
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur enim aliquam beatae similique incidunt earum, ratione, facere architecto atque ducimus eos quia sapiente necessitatibus voluptate ullam. Dignissimos minus animi quod.
				</aside>
				<main class="flex-1 bg-indigo-400">
					<div class="max-w-[1100px] m-auto">
						<Map />
					</div>
				</main>
			</div>
			
		</div>
		<footer class="bg-slate-500">
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, architecto non. Dolor aliquid voluptatibus et ex obcaecati ratione architecto enim dolorem voluptatum corporis consectetur impedit odit iure odio, sit autem?
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

