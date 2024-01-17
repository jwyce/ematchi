<script lang="ts">
	import { get_twemoji_url } from './utils';
	import { receive } from './transistions';

	export let found: string[];
</script>

<div class="found">
	{#each found as emoji (emoji)}
		<div class="pair">
			<img alt={emoji} src={get_twemoji_url(emoji)} in:receive={{ key: `${emoji}:a` }} />
			<img alt={emoji} src={get_twemoji_url(emoji)} in:receive={{ key: `${emoji}:b` }} />
		</div>
	{/each}
</div>

<style>
	img {
		height: 4em;
		width: 4em;
		position: absolute;
	}

	.pair {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 6em;
		width: 6em;
	}

	.found {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
		height: 100%;
		filter: drop-shadow(0.2em 0.2em 0.5em rgba(0, 0, 0, 0.2));
	}
</style>
