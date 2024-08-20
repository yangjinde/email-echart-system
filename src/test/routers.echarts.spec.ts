import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Page from '../routes/echarts/+page.svelte';

describe('routes echarts', () => {
    it('test routes echarts contains echarts-main', async () => {
        const { container } = render(Page);
        const echartsMain = container.querySelector('#echarts-main');
        expect(echartsMain).not.toBeNull();
    });
});
