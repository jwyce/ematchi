<script lang="ts">
	import { get_twemoji_url } from './utils';
	import { send } from './transistions';

	export let emoji: string;
	export let selected: boolean;
	export let found: boolean;
	export let group: 'a' | 'b';
</script>

<div class="square" class:flipped={selected || found}>
	<button on:click />
	<div class="background" style="--color: {found ? '#444' : 'blueviolet'}" />

	{#if !found}
		<img alt={emoji} src={get_twemoji_url(emoji)} out:send={{ key: `${emoji}:${group}` }} />
	{/if}
</div>

<style>
	.square {
		display: flex;
		justify-content: center;
		align-items: center;
		transform-style: preserve-3d;
		transition: transform 0.4s;
	}

	.flipped {
		transform: rotateY(180deg);
	}

	.background {
		position: absolute;
		border: 0.3em solid var(--color);
		transform: rotateY(180deg);
		backface-visibility: hidden;
		width: 100%;
		height: 100%;
		border-radius: 2em;
	}

	button {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		background: #444;
		border: 0;
		border-radius: 2em;
		font-size: inherit;
	}

	img {
		width: 6em;
		height: 6em;
		transform: rotateY(180deg);
		backface-visibility: hidden;
		pointer-events: none;
		user-select: none;
	}
</style>
