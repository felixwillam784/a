<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Search, Refresh, Upload, Plus, CopyDocument } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { number } from 'echarts';
import { log } from 'console';
import useStore from '@/store';
import {getUserQualityReport} from '@/api/DataAnalysis'

const { user } = useStore();
const dateRange = ref([
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
]);

const buttonIndex = ref<number>(0);

const checked1 = ref(true)
const checked2 = ref(true)
const checked3 = ref(true)
const checked4 = ref(false)
const checked5 = ref(false)
const checked6 = ref(true)
const checked7 = ref(false)
const checked8 = ref(false)

interface GetRetentionReport {
	id: string;
	user_quality_date_time: string;
	user_quality_register_count: number;
	user_quality_ltv: string;
	user_quality_retention_rate_1: string;
	user_quality_retention_user_count_1: number;
	user_quality_retention_first_depositor_count_1: number;
	user_quality_retention_rate_2: string;
	user_quality_retention_user_count_2: number;
	user_quality_retention_first_depositor_count_2: number;
	user_quality_retention_rate_3: string;
	user_quality_retention_user_count_3: number;
	user_quality_retention_first_depositor_count_3: number;
	user_quality_retention_rate_4: string;
	user_quality_retention_user_count_4: number;
	user_quality_retention_first_depositor_count_4: number;
	user_quality_retention_rate_5: string;
	user_quality_retention_user_count_5: number;
	user_quality_retention_first_depositor_count_5: number;
	user_quality_retention_rate_6: string;
	user_quality_retention_user_count_6: number;
	user_quality_retention_first_depositor_count_6: number;
	user_quality_retention_rate_7: string;
	user_quality_retention_user_count_7: number;
	user_quality_retention_first_depositor_count_7: number;
	user_quality_retention_rate_8: string;
	user_quality_retention_user_count_8: number;
	user_quality_retention_first_depositor_count_8: number;
	user_quality_retention_rate_9: string;
	user_quality_retention_user_count_9: number;
	user_quality_retention_first_depositor_count_9: number;
	user_quality_retention_rate_10: string;
	user_quality_retention_user_count_10: number;
	user_quality_retention_first_depositor_count_10: number;
	user_quality_retention_rate_11: string;
	user_quality_retention_user_count_11: number;
	user_quality_retention_first_depositor_count_11: number;
	user_quality_retention_rate_12: string;
	user_quality_retention_user_count_12: number;
	user_quality_retention_first_depositor_count_12: number;
	user_quality_retention_rate_13: string;
	user_quality_retention_user_count_13: number;
	user_quality_retention_first_depositor_count_13: number;
	user_quality_retention_rate_14: string;
	user_quality_retention_user_count_14: number;
	user_quality_retention_first_depositor_count_14: number;
	user_quality_retention_rate_15: string;
	user_quality_retention_user_count_15: number;
	user_quality_retention_first_depositor_count_15: number;
	user_quality_retention_rate_16: string;
	user_quality_retention_user_count_16: number;
	user_quality_retention_first_depositor_count_16: number;
	user_quality_retention_rate_17: string;
	user_quality_retention_user_count_17: number;
	user_quality_retention_first_depositor_count_17: number;
	user_quality_retention_rate_18: string;
	user_quality_retention_user_count_18: number;
	user_quality_retention_first_depositor_count_18: number;
	user_quality_retention_rate_19: string;
	user_quality_retention_user_count_19: number;
	user_quality_retention_first_depositor_count_19: number;
	user_quality_retention_rate_20: string;
	user_quality_retention_user_count_20: number;
	user_quality_retention_first_depositor_count_20: number;
	user_quality_retention_rate_21: string;
	user_quality_retention_user_count_21: number;
	user_quality_retention_first_depositor_count_21: number;
	user_quality_retention_rate_22: string;
	user_quality_retention_user_count_22: number;
	user_quality_retention_first_depositor_count_22: number;
	user_quality_retention_rate_23: string;
	user_quality_retention_user_count_23: number;
	user_quality_retention_first_depositor_count_23: number;
	user_quality_retention_rate_24: string;
	user_quality_retention_user_count_24: number;
	user_quality_retention_first_depositor_count_24: number;
	user_quality_retention_rate_25: string;
	user_quality_retention_user_count_25: number;
	user_quality_retention_first_depositor_count_25: number;
	user_quality_retention_rate_26: string;
	user_quality_retention_user_count_26: number;
	user_quality_retention_first_depositor_count_26: number;
	user_quality_retention_rate_27: string;
	user_quality_retention_user_count_27: number;
	user_quality_retention_first_depositor_count_27: number;
	user_quality_retention_rate_28: string;
	user_quality_retention_user_count_28: number;
	user_quality_retention_first_depositor_count_28: number;
	user_quality_retention_rate_29: string;
	user_quality_retention_user_count_29: number;
	user_quality_retention_first_depositor_count_29: number;
	user_quality_retention_rate_30: string;
	user_quality_retention_user_count_30: number;
	user_quality_retention_first_depositor_count_30: number;
}

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
})

const loading = ref<boolean>(false);

const total = ref<number>(4);

const userQualityReportList = ref<Array<GetRetentionReport>>([
  {
    id: "8e8fd8fsdfd8fe8f8df8ef",
    user_quality_date_time: "当前30日平均",
		user_quality_register_count: 99999,
		user_quality_ltv: 9.99,
		user_quality_retention_rate_1: 99.99,
		user_quality_retention_user_count_1: 99999,
		user_quality_retention_first_depositor_count_1: 99999,
		user_quality_retention_rate_2: 99.99,
		user_quality_retention_user_count_2: 99999,
		user_quality_retention_first_depositor_count_2: 99999,
		user_quality_retention_rate_3: 99.99,
		user_quality_retention_user_count_3: 99999,
		user_quality_retention_first_depositor_count_3: 99999,
		user_quality_retention_rate_4: 99.99,
		user_quality_retention_user_count_4: 99999,
		user_quality_retention_first_depositor_count_4: 99999,
		user_quality_retention_rate_5: 99.99,
		user_quality_retention_user_count_5: 99999,
		user_quality_retention_first_depositor_count_5: 99999,
		user_quality_retention_rate_6: 99.99,
		user_quality_retention_user_count_6: 99999,
		user_quality_retention_first_depositor_count_6: 99999,
		user_quality_retention_rate_7: 99.99,
		user_quality_retention_user_count_7: 99999,
		user_quality_retention_first_depositor_count_7: 99999,
		user_quality_retention_rate_8: 99.99,
		user_quality_retention_user_count_8: 99999,
		user_quality_retention_first_depositor_count_8: 99999,
		user_quality_retention_rate_9: 99.99,
		user_quality_retention_user_count_9: 99999,
		user_quality_retention_first_depositor_count_9: 99999,
		user_quality_retention_rate_10: 99.99,
		user_quality_retention_user_count_10: 99999,
		user_quality_retention_first_depositor_count_10: 99999,
		user_quality_retention_rate_11: 99.99,
		user_quality_retention_user_count_11: 99999,
		user_quality_retention_first_depositor_count_11: 99999,
		user_quality_retention_rate_12: 99.99,
		user_quality_retention_user_count_12: 99999,
		user_quality_retention_first_depositor_count_12: 99999,
		user_quality_retention_rate_13: 99.99,
		user_quality_retention_user_count_13: 99999,
		user_quality_retention_first_depositor_count_13: 99999,
		user_quality_retention_rate_14: 99.99,
		user_quality_retention_user_count_14: 99999,
		user_quality_retention_first_depositor_count_14: 99999,
		user_quality_retention_rate_15: 99.99,
		user_quality_retention_user_count_15: 99999,
		user_quality_retention_first_depositor_count_15: 99999,
		user_quality_retention_rate_16: 99.99,
		user_quality_retention_user_count_16: 99999,
		user_quality_retention_first_depositor_count_16: 99999,
		user_quality_retention_rate_17: 99.99,
		user_quality_retention_user_count_17: 99999,
		user_quality_retention_first_depositor_count_17: 99999,
		user_quality_retention_rate_18: 99.99,
		user_quality_retention_user_count_18: 99999,
		user_quality_retention_first_depositor_count_18: 99999,
		user_quality_retention_rate_19: 99.99,
		user_quality_retention_user_count_19: 99999,
		user_quality_retention_first_depositor_count_19: 99999,
		user_quality_retention_rate_20: 99.99,
		user_quality_retention_user_count_20: 99999,
		user_quality_retention_first_depositor_count_20: 99999,
		user_quality_retention_rate_21: 99.99,
		user_quality_retention_user_count_21: 99999,
		user_quality_retention_first_depositor_count_21: 99999,
		user_quality_retention_rate_22: 99.99,
		user_quality_retention_user_count_22: 99999,
		user_quality_retention_first_depositor_count_22: 99999,
		user_quality_retention_rate_23: 99.99,
		user_quality_retention_user_count_23: 99999,
		user_quality_retention_first_depositor_count_23: 99999,
		user_quality_retention_rate_24: 99.99,
		user_quality_retention_user_count_24: 99999,
		user_quality_retention_first_depositor_count_24: 99999,
		user_quality_retention_rate_25: 99.99,
		user_quality_retention_user_count_25: 99999,
		user_quality_retention_first_depositor_count_25: 99999,
		user_quality_retention_rate_26: 99.99,
		user_quality_retention_user_count_26: 99999,
		user_quality_retention_first_depositor_count_26: 99999,
		user_quality_retention_rate_27: 99.99,
		user_quality_retention_user_count_27: 99999,
		user_quality_retention_first_depositor_count_27: 99999,
		user_quality_retention_rate_28: 99.99,
		user_quality_retention_user_count_28: 99999,
		user_quality_retention_first_depositor_count_28: 99999,
		user_quality_retention_rate_29: 99.99,
		user_quality_retention_user_count_29: 99999,
		user_quality_retention_first_depositor_count_29: 99999,
		user_quality_retention_rate_30: 99.99,
		user_quality_retention_user_count_30: 99999,
		user_quality_retention_first_depositor_count_30: 99999,
  },
	{
    id: "8e8fd8fsdfd8fe8f8df8ef",
    user_quality_date_time: "2020-6-30 周四",
		user_quality_register_count: 99999,
		user_quality_ltv: 9.99,
		user_quality_retention_rate_1: 99.99,
		user_quality_retention_user_count_1: 99999,
		user_quality_retention_first_depositor_count_1: 99999,
		user_quality_retention_rate_2: 99.99,
		user_quality_retention_user_count_2: 99999,
		user_quality_retention_first_depositor_count_2: 99999,
		user_quality_retention_rate_3: 99.99,
		user_quality_retention_user_count_3: 99999,
		user_quality_retention_first_depositor_count_3: 99999,
		user_quality_retention_rate_4: 99.99,
		user_quality_retention_user_count_4: 99999,
		user_quality_retention_first_depositor_count_4: 99999,
		user_quality_retention_rate_5: 99.99,
		user_quality_retention_user_count_5: 99999,
		user_quality_retention_first_depositor_count_5: 99999,
		user_quality_retention_rate_6: 99.99,
		user_quality_retention_user_count_6: 99999,
		user_quality_retention_first_depositor_count_6: 99999,
		user_quality_retention_rate_7: 99.99,
		user_quality_retention_user_count_7: 99999,
		user_quality_retention_first_depositor_count_7: 99999,
		user_quality_retention_rate_8: 99.99,
		user_quality_retention_user_count_8: 99999,
		user_quality_retention_first_depositor_count_8: 99999,
		user_quality_retention_rate_9: 99.99,
		user_quality_retention_user_count_9: 99999,
		user_quality_retention_first_depositor_count_9: 99999,
		user_quality_retention_rate_10: 99.99,
		user_quality_retention_user_count_10: 99999,
		user_quality_retention_first_depositor_count_10: 99999,
		user_quality_retention_rate_11: 99.99,
		user_quality_retention_user_count_11: 99999,
		user_quality_retention_first_depositor_count_11: 99999,
		user_quality_retention_rate_12: 99.99,
		user_quality_retention_user_count_12: 99999,
		user_quality_retention_first_depositor_count_12: 99999,
		user_quality_retention_rate_13: 99.99,
		user_quality_retention_user_count_13: 99999,
		user_quality_retention_first_depositor_count_13: 99999,
		user_quality_retention_rate_14: 99.99,
		user_quality_retention_user_count_14: 99999,
		user_quality_retention_first_depositor_count_14: 99999,
		user_quality_retention_rate_15: 99.99,
		user_quality_retention_user_count_15: 99999,
		user_quality_retention_first_depositor_count_15: 99999,
		user_quality_retention_rate_16: 99.99,
		user_quality_retention_user_count_16: 99999,
		user_quality_retention_first_depositor_count_16: 99999,
		user_quality_retention_rate_17: 99.99,
		user_quality_retention_user_count_17: 99999,
		user_quality_retention_first_depositor_count_17: 99999,
		user_quality_retention_rate_18: 99.99,
		user_quality_retention_user_count_18: 99999,
		user_quality_retention_first_depositor_count_18: 99999,
		user_quality_retention_rate_19: 99.99,
		user_quality_retention_user_count_19: 99999,
		user_quality_retention_first_depositor_count_19: 99999,
		user_quality_retention_rate_20: 99.99,
		user_quality_retention_user_count_20: 99999,
		user_quality_retention_first_depositor_count_20: 99999,
		user_quality_retention_rate_21: 99.99,
		user_quality_retention_user_count_21: 99999,
		user_quality_retention_first_depositor_count_21: 99999,
		user_quality_retention_rate_22: 99.99,
		user_quality_retention_user_count_22: 99999,
		user_quality_retention_first_depositor_count_22: 99999,
		user_quality_retention_rate_23: 99.99,
		user_quality_retention_user_count_23: 99999,
		user_quality_retention_first_depositor_count_23: 99999,
		user_quality_retention_rate_24: 99.99,
		user_quality_retention_user_count_24: 99999,
		user_quality_retention_first_depositor_count_24: 99999,
		user_quality_retention_rate_25: 99.99,
		user_quality_retention_user_count_25: 99999,
		user_quality_retention_first_depositor_count_25: 99999,
		user_quality_retention_rate_26: 99.99,
		user_quality_retention_user_count_26: 99999,
		user_quality_retention_first_depositor_count_26: 99999,
		user_quality_retention_rate_27: 99.99,
		user_quality_retention_user_count_27: 99999,
		user_quality_retention_first_depositor_count_27: 99999,
		user_quality_retention_rate_28: 99.99,
		user_quality_retention_user_count_28: 99999,
		user_quality_retention_first_depositor_count_28: 99999,
		user_quality_retention_rate_29: 99.99,
		user_quality_retention_user_count_29: 99999,
		user_quality_retention_first_depositor_count_29: 99999,
		user_quality_retention_rate_30: 99.99,
		user_quality_retention_user_count_30: 99999,
		user_quality_retention_first_depositor_count_30: 99999,
  },
	{
    id: "8e8fd8fsdfd8fe8f8df8ef",
    user_quality_date_time: "2020-6-29 周三",
		user_quality_register_count: 99999,
		user_quality_ltv: 9.99,
		user_quality_retention_rate_1: 99.99,
		user_quality_retention_user_count_1: 99999,
		user_quality_retention_first_depositor_count_1: 99999,
		user_quality_retention_rate_2: 99.99,
		user_quality_retention_user_count_2: 99999,
		user_quality_retention_first_depositor_count_2: 99999,
		user_quality_retention_rate_3: 99.99,
		user_quality_retention_user_count_3: 99999,
		user_quality_retention_first_depositor_count_3: 99999,
		user_quality_retention_rate_4: 99.99,
		user_quality_retention_user_count_4: 99999,
		user_quality_retention_first_depositor_count_4: 99999,
		user_quality_retention_rate_5: 99.99,
		user_quality_retention_user_count_5: 99999,
		user_quality_retention_first_depositor_count_5: 99999,
		user_quality_retention_rate_6: 99.99,
		user_quality_retention_user_count_6: 99999,
		user_quality_retention_first_depositor_count_6: 99999,
		user_quality_retention_rate_7: 99.99,
		user_quality_retention_user_count_7: 99999,
		user_quality_retention_first_depositor_count_7: 99999,
		user_quality_retention_rate_8: 99.99,
		user_quality_retention_user_count_8: 99999,
		user_quality_retention_first_depositor_count_8: 99999,
		user_quality_retention_rate_9: 99.99,
		user_quality_retention_user_count_9: 99999,
		user_quality_retention_first_depositor_count_9: 99999,
		user_quality_retention_rate_10: 99.99,
		user_quality_retention_user_count_10: 99999,
		user_quality_retention_first_depositor_count_10: 99999,
		user_quality_retention_rate_11: 99.99,
		user_quality_retention_user_count_11: 99999,
		user_quality_retention_first_depositor_count_11: 99999,
		user_quality_retention_rate_12: 99.99,
		user_quality_retention_user_count_12: 99999,
		user_quality_retention_first_depositor_count_12: 99999,
		user_quality_retention_rate_13: 99.99,
		user_quality_retention_user_count_13: 99999,
		user_quality_retention_first_depositor_count_13: 99999,
		user_quality_retention_rate_14: 99.99,
		user_quality_retention_user_count_14: 99999,
		user_quality_retention_first_depositor_count_14: 99999,
		user_quality_retention_rate_15: 99.99,
		user_quality_retention_user_count_15: 99999,
		user_quality_retention_first_depositor_count_15: 99999,
		user_quality_retention_rate_16: 99.99,
		user_quality_retention_user_count_16: 99999,
		user_quality_retention_first_depositor_count_16: 99999,
		user_quality_retention_rate_17: 99.99,
		user_quality_retention_user_count_17: 99999,
		user_quality_retention_first_depositor_count_17: 99999,
		user_quality_retention_rate_18: 99.99,
		user_quality_retention_user_count_18: 99999,
		user_quality_retention_first_depositor_count_18: 99999,
		user_quality_retention_rate_19: 99.99,
		user_quality_retention_user_count_19: 99999,
		user_quality_retention_first_depositor_count_19: 99999,
		user_quality_retention_rate_20: 99.99,
		user_quality_retention_user_count_20: 99999,
		user_quality_retention_first_depositor_count_20: 99999,
		user_quality_retention_rate_21: 99.99,
		user_quality_retention_user_count_21: 99999,
		user_quality_retention_first_depositor_count_21: 99999,
		user_quality_retention_rate_22: 99.99,
		user_quality_retention_user_count_22: 99999,
		user_quality_retention_first_depositor_count_22: 99999,
		user_quality_retention_rate_23: 99.99,
		user_quality_retention_user_count_23: 99999,
		user_quality_retention_first_depositor_count_23: 99999,
		user_quality_retention_rate_24: 99.99,
		user_quality_retention_user_count_24: 99999,
		user_quality_retention_first_depositor_count_24: 99999,
		user_quality_retention_rate_25: 99.99,
		user_quality_retention_user_count_25: 99999,
		user_quality_retention_first_depositor_count_25: 99999,
		user_quality_retention_rate_26: 99.99,
		user_quality_retention_user_count_26: 99999,
		user_quality_retention_first_depositor_count_26: 99999,
		user_quality_retention_rate_27: 99.99,
		user_quality_retention_user_count_27: 99999,
		user_quality_retention_first_depositor_count_27: 99999,
		user_quality_retention_rate_28: 99.99,
		user_quality_retention_user_count_28: 99999,
		user_quality_retention_first_depositor_count_28: 99999,
		user_quality_retention_rate_29: 99.99,
		user_quality_retention_user_count_29: 99999,
		user_quality_retention_first_depositor_count_29: 99999,
		user_quality_retention_rate_30: 99.99,
		user_quality_retention_user_count_30: 99999,
		user_quality_retention_first_depositor_count_30: 99999,
  },
	{
    id: "8e8fd8fsdfd8fe8f8df8ef",
    user_quality_date_time: "2020-6-28 周二",
		user_quality_register_count: 99999,
		user_quality_ltv: 9.99,
		user_quality_retention_rate_1: 99.99,
		user_quality_retention_user_count_1: 99999,
		user_quality_retention_first_depositor_count_1: 99999,
		user_quality_retention_rate_2: 99.99,
		user_quality_retention_user_count_2: 99999,
		user_quality_retention_first_depositor_count_2: 99999,
		user_quality_retention_rate_3: 99.99,
		user_quality_retention_user_count_3: 99999,
		user_quality_retention_first_depositor_count_3: 99999,
		user_quality_retention_rate_4: 99.99,
		user_quality_retention_user_count_4: 99999,
		user_quality_retention_first_depositor_count_4: 99999,
		user_quality_retention_rate_5: 99.99,
		user_quality_retention_user_count_5: 99999,
		user_quality_retention_first_depositor_count_5: 99999,
		user_quality_retention_rate_6: 99.99,
		user_quality_retention_user_count_6: 99999,
		user_quality_retention_first_depositor_count_6: 99999,
		user_quality_retention_rate_7: 99.99,
		user_quality_retention_user_count_7: 99999,
		user_quality_retention_first_depositor_count_7: 99999,
		user_quality_retention_rate_8: 99.99,
		user_quality_retention_user_count_8: 99999,
		user_quality_retention_first_depositor_count_8: 99999,
		user_quality_retention_rate_9: 99.99,
		user_quality_retention_user_count_9: 99999,
		user_quality_retention_first_depositor_count_9: 99999,
		user_quality_retention_rate_10: 99.99,
		user_quality_retention_user_count_10: 99999,
		user_quality_retention_first_depositor_count_10: 99999,
		user_quality_retention_rate_11: 99.99,
		user_quality_retention_user_count_11: 99999,
		user_quality_retention_first_depositor_count_11: 99999,
		user_quality_retention_rate_12: 99.99,
		user_quality_retention_user_count_12: 99999,
		user_quality_retention_first_depositor_count_12: 99999,
		user_quality_retention_rate_13: 99.99,
		user_quality_retention_user_count_13: 99999,
		user_quality_retention_first_depositor_count_13: 99999,
		user_quality_retention_rate_14: 99.99,
		user_quality_retention_user_count_14: 99999,
		user_quality_retention_first_depositor_count_14: 99999,
		user_quality_retention_rate_15: 99.99,
		user_quality_retention_user_count_15: 99999,
		user_quality_retention_first_depositor_count_15: 99999,
		user_quality_retention_rate_16: 99.99,
		user_quality_retention_user_count_16: 99999,
		user_quality_retention_first_depositor_count_16: 99999,
		user_quality_retention_rate_17: 99.99,
		user_quality_retention_user_count_17: 99999,
		user_quality_retention_first_depositor_count_17: 99999,
		user_quality_retention_rate_18: 99.99,
		user_quality_retention_user_count_18: 99999,
		user_quality_retention_first_depositor_count_18: 99999,
		user_quality_retention_rate_19: 99.99,
		user_quality_retention_user_count_19: 99999,
		user_quality_retention_first_depositor_count_19: 99999,
		user_quality_retention_rate_20: 99.99,
		user_quality_retention_user_count_20: 99999,
		user_quality_retention_first_depositor_count_20: 99999,
		user_quality_retention_rate_21: 99.99,
		user_quality_retention_user_count_21: 99999,
		user_quality_retention_first_depositor_count_21: 99999,
		user_quality_retention_rate_22: 99.99,
		user_quality_retention_user_count_22: 99999,
		user_quality_retention_first_depositor_count_22: 99999,
		user_quality_retention_rate_23: 99.99,
		user_quality_retention_user_count_23: 99999,
		user_quality_retention_first_depositor_count_23: 99999,
		user_quality_retention_rate_24: 99.99,
		user_quality_retention_user_count_24: 99999,
		user_quality_retention_first_depositor_count_24: 99999,
		user_quality_retention_rate_25: 99.99,
		user_quality_retention_user_count_25: 99999,
		user_quality_retention_first_depositor_count_25: 99999,
		user_quality_retention_rate_26: 99.99,
		user_quality_retention_user_count_26: 99999,
		user_quality_retention_first_depositor_count_26: 99999,
		user_quality_retention_rate_27: 99.99,
		user_quality_retention_user_count_27: 99999,
		user_quality_retention_first_depositor_count_27: 99999,
		user_quality_retention_rate_28: 99.99,
		user_quality_retention_user_count_28: 99999,
		user_quality_retention_first_depositor_count_28: 99999,
		user_quality_retention_rate_29: 99.99,
		user_quality_retention_user_count_29: 99999,
		user_quality_retention_first_depositor_count_29: 99999,
		user_quality_retention_rate_30: 99.99,
		user_quality_retention_user_count_30: 99999,
		user_quality_retention_first_depositor_count_30: 99999,
  }
])

const handleDateRange = (date: string) => {
	if (dateRange?.value != null) {
		switch (date) {
			case "previous day":
				var date1 = new Date(dateRange.value[0]);
				var date2 = new Date(dateRange.value[1]);

				dateRange.value[0] = moment(date1).subtract(1, 'day').format('YYYY-MM-DD');
				dateRange.value[1] = moment(date2).subtract(1, 'day').format('YYYY-MM-DD');
				break;
			case "next day":
				var date1 = new Date(dateRange.value[0]);
				var date2 = new Date(dateRange.value[1]);

				dateRange.value[0] = moment(date1).subtract(-1, 'day').format('YYYY-MM-DD');
				dateRange.value[1] = moment(date2).subtract(-1, 'day').format('YYYY-MM-DD');
				break;
			case "today":
				dateRange.value[0] = moment().format('YYYY-MM-DD');
				dateRange.value[1] = moment().format('YYYY-MM-DD');
				buttonIndex.value = 0;
				break;
		}
	}  
}

const handleQuery = () => {
}

const handleExportLTV = () => {
}

const handleExportRetention = () => {
}
const handleReset = () => {
  handleDateRange('today');
}

const handleSearch = () => {
  getData();
}
onMounted(()=>{
  getData();
})
const getData = async () =>{
  
  let getUserQualityReportDataRes = await getUserQualityReport(user.token, dateRange.value, formData.value);
  userQualityReportList.value  = getUserQualityReportDataRes.data.data;
  total.value = getUserQualityReportDataRes.data.data.length;
}
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-card style="margin-top: 10px;">
          <el-row style="margin-top: 20px;">
            <el-form ref="formDataRef" :inline="true" style="width: 100%;">
              <el-form-item>
                <el-button  @click="handleDateRange('previous day')">前一天</el-button>
              </el-form-item>
              <el-form-item label="选择周期:">
                <el-date-picker type="daterange" v-model="dateRange" range-separator="至"
                  value-format="YYYY-MM-DD"></el-date-picker>
              </el-form-item>
              <el-form-item>
                  <el-button  @click="handleDateRange('next day')">后一天</el-button>
              </el-form-item>
              <el-form-item style="float: right;">
								<el-button @click="handleExportLTV">导出LTV</el-button>
                <el-button @click="handleExportRetention">导出留存</el-button>
                <el-button @click="handleReset" :icon="Refresh">重置</el-button>
                <el-button @click="handleSearch" :icon="Search">查新</el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </el-card>
        <div class="user-detail-header">
          <div >
						<el-checkbox @change = "handleReset" label="LTV" v-model="checked1" />
						<el-checkbox label="留存率" v-model="checked2" />
						<el-checkbox label="留存人数" v-model="checked3" />
						<el-checkbox label="毛利" v-model="checked4" />
						<el-checkbox label="新增充值金额" v-model="checked5" />
						<el-checkbox label="新增充值人数" v-model="checked6" />
						<el-checkbox label="新增提现金额" v-model="checked7" />
						<el-checkbox label="新增提现人数" v-model="checked8" />
          </div>
        </div>
        <el-card style="margin-top: 20px;">
          <el-table v-loading="loading" :data="userQualityReportList" style="width: 100%;" >
            <el-table-column label = "时间" align="left" prop="user_quality_date_time" width="120">
              <template #default="scope">
                <p>{{ scope.row.user_quality_date_time }}</p>
              </template>
            </el-table-column>
			<el-table-column label = "注册人数" align="left" prop="user_quality_register_count" width="120">
              <template #default="scope">
                <p>{{ scope.row.user_quality_register_count }}</p>
              </template>
            </el-table-column>
			<el-table-column v-if="checked1" label = "LTV" align="left" prop="user_quality_ltv" width="120">
              <template #default="scope">
                <p>{{ scope.row.user_quality_ltv }}</p>
              </template>
            </el-table-column>
			<el-table-column v-if="checked2" label = "1日留存率" align="center" prop="user_quality_retention_rate_1" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_1 }}%</p>
              </template>
            </el-table-column>
			<el-table-column v-if="checked3" label = "1日留存人数" align="center" prop="user_quality_retention_user_count_1" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_1 }}</p>
              </template>
            </el-table-column>
			<el-table-column label = "1日首充人数" align="center" prop="user_quality_retention_first_depositor_count_1" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_1 }}</p>
              </template>
            </el-table-column>
			<el-table-column v-if="checked2" label = "2日留存率" align="center" prop="user_quality_retention_rate_2" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_2 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "2日留存人数" align="center" prop="user_quality_retention_user_count_2" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_2 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "2日首充人数" align="center" prop="user_quality_retention_first_depositor_count_2" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_2 }}</p>
              </template>
            </el-table-column>
						<el-table-column  v-if="checked2" label = "3日留存率" align="center" prop="user_quality_retention_rate_3" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_3 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "3日留存人数" align="center" prop="user_quality_retention_user_count_3" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_3 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "3日首充人数" align="center" prop="user_quality_retention_first_depositor_count_3" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_3 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "4日留存率" align="center" prop="user_quality_retention_rate_4" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_4 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "4日留存人数" align="center" prop="user_quality_retention_user_count_4" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_4 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "4日首充人数" align="center" prop="user_quality_retention_first_depositor_count_4" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_4 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "5日留存率" align="center" prop="user_quality_retention_rate_5" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_5 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "5日留存人数" align="center" prop="user_quality_retention_user_count_5" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_5 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "5日首充人数" align="center" prop="user_quality_retention_first_depositor_count_5" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_5 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "6日留存率" align="center" prop="user_quality_retention_rate_6" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_6 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "6日留存人数" align="center" prop="user_quality_retention_user_count_6" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_6 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "6日首充人数" align="center" prop="user_quality_retention_first_depositor_count_6" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_6 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "7日留存率" align="center" prop="user_quality_retention_rate_7" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_7 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "7日留存人数" align="center" prop="user_quality_retention_user_count_7" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_7 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "7日首充人数" align="center" prop="user_quality_retention_first_depositor_count_7" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_7 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "8日留存率" align="center" prop="user_quality_retention_rate_8" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_8 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "8日留存人数" align="center" prop="user_quality_retention_user_count_8" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_8 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "8日首充人数" align="center" prop="user_quality_retention_first_depositor_count_8" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_8 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "9日留存率" align="center" prop="user_quality_retention_rate_9" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_9 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "9日留存人数" align="center" prop="user_quality_retention_user_count_9" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_9 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "9日首充人数" align="center" prop="user_quality_retention_first_depositor_count_9" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_9 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "10日留存率" align="center" prop="user_quality_retention_rate_10" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_10 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "10日留存人数" align="center" prop="user_quality_retention_user_count_10" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_10 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "10日首充人数" align="center" prop="user_quality_retention_first_depositor_count_10" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_10 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "11日留存率" align="center" prop="user_quality_retention_rate_11" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_11 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "11日留存人数" align="center" prop="user_quality_retention_user_count_11" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_11 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "11日首充人数" align="center" prop="user_quality_retention_first_depositor_count_11" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_11 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "12日留存率" align="center" prop="user_quality_retention_rate_12" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_12 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "12日留存人数" align="center" prop="user_quality_retention_user_count_12" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_12 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "12日首充人数" align="center" prop="user_quality_retention_first_depositor_count_12" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_12 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "13日留存率" align="center" prop="user_quality_retention_rate_13" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_13 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "13日留存人数" align="center" prop="user_quality_retention_user_count_13" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_13 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "13日首充人数" align="center" prop="user_quality_retention_first_depositor_count_13" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_13 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "14日留存率" align="center" prop="user_quality_retention_rate_14" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_14 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "14日留存人数" align="center" prop="user_quality_retention_user_count_14" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_14 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "14日首充人数" align="center" prop="user_quality_retention_first_depositor_count_14" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_14 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "15日留存率" align="center" prop="user_quality_retention_rate_15" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_15 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "15日留存人数" align="center" prop="user_quality_retention_user_count_15" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_15 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "15日首充人数" align="center" prop="user_quality_retention_first_depositor_count_15" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_15 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "16日留存率" align="center" prop="user_quality_retention_rate_16" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_16 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "16日留存人数" align="center" prop="user_quality_retention_user_count_16" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_16 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "16日首充人数" align="center" prop="user_quality_retention_first_depositor_count_16" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_16 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "17日留存率" align="center" prop="user_quality_retention_rate_17" width="110">
              <template #default="scope">
                <p class="bg-color-rate"> {{ scope.row.user_quality_retention_rate_17 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "17日留存人数" align="center" prop="user_quality_retention_user_count_17" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_17 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "17日首充人数" align="center" prop="user_quality_retention_first_depositor_count_17" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_17 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "18日留存率" align="center" prop="user_quality_retention_rate_18" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_18 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "18日留存人数" align="center" prop="user_quality_retention_user_count_18" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_18 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "18日首充人数" align="center" prop="user_quality_retention_first_depositor_count_18" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_18 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "19日留存率" align="center" prop="user_quality_retention_rate_19" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_19 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "19日留存人数" align="center" prop="user_quality_retention_user_count_19" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_19 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "19日首充人数" align="center" prop="user_quality_retention_first_depositor_count_19" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_19 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "20日留存率" align="center" prop="user_quality_retention_rate_20" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_20 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "20日留存人数" align="center" prop="user_quality_retention_user_count_20" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_20 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "20日首充人数" align="center" prop="user_quality_retention_first_depositor_count_20" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_20 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "21日留存率" align="center" prop="user_quality_retention_rate_21" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_21 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "21日留存人数" align="center" prop="user_quality_retention_user_count_21" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_21 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "21日首充人数" align="center" prop="user_quality_retention_first_depositor_count_21" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_21 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "22日留存率" align="center" prop="user_quality_retention_rate_22" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_22 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "22日留存人数" align="center" prop="user_quality_retention_user_count_22" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_22 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "22日首充人数" align="center" prop="user_quality_retention_first_depositor_count_22" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_22 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "23日留存率" align="center" prop="user_quality_retention_rate_23" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_23 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "23日留存人数" align="center" prop="user_quality_retention_user_count_23" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_23 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "23日首充人数" align="center" prop="user_quality_retention_first_depositor_count_23" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_23 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "24日留存率" align="center" prop="user_quality_retention_rate_24" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_24 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "24日留存人数" align="center" prop="user_quality_retention_user_count_24" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_24 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "24日首充人数" align="center" prop="user_quality_retention_first_depositor_count_24" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_24 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "25日留存率" align="center" prop="user_quality_retention_rate_25" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_25 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "25日留存人数" align="center" prop="user_quality_retention_user_count_25" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_25 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "25日首充人数" align="center" prop="user_quality_retention_first_depositor_count_25" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_25 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "26日留存率" align="center" prop="user_quality_retention_rate_26" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_26 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "26日留存人数" align="center" prop="user_quality_retention_user_count_26" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_26 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "26日首充人数" align="center" prop="user_quality_retention_first_depositor_count_26" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_26 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "27日留存率" align="center" prop="user_quality_retention_rate_27" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_27 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "27日留存人数" align="center" prop="user_quality_retention_user_count_27" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_27 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "27日首充人数" align="center" prop="user_quality_retention_first_depositor_count_27" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_27 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "28日留存率" align="center" prop="user_quality_retention_rate_28" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_28 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "28日留存人数" align="center" prop="user_quality_retention_user_count_28" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_28 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "28日首充人数" align="center" prop="user_quality_retention_first_depositor_count_28" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_28 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "29日留存率" align="center" prop="user_quality_retention_rate_29" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_29 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "29日留存人数" align="center" prop="user_quality_retention_user_count_29" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_29 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "29日首充人数" align="center" prop="user_quality_retention_first_depositor_count_29" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_29 }}</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked2" label = "30日留存率" align="center" prop="user_quality_retention_rate_30" width="110">
              <template #default="scope">
                <p class="bg-color-rate">{{ scope.row.user_quality_retention_rate_30 }}%</p>
              </template>
            </el-table-column>
						<el-table-column v-if="checked3" label = "30日留存人数" align="center" prop="user_quality_retention_user_count_30" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_user_count_30 }}</p>
              </template>
            </el-table-column>
						<el-table-column label = "30日首充人数" align="center" prop="user_quality_retention_first_depositor_count_30" width="110">
              <template #default="scope">
                <p>{{ scope.row.user_quality_retention_first_depositor_count_30 }}</p>
              </template>
            </el-table-column>
          </el-table>
					<div style="float: right;">
            <pagination v-if="total > 0" :total="total" v-model:page="formData.pageNum"
              v-model:limit="formData.pageSize" @pagination="handleQuery" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.bg-color-rate {
	background-color: #80ffcc;
}
.el-form-item {
	margin-right: 20px!important;
}
.user-detail-header {
  padding-top: 20px;
  display: flex;
  align-items: center;
}
</style>