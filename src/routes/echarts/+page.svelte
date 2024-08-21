<script lang="ts">
    import EchartsPage from '../../pages/+echarts.svelte';
    import EchartsPage2 from '../../pages/+echarts2.svelte';
</script>

<style>
    .echarts-container {
        display: flex;
        justify-content: space-between;
        gap: 20px; /* 组件之间的间距 */
    }

    .echart {
        flex: 1; /* 使两个组件平分容器空间 */
        min-width: 0; /* 防止组件超出容器宽度 */
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
