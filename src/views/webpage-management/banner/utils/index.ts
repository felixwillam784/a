import { FormRules } from "element-plus";
import { ref } from "vue";
import * as Banner from '@/interface/banner';

export const FeedbackOption = [
  {
    id: 0,
    label: '无响应',
    value: 0
  },
  {
    id: 1,
    label: '打开弹窗',
    value: 1
  },
  {
    id: 2,
    label: '打开客服',
    value: 2
  },
  {
    id: 3,
    label: '下载APP',
    value: 3
  },
  {
    id: 4,
    label: '打开客服列表',
    value: 4
  },
  {
    id: 5,
    label: '站内页面',
    value: 5
  },
  {
    id: 6,
    label: '站外链接',
    value: 6
  },
  {
    id: 7,
    label: '游戏分类',
    value: 7
  },
  {
    id: 8,
    label: '具体游戏',
    value: 8
  },
  {
    id: 9,
    label: '打开活动广告页面',
    value: 9
  },
]

export const NewBannerRules = ref<FormRules<Banner.BannerListData>>({
  id: [{ required: false, message: "请输入补单金额。", trigger: "blur" }],
  name: [{ required: false, message: "请输入补单金额。", trigger: "blur" }],
  desc: [{ required: false, message: "请输入补单金额。", trigger: "blur" }],
  sort: [{ required: false, message: "请输入补单金额。", trigger: "blur" }],
  condition: [{ required: false, message: "请输入补单金额。", trigger: "blur" }],
  click_feedback: [{ required: false, message: "请输入补单金额。", trigger: "blur" }],
  content: [{ required: false, message: "请输入补单金额。", trigger: "blur" }],
  target: [{ required: false, message: "请输入补单金额。", trigger: "blur" }],
  on_time: [{ required: false, message: "请输入补单金额。", trigger: "blur" }],
  off_time: [{ required: false, message: "请输入补单金额。", trigger: "blur" }],
  image: [{ required: false, message: "请输入补单金额。", trigger: "blur" }],
  activity_id: [{ required: false, message: "请输入补单金额。", trigger: "blur" }],
  is_disappear: [{ required: false, message: "请输入补单金额。", trigger: "blur" }],
  replace_id: [{ required: false, message: "请输入补单金额。", trigger: "blur" }],
  remark: [{ required: false, message: "请输入补单金额。", trigger: "blur" }],
  status: [{ required: false, message: "请输入补单金额。", trigger: "blur" }],
});