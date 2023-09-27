<script setup lang="ts">
const props = defineProps({
  labels: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['checkboxChanged']);

const handleChange = (plabels : any)=>{
  setBelowChecks(plabels, plabels.state);
  emit('checkboxChanged');
}

const setBelowChecks = (plabels : any, state : boolean) =>{
  if(plabels.child.length == 0)
    plabels.state = state;
  for(let i = 0; i < plabels.child.length; i ++)
    setBelowChecks(plabels.child[i], state);
  plabels.state = state;
  plabels.indeterminate = false;
}

</script>

<template>

  <el-collapse v-if="labels.child.length > 0">
      <el-collapse-item>
          <template #title>
            <el-checkbox v-model="labels.state" label="全选" @click.stop @change="handleChange(labels)" :indeterminate="labels.indeterminate"/>
            <div style="margin-left:0.5rem; width: 100%;">{{labels.label}}</div>
          </template>
          <template #default>
            <Custom  style="margin-left: 2rem" v-for="(child, index) in labels.child" :labels="child" :key="index + 10000" @checkbox-changed="()=>{emit('checkboxChanged')}"></Custom>
          </template>
      </el-collapse-item>
  </el-collapse>
  <template v-else>
    <el-checkbox v-if="labels.label != ''" v-model ="labels.state" @click.stop @change="handleChange(labels)">{{ labels.label }} </el-checkbox>
  </template>
</template>


<style>

  .el-collapse-item__header{
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
  i{
    margin-left: 2px;
  }
</style>