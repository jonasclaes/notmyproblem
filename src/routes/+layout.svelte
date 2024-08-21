<script>
	import '../app.css';
	import Header from './Header.svelte';
</script>

<div>
	<Header />

	<main>
		<slot />
	</main>

	<footer class="footer footer-center bg-neutral text-neutral-content p-4">
		<aside>
			<p>
				A project by <a href="https://jonasclaes.be" target="_blank" class="text-blue-400"
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
