import { render, waitFor, fireEvent, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Page from '../pages/+echarts.svelte';

describe('Page', () => {

    // test render the component
    it('test render the component', () => {
        const { container } = render(Page);
        expect(container).toBeTruthy();
    });

    // test echarts main div background
    test('test echarts main div background', () => {
        const { container, getByText } = render(Page);
        const echartsDiv = screen.getByTestId("echarts-main")
        expect(echartsDiv.classList).toContain("bg-gray-100")
    });

    // test echarts title
    test('test echarts title', async () => {
        const { component } = render(Page, {
            props: {
                title: "2023 Sales Statistical Analysis"
            }
        });
        const echartsMain=screen.getByTestId('echarts-main');
        expect(echartsMain.textContent).toEqual('2023 Sales Statistical Analysis')
    });

});
