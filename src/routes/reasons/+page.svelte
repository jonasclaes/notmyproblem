<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let errorDialog: HTMLDialogElement;
	let moreResultsLoading = false;
	const reasons = writable<{ id: number; status: string; reason: string }[]>([]);
	let moreReasonsAvailable = true;

	let observerTarget: HTMLDivElement;

	const toTitleCase = (text: string): string => {
		const firstPart = text.slice(0, 1);
		const secondPart = text.slice(1);
		return `${firstPart.toUpperCase()}${secondPart}`;
	};

	const fetchReasons = async (cursor?: number) => {
		if (moreResultsLoading) return;
		try {
			moreResultsLoading = true;
			const url = new URL($page.url);
			url.pathname = '/api/v1/reasons';
			if (cursor) url.searchParams.set('cursor', cursor.toString());

			const response = await fetch(url.pathname + url.search);

			if (response.status !== 200) throw new Error(await response.text());

			const body: {
				data: { id: number; status: string; reason: string }[];
				size: number;
				limit: number;
			} = await response.json();

			if (body.size !== body.limit) moreReasonsAvailable = false;

			reasons.update((value) => {
				return [...value, ...body.data.map((obj) => ({ ...obj, reason: toTitleCase(obj.reason) }))];
			});
		} catch (error) {
			console.error(error);
			errorDialog.showModal();
		} finally {
			moreResultsLoading = false;
		}
	};

	onMount(() => {
		fetchReasons();

		const observer = new IntersectionObserver(
			(entries) => {
				const first = entries[0];
				if (first.isIntersecting) {
					fetchReasons($reasons[$reasons.length - 1].id ?? 0);
				}
			},
			{
				root: null, // Use the viewport as the root
				rootMargin: '0px',
				threshold: 1.0
			}
		);

		if (observerTarget) {
			observer.observe(observerTarget);
		}

		return () => {
			if (observerTarget) {
				observer.unobserve(observerTarget);
			}
		};
	});
</script>

<svelte:head>
	<title>NotMyProblem - History</title>
	<meta name="description" content="NotMyProblem History" />
</svelte:head>

<section>
	<div class="hero bg-base-200 py-32">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">History</h1>
				<p class="pt-6">This became more popular than expected... Have fun reading!</p>
			</div>
		</div>
	</div>
	<div class="p-4 bg-base-200">
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" bind:this={observerTarget}>
			{#each $reasons as reason}
				<div class="card bg-base-100 shadow-xl text-wrap">
					<div class="card-body">
						<h2 class="card-title">{reason.status}!</h2>
						<p>{reason.reason}</p>
					</div>
				</div>
			{/each}
		</div>

		<div class="flex justify-center pt-12 pb-8">
			{#if moreReasonsAvailable}
				<button
					class="btn btn-primary text-neutral-100 px-12 plausible-event-name=More+Reasons+Clicks"
					on:click={() => fetchReasons($reasons[$reasons.length - 1].id)}
				>
					{#if moreResultsLoading}
						<span class="loading loading-spinner loading-md"></span>
					{:else}
						Get more reasons!
					{/if}
				</button>
			{:else}
				<p>You've reached the end! Come back soon for more!</p>
			{/if}
		</div>
	</div>
</section>

<dialog class="modal" bind:this={errorDialog}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Oops, an error occurred!</h3>
		<p class="py-4">An error occurred whilst getting the reasons... Oh well, not my problem!</p>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
