import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { CommitResponse } from '../types/git';
import CommitList from './CommitList';
import { BACKEND_HOST } from '../config';

const CommitsBetweenRefs: React.FC = () => {
    const [commits, setCommits] = useState<CommitResponse[]>([]);
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: {
        repo_url: string;
        start_ref: string;
        end_ref: string;
    }) => {
        setLoading(true);
        try {
            const params = new URLSearchParams(values);
            const response = await fetch(`${BACKEND_HOST}/commits/?${params.toString()}`);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || '请求失败');
            }
            const data = await response.json();
            setCommits(data);
        } catch (error) {
            message.error(error instanceof Error ? error.message : '请求失败');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>查询两个引用之间的提交</h2>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="仓库地址"
                    name="repo_url"
                    rules={[{ required: true, message: '请输入仓库地址' }]}
                >
                    <Input placeholder="请输入Git仓库URL" />
                </Form.Item>
                <Form.Item
                    label="起始引用"
                    name="start_ref"
                    rules={[{ required: true, message: '请输入起始引用' }]}
                >
                    <Input placeholder="分支名、tag名或commit id" />
                </Form.Item>
                <Form.Item
                    label="结束引用"
                    name="end_ref"
                    rules={[{ required: true, message: '请输入结束引用' }]}
                >
                    <Input placeholder="分支名、tag名或commit id" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        查询
                    </Button>
                </Form.Item>
            </Form>
            <CommitList commits={commits} loading={loading} />
        </div>
    );
};

export default CommitsBetweenRefs; 