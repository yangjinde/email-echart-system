import { render, fireEvent, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import Page from '../pages/+email.svelte';
import { describe, it, expect } from 'vitest';
import {writable} from "svelte/store";
import {tick} from "svelte";

describe('Page', () => {

    beforeEach(() => {
        // Simulate the window.alert method to prevent alert from throwing errors.
        window.alert = () => {};
    });

    //test page init
    test('test page init', () => {
        const { container, getByText } = render(Page);
        const fromInput = container.querySelector('#from');
        const toInput = container.querySelector('#to');
        const ccInput = container.querySelector('#cc');
        const bccInput = container.querySelector('#bcc');
        const subjectInput = container.querySelector('#subject');
        const bodyInput = container.querySelector('#body');

        expect(fromInput).toHaveValue('');
        expect(toInput).toHaveValue('');
        expect(ccInput).toHaveValue('');
        expect(bccInput).toHaveValue('');
        expect(subjectInput).toHaveValue('');
        expect(bodyInput).toHaveValue('');
    });

    //test submit when required items is null
    test('test submit when required items is null', async () => {
        const { container, getByText } = render(Page);
        const submitButton = container.querySelector('#submit');
        expect(submitButton).toBeInTheDocument();
        // @ts-ignore
        await fireEvent.click(submitButton);

        expect(getByText('Please enter a valid email address')).toBeInTheDocument();
        expect(getByText('At least one valid recipient email address, multiple uses ; separate')).toBeInTheDocument();
        expect(getByText('Subject cannot be empty')).toBeInTheDocument();
        expect(getByText('Body cannot be empty')).toBeInTheDocument();
    });

    //test submit when required items is not null
    test('test submit when required items is not null', async () => {
        const { container, getByText } = render(Page);
        const fromInput = container.querySelector('#from');
        const toInput = container.querySelector('#to');
        const ccInput = container.querySelector('#cc');
        const bccInput = container.querySelector('#bcc');
        const subjectInput = container.querySelector('#subject');
        const bodyInput = container.querySelector('#body');

        //fill all items
        // @ts-ignore
        await fireEvent.input(fromInput, {target: {value: 'yangjinde@gmail.com'}});
        // @ts-ignore
        await fireEvent.input(toInput, {target: {value: 'Lisa@gmail.com'}});
        // @ts-ignore
        await fireEvent.input(ccInput, {target: {value: 'zs@gmail.com,wds@gmail.com'}});
        // @ts-ignore
        await fireEvent.input(bccInput, {target: {value: 'wangwu@gmail.com,zhangsan@gmail.com'}});
        // @ts-ignore
        await fireEvent.input(subjectInput, {target: {value: 'Travel Notice'}});
        // @ts-ignore
        await fireEvent.input(bodyInput, {target: {value: 'Dear All: Travel Notices...'}});

        // submit
        const submitButton = container.querySelector('#submit');
        // @ts-ignore
        await fireEvent.click(submitButton);

        expect(fromInput).toHaveValue('yangjinde@gmail.com');
        expect(toInput).toHaveValue('Lisa@gmail.com');
        expect(ccInput).toHaveValue('zs@gmail.com,wds@gmail.com');
        expect(bccInput).toHaveValue('wangwu@gmail.com,zhangsan@gmail.com');
        expect(subjectInput).toHaveValue('Travel Notice');
        expect(bodyInput).toHaveValue('Dear All: Travel Notices...');
    });

    test('test from is empty', async () => {
        const { container, getByText } = render(Page);
        const toInput = container.querySelector('#to');
        const ccInput = container.querySelector('#cc');
        const bccInput = container.querySelector('#bcc');
        const subjectInput = container.querySelector('#subject');
        const bodyInput = container.querySelector('#body');

        // @ts-ignore
        await fireEvent.input(toInput, {target: {value: 'Lisa@gmail.com'}});
        // @ts-ignore
        await fireEvent.input(ccInput, {target: {value: 'cc@gamin.com'}});
        // @ts-ignore
        await fireEvent.input(bccInput, {target: {value: 'bcc@gmail.com'}});
        // @ts-ignore
        await fireEvent.input(subjectInput, {target: {value: 'Title ...'}});
        // @ts-ignore
        await fireEvent.input(bodyInput, {target: {value: 'Body ...'}});

        // submit
        const submitButton = container.querySelector('#submit');
        // @ts-ignore
        await fireEvent.click(submitButton);

        expect(getByText('Please enter a valid email address')).toBeInTheDocument();
    });

    test('test cc is error', async () => {
        const { container, getByText } = render(Page);
        const fromInput = container.querySelector('#from');
        const toInput = container.querySelector('#to');
        const ccInput = container.querySelector('#cc');
        const bccInput = container.querySelector('#bcc');
        const subjectInput = container.querySelector('#subject');
        const bodyInput = container.querySelector('#body');

        // @ts-ignore
        await fireEvent.input(fromInput, {target: {value: 'yangjinde@gmail.com'}});
        // @ts-ignore
        await fireEvent.input(toInput, {target: {value: 'Lisa@gmail.com'}});
        // @ts-ignore
        await fireEvent.input(ccInput, {target: {value: '123456'}});
        // @ts-ignore
        await fireEvent.input(bccInput, {target: {value: 'bcc@gamin.com'}});
        // @ts-ignore
        await fireEvent.input(subjectInput, {target: {value: 'Title ...'}});
        // @ts-ignore
        await fireEvent.input(bodyInput, {target: {value: 'Body ...'}});

        // submit
        const submitButton = container.querySelector('#submit');
        // @ts-ignore
        await fireEvent.click(submitButton);

        expect(getByText('Please enter a valid email address, multiple uses ; separate')).toBeInTheDocument();
    });

    test('test bcc is error', async () => {
        const { container, getByText } = render(Page);
        const fromInput = container.querySelector('#from');
        const toInput = container.querySelector('#to');
        const ccInput = container.querySelector('#cc');
        const bccInput = container.querySelector('#bcc');
        const subjectInput = container.querySelector('#subject');
        const bodyInput = container.querySelector('#body');

        // @ts-ignore
        await fireEvent.input(fromInput, {target: {value: 'yangjinde@gmail.com'}});
        // @ts-ignore
        await fireEvent.input(toInput, {target: {value: 'Lisa@gmail.com'}});
        // @ts-ignore
        await fireEvent.input(ccInput, {target: {value: 'cc@gamin.com'}});
        // @ts-ignore
        await fireEvent.input(bccInput, {target: {value: '45678'}});
        // @ts-ignore
        await fireEvent.input(subjectInput, {target: {value: 'Title ...'}});
        // @ts-ignore
        await fireEvent.input(bodyInput, {target: {value: 'Body ...'}});

        // submit
        const submitButton = container.querySelector('#submit');
        // @ts-ignore
        await fireEvent.click(submitButton);

        expect(getByText('Please enter a valid email address, multiple uses ; separate')).toBeInTheDocument();
    });

    test('test subject is empty', async () => {
        const { container, getByText } = render(Page);
        const fromInput = container.querySelector('#from');
        const toInput = container.querySelector('#to');
        const ccInput = container.querySelector('#cc');
        const bccInput = container.querySelector('#bcc');
        const bodyInput = container.querySelector('#body');

        // @ts-ignore
        await fireEvent.input(fromInput, {target: {value: 'yangjinde@gmail.com'}});
        // @ts-ignore
        await fireEvent.input(toInput, {target: {value: 'Lisa@gmail.com'}});
        // @ts-ignore
        await fireEvent.input(ccInput, {target: {value: 'cc@gamin.com'}});
        // @ts-ignore
        await fireEvent.input(bccInput, {target: {value: 'bcc@gamin.com'}});
        // @ts-ignore
        await fireEvent.input(bodyInput, {target: {value: 'Body ...'}});

        // submit
        const submitButton = container.querySelector('#submit');
        // @ts-ignore
        await fireEvent.click(submitButton);

        expect(getByText('Subject cannot be empty')).toBeInTheDocument();
    });

    test('test body is empty', async () => {
        const { container, getByText } = render(Page);
        const fromInput = container.querySelector('#from');
        const toInput = container.querySelector('#to');
        const ccInput = container.querySelector('#cc');
        const bccInput = container.querySelector('#bcc');
        const subjectInput = container.querySelector('#subject');

        // @ts-ignore
        await fireEvent.input(fromInput, {target: {value: 'yangjinde@gmail.com'}});
        // @ts-ignore
        await fireEvent.input(toInput, {target: {value: 'Lisa@gmail.com'}});
        // @ts-ignore
        await fireEvent.input(ccInput, {target: {value: 'cc@gamin.com'}});
        // @ts-ignore
        await fireEvent.input(bccInput, {target: {value: 'bcc@gamin.com'}});
        // @ts-ignore
        await fireEvent.input(subjectInput, {target: {value: 'Subject ...'}});
        // submit
        const submitButton = container.querySelector('#submit');
        // @ts-ignore
        await fireEvent.click(submitButton);

        expect(getByText('Body cannot be empty')).toBeInTheDocument();
    });

    it('should apply border-red-500 class when there is an error', async () => {
        const { container, getByText } = render(Page);
        const fromInput = container.querySelector('#from') as HTMLInputElement;
        const toInput = container.querySelector('#to') as HTMLInputElement;
        const subjectInput = container.querySelector('#subject')as HTMLInputElement;
        const bodyInput = container.querySelector('#body')as HTMLInputElement;
        // submit
        const submitButton = container.querySelector('#submit');
        // @ts-ignore
        await fireEvent.click(submitButton);
        expect(fromInput.className).toContain('border-red-500');
        expect(toInput.className).toContain('border-red-500');
        expect(subjectInput.className).toContain('border-red-500');
        expect(bodyInput.className).toContain('border-red-500');
    });
});
