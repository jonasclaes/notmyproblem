<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>A project by <a href="https://jonasclaes.be" target="_blank">Jonas Claes</a>.</p>
	</footer>
</div>
