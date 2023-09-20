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
        <!-- <el-table-column fixed prop="date" label="Date" width="150" /> -->
        <!-- <el-table-column prop="date" label="Date" width="150" /> -->
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="Name" width="100" />
        <el-table-column prop="email" label="Email" width="120" />
        <el-table-column prop="phone" label="Phone" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="address" label="Address" width="600" />
        <!-- 自动扩充 -->
        <!-- <el-table-column prop="address" label="Address" />   -->
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default>
            <!-- <el-button link type="primary" size="small" @click="handleRowClick">Detail</el-button> -->
            <el-button link type="primary" size="small" @click="handleRowClick" style="color: #F56C6C;">Delete
            </el-button>
            <el-button link type="primary" size="small">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- dialog zone -->
      <el-dialog v-model="dialogTableVisible" title="add new item">
        <el-table :data="gridData">
          <el-table-column property="date" label="Date" width="150" />
          <el-table-column property="name" label="Name" width="200" />
          <el-table-column property="address" label="Address" />
        </el-table>
      </el-dialog>

      <!-- Form -->

      <el-dialog v-model="dialogFormVisible" :title="dialogType === 'add' ? 'Add' : 'Edit'">
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
            <!-- <el-button type="primary" @click="dialogFormVisible = false"> -->
            <el-button type="primary" @click="dialogConfirm">
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
// 用了$ref就不能用watch监听，如果要用监听，还是得用ref
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

let dialogType = ref('add')

let tableData = ref([
  {
    id: "1",
    name: 'Bob',
    email: "Bob@test.com",
    phone: "13777777777",
    state: "online",
    address: "Guangdong, Shenzhen"
  },
  {
    id: "2",
    name: 'Alan',
    email: "Alan@test.com",
    phone: "13666777777",
    state: "online",
    address: "Zhejiang, Hangzhou"
  }
])


// method
const handleRowClick = () => {
  console.log('click')
}

const handleSelectionChange = (val) => {
  multipleSelection.value = val
  console.log(val)
}

// click button method
const handleAdd = () => {
  dialogFormVisible.value = true
  // console.log(dialogFormVisible.value)
  tableForm.value = {}
}

const dialogConfirm = () => {
  dialogFormVisible.value = false
  // 1. get front-end data

  // 2. add data to table
  tableData.value.push({
    id: (tableData.value.length + 1).toString(),
    ...tableForm.value
  })
  console.log(tableData.value)
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
