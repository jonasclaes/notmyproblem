<script lang="ts">
	import { page } from '$app/stores';
	import NotMyProblemCard from '$lib/components/NotMyProblemCard.svelte';
	import { onMount } from 'svelte';

	let errorDialog: HTMLDialogElement;
	let reasonLoading = false;
	let reason: { id: number; status: string; reason: string };

	const toTitleCase = (text: string): string => {
		const firstPart = text.slice(0, 1);
		const secondPart = text.slice(1);
		return `${firstPart.toUpperCase()}${secondPart}`;
	};

	const fetchReason = async (id: string) => {
		if (reasonLoading) return;

		try {
			reasonLoading = true;
			const url = new URL($page.url);
			url.pathname = `/api/v1/reasons/${id}`;

			const response = await fetch(url.pathname + url.search);

			if (response.status !== 200) throw new Error(await response.text());

			const body: {
				data: { id: number; status: string; reason: string };
			} = await response.json();

			reason = {
				...body.data,
				reason: toTitleCase(body.data.reason)
			};
		} catch (error) {
			console.error(error);
			errorDialog.showModal();
		} finally {
			reasonLoading = false;
		}
	};

	onMount(() => {
		fetchReason($page.params.id);
	});
</script>

<svelte:head>
	<title>NotMyProblem | AI-Generated Excuses Archive</title>
	<meta
		name="description"
		content="Explore our extensive archive of AI-generated excuses. Find the perfect reason why it's not your problem, backed by artificial intelligence!"
	/>
	<meta
		name="keywords"
		content="AI excuses, excuse archive, not my problem reasons, humorous excuses, responsibility avoidance"
	/>
	<link rel="canonical" href="https://notmyproblem.cloud/reasons" />

	<!-- Open Graph tags for social media sharing -->
	<meta property="og:title" content="NotMyProblem | AI Excuse Archive" />
	<meta
		property="og:description"
		content="Dive into our treasure trove of AI-generated excuses. Browse, laugh, and find the perfect reason why it's absolutely not your problem!"
	/>
	<meta property="og:url" content="https://notmyproblem.cloud/reasons" />
	<meta property="og:type" content="website" />

	<!-- Twitter Card tags -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="NotMyProblem | AI-Generated Excuse Archive" />
	<meta
		name="twitter:description"
		content="Explore our vast collection of AI-crafted excuses. Find the ultimate reason why it's not your responsibility!"
	/>

	<!-- Structured Data for Rich Snippets -->
	<script type="application/ld+json">
		{
			"@context": "http://schema.org",
			"@type": "WebPage",
			"name": "AI-Generated Excuses Archive",
			"description": "A comprehensive collection of AI-generated excuses and reasons why something is not your problem.",
			"url": "https://notmyproblem.cloud/reasons"
		}
	</script>
</svelte:head>

<section class="min-h-screen bg-base-200 flex flex-col justify-center items-center">
	<div class="p-4 max-w-xxl">
		{#if reason}
			<NotMyProblemCard notMyProblem={reason} />
		{/if}
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
