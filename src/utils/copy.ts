import useClipboard from 'vue-clipboard3'
import { ElMessage } from 'element-plus';
const { toClipboard } = useClipboard();

export function copyText(value: string | number) {
    copy(value);
}

const copy = async (msg: string | number) => {
    try {
      await toClipboard(msg + '');
      ElMessage.success('复制成功');
    } catch (e) {
      console.log('复制失败', e);
    }
}