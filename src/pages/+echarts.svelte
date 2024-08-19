<script lang="ts">
  import * as echarts from 'echarts';
  import { onMount } from 'svelte';

  // 定义节点和边的数据类型
  interface Node {
    id: string;
    name: string;
    symbol?: string; // 自定义图标
    symbolSize?: number; // 自定义图标大小
  }

  interface Link {
    source: string;
    target: string;
    name?: string; // 连线名称或标签
  }

  let chart: echarts.ECharts | null = null;

  // 示例数据
  const nodes: Node[] = [
    { id: '1', name: '节点 1', symbol: 'pin', symbolSize: 50 },
    { id: '2', name: '节点 2', symbol: 'rect', symbolSize: 60 },
    { id: '3', name: '节点 3', symbol: 'triangle', symbolSize: 70 },
    { id: '4', name: '节点 4', symbol: 'diamond', symbolSize: 50 },
    { id: '5', name: '节点 5', symbol: 'circle', symbolSize: 60 },
    { id: '6', name: '节点 6', symbol: 'arrow', symbolSize: 70 }
  ];

  const links: Link[] = [
    { source: '1', target: '2', name: '连线 1-2' },
    { source: '1', target: '3', name: '连线 1-3' },
    { source: '1', target: '4', name: '连线 1-4' },
    { source: '4', target: '5', name: '连线 4-5' },
    { source: '4', target: '6', name: '连线 4-6' },
    { source: '6', target: '5', name: '连线 6-5' }
  ];

  // 配置 ECharts 图表
  const option: echarts.EChartOption = {
    title: {
      text: 'Echarts网络图', // 图表标题
      bottom: 0, // 标题位置
      left: 'center'
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        data: nodes.map(node => ({
          id: node.id,
          name: node.name,
          symbol: node.symbol, // 使用自定义 symbol
          symbolSize: node.symbolSize, // 使用自定义 symbolSize
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          },
          label: {
            show: true,
            position: 'right', // 标签显示在节点右侧
            formatter: node.name // 显示节点名称
          }
        })),
        links: links.map(link => ({
          source: link.source,
          target: link.target,
          name: link.name, // 保存连线名称或标签
          lineStyle: {
            type: 'dashed', // 链接线样式
            color: 'source',
            curveness: 0.3,
            width: 2,
          },
          symbol: ['none', 'arrow'], // 链接末端为箭头
          symbolSize: 10, // 箭头大小
          label: {
            show: false // 隐藏连线上的标签，使用 tooltip 显示内容
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
          repulsion: 3000, // 增大 repulsion 值使节点之间的距离变大
          gravity: 0.1
        },
        animation: true,
        animationDuration: 2000, // 动画持续时间
        //animationEasing: 'cubicInOut' // 动画缓动效果
      }
    ],
    tooltip: {
      formatter: function (params) {
        if (params.dataType === 'edge') {
          // 从 params.data.name 中获取连线名称
          return params.data.name || '连线';
        }
        // 如果是节点，则显示节点的名称
        return params.data.name;
      }
    },
    animationDuration: 2000,
    animationEasingUpdate: 'quinticInOut'
  };

  // 挂载图表
  onMount(() => {
    const chartDom = document.getElementById('network-chart')!;
    chart = echarts.init(chartDom);
    chart.setOption(option);

    // 处理窗口大小调整
    window.addEventListener('resize', () => {
      //chart?.resize();
    });
  });
</script>

<!-- 样式 -->
<style>
  #network-chart {
    width: 100vw;
    height: 90vh; /* 调整图表高度以便于显示标题 */
  }
</style>

<!-- 图表容器 -->
<div id="network-chart" data-testid="network-chart" class="chart_style" style="width: 900px;height:700px;"></div>
