<script lang="ts">
	import { page } from '$app/stores';
	import { Menu } from 'lucide-svelte';

	const menuItems = [
		{ href: '/', text: 'Home' },
		{ href: '/reasons', text: 'History' }
	];

	let isOpen = false;

	function toggleMenu() {
		isOpen = !isOpen;
	}
</script>

<header>
	<div class="navbar bg-base-100">
		<div class="navbar-start">
			<div class="dropdown">
				<button class="btn btn-ghost lg:hidden" on:click={toggleMenu}>
					<Menu />
				</button>
				{#if isOpen}
					<ul
						class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					>
						{#each menuItems as menuItem}
							<li><a href={menuItem.href}>{menuItem.text}</a></li>
						{/each}
					</ul>
				{/if}
			</div>
			<a href="/" class="btn btn-ghost normal-case text-xl">NotMyProblem</a>
		</div>
		<div class="navbar-center hidden lg:flex">
			<ul class="menu menu-horizontal px-1">
				{#each menuItems as menuItem}
					<li><a href={menuItem.href}>{menuItem.text}</a></li>
				{/each}
			</ul>
		</div>
		<div class="navbar-end">
			<!-- <a href="/get-started" class="btn">Get started</a> -->
		</div>
	</div>
</header>
