import request from '@/utils/request';

/* 会员列表 */
export async function memberList() {
    return request('http://www.antd_server.com/');
  }