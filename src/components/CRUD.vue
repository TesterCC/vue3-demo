<template>
  <!-- 创建根元素防止变量冲突 -->
  <div class="table-box">
    <!-- title zone -->
    <div class="title">
      <h2>Simple CRUD Demo</h2>
      <!-- query zone -->
      <div class="query-box">
        <el-input v-model="queryInput" placeholder="Please input keywords" />
        <el-button type="primary">Add</el-button>
      </div>
      <!-- table zone  -->

      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="120" />
        <el-table-column prop="address" label="Address" width="600" />
        <el-table-column prop="zip" label="Zip" width="120" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default>
            <el-button link type="primary" size="small" @click="handleRowClick">Detail</el-button>
            <el-button link type="primary" size="small">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// data
let queryInput = ref("")

// method
const handleRowClick = () => {
  console.log('click')
}



const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]


</script>

<style scoped>
.table-box {
  width: 800px;
  position: absolute;
  top: 25%;
  left: 25%;
  transform: translateX(-25%, -25%);
}
/* https://www.bilibili.com/video/BV11e4y1Q7Xk  todo 6 布局优化
*/
</style>
