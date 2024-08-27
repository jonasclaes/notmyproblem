<script lang="ts">
	import NotMyProblemCard from '$lib/components/NotMyProblemCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>NotMyProblem! #{data.reason.id}</title>
	<meta name="description" content={data.reason.reason} />
	<meta
		name="keywords"
		content="{data.reason.reason
			.split(' ')
			.join(
				', '
			)}, AI excuses, excuse archive, not my problem reasons, humorous excuses, responsibility avoidance"
	/>
	<link rel="canonical" href="https://notmyproblem.cloud/reasons/{data.reason.id}" />

	<!-- Open Graph tags for social media sharing -->
	<meta property="og:title" content="NotMyProblem! #{data.reason.id}" />
	<meta property="og:description" content={data.reason.reason} />
	<meta property="og:url" content="https://notmyproblem.cloud/reasons/{data.reason.id}" />
	<meta property="og:type" content="website" />

	<!-- Twitter Card tags -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="NotMyProblem! #{data.reason.id}" />
	<meta name="twitter:description" content={data.reason.reason} />
</svelte:head>

<section class="min-h-screen bg-base-200 flex flex-col justify-center items-center">
	<div class="p-4 max-w-xxl">
		<NotMyProblemCard notMyProblem={data.reason} />
	</div>
</section>
