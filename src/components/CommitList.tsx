import React from 'react';
import { CommitResponse } from '../types/git';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

interface CommitListProps {
    commits: CommitResponse[];
    loading?: boolean;
}

const CommitList: React.FC<CommitListProps> = ({ commits, loading }) => {
    const columns: ColumnsType<CommitResponse> = [
        {
            title: 'Commit ID',
            dataIndex: 'id',
            key: 'id',
            render: (text: string) => <Tag>{text.substring(0, 8)}</Tag>,
        },
        {
            title: '提交信息',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
            render: (time: number) => dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '深度',
            dataIndex: 'depth',
            key: 'depth',
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={commits}
            loading={loading}
            rowKey="id"
            pagination={{ pageSize: 10 }}
        />
    );
};

export default CommitList; 