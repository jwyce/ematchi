<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Square from './Square.svelte';

	export let grid: string[];
	export let found: string[];

	const dispatch = createEventDispatcher<{ found: { emoji: string } }>();

	let [a, b] = [-1, -1];
	let reset_timeout: number;

	export function reset() {
		a = b = -1;
		reset_timeout = 0;
	}
</script>

<div class="grid">
	{#each grid as emoji, idx}
		<Square
			{emoji}
			selected={a === idx || b === idx}
			found={found.includes(emoji)}
			group={grid.indexOf(emoji) === idx ? 'a' : 'b'}
			on:click={() => {
				clearTimeout(reset_timeout);

				if (a === -1 && b === -1) {
					a = idx;
				} else if (b === -1) {
					b = idx;
					if (grid[a] === grid[b]) {
						// correct
						dispatch('found', {
							emoji
						});
					} else {
						// incorrect
						reset_timeout = setTimeout(() => {
							a = b = -1;
						}, 1000);
					}
				} else {
					b = -1;
					a = idx;
				}
			}}
		/>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(var(--size), 1fr);
		grid-template-rows: repeat(var(--size), 1fr);
		grid-gap: 1em;
		height: 100%;
		perspective: 100vw;
	}
</style>
