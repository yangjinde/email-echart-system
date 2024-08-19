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

        expect(getByText('请输入至少一个有效的收件人邮箱地址，多个地址用分号分隔')).toBeInTheDocument();
        expect(getByText('主题不能为空')).toBeInTheDocument();
        expect(getByText('正文不能为空')).toBeInTheDocument();
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

        //填充必填项
        // @ts-ignore
        await fireEvent.input(toInput, {target: {value: 'Tom@gmail.com'}});
        // @ts-ignore
        await fireEvent.input(subjectInput, {target: {value: 'Meeting Minutes'}});
        // @ts-ignore
        await fireEvent.input(bodyInput, {target: {value: 'Dear All: Here are today’s meeting minutes...'}});

        // 提交
        const submitButton = container.querySelector('#submit');
        // @ts-ignore
        await fireEvent.click(submitButton);

        expect(screen.queryByText('请输入至少一个有效的收件人邮箱地址，多个地址用分号分隔')).toBeNull();
        expect(screen.queryByText('主题不能为空')).toBeNull();
        expect(screen.queryByText('正文不能为空')).toBeNull();

        expect(fromInput).toHaveValue('yangjinde@gmail.com');
        expect(toInput).toHaveValue('Tom@gmail.com');
        expect(ccInput).toHaveValue('');
        expect(bccInput).toHaveValue('');
        expect(subjectInput).toHaveValue('Meeting Minutes');
        expect(bodyInput).toHaveValue('Dear All: Here are today’s meeting minutes...');
    });
});
