<script lang="ts">
	let dialog: HTMLDialogElement;
	let dialogReason = '';
	let dialogReasonLoading = false;

	const fetchNotMyProblem = async () => {
		if (dialogReasonLoading) return;
		try {
			dialogReasonLoading = true;
			const response = await fetch('/api/v1/notmyproblem');
			const body = await response.json();
			dialogReason = body.reason;
			dialog.showModal();
		} catch (error) {
			console.error(error);
		} finally {
			dialogReasonLoading = false;
		}
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="hero bg-base-200 min-h-screen">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">NotMyProblem</h1>
				<p class="pt-6">This description is really not my problem. Figure it out yourself.</p>
				<div class="pt-6">
					<button
						class="btn btn-primary text-neutral-100 px-12"
						on:click={() => fetchNotMyProblem()}
					>
						{#if dialogReasonLoading}
							<span class="loading loading-spinner loading-md"></span>
						{:else}
							Not my problem
						{/if}
					</button>
				</div>
				<pre class="pt-24">Try out the API at <a href="/api/v1/notmyproblem" class="text-blue-500"
						>/api/v1/notmyproblem</a
					></pre>
			</div>
		</div>
	</div>
</section>

<dialog id="my_modal_2" class="modal" bind:this={dialog}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Not my problem!</h3>
		<p class="py-4">{dialogReason}</p>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
