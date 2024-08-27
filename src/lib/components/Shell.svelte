<script lang="ts" context="module">
	export type ShellContext = {
		menuItems: { href: string; text: string }[];
		toggleDrawer: () => void;
	};

	export const shellContextName = 'shellContext';
</script>

<script lang="ts">
	import { setContext } from 'svelte';

	let isDrawerOpen = false;

	export let menuItems: { href: string; text: string }[];

	const toggleDrawer = () => {
		isDrawerOpen = !isDrawerOpen;
	};

	setContext<ShellContext>(shellContextName, {
		menuItems,
		toggleDrawer
	});
</script>

<div class="drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={isDrawerOpen} />
	<div class="drawer-content">
		<slot />
	</div>
	<div class="drawer-side">
		<label for="my-drawer" class="drawer-overlay"></label>
		<ul class="menu p-4 w-80 h-full bg-base-200">
			<li>
				<p class="normal-case text-xl">NotMyProblem</p>
			</li>
			{#each menuItems as item}
				<li><a href={item.href} on:click={toggleDrawer}>{item.text}</a></li>
			{/each}
		</ul>
	</div>
</div>
