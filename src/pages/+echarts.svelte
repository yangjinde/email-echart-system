<script lang="ts">
    //Import onCount events and echarts components
    import { onMount } from 'svelte';
    import * as echarts from 'echarts';

    // Initialize the chart during component mounting
    onMount(() => {
        // Retrieve DOM elements based on ID
        const chartDom = document.getElementById('echarts-main') as HTMLElement;

        // Initialize ECharts instance
        const myChart = echarts.init(chartDom);

        // configuration item
        const option = {
            //title
            title: {
                text: '2023 Sales Statistical Analysis',
                left: 'center',
                bottom: 0
            },
            //Set the style and behavior of the prompt information box displayed when the mouse hovers over the chart
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
            //Horizontal axis, counting months
            xAxis: [
                {
                    type: 'category',
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            // Configure two different y-axis in the chart
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
                //Bar Chart Electronic Data
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
                //Bar chart Clothing data
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
                //Line chart sales data
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

        myChart.setOption(option);
    });
</script>

<style>#echarts-main {width: 100%;height: 740px;}</style>

<div id="echarts-main" data-testid="echarts-main" class="bg-gray-100">2023 Sales Statistical Analysis</div>
