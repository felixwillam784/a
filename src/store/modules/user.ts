import { defineStore } from 'pinia';
import { UserState } from './types';

import { localStorage } from '@/utils/storage';
import { loginApi, logoutApi } from '@/api/auth';
import { getUserInfo } from '@/api/system/user';
import { resetRouter } from '@/router';
import { LoginForm } from '@/api/auth/types';
import { NetworkData } from '@/net/NetworkData';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: localStorage.get('token') || '',
    name:"",
    id:-1,
    role_id:-1,
    nickname: '',
    avatar: 'https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif',
    roles: [],
    perms: ["sys:menu:delete", "sys:dept:edit", "sys:dict_type:add", "sys:dict:edit", "sys:dict:delete", "sys:dict_type:edit", "sys:menu:add", "sys:user:add", "sys:role:edit", "sys:dept:delete", "sys:user:edit", "sys:user:delete", "sys:user:reset_pwd", "sys:dept:add", "sys:role:delete", "sys:dict_type:delete", "sys:menu:edit", "sys:dict:add", "sys:role:add"],
  }),
  actions: {
    async RESET_STATE() {
      this.$reset();
    },
    /**
     * 登录
     */
    login(data: LoginForm) {
      const { username, password, verifyCode, verifyCodeKey } = data;

      // let res = axios.post('http://45.32.120.156:8020/api/admin/login', {name:username, password:password}).then((res) => {
      //   console.log(res)
      // }).catch((error) => {
      //   console.log(error)
      // })

      // console.log(res);

      return new Promise((resolve, reject) => {
        loginApi({
          name: username.trim(),
          password: password,
          // grant_type: 'captcha',
          // verifyCode: verifyCode,
          // verifyCodeKey: verifyCodeKey,
        })
          .then((response) => {
            console.log('>>>>>>>>>>>')
            // const { token } = response;
            // // const access_token = tokenType + ' ' + accessToken;
            localStorage.set('token', 'Bearer ' + response.data.token);
            // // const networkData: NetworkData = NetworkData.getInstance();
            // // networkData.setToken(access_token);
            this.token = 'Bearer ' + response.data.token;
            this.name = response.data.name;
            this.id = response.data.id;
            this.role_id = response.data.role_id;
            
            console.log(response.data);
            console.log(this.id);
            console.log(this.role_id);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    

    /**
     *  注销
     */
    logout() {
      return new Promise((resolve, reject) => {
        logoutApi({}, this.token)
          .then((res) => {
            localStorage.remove('token');
            this.RESET_STATE();
            resetRouter();
            resolve(null);
          })
          .catch((error) => {
            /*if(error == 'Request failed with status code 401')
            {
              localStorage.remove('token');
              this.RESET_STATE();
              resetRouter();
              router.push(`/login?redirect=${route.fullPath}`);
            }*/
            reject(error);
          });
      });
    },

    /**
     *  获取用户信息（昵称、头像、角色集合、权限集合）
     */
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(({ data }) => {
            if (!data) {
              return reject('Verification failed, please Login again.');
            }
            const { nickname, avatar, roles, perms } = data;
            if (!roles || roles.length <= 0) {
              reject('getUserInfo: roles must be a non-null array!');
            }
            this.nickname = nickname;
            this.avatar = avatar;
            this.roles = roles;
            this.perms = perms;
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    /**
     * 清除 Token
     */
    resetToken() {
      return new Promise((resolve) => {
        localStorage.remove('token');
        this.RESET_STATE();
        resolve(null);
      });
    },
  },
});

export default useUserStore;
