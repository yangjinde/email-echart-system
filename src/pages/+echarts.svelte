<script lang="ts">
    //导入onMount事件及echarts组件
    import { onMount } from 'svelte';
    import * as echarts from 'echarts';

    // 在组件挂载时初始化图表
    onMount(() => {
        // 根据ID获取 DOM 元素
        const chartDom = document.getElementById('echarts-main') as HTMLElement;

        // 初始化 ECharts 实例
        const myChart = echarts.init(chartDom);

        // 配置项
        const option = {
            //图表标题
            title: {
                text: '2023 Sales Statistical Analysis',
                left: 'center',
                bottom: 0
            },
            //设置当鼠标悬浮在图表上时显示的提示信息框的样式和行为
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
            //统计的项
            legend: {
                data: ['Electronic ', 'Clothing', 'Sales']
            },
            //横坐标，统计月份
            xAxis: [
                {
                    type: 'category',
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            // 配置图表中的两个不同的 y 轴
            yAxis: [
                {
                    type: 'value',
                    name: 'Electronic/Clothing',
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
                //柱状图Electronic数据
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
                //柱状图Clothing数据
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
                //折线图Clothing数据
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
    #echarts-main {
        width: 100%;
        height: 750px;
    }
</style>

<div id="echarts-main" data-testid="echarts-main" class="bg-gray-100">2023 Sales Statistical Analysis</div>
