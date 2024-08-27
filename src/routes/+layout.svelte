<script>
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
	<script
		defer
		data-domain="notmyproblem.cloud"
		src="https://plausible.jonasclaes.be/js/script.tagged-events.js"
	></script>
</svelte:head>

<div>
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
</div>
