<script lang="ts">
	import Game from './Game.svelte';
	import '../styles.css';
	import Modal from './Modal.svelte';
	import { levels } from './levels';
	import { confetti } from '@neoconfetti/svelte';

	let state: 'waiting' | 'playing' | 'paused' | 'won' | 'lost' = 'waiting';
	let game: Game;
</script>

<Game
	bind:this={game}
	on:play={() => {
		state = 'playing';
	}}
	on:pause={() => {
		state = 'paused';
	}}
	on:win={() => {
		game.reset();
		state = 'won';
	}}
	on:lose={() => {
		game.reset();
		state = 'lost';
	}}
/>

{#if state !== 'playing'}
	<Modal>
		<header>
			<h1>e<span>match</span>i</h1>
			<p class="subtitle">the emoji matching game</p>
		</header>

		<section>
			{#if state === 'won' || state === 'lost'}
				<p>you {state} the game!</p>
			{:else if state === 'paused'}
				<p>game paused</p>
			{:else if state === 'waiting'}
				<p>choose a level:</p>
			{/if}

			<div class="actions">
				{#if state === 'paused'}
					<button
						on:click={() => {
							game.resume();
						}}>resume</button
					>
					<button
						on:click={() => {
							game.reset();
							state = 'waiting';
						}}>quit</button
					>
				{:else}
					{#each levels as level}
						<button
							on:click={() => {
								game.start(level);
							}}>{level.label}</button
						>
					{/each}
				{/if}
			</div>
		</section>
	</Modal>
{/if}

{#if state === 'won'}
	<div
		class="confetti"
		use:confetti={{
			stageWidth: innerWidth,
			stageHeight: innerHeight
		}}
	/>
{/if}

<style>
	header,
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	section {
		font-size: 1.5em;
		margin-top: 1em;
	}

	.actions {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
	}

	.actions button {
		font-size: 1em;
		padding: 0.5em 1em;
		border-radius: 0.5em;
		border: none;
		line-height: 1.5em;
		background: blueviolet;
		cursor: pointer;
	}

	h1 {
		font-size: 10em;
		margin: 0;
	}

	.subtitle {
		font-size: 2.5em;
		margin: 0;
		font-family: grandstander;
	}

	span {
		color: blueviolet;
	}

	.confetti {
		position: fixed;
		height: 100%;
		width: 100%;
		left: 50%;
		top: 30%;
		pointer-events: none;
	}
</style>
