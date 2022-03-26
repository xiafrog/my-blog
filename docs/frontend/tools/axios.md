---
icon: stack
category: [前端, 工具]
tag: [前端, HTTP, Axios]
star: true
---

# Axios封装

Axios是前端中很常用的基于Promise的网络请求库，它封装了原生的XMLHttpRequests，可以添加各种配置和拦截器。

但是在日常使用中，我们通常会对Axios进行封装，引入一些自定义的配置，避免每次请求时，都需要写一遍配置。本文基于TypeScript + Vue3 + Vite的场景，对Axios进行了封装。

## 目标

我们需要将Axios封装为自己的MyRequest，将一些公共的功能，如BaseUrl、TimeOut、Token、Loading等公共功能配置在内，并且可以将响应中的数据取出返回。

因为使用TypeScript，所以我们对一些函数采用泛型的定义方式，从而获得IDE中的代码提示。

在拦截器方面，我们希望能够实现三层的封装：

- 全局层
- 实例层
- 单个请求层

同时对成功和错误的返回都能有所处理。

## 准备

首先要使用的Vite搭建基本的项目框架：

```sh
yarn create vite
```

在后面的选项中，我们选择Vue3 + TS的开发模板。

在新项目中，我们进行环境变量的配置，用于之后的使用。在根目录新建`.env.development`文件，作为开发环境的环境变量，生产环境需要在`.env.production`中配置。

```env
VITE_BASE_URL=/api
VITE_TIME_OUT=5000
```

注意，只有`VITE_`开头的环境变量才会被Vite所识别。

为了在使用环境变量时能够有类型提示，我们需要在`src/env.d.ts`文件中进行配置：

```ts{6,7}
// src/env.d.ts

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_TIME_OUT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

在其他文件中，我们可以通过`import.meta.env.VITE_BASE_URL`这样的方式访问到环境变量。

因为只是开发测试使用，所以我们最好设置代理，以避免跨域的问题：

```ts{7}
// vite.config.ts

export default defineConfig({
  ...,
  server: {
    proxy: {
      '/api': 'url', // 这里填写实际的url
    },
  },
});
```

## 初步封装

为了实现初步的封装，我们自定义了MyRequest类，封装了Axios实例：

```ts
// request/request.ts

class MyRequest {
  // axios实例
  instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    // 初始化实例配置
    this.instance = axios.create(config);
  }

  request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log('====', err);
          reject(err);
        });
    });
  }
}
```

接着我们创建实例，传入之前设定的环境变量：

```ts
// request/request.ts

const myRequest = new MyRequest({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: import.meta.env.VITE_TIME_OUT,
});

export default myRequest;
```

在调用时，我们只需要设置Url即可：

```ts
// App.vue

try {
  const res = await myRequest.request({
    url: 'url',
  });
  console.log(res);
} catch (err) {
  console.log('====', err);
}
```

这里利用Vue3中可以在顶层使用await的特性，获取相应的结果，同时使用`try...catch...`的方式捕获异常。

## 设置数据类型

上面的代码中，获取到的`res`类型为`any`。为了获得代码提示和类型检查，我们可以对`AxiosResponse`的泛型进行设置。

首先定义我们自己的后端响应数据类型，我们通常会在返回的数据，即`res.data`中再封装一层自己的响应类型，如果响应是成功的，则真正的数据会在`res.data.content`中。具体的数据结构如下所示：

```ts{4}
// request/request.ts

interface IDataType<T> {
  content: T;
  message: string;
  status: number;
}
```

其中泛型`T`为每次请求返回的数据类型，需要在请求的时候单独设置。因此，我们修改`request`函数：

```ts
// request/request.ts

class MyRequest {
  request<T = any>(
    config: AxiosRequestConfig<IDataType<T>>
  ): Promise<IDataType<T>> {
    return new Promise<IDataType<T>>((resolve, reject) => {
      this.instance
        .request<any, IDataType<T>>(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log('====', err);
          reject(err);
        });
    });
  }
}
```

使用时的调用方法不变，如需设置响应的数据类型，传入对应的泛型即可，默认为any。

## 全局拦截

我们在构造函数中实现的全局的请求和响应的拦截：

```ts{25}
// request/request.ts

class MyRequest {
    constructor(config: AxiosRequestConfig) {
    // 初始化实例配置
    this.instance = axios.create(config);

    // 全局请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        console.log(config);
        return config;
      },
      (error) => {
        console.log('全局请求失败拦截', error);
      }
    );

    // 全局响应拦截
    this.instance.interceptors.response.use(
      (res) => {
        // res为AxiosResponse类型
        console.log(res);
        // 取出其中的数据
        return res.data;
      },
      (error) => {
        console.log('全局响应失败拦截');
        console.log(error.request);
        console.log(error.response);
        return error;
      }
    );
  }
}
```

在响应成功时，我们直接取出了`res.data`中的数据。

## 实例拦截

我们需要在实例创建时，通过自定义配置的方式传入拦截器，因此我们需要实现自定义的拦截器接口和请求配置接口:

```ts
// request/request.ts

// 自定义拦截器接口
interface MyRequestInterceptors<T = AxiosResponse> {
  // 请求成功
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  // 请求失败
  requestInterceptorCatch?: (error: any) => any;
  // 响应成功
  responseInterceptor?: (res: T) => T;
  // 响应失败
  responseInterceptorCatch?: (error: any) => any;
}

// 自定义请求配置接口
interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyRequestInterceptors<T>;
}
```

并且在构造器中，实现实例级别的拦截：

```ts{7,9}
// request/request.ts

class MyRequest {
  ...

  // 实例拦截器
  interceptors?: MyRequestInterceptors;

  constructor(config: MyRequestConfig) {
    ...

    //从实例配置中获取拦截器配置
    this.interceptors = config.interceptors;

    ...

    // 实例级别拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
  }
}
```

这里将创建实例时的配置换成了自定义的类型，这样就跟传入自定义的实例级别的拦截器，并且保存在属性中。

在创建实例时，我们可以自定义实例级别的拦截器，例如设置token:

```ts{6-15}
// request/request.ts

const myRequest = new MyRequest({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: import.meta.env.VITE_TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 从localStorage中获取token
      // const token = localStorage.getItem('token');
      const token = 'This is a token';
      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
  },
});
```

## 单个请求拦截

我们需要在`request`函数中也传入自定义的拦截器配置：

```ts{8-11,16-19}
//request/request.ts

class MyRequest {
  request<T = any>(
    config: MyRequestConfig<IDataType<T>>
  ): Promise<IDataType<T>> {
    return new Promise<IDataType<T>>((resolve, reject) => {
      // 请求拦截器设置
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      this.instance
        .request<any, IDataType<T>>(config)
        .then((res) => {
          //响应拦截器设置
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          resolve(res);
        })
        .catch((err) => {
          console.log('====', err);
          reject(err);
        });
    });
  }
}
```

这样我们就能在请求时添加拦截器，例如实现取出`res.data.content`的功能：

```ts{6-10}
// App.vue

try {
  const res = await myRequest.post({
    url: 'url',
    // 单个请求的拦截器设置
    interceptors: {
      // 直接返回IDataType中的content
      responseInterceptor: (res) => res.content,
    },
  });
  console.log(res);
} catch (err) {
  console.log('====', err);
}
```

## get、post等方法的封装

最后，我们对get、post等方法进行封装。

```ts
// request/request.ts

class MyRequest {
  get<T = any>(config: MyRequestConfig<IDataType<T>>): Promise<IDataType<T>> {
    return this.request<T>({
      ...config,
      method: 'GET',
    });
  }

  post<T = any>(config: MyRequestConfig<IDataType<T>>): Promise<IDataType<T>> {
    return this.request<T>({
      ...config,
      method: 'POST',
    });
  }
}
```

调用方法和request相同。

## 完整代码

最后附上完整代码：

```ts
// request/request.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface IDataType<T> {
  content: T;
  message: string;
  status: number;
}

// 自定义拦截器接口
interface MyRequestInterceptors<T = AxiosResponse> {
  // 请求成功
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  // 请求失败
  requestInterceptorCatch?: (error: any) => any;
  // 响应成功
  responseInterceptor?: (res: T) => T;
  // 响应失败
  responseInterceptorCatch?: (error: any) => any;
}

// 自定义请求配置接口
interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyRequestInterceptors<T>;
}

class MyRequest {
  // axios实例
  instance: AxiosInstance;

  // 实例拦截器
  interceptors?: MyRequestInterceptors;

  constructor(config: MyRequestConfig) {
    // 初始化实例配置
    this.instance = axios.create(config);

    //从实例配置中获取拦截器配置
    this.interceptors = config.interceptors;

    // 全局请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        console.log(config);
        return config;
      },
      (error) => {
        console.log('全局请求失败拦截', error);
      }
    );

    // 全局响应拦截
    this.instance.interceptors.response.use(
      (res) => {
        // res为AxiosResponse类型
        console.log(res);
        // 取出其中的数据
        return res.data;
      },
      (error) => {
        console.log('全局响应失败拦截');
        console.log(error.request);
        console.log(error.response);
        return error;
      }
    );

    // 实例级别拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
  }

  request<T = any>(
    config: MyRequestConfig<IDataType<T>>
  ): Promise<IDataType<T>> {
    return new Promise<IDataType<T>>((resolve, reject) => {
      // 请求拦截器设置
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      this.instance
        .request<any, IDataType<T>>(config)
        .then((res) => {
          //响应拦截器设置
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          resolve(res);
        })
        .catch((err) => {
          console.log('====', err);
          reject(err);
        });
    });
  }

  get<T = any>(config: MyRequestConfig<IDataType<T>>): Promise<IDataType<T>> {
    return this.request<T>({
      ...config,
      method: 'GET',
    });
  }

  post<T = any>(config: MyRequestConfig<IDataType<T>>): Promise<IDataType<T>> {
    return this.request<T>({
      ...config,
      method: 'POST',
    });
  }
}

const myRequest = new MyRequest({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: import.meta.env.VITE_TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 从localStorage中获取token
      // const token = localStorage.getItem('token');
      const token = 'This is a token';
      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
  },
});

export default myRequest;
```

[参考文档](https://juejin.cn/post/7023006049732919309)
