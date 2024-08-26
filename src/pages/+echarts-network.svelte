<script lang="ts">
    import * as echarts from 'echarts';
    import { onMount, onDestroy } from 'svelte';
    import axios from 'axios';

    // Graph data interfaces
    interface Node {
        id: string;
        name: string;
        symbolSize: number;
        category: number;
        label?: {
            show: boolean;
        };
    }

    interface Link {
        source: string;
        target: string;
    }

    interface Category {
        name: string;
    }

    interface GraphData {
        nodes: Node[];
        links: Link[];
        categories: Category[];
    }

    let myChart: echarts.ECharts | null = null;

    onMount(() => {
        // Initialize the chart
        const chartDom = document.getElementById('chart-network') as HTMLDivElement;
        myChart = echarts.init(chartDom);

        // Show loading animation
        myChart.showLoading();

        // Fetch data and set chart options
        axios.get<GraphData>('/echarts/les-miserables.json')
            .then(response => {
                const graph = response.data;

                // Process node labels
                graph.nodes.forEach(node => {
                    node.label = {
                        show: node.symbolSize > 30
                    };
                });

                // Chart options
                const option = {
                    title: {
                        text: 'Echart Network',
                        subtext: 'Default layout',
                        top: 'bottom',
                        left: 'center'
                    },
                    tooltip: {},
                    legend: [
                        {
                            data: graph.categories.map(category => category.name)
                        }
                    ],
                    animationDuration: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series: [
                        {
                            name: 'Les Miserables',
                            type: 'graph',
                            legendHoverLink: false,
                            layout: 'none',
                            data: graph.nodes,
                            links: graph.links,
                            categories: graph.categories,
                            roam: true,
                            label: {
                                position: 'right',
                                formatter: '{b}'
                            },
                            lineStyle: {
                                color: 'source',
                                curveness: 0.3
                            },
                            emphasis: {
                                focus: 'adjacency',
                                lineStyle: {
                                    width: 3
                                }
                            }
                        }
                    ]
                };

                // Set the chart options
                myChart?.hideLoading();
                myChart?.setOption(option);
            })
            .catch(error => {
                console.error('Error fetching graph data:', error);
                myChart?.hideLoading();
            });
    });

    // Clean up the chart instance when the component is destroyed
    // onDestroy(() => {
    //     myChart?.dispose();
    // });
</script>

<style>#chart-network {width: 100%;height: 730px;}</style>

<!-- Chart container -->
<div id="chart-network" data-testid="chart-network" class="bg-white"></div>
