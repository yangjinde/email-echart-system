import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Page from '../routes/email/+page.svelte';

describe('routes email', () => {
    it('test routes email contains email from', async () => {
        const { container } = render(Page);
        const echartsMain = container.querySelector('#from');
        expect(echartsMain).not.toBeNull();
    });
});
