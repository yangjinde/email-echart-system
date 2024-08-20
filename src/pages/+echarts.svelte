<script lang="ts">
    import { onMount } from 'svelte';
    import * as echarts from 'echarts';

    // 在组件挂载时初始化图表
    onMount(() => {
        // 获取 DOM 元素
        const chartDom = document.getElementById('main') as HTMLElement;

        // 初始化 ECharts 实例
        const myChart = echarts.init(chartDom);

        // 配置项
        const option = {
            title: {
                text: '2023 Sales Statistical Analysis',
                left: 'center',
                bottom: 0
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            legend: {
                data: ['Electronic ', 'Clothing', 'Sales']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Clothing',
                    min: 0,
                    max: 2500,
                    interval: 500,
                    axisLabel: {
                        formatter: '{value} pcs'
                    }
                },
                {
                    type: 'value',
                    name: 'Sales',
                    min: 0,
                    max: 30000,
                    interval: 5000,
                    axisLabel: {
                        formatter: '{value} $'
                    }
                }
            ],
            series: [
                {
                    name: 'Electronic ',
                    type: 'bar',
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + ' pcs';
                        }
                    },
                    data: [350, 245, 410, 500, 986, 1356, 1123, 902, 753, 605, 504, 726]
                },
                {
                    name: 'Clothing',
                    type: 'bar',
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + ' pcs';
                        }
                    },
                    data: [750, 886, 765, 451, 618, 1189, 890, 776, 659, 701, 800, 1156]

                },
                {
                    name: 'Sales',
                    type: 'line',
                    yAxisIndex: 1,
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + ' $';
                        }
                    },
                    data: [7400, 6141, 7915, 9411, 19710, 27144, 22003, 19622, 13877, 12459, 12636, 17534]
                }
            ]
        };

        // 设置配置项
        myChart.setOption(option);
    });
</script>

<style>
    #main {
        width: 100%;
        height: 600px;
    }
</style>

<div id="main"></div>
