import { render, waitFor, fireEvent, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import Page from '../pages/+echarts.svelte';

describe('Page', () => {

    test('test echarts style', () => {
        const { container, getByText } = render(Page);

        // 检查图表容器是否存在
        const chartElement = container.querySelector('#network-chart');
        expect(chartElement).toBeInTheDocument();

        // @ts-ignore
        const style = getComputedStyle(chartElement);
        expect(style.backgroundColor).toBe('rgba(0, 0, 0, 0)');

        // @ts-ignore
        const className = chartElement.className;
        expect(className).toContain('svelte-1odnn5');

    });

    test("test echarts container style ", () => {
        const { container } = render(Page)
        const networkChartDiv = screen.getByTestId("network-chart")
        expect(networkChartDiv.classList).toContain("chart_style")
        expect(networkChartDiv.style.width).toEqual("900px");
        expect(networkChartDiv.style.height).toEqual("700px");
    })

});
