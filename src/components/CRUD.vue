<template>
  <!-- 创建根元素防止变量冲突 -->
  <div class="table-box">
    <!-- title zone -->
    <div class="title">
      <h2>Simple CRUD Demo</h2>
      <!-- query zone -->
      <div class="query-box">
<!--        <el-input class="query-input" v-model="queryInput" placeholder="Please input keywords" @input="handleQueryName" @keydown.enter="enter" />-->
<!--        <el-input class="query-input" v-model="queryInput" placeholder="Please input keywords" @input="handleQueryName" />-->
<!--        use @change need user keydown enter-->
        <el-input class="query-input" v-model="queryInput" placeholder="Please input keywords" @change="handleQueryName" />

        <div class="btn-list">
          <el-button type="primary" @click="handleAdd">Add</el-button>
          <el-button type="danger" @click="handleDelList" v-if="multipleSelection.length > 0">Multi Delete</el-button>
        </div>

      </div>
      <!-- table zone  -->
      <el-table :data="tableData" style="width: 100%" border ref="multipleTableRef"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <!-- <el-table-column fixed prop="date" label="Date" width="150" /> -->
        <!-- <el-table-column prop="date" label="Date" width="150" /> -->
        <el-table-column prop="ID" label="ID" width="80" />
        <el-table-column prop="name" label="Name" width="100" />
        <el-table-column prop="email" label="Email" width="130" />
        <el-table-column prop="phone" label="Phone" width="120" />
        <el-table-column prop="state" label="State" width="100" />
        <el-table-column prop="address" label="Address" width="600" />
        <!-- 自动扩充 -->
        <!-- <el-table-column prop="address" label="Address" />   -->
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default="scope">
            <!-- <el-button link type="primary" size="small" @click="handleRowClick">Detail</el-button> -->
            <el-button link type="primary" size="small" @click="handleRowDel(scope.row)" style="color: #F56C6C;">
              Delete
            </el-button>
            <el-button link type="primary" size="small" @click="handleEdit(scope.row)">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          background
          layout="prev, pager, next"
          style="display: flex; justify-content: center; margin-top: 20px;"
          :total="total"
          v-model:current-page="curPage"
          @current-change="handleChangePage"
      />

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
import request from "/src/utils/request.js"

// data

let total = ref(10)
let curPage = ref(1)

// 用了$ref就不能用watch监听，如果要用监听，还是得用ref
let queryInput = ref("")
let multipleSelection = ref([])

let dialogTableVisible = ref(false)
let dialogFormVisible = ref(false)

// increase id initial
let counter = ref(3)

let formLabelWidth = '80'

let tableForm = ref({
  name: "Bob",
  email: "Bob@test.com",
  phone: "13777777777",
  state: "online",
  address: "Guangdong, Shenzhen"
})

let dialogType = ref('add')

// mock data if can't connect databse
let tableData = ref([
  {
    id: "1",
    name: 'Alan',
    email: "Alan@test.com",
    phone: "13666777777",
    state: "online",
    address: "Zhejiang, Hangzhou"
  },
  {
    id: "2",
    name: 'Bob',
    email: "Bob@test.com",
    phone: "13777777777",
    state: "online",
    address: "Guangdong, Shenzhen"
  },
  {
    id: "3",
    name: 'Chris',
    email: "Chris@test.com",
    phone: "15282223133",
    state: "online",
    address: "Beijing"
  },
])

// bug use same data source
// let tableDataCopy = Object.assign(tableData)
let tableDataCopy = JSON.parse(JSON.stringify(tableData.value));

/*
Object.assign 方法执行的是浅拷贝操作，它会将 tableData 的引用复制给 tableDataCopy，而不是创建一个新的数组。这意味着 tableDataCopy 和 tableData 实际上指向了同一个数组对象。

当你在 handleQueryName 函数中将 tableData.value 更新为过滤后的结果时，tableDataCopy.value 的值也会随之改变，因为它们指向同一个数组对象。因此，即使你清空了 queryInput 的输入内容，tableData.value 仍显示过滤后的结果，因为它们共享相同的数据源。

如果你希望在清空 queryInput 时恢复原始的 tableData，你可以使用深拷贝而不是浅拷贝来复制 tableData。这样，tableDataCopy 将成为一个独立的数组对象，不会受到 tableData 的更改的影响。
*/

// method

const getTableData = async (cur = 1) => {
  // http://localhost:3001/user/list?pageNum=3&pageSize=2
  // baseURL 已有的部分不用再写
  // let res = await request.get('/user/list', {
  // after set proxy

  // method 1 第一种请求方式 推荐
  let res = await request.get('/list', {
    pageSize: 10,
    pageNum: cur
  })

  console.log(res);

  // // method 2 第二种请求方式 不推荐
  // let res = request.get(`/list/?pageSize=10&pageNum=${cur}`)
  // console.log(res)

  tableData.value = res.list
  total.value = res.total
  curPage.value = res.pageNum
}
getTableData()


// 请求分页
const handleChangePage = (val) =>{
  getTableData(curPage.value)
}


// Search
const handleQueryName = async (val) => {
  // same
  // console.log(queryInput.value)
  // console.log(val) 

  // // just frontend, to request backend api is not recommend
  // if (val.length > 0) {
  //   // tableData.value = tableData.value.filter(item => (item.name).toLocaleLowerCase().match(val))  // 大小写不敏感
  //   tableData.value = tableData.value.filter(item => item.name.match(val))
  // } else {
  //   // fixme: clear val cannot recover tableData
  //   console.log("[Debug0] ", tableData)
  //
  //   tableData.value = tableDataCopy
  //   console.log("[Debug1] ", tableDataCopy)
  // }

  console.log("[D] search keywords: ", val)

  if (val.length > 0) {
    tableData.value = await request.get(`/list/${val}`)
  } else {
    await getTableData(curPage)
  }
}

// Edit
const handleEdit = (row) => {
  // console.log(row)
  dialogFormVisible.value = true
  dialogType.value = 'edit'
  console.log(dialogType.value)
  tableForm.value = { ...row }
}

// Add click button method
const handleAdd = () => {
  dialogFormVisible.value = true
  // console.log(dialogFormVisible.value)
  tableForm.value = {}
  dialogType.value = 'add'
}

// 删除这里只需要获取到id，不需要完整的row， 通过 {id}结构赋值获取id
const handleRowDel = async ({ ID }) => {
  // 由于箭头函数没有自己的 arguments 对象和 this 值，因此无法直接使用 arguments.callee.name 获取当前函数的名称
  // console.log(handleRowDel.name)
  // console.log(row)
  console.log("[D] row id: " + ID)

  // // just operation in front-end
  // // 1. 通过id获取到条目对应的索引值
  // let index = tableData.value.findIndex(item => item.id === id)
  // console.log("[D] row index: " + index)
  //
  // // 2. 通过索引值进行删除对应条目
  // tableData.value.splice(index, 1)

  let res = await request.delete(`/delete/${ID}`)

  console.log(res); // for debug

  await getTableData(curPage.value)

}

const handleSelectionChange = (val) => {
  // multipleSelection.value = val
  // console.log(val)

  multipleSelection.value = []
  val.forEach(item => {
    multipleSelection.value.push(item.ID)
  });
  console.log(multipleSelection.value)
}

// click button to multi select delete
const handleDelList = () => {
  multipleSelection.value.forEach(ID => {
    // according id to delete item data
    handleRowDel({ ID })
  })
  multipleSelection.value = []

}

// ext clear input with enter key
let enter = () => {
  queryInput.value = ""
}


const dialogConfirm = async () => {
  dialogFormVisible.value = false

  // 0. check dialogType

  if (dialogType.value === 'add') {
    // 1. get front-end data
    // 2. add data to table

    // // 2.5. counter update
    // counter.value += 1
    //
    // // just front-end add
    // tableData.value.push({
    //   // id: (tableData.value.length + 1).toString(), // have some bug when delete
    //   id: counter.value.toString(),
    //   ...tableForm.value
    // })

    // add data to back-end api
    let res = await request.post('/add', {
      ...tableForm.value
    })

    // console.log(res)  // debug

    // refresh page data
    await getTableData(curPage.value)


  } else if (dialogType.value === 'edit') {

    // // just front-end operation
    // // 1. get current row index
    // let index = tableData.value.findIndex(item => item.id === tableForm.value.id)
    // console.log("[D] row index: " + index)
    // // 2. instead current row data
    // tableData.value[index] = tableForm.value

    // edit data put to back-end api
    let res = await request.put(`/update/${tableForm.value.ID}`, {
      ...tableForm.value
    })

    console.log(res)  // debug

    // refresh current page data
    await getTableData(curPage.value)

  }
  // console.log(tableData.value)
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
