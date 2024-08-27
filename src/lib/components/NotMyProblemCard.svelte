<script lang="ts">
	export let notMyProblem: { id: number; status: string; reason: string };
</script>

<div class="card bg-base-100 shadow-xl text-wrap">
	<div class="card-body">
		<h2 class="card-title">
			{notMyProblem.status}! <span class="opacity-30 font-mono">#{notMyProblem.id}</span>
		</h2>
		<p>{notMyProblem.reason}</p>
	</div>
</div>
