<script lang="ts">
	import { page } from '$app/stores';
</script>

<section>
	<div class="hero bg-base-200 min-h-screen">
		<div class="hero-content text-center">
			<div class="max-w-xxl">
				<h1 class="text-5xl font-bold">Error {$page.status}: {$page.error?.message}</h1>
				<p class="pt-6">
					{#if $page.status === 404}
						You could say that this is really not my problem...
					{:else}
						Well... it looks like this might be my problem after all...
					{/if}
				</p>
			</div>
		</div>
	</div>
</section>
