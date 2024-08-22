import { render, waitFor, fireEvent, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Page from '../pages/+echarts-network.svelte';

describe('Page', () => {

    // test render the component
    it('test render the component', () => {
        const { container } = render(Page);
        expect(container).toBeTruthy();
    });

    // test echarts main div background
    test('test echarts main div background', () => {
        const { container, getByText } = render(Page);
        const echartsDiv = screen.getByTestId("chart-network")
        expect(echartsDiv.classList).toContain("bg-white")
    });
});
