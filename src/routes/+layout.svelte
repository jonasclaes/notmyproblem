<script lang="ts">
	import '../app.css';
	import Shell from '$lib/components/Shell.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	const menuItems: { href: string; text: string }[] = [
		{ href: '/', text: 'Home' },
		{ href: '/reasons', text: 'History' }
	];
</script>

<svelte:head>
	<script
		defer
		data-domain="notmyproblem.cloud"
		src="https://plausible.jonasclaes.be/js/script.tagged-events.js"
	></script>
</svelte:head>

<div>
	<Shell {menuItems}>
		<Header />

		<main>
			<slot />
		</main>

		<Footer />
	</Shell>
</div>
