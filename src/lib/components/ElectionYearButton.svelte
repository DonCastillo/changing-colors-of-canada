<script>
	export let year = '1867';
	export let currentYear = '1867';
	let hoverColor = 'bg-gray-200';
	let active = year === currentYear;
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<button
	on:click
	on:mouseover={() => console.log('Don')}
	class="block w-full py-2 px-2 mb-1 mr-5 md:mr-0 {currentYear === year ? 'bg-yellow-700 text-white' : ''}"
>
	{year}
</button>
