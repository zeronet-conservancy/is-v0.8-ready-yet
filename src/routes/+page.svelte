<script lang="ts">
  import versionCompare from 'semantic-compare';
  import RgbNoise from './RgbNoise.svelte';

  const { data } = $props();
  const { serverInfo } = data;

  const isReady = false;
  const details = "alpha version is expected to be ready for testing by the end of October; stable release before the end of 2024.";
  const zeroConnected = true;
  const localVersion = serverInfo.version;
  console.log(serverInfo);
  const stableVersion = 'v0.7.10';
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
      {#if !zeroConnected}
        do not seem to view this page through 0net.
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
