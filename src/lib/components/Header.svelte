<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import { type ShellContext, shellContextName } from './Shell.svelte';

	export let toggleDrawer = getContext<ShellContext>(shellContextName).toggleDrawer;
	export let menuItems = getContext<ShellContext>(shellContextName).menuItems;
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<button class="btn btn-ghost drawer-button lg:hidden" on:click={() => toggleDrawer()}>
			<Menu />
		</button>
		<a href="/" class="btn btn-ghost normal-case text-xl">NotMyProblem</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			{#each menuItems as item}
				<li><a href={item.href}>{item.text}</a></li>
			{/each}
		</ul>
	</div>
	<div class="navbar-end">
		<!-- <a href="/get-started" class="btn">Get started</a> -->
	</div>
</div>
