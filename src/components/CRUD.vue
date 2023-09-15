<template>
  <!-- 创建根元素防止变量冲突 -->
  <div class="table-box">
    <!-- title zone -->
    <div class="title">
      <h2>Simple CRUD Demo</h2>
      <!-- query zone -->
      <div class="query-box">
        <el-input class="query-input" v-model="queryInput" placeholder="Please input keywords" />
        <el-button type="primary" @click="handleAdd">Add</el-button>
      </div>
      <!-- table zone  -->
      <el-table :data="tableData" style="width: 100%" border ref="multipleTableRef"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
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

      <!-- dialog zone -->
      <el-dialog v-model="dialogTableVisible" title="Shipping address">
        <el-table :data="gridData">
          <el-table-column property="date" label="Date" width="150" />
          <el-table-column property="name" label="Name" width="200" />
          <el-table-column property="address" label="Address" />
        </el-table>
      </el-dialog>

      <!-- Form -->

      <el-dialog v-model="dialogFormVisible" title="Shipping address">
        <el-form :model="tableForm">
          <el-form-item label="Name" :label-width="formLabelWidth">
            <el-input v-model="tableForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="E-mail" :label-width="formLabelWidth">
            <el-input v-model="tableForm.email" autocomplete="off" />
            <!-- mutl-select demo -->
            <!-- <el-select v-model="form.region" placeholder="Please select a zone">
              <el-option label="Zone No.1" value="shanghai" />
              <el-option label="Zone No.2" value="beijing" />
            </el-select> -->
          </el-form-item>
          <el-form-item label="Telephone" :label-width="formLabelWidth">
            <el-input v-model="tableForm.phone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="State" :label-width="formLabelWidth">
            <el-input v-model="tableForm.state" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Address" :label-width="formLabelWidth">
            <el-input v-model="tableForm.address" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <!-- <el-button @click="dialogFormVisible = false">Cancel</el-button> -->
            <el-button type="primary" @click="dialogFormVisible = false">
              Confirm
            </el-button>
          </span>
        </template>
      </el-dialog>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// data
let queryInput = ref("")
let multipleSelection = ref([])

let dialogTableVisible = ref(false)
let dialogFormVisible = ref(false)

let formLabelWidth = '80'

let tableForm = ref({
  name: "Bob",
  email: "Bob@test.com",
  phone: "13777777777",
  state: "online",
  address: "Guangdong, Shenzhen"
})


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


// method
const handleRowClick = () => {
  console.log('click')
}

const handleSelectionChange = (val) => {
  multipleSelection.value = val
  console.log(val)
}

const handleAdd = () => {
  dialogFormVisible.value = true
}



</script>

<style scoped>
/* .table-box {
  width: 800px;
  position: absolute;
  top: 25%;
  left: 25%;
  transform: translateX(-25%, -25%);
} */

.table-box {
  margin: 200px auto;
  width: 800px;
}


.title {
  text-align: center;
}

.query-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
  /* margin-bottom: 20px; */
}

.query-input {
  width: 200px;
}
</style>
