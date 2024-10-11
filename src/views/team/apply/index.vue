<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="班级" prop="inClass">
        <el-input
          v-model="queryParams.inClass"
          placeholder="请输入班级"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-date-picker clearable size="small"
          v-model="queryParams.birthday"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择生日">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="教育背景 0为中职  1为普高   2为其他" prop="education">
        <el-input
          v-model="queryParams.education"
          placeholder="请输入教育背景 0为中职  1为普高   2为其他"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="性别 true为男 false为女" prop="gender">
        <el-select v-model="queryParams.gender" placeholder="请选择性别 true为男 false为女" clearable size="small">
          <el-option
            v-for="dict in dict"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="家乡" prop="hometown">
        <el-input
          v-model="queryParams.hometown"
          placeholder="请输入家乡"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="老学校" prop="oldSchool">
        <el-input
          v-model="queryParams.oldSchool"
          placeholder="请输入老学校"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计划" prop="plan">
        <el-input
          v-model="queryParams.plan"
          placeholder="请输入计划"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="语言熟练度" prop="programming">
        <el-input
          v-model="queryParams.programming"
          placeholder="请输入语言熟练度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="qq号" prop="qq">
        <el-input
          v-model="queryParams.qq"
          placeholder="请输入qq号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="留言" prop="remarks">
        <el-input
          v-model="queryParams.remarks"
          placeholder="请输入留言"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报名时间" prop="applyTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.applyTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择报名时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['team:apply:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['team:apply:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['team:apply:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['team:apply:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="applyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="姓名" align="center" prop="name" />
      <el-table-column label="班级" align="center" prop="inClass" />
      <el-table-column label="生日" align="center" prop="birthday" width="180">
        <template slot-scope="scope">
          {{ scope }}
          <!-- <span>{{ parseTime(scope.row.birthday, '{y}-{m}-{d}') }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="教育背景 0为中职  1为普高   2为其他" align="center" prop="education" />
      <el-table-column label="性别 true为男 false为女" align="center" prop="gender">
        <template slot-scope="scope">
          {{ scope }}
          <!-- <dict-tag :options="dict" :value="scope.row.gender"/> -->
        </template>
      </el-table-column>
      <el-table-column label="家乡" align="center" prop="hometown" />
      <el-table-column label="老学校" align="center" prop="oldSchool" />
      <el-table-column label="手机号" align="center" prop="phone" />
      <el-table-column label="计划" align="center" prop="plan" />
      <el-table-column label="语言熟练度" align="center" prop="programming" />
      <el-table-column label="qq号" align="center" prop="qq" />
      <el-table-column label="留言" align="center" prop="remarks" />
      <el-table-column label="报名时间" align="center" prop="applyTime" width="180">
        <template slot-scope="scope">
          {{ scope }}
          <!-- <span>{{ parseTime(scope.row.applyTime, '{y}-{m}-{d}') }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['team:apply:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['team:apply:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改Team对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="班级" prop="inClass">
          <el-input v-model="form.inClass" placeholder="请输入班级" />
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker clearable size="small"
            v-model="form.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择生日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="教育背景 0为中职  1为普高   2为其他" prop="education">
          <el-input v-model="form.education" placeholder="请输入教育背景 0为中职  1为普高   2为其他" />
        </el-form-item>
        <el-form-item label="性别 true为男 false为女" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别 true为男 false为女">
            <el-option
              v-for="dict in dict"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="家乡" prop="hometown">
          <el-input v-model="form.hometown" placeholder="请输入家乡" />
        </el-form-item>
        <el-form-item label="老学校" prop="oldSchool">
          <el-input v-model="form.oldSchool" placeholder="请输入老学校" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="计划" prop="plan">
          <el-input v-model="form.plan" placeholder="请输入计划" />
        </el-form-item>
        <el-form-item label="语言熟练度" prop="programming">
          <el-input v-model="form.programming" placeholder="请输入语言熟练度" />
        </el-form-item>
        <el-form-item label="qq号" prop="qq">
          <el-input v-model="form.qq" placeholder="请输入qq号" />
        </el-form-item>
        <el-form-item label="留言" prop="remarks">
          <el-input v-model="form.remarks" placeholder="请输入留言" />
        </el-form-item>
        <el-form-item label="报名时间" prop="applyTime">
          <el-date-picker clearable size="small"
            v-model="form.applyTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择报名时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listApply, getApply, delApply, addApply, updateApply } from "@/api/apply";

export default {
  name: "Apply",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // Team表格数据
      applyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        inClass: null,
        birthday: null,
        education: null,
        gender: null,
        hometown: null,
        oldSchool: null,
        phone: null,
        plan: null,
        programming: null,
        qq: null,
        remarks: null,
        applyTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询Team列表 */
    getList() {
      this.loading = true;
      listApply(this.queryParams).then(response => {
        this.applyList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        inClass: null,
        birthday: null,
        education: null,
        gender: null,
        hometown: null,
        oldSchool: null,
        phone: null,
        plan: null,
        programming: null,
        qq: null,
        remarks: null,
        applyTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加Team";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getApply(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改Team";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateApply(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addApply(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除Team编号为"' + ids + '"的数据项？').then(function() {
        return delApply(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('team/apply/export', {
        ...this.queryParams
      }, `apply_${new Date().getTime()}.xlsx`)
    }
  },
  computed:{
  dict(){
    const { proxy } = getCurrentInstance();
    const { sys_normal_disable } = proxy.useDict("sys_user_sex");
    return sys_normal_disable;
  }
  },
};
</script>
