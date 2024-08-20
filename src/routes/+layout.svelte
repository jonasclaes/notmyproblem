<script>
	import '../app.css';
	import Header from './Header.svelte';
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
