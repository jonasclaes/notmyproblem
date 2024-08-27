<script lang="ts">
	let errorDialog: HTMLDialogElement;
	let dialog: HTMLDialogElement;
	let dialogReason = '';
	let dialogReasonLoading = false;

	const toTitleCase = (text: string): string => {
		const firstPart = text.slice(0, 1);
		const secondPart = text.slice(1);
		return `${firstPart.toUpperCase()}${secondPart}`;
	};

	const fetchNotMyProblem = async () => {
		if (dialogReasonLoading) return;
		try {
			dialogReasonLoading = true;
			const response = await fetch('/api/v1/notmyproblem');

			if (response.status !== 201) throw new Error(await response.text());

			const body: { data: { reason: string } } = await response.json();

			dialogReason = `${toTitleCase(body.data.reason)}`;
			dialog.showModal();
		} catch (error) {
			console.error(error);
			errorDialog.showModal();
		} finally {
			dialogReasonLoading = false;
		}
	};
</script>

<svelte:head>
	<title>NotMyProblem | AI-Powered Excuse Generator</title>
	<meta
		name="description"
		content="Generate hilarious, AI-powered reasons why something isn't your problem. Perfect for dodging responsibility with a touch of humor."
	/>
	<meta
		name="keywords"
		content="AI excuse generator, satire website, not my problem, humor, responsibility dodging"
	/>
	<link rel="canonical" href="https://notmyproblem.cloud" />

	<!-- Open Graph tags for social media sharing -->
	<meta property="og:title" content="NotMyProblem - AI Excuse Generator" />
	<meta
		property="og:description"
		content="Let AI help you humorously explain why it's not your problem. Visit NotMyProblem.cloud for endless excuses!"
	/>
	<meta property="og:url" content="https://notmyproblem.cloud" />
	<meta property="og:type" content="website" />

	<!-- Twitter Card tags -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="NotMyProblem - AI-Powered Excuse Generator" />
	<meta
		name="twitter:description"
		content="Generate hilarious, AI-powered reasons why something isn't your problem. Dodge responsibility with style!"
	/>
</svelte:head>

<section>
	<div class="hero bg-base-200 min-h-screen">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">NotMyProblem</h1>
				<p class="pt-6">
					This description is really not my problem. Figure it out yourself. Want to see the 1000+
					reasons others got before you? Go check the <a href="/reasons" class="text-blue-500"
						>history</a
					> page!
				</p>
				<div class="pt-6">
					<button
						class="btn btn-primary text-neutral-100 px-12 plausible-event-name=Reason+Generations"
						on:click={() => fetchNotMyProblem()}
					>
						{#if dialogReasonLoading}
							<span class="loading loading-spinner loading-md"></span>
						{:else}
							Not my problem!
						{/if}
					</button>
				</div>
				<p class="font-mono pt-24">
					Try out the API at <a href="/api/v1/notmyproblem" class="text-blue-500"
						>/api/v1/notmyproblem</a
					>
				</p>
			</div>
		</div>
	</div>
</section>

<dialog class="modal" bind:this={errorDialog}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Oops, an error occurred!</h3>
		<p class="py-4">An error occurred whilst generating a reason... Oh well, not my problem!</p>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<dialog class="modal" bind:this={dialog}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Not my problem!</h3>
		<p class="py-4">{dialogReason}</p>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
