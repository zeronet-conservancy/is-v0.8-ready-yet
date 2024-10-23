<script lang="ts">
  import versionCompare from 'semantic-compare';
  import RgbNoise from './RgbNoise.svelte';
  import { onMount } from 'svelte';

  const { data } = $props();
  const { znAPI } = data;

  const isReady = false;
  const details = "alpha version is expected to be ready for testing by the end of October; stable release before the end of 2024.";
  const stableVersion = 'v0.7.10';

  let localVersion = $state('');

  const fetchVersion = async () => {
    localVersion = (await znAPI.getServerInfo()).version;
  };

  onMount(async () => {
    await fetchVersion();
  });

  const requestPermission = async (ev) => {
    ev.preventDefault();
    await znAPI.requestPermission('VERSION');
    await fetchVersion();
  };
</script>


<div class="container">
  <div class="background">
    <RgbNoise />
  </div>
  <div class="content">
    <h1 class="question">Is <code>zeronet-conservancy v0.8</code> ready yet?</h1>
    <h1 class="answer">
      {#if isReady}
        Yes!
      {:else}
        No, but..
      {/if}
    </h1>
    <h3 class="details">..{details}</h3>
    <p>The latest stable version is {stableVersion}. You
      {#if localVersion === ''}
        do not seem to view this page through 0net.
      {:else if !(/^\d/.test(localVersion[0]))}
        are using {localVersion} which is hiding specific release. Consider <a href="#requestVersion" onclick={requestPermission}>adding permission</a>
        for this site to read version information.
      {:else if versionCompare(localVersion, stableVersion) < 0}
        are using {localVersion}. Consider upgrading!
      {:else if versionCompare(localVersion, stableVersion) === 0}
        are up to date!
      {:else}
        are using newer (perhaps pre-release?) version ({localVersion})!
      {/if}
    </p>
  </div>
</div>

<style>
  * {
    font-family: sans-serif;
    color: #AAA;
  }

  .container {
    position: relative;
    height: 100vh;
    overflow: hidden;
    padding: 0;
  }

  .background {
    position: absolute; z-index: 0;
  }

  .content {
    height: 100vh;
    margin: 0;
    padding: 4px;
    position: relative;
    z-index: 1;
    background-color: #222d;
  }

  code {
    color: #8AC;
  }

  .question {
    text-align: center;
    margin: 0;
  }

  .answer {
    text-align: center;
    color: #888;
    margin: 0;
  }

  .details {
    margin-top: 0;
    text-align: center;
  }
</style>
