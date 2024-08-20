import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Page from '../routes/+page.svelte';

describe('routes page', () => {
    it('test routes page contains Email Page and Echarts Page', async () => {
        const { container } = render(Page);
        const emailPage = container.querySelector('#EmailPage');
        const echartsPage = container.querySelector('#EchartsPage');
        expect(emailPage).not.toBeNull();
        expect(echartsPage).not.toBeNull();
    });
});
