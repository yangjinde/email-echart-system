<script lang="ts">
    import EchartsPage from '../../pages/+echarts.svelte';
    import EchartsPage2 from '../../pages/+echarts-network.svelte';
</script>

<style>
    .echarts-container {
        display: flex;
        justify-content: space-between;
        gap: 20px; /* Spacing between components. */
    }

    .echart {
        flex: 1; /* Make two components evenly divide the container space. */
        min-width: 0; /* Prevent components from exceeding the container width. */
    }
</style>

<div class="echarts-container">
    <div class="echart">
        <svelte:component this={EchartsPage} />
    </div>
    <div class="echart">
        <svelte:component this={EchartsPage2} />
    </div>
</div>
