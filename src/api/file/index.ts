import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { FileInfo } from './types';

/**
 * 上传文件
 *
 * @param file
 */
export function uploadFileApi(file: File): AxiosPromise<FileInfo> {
  const formData = new FormData();
  formData.append('file', file);
  return request({
    url: '/youlai-system/api/v1/files',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function uploadBannerFileApi(file: string): AxiosPromise<FileInfo> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('file_type', 'banner_image');
  formData.append('file_prefix', 'banner_image');
  return request({
    url: '/upload/file',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * 删除文件
 *
 * @param filePath 文件名
 */
export function deleteFileApi(filePath?: string) {
  return request({
    url: '/youlai-system/api/v1/files',
    method: 'delete',
    params: { filePath: filePath },
  });
}
