<script lang="ts">
  import * as echarts from 'echarts';
  import { onMount } from 'svelte';

  // Define the data types of Nodes and edges
  interface Node {
    id: string;
    name: string;
    symbol?: string; // custom Icon
    symbolSize?: number; // Customize icon size
  }

  interface Link {
    source: string;
    target: string;
    name?: string; // Line name or label
  }

  let chart: echarts.ECharts | null = null;

  // node data
  const nodes: Node[] = [
    { id: '1', name: 'Node 1', symbol: 'pin', symbolSize: 50 },
    { id: '2', name: 'Node 2', symbol: 'rect', symbolSize: 60 },
    { id: '3', name: 'Node 3', symbol: 'triangle', symbolSize: 70 },
    { id: '4', name: 'Node 4', symbol: 'diamond', symbolSize: 50 },
    { id: '5', name: 'Node 5', symbol: 'circle', symbolSize: 60 },
    { id: '6', name: 'Node 6', symbol: 'arrow', symbolSize: 70 }
  ];

  const links: Link[] = [
    { source: '1', target: '2', name: 'Line 1-2' },
    { source: '1', target: '3', name: 'Line 1-3' },
    { source: '1', target: '4', name: 'Line 1-4' },
    { source: '4', target: '5', name: 'Line 4-5' },
    { source: '4', target: '6', name: 'Line 4-6' },
    { source: '6', target: '5', name: 'Line 6-5' }
  ];

  const option: echarts.EChartOption = {
    title: {
      text: 'Echarts Network', // title
      bottom: 0, // Title Position
      left: 'center'
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        data: nodes.map(node => ({
          id: node.id,
          name: node.name,
          symbol: node.symbol,
          symbolSize: node.symbolSize,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          },
          label: {
            show: true,
            position: 'right',
            formatter: node.name
          }
        })),
        links: links.map(link => ({
          source: link.source,
          target: link.target,
          name: link.name,
          lineStyle: {
            type: 'dashed', // Link line style
            color: 'source',
            curveness: 0.3,
            width: 2,
          },
          symbol: ['none', 'arrow'], // The end of the link is an arrow
          symbolSize: 10,
          label: {
            show: false
          }
        })),
        emphasis: {
          focus: 'adjacency',
          label: {
            show: true,
            fontSize: 16
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        lineStyle: {
          color: 'source',
          width: 2,
          curveness: 0.3
        },
        edgeLabel: {
          show: false
        },
        force: {
          repulsion: 3000, // Increasing the repulsion value increases the distance between nodes
          gravity: 0.1
        },
        animation: true,
        animationDuration: 2000, // Animation duration
        animationEasing: 'cubicInOut' // Animation buffering effect
      }
    ],
    tooltip: {
      formatter: function (params) {
        if (params.dataType === 'edge') {
          // form params.data.name  Line Name
          return params.data.name || 'Line';
        }
        // Node，show Node Name
        return params.data.name;
      }
    },
    animationDuration: 2000,
    animationEasingUpdate: 'quinticInOut'
  };

  onMount(() => {
    const chartDom = document.getElementById('network-chart')!;
    chart = echarts.init(chartDom);
    chart.setOption(option);

    // 处理窗口大小调整
    window.addEventListener('resize', () => {
      chart?.resize();
    });
  });
</script>

<!-- CSS -->
<style>
  #network-chart {
      width: 100%;
      height: 730px;
  }
</style>

<!-- Chart container -->
<div id="network-chart" data-testid="network-chart" class="chart_style">Echarts Network</div>
