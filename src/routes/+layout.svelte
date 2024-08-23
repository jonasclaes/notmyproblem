<script>
	import '../app.css';
	import Header from './Header.svelte';
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

	<footer class="footer footer-center bg-neutral text-neutral-content p-4">
		<aside>
			<p>
				A project by <a href="https://jonasclaes.be/?utm_source=notmyproblem.cloud&utm_medium=referral&utm_campaign=site_referral&utm_content=footer" target="_blank" class="text-blue-400"
					>Jonas Claes</a
				>.
			</p>
			<p>Inspired by Martijn Degrève.</p>
			<p>
				Check out the code over at <a
					href="https://github.com/jonasclaes/notmyproblem"
					target="_blank"
					class="text-blue-400">jonasclaes/notmyproblem</a
				>.
			</p>
			<p>Copyright © {new Date().getFullYear()}</p>
		</aside>
	</footer>
</div>
