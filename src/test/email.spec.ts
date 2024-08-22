import { render, fireEvent, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import Page from '../pages/+email.svelte';
import { describe, it, expect } from 'vitest';

describe('Page', () => {

    beforeEach(() => {
        // 模拟 window.alert 方法，防止alert报错
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

        expect(fromInput).toHaveValue('yangjinde@gmail.com');
        expect(toInput).toHaveValue('');
        expect(ccInput).toHaveValue('');
        expect(bccInput).toHaveValue('');
        expect(subjectInput).toHaveValue('');
        expect(bodyInput).toHaveValue('');
    });

    //test submit when required items is null
    test('test submit when required items is null', async () => {
        const { container, getByText } = render(Page);
        // 获取 '提交' 按钮并模拟点击事件
        const submitButton = container.querySelector('#submit');
        // 确保按钮存在
        expect(submitButton).toBeInTheDocument();
        // @ts-ignore
        await fireEvent.click(submitButton);

        expect(getByText('At least one valid recipient email address, multiple uses; separate')).toBeInTheDocument();
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

        //填充所有项
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

        // 提交
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

});
