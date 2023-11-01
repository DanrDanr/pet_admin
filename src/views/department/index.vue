<template>
  <div class="app-container">
    <!--    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />-->
    <div class="left-block">

      <div class="sidebar-action">
        <el-button icon="el-icon-plus" @click="toAddDepartmentPage">新增部门</el-button>
        <el-button icon="el-icon-delete" @click="deleteDepartment">删除部门</el-button>
      </div>

      <el-tree
        ref="tree2"
        :data="data1"
        :props="defaultProps"
        :filter-node-method="filterNode"
        class="filter-tree"
        default-expand-all
      />
    </div>

    <div class="right-block">
      <div class="sidebar-action">
        <el-button icon="el-icon-plus">新增人员</el-button>
        <el-button icon="el-icon-delete">批量删除</el-button>
      </div>
      <el-table :data="tableData" border>
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="phone" label="手机号码" width="180"/>
        <el-table-column prop="age" label="年龄" width="180" />
        <el-table-column prop="state" label="状态" width="180"/>
        <el-table-column prop="did" label="所属部门" width="180"/>
        <el-table-column label="操作" width="180">
          <el-button
            size="mini"
            @click="handleEdit()"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete()"
          >删除</el-button>
        </el-table-column>
      </el-table>

      <el-pagination
        :current-page="page"
        :page-size="size"
        :total="total"
        @current-change="currentChange"
      />
    </div>
  </div>

</template>

<script>
import { list } from '@/api/department'
import { tableData } from '@/api/table'
import { deleteDepartment } from '@/api/department'

export default {
  data() {
    return {
      filterText: '',
      data1: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      tableData: [],
      page: '',
      size: '',
      total: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  }, created() {
    this.treeData()
    this.fetchData()
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    treeData() {
      this.listLoading = true
      list().then(Response => {
        this.data = Response.data
        this.data1 = this.data
      })
    },

    fetchData() {
      const params = {
        page: this.page,
        size: this.size
      }
      this.listLoading = true
      tableData(params).then(response => {
        this.data = response.data
        this.tableData = this.data
      })
    },
    currentChange(page) {
      this.page = page
      this.fetchData()
    },
    toAddDepartmentPage() {
      const r = this.$refs.tree2.getCurrentNode()
      console.log(r)
      if (r) {
        this.$router.push({ name: 'Create', params: { data: r }})
      } else {
        const d1 = this.data1[0]
        this.$router.push({ name: 'Create', params: { data: d1 }})
      }
      // 获取当前的企业是那个
      // this.$router.push({ path: '/department/create' })
    },

    deleteDepartment() {
      const currentNode = this.$refs.tree2.getCurrentNode()
      if (!currentNode) {
        this.$message.warning('请选择要删除的部门')
        return
      }
      const departmentId = currentNode.id
      this.$confirm('确认删除该部门吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteDepartment({ id: departmentId })
            .then(() => {
              // 处理删除成功的情况
              this.treeData()
              this.fetchData()
              this.$message.success('部门删除成功')
            })
            .catch(error => {
              // 处理删除失败的情况
              console.error('删除部门失败', error)
              this.$message.error('部门删除失败')
            })
        })
    },
    handleEdit() {

    },
    handleDelete() {

    }
  }
}
</script>

<style scoped>
.sidebar-action {
  margin-bottom: 16px;
  margin-top: 18px;
}

.app-container {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  padding-right: 8px;
}

.left-block {
  width: 300px;
  flex-grow: 1;
  margin-left: 32px;
  margin-right: 32px;
  border-right: 2px solid gainsboro;
}

.right-block {
  flex-grow: 2;
}
</style>

