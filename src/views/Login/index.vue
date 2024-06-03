<script setup>
//定义表单对象
import {ElMessage} from "element-plus";
import 'element-plus/theme-chalk/el-message.css'
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/userStore.js";
const userStore = useUserStore()
const form = ref({
  account: "",
  password: "",
  /*校验是否勾选同意协议*/
  agree: true
})

//规则数据校验
const rules = {
  //trigger为触发器，当失去焦点的时候才触发
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur"}
  ],
  agree: [
    {
      /**
       * validator经常在规则中与el-form和el-form-item组件一起使用，通过prop属性将规则映射到表单字段。
       * @param rule 本规则
       * @param value 用户输入的值
       * @param callback 回调函数
       */
      validator(rule, value, callback){
        // console.log(value) true为用户勾选了
        if(value){
          callback()//表示校验通过
        }else {
          callback(new Error('请勾选同意协议'))
        }
      }
    }
  ]
}
/**
 *
 * formRef.value访问了ref所指向的实际值，即表单组件实例。
 * validate是Element UI的el-form组件提供的方法，用于触发整个表单的验证过程。
 * (valid)=>{...}是一个回调函数，当验证完成后会被调用。
 * valid参数是一个布尔值，表示整个表单的验证结果。如果所有表单项都通过验证，
 * valid为true；如果有任何一项验证失败，valid为false。
 */
const formRef = ref(null)
const router = useRouter();
const doLogin =()=>{
  //所有验证通过才执行登录方法
  formRef.value.validate(async (valid)=>{
    // console.log(valid)
    if(valid){
      //验证通过就需要发送后端接口了
      const {account,password} = form.value
      // console.log(account,password)
      const res = await userStore.getUserInfo({account,password})
      console.log("====res==")
      console.dir(res)
      //因为账号密码输入错误我们会报错所以我们需要异常捕获
      ElMessage({type:'success',message:'登录成功'})
      router.replace({path: '/'})
    }
  })
}
</script>


<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">快乐小狗的商铺</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <div class="account-box">
          <div class="form" >
            <!--关于:model,需要这么做，绑定好之后我们的设置的每条规则才能全都生效-->
            <!--关于:rules ,这也是我们el-form里面有的属性，我们设置好对应的要生效的规则，-->
            <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="60px"
                     status-icon>
              <!--关于prop="account"，我们prop接收找到要验证的规则的对象，才能执行判断-->
              <el-form-item  label="账户" prop="account">
                <el-input v-model="form.account"/>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password"  show-password/>
              </el-form-item>

              <el-form-item label-width="22px" prop="agree">
                <el-checkbox  size="large" v-model="form.agree">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; 快乐小狗的商铺</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang='scss'>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}
</style>