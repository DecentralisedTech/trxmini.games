<script>
// @ts-nocheck
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'

	import { io } from 'socket.io-client'
	
	import { theme } from '$lib/state/Theme.svelte'

	import Theme from '$lib/state/Theme.svelte'
	import Logo from '$lib/components/_ui/reusable/Logo.svelte'
	import Auth from '$lib/components/auth/Auth.svelte'
	import TipNotification from '../dialogs/TipNotification.svelte';
	import Notifications from '../dialogs/Notifications.svelte'

	import { 
		connectedAddress, 
		connectedUsername,
		userID,
		connectedChain, 
		inGame, 
		chessContract, 
		getBalance,
		wagerTx,
		theRoom
	} from '$lib/state/state'


	let menu = [
		{ name: 'About', url: '/#about' },
		{ name: 'Games', url: '/#games' },
		{ name: 'Roadmap', url: '/#roadmap' },
		{ name: 'FAQs', url: '/#faq' },
		{ name: 'Whitepaper', url: '/#whitepaper' }
	];

	let isOpen = false;
	let isUser = true;
	let hasName = true
	let Shasta = true
    setTimeout(() => {
		if (!$connectedAddress) isUser = false
		if ($connectedAddress && !$connectedUsername) hasName = false
		if ($connectedAddress && !$connectedChain) Shasta = true
		console.log(isUser, hasName, Shasta)
		console.log($connectedAddress)
	
	},3000)

	

    async function redirectUsername() {
        if ($page.routeId == "/username") {
            goto('./')
        } else {
            goto('./username')
        }

    }
	async function redirectChess() {
		if ($page.routeId != '/') {
			goto('../chess')
		} else {
			goto('/chess')
		}
	}
	let wagerTxLink
	$: wagerTxLink = `https://shasta.tronscan.org/#/transaction/${$wagerTx}`
	if ($wagerTx) wagerTxLink = `https://shasta.tronscan.org/#/transaction/${$wagerTx}`
</script>

<nav class="relative z-50 flex items-center justify-between py-8 absolute">
	<Logo></Logo>
	{#if !$connectedAddress && !isUser}
		<div class="p-2 absolute z-20 max-w-16 left-1/2 -translate-x-1/2 max-w-full text-sm  
		flex justify-center transition-opacity text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
			<svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-2 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
			<div class='pt-0.5'>Log into Tronlink via extension first, and switch to Shasta network before connecting.</div>
		</div>
	{:else if $connectedAddress && !$connectedChain || $connectedAddress && $connectedUsername && !$connectedChain}
		<div class="p-2 absolute z-20 max-w-16 left-1/2 -translate-x-1/2 max-w-full text-sm  
		flex justify-center transition-opacity text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
			<svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-2 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
			<div class='pt-0.5'>Please switch your network on TronLink to Shasta testnet network, and refresh the page.</div>
		</div>
    {/if}
	{#if $connectedChain && $connectedUsername && $getBalance < 1500}
		<div class="p-2 absolute z-20 max-w-16 left-1/2 -translate-x-1/2 max-w-full text-sm  
		flex justify-center transition-opacity text-green-700 bg-green-100 rounded-lg" role="alert">
			<svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-2 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
			<div class='pt-0.5'>You can get Shasta testnet funds from the faucet on our Telegram! <a class='underline' href='https://t.me/TrxGames' target="_blank" rel="noreferrer">t.me/TrxGames</a></div>
		</div>
	{/if}
	{#if $connectedAddress && !$connectedUsername && $connectedChain && !hasName && $page.routeId != '/username'}
    <div class="p-2 absolute z-20 max-w-16 left-1/2 -translate-x-1/2 max-w-full text-sm
    flex justify-center transition-opacity text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
        <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-2 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <div class='pt-0.5'>Create a unique, domain username <button class='hover:scale-[1.05] transition transition-200' on:click={redirectUsername}><u>here</u></button></div>
    </div>
    {/if}

	{#if $connectedAddress && $connectedUsername && $inGame && $connectedChain && $page.routeId != '/chess'}
		<div class="p-2 absolute z-20 max-w-16 left-1/2 -translate-x-1/2 max-w-full text-sm
		flex justify-center transition-opacity text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
			<svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-2 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
			<div class='pt-0.5 flex-wrap'>You are currently in a game! Click <button class='hover:scale-[1.05] transition transition-200 flex-wrap' on:click={redirectChess}><u>here </u></button> to play, leave or finish it.</div>
		</div>
	{/if}

		{#if $page.routeId == '/chess' && $wagerTx}
			<div class="p-2 absolute z-20 max-w-16 left-1/2 -translate-x-1/2 max-w-full text-sm  
			flex justify-center transition-opacity text-green-700 bg-green-100 rounded-lg" role="alert">
				<svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-2 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
				<div class='pt-0.5'>Collected wager successfully. <u><a href={wagerTxLink} target="_blank" rel='noreferrer'>Transaction Hash</a></u></div>
			</div>
		{/if}

	<div class="hidden lg:flex lg:items-center lg:gap-10">
		<ul class="flex items-center gap-6 ">
			{#each menu as item}
				<li>
					{#if item.name == 'Whitepaper'}
						<a href='./' class="text-lg opacity-50" disabled>{item.name}</a>
					{:else if $page.routeId == '/join' && item.name == 'Games'} 
							<a href='./' class="text-lg ">{item.name}</a>
					{:else}
						<div class='hover:scale-[1.05] transition transition-200'>
							<a href={item.url} class="text-lg ">{item.name}</a>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
		
		<div class="flex items-center gap-4">
			<!-- <button
				class="rounded-[10px] border border-blue-500 py-1.5 px-6 text-lg opacity-40 border-opacity-50 font-medium text-[#3C1272] dark:text-white "
			disabled>
				Sign In
			</button> -->
			<Notifications></Notifications>
			<Auth></Auth>
			<div class='hover:scale-[1.10] mt-1.5 transition transition-200'>
				
				<Theme></Theme>
			</div>
		</div>
		
	</div>
	<button on:click={() => (isOpen = !isOpen)} class="inline-block p-2 lg:hidden">
		<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M3 12H21M3 6H21M9 18H21"
				stroke={$theme == 'dark' ? 'white' : 'black'}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>
	<!-- Mobile Dropdown -->
	{#if isOpen}
		<div
			transition:slide
			class="fixed inset-x-0 top-0 bg-white/90 dark:bg-[#26262d] py-8 text-gray-800 dark:text-white shadow-lg backdrop-blur-sm lg:hidden"
		>
			<div class="flex items-center justify-between px-4">
				<img src="/img/top-logo.png" alt="Logo" />
				<button on:click={() => (isOpen = !isOpen)} class="p-2">
					<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M18 6L6 18M6 6L18 18"
							stroke={$theme == 'dark' ? 'white' : 'black'}
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"/>
					</svg>
				</button>
			</div>
			<ul class="flex h-full flex-col py-6">
				{#each menu as item}
					<li>
					{#if item.name == 'Whitepaper'}
							<a
								on:click={() => (isOpen = false)}
								href='./'
								class='inline-block w-full py-4 px-4 text-lg font-semibold opacity-50'
							disabled>
								{item.name}
							</a>
					{:else}
							<a
								on:click={() => (isOpen = false)}
								href={item.url}
								class='inline-block w-full py-4 px-4 text-lg font-semibold'
								disabled>
								{item.name}
							</a>
					{/if}
					</li>
				{/each}
			</ul>
			<div class="flex items-center justify-between border-t border-gray-200 px-4 pt-8 ">
				<button
					class="rounded-[10px] border border-blue-500 py-1.5 px-6 
					text-lg font-medium opacity-40 border-opacity-50 text-[#3C1272] dark:text-white"
				disabled>
					Sign In
				</button>
				
				<div class='ml-2'></div>
				<Theme></Theme>
			</div>
		</div>
		
	{/if}
	
</nav>
