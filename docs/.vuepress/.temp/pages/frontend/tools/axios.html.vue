<template><h1 id="axios封装" tabindex="-1"><a class="header-anchor" href="#axios封装" aria-hidden="true">#</a> Axios封装</h1>
<p>Axios是前端中很常用的基于Promise的网络请求库，它封装了原生的XMLHttpRequests，可以添加各种配置和拦截器。</p>
<p>但是在日常使用中，我们通常会对Axios进行封装，引入一些自定义的配置，避免每次请求时，都需要写一遍配置。本文基于TypeScript + Vue3 + Vite的场景，对Axios进行了封装。</p>
<h2 id="目标" tabindex="-1"><a class="header-anchor" href="#目标" aria-hidden="true">#</a> 目标</h2>
<p>我们需要将Axios封装为自己的MyRequest，将一些公共的功能，如BaseUrl、TimeOut、Token、Loading等公共功能配置在内，并且可以将响应中的数据取出返回。</p>
<p>因为使用TypeScript，所以我们对一些函数采用泛型的定义方式，从而获得IDE中的代码提示。</p>
<p>在拦截器方面，我们希望能够实现三层的封装：</p>
<ul>
<li>全局层</li>
<li>实例层</li>
<li>单个请求层</li>
</ul>
<p>同时对成功和错误的返回都能有所处理。</p>
<h2 id="准备" tabindex="-1"><a class="header-anchor" href="#准备" aria-hidden="true">#</a> 准备</h2>
<p>首先要使用的Vite搭建基本的项目框架：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> create vite
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>在后面的选项中，我们选择Vue3 + TS的开发模板。</p>
<p>在新项目中，我们进行环境变量的配置，用于之后的使用。在根目录新建<code>.env.development</code>文件，作为开发环境的环境变量，生产环境需要在<code>.env.production</code>中配置。</p>
<div class="language-env ext-env line-numbers-mode"><pre v-pre class="language-env"><code>VITE_BASE_URL=/api
VITE_TIME_OUT=5000
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>注意，只有<code>VITE_</code>开头的环境变量才会被Vite所识别。</p>
<p>为了在使用环境变量时能够有类型提示，我们需要在<code>src/env.d.ts</code>文件中进行配置：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// src/env.d.ts</span>

<span class="token comment">/// &lt;reference types="vite/client" /></span>

<span class="token keyword">interface</span> <span class="token class-name">ImportMetaEnv</span> <span class="token punctuation">{</span>
  <span class="token keyword">readonly</span> <span class="token constant">VITE_BASE_URL</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token keyword">readonly</span> <span class="token constant">VITE_TIME_OUT</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">ImportMeta</span> <span class="token punctuation">{</span>
  <span class="token keyword">readonly</span> env<span class="token operator">:</span> ImportMetaEnv<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>在其他文件中，我们可以通过<code>import.meta.env.VITE_BASE_URL</code>这样的方式访问到环境变量。</p>
<p>因为只是开发测试使用，所以我们最好设置代理，以避免跨域的问题：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// vite.config.ts</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token operator">...</span><span class="token punctuation">,</span>
  server<span class="token operator">:</span> <span class="token punctuation">{</span>
    proxy<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">'/api'</span><span class="token operator">:</span> <span class="token string">'url'</span><span class="token punctuation">,</span> <span class="token comment">// 这里填写实际的url</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br></div><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="初步封装" tabindex="-1"><a class="header-anchor" href="#初步封装" aria-hidden="true">#</a> 初步封装</h2>
<p>为了实现初步的封装，我们自定义了MyRequest类，封装了Axios实例：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// request/request.ts</span>

<span class="token keyword">class</span> <span class="token class-name">MyRequest</span> <span class="token punctuation">{</span>
  <span class="token comment">// axios实例</span>
  instance<span class="token operator">:</span> AxiosInstance<span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 初始化实例配置</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">request</span><span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>AxiosResponse<span class="token operator">></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span><span class="token operator">&lt;</span>AxiosResponse<span class="token operator">></span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>instance
        <span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'===='</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>接着我们创建实例，传入之前设定的环境变量：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// request/request.ts</span>

<span class="token keyword">const</span> myRequest <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyRequest</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  baseURL<span class="token operator">:</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VITE_BASE_URL</span><span class="token punctuation">,</span>
  timeout<span class="token operator">:</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VITE_TIME_OUT</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> myRequest<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>在调用时，我们只需要设置Url即可：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// App.vue</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> myRequest<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    url<span class="token operator">:</span> <span class="token string">'url'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'===='</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>这里利用Vue3中可以在顶层使用await的特性，获取相应的结果，同时使用<code>try...catch...</code>的方式捕获异常。</p>
<h2 id="设置数据类型" tabindex="-1"><a class="header-anchor" href="#设置数据类型" aria-hidden="true">#</a> 设置数据类型</h2>
<p>上面的代码中，获取到的<code>res</code>类型为<code>any</code>。为了获得代码提示和类型检查，我们可以对<code>AxiosResponse</code>的泛型进行设置。</p>
<p>首先定义我们自己的后端响应数据类型，我们通常会在返回的数据，即<code>res.data</code>中再封装一层自己的响应类型，如果响应是成功的，则真正的数据会在<code>res.data.content</code>中。具体的数据结构如下所示：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// request/request.ts</span>

<span class="token keyword">interface</span> <span class="token class-name">IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token punctuation">{</span>
  content<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
  message<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  status<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br></div><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>其中泛型<code>T</code>为每次请求返回的数据类型，需要在请求的时候单独设置。因此，我们修改<code>request</code>函数：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// request/request.ts</span>

<span class="token keyword">class</span> <span class="token class-name">MyRequest</span> <span class="token punctuation">{</span>
  <span class="token generic-function"><span class="token function">request</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>
    config<span class="token operator">:</span> AxiosRequestConfig<span class="token operator">&lt;</span>IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span>
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span><span class="token operator">&lt;</span>IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>instance
        <span class="token punctuation">.</span><span class="token generic-function"><span class="token function">request</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span></span></span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'===='</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>使用时的调用方法不变，如需设置响应的数据类型，传入对应的泛型即可，默认为any。</p>
<h2 id="全局拦截" tabindex="-1"><a class="header-anchor" href="#全局拦截" aria-hidden="true">#</a> 全局拦截</h2>
<p>我们在构造函数中实现的全局的请求和响应的拦截：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// request/request.ts</span>

<span class="token keyword">class</span> <span class="token class-name">MyRequest</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 初始化实例配置</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 全局请求拦截</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
      <span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> config<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'全局请求失败拦截'</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 全局响应拦截</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
      <span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// res为AxiosResponse类型</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 取出其中的数据</span>
        <span class="token keyword">return</span> res<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'全局响应失败拦截'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> error<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><p>在响应成功时，我们直接取出了<code>res.data</code>中的数据。</p>
<h2 id="实例拦截" tabindex="-1"><a class="header-anchor" href="#实例拦截" aria-hidden="true">#</a> 实例拦截</h2>
<p>我们需要在实例创建时，通过自定义配置的方式传入拦截器，因此我们需要实现自定义的拦截器接口和请求配置接口:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// request/request.ts</span>

<span class="token comment">// 自定义拦截器接口</span>
<span class="token keyword">interface</span> <span class="token class-name">MyRequestInterceptors<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> AxiosResponse<span class="token operator">></span></span> <span class="token punctuation">{</span>
  <span class="token comment">// 请求成功</span>
  requestInterceptor<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span> <span class="token operator">=></span> AxiosRequestConfig<span class="token punctuation">;</span>
  <span class="token comment">// 请求失败</span>
  requestInterceptorCatch<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>error<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">any</span><span class="token punctuation">;</span>
  <span class="token comment">// 响应成功</span>
  responseInterceptor<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>res<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token constant">T</span><span class="token punctuation">;</span>
  <span class="token comment">// 响应失败</span>
  responseInterceptorCatch<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>error<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 自定义请求配置接口</span>
<span class="token keyword">interface</span> <span class="token class-name">MyRequestConfig<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> AxiosResponse<span class="token operator">></span></span> <span class="token keyword">extends</span> <span class="token class-name">AxiosRequestConfig</span> <span class="token punctuation">{</span>
  interceptors<span class="token operator">?</span><span class="token operator">:</span> MyRequestInterceptors<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>并且在构造器中，实现实例级别的拦截：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// request/request.ts</span>

<span class="token keyword">class</span> <span class="token class-name">MyRequest</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>

  <span class="token comment">// 实例拦截器</span>
  interceptors<span class="token operator">?</span><span class="token operator">:</span> MyRequestInterceptors<span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>config<span class="token operator">:</span> MyRequestConfig<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>

    <span class="token comment">//从实例配置中获取拦截器配置</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>interceptors <span class="token operator">=</span> config<span class="token punctuation">.</span>interceptors<span class="token punctuation">;</span>

    <span class="token operator">...</span>

    <span class="token comment">// 实例级别拦截</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>interceptors<span class="token operator">?.</span>requestInterceptor<span class="token punctuation">,</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>interceptors<span class="token operator">?.</span>requestInterceptorCatch
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>interceptors<span class="token operator">?.</span>responseInterceptor<span class="token punctuation">,</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>interceptors<span class="token operator">?.</span>responseInterceptorCatch
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>这里将创建实例时的配置换成了自定义的类型，这样就跟传入自定义的实例级别的拦截器，并且保存在属性中。</p>
<p>在创建实例时，我们可以自定义实例级别的拦截器，例如设置token:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// request/request.ts</span>

<span class="token keyword">const</span> myRequest <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyRequest</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  baseURL<span class="token operator">:</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VITE_BASE_URL</span><span class="token punctuation">,</span>
  timeout<span class="token operator">:</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VITE_TIME_OUT</span><span class="token punctuation">,</span>
  interceptors<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">requestInterceptor</span><span class="token operator">:</span> <span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// 从localStorage中获取token</span>
      <span class="token comment">// const token = localStorage.getItem('token');</span>
      <span class="token keyword">const</span> token <span class="token operator">=</span> <span class="token string">'This is a token'</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>headers <span class="token operator">&amp;&amp;</span> token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        config<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>Authorization <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Bearer </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>token<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> config<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br></div><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="单个请求拦截" tabindex="-1"><a class="header-anchor" href="#单个请求拦截" aria-hidden="true">#</a> 单个请求拦截</h2>
<p>我们需要在<code>request</code>函数中也传入自定义的拦截器配置：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">//request/request.ts</span>

<span class="token keyword">class</span> <span class="token class-name">MyRequest</span> <span class="token punctuation">{</span>
  <span class="token generic-function"><span class="token function">request</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>
    config<span class="token operator">:</span> MyRequestConfig<span class="token operator">&lt;</span>IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span>
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span><span class="token operator">&lt;</span>IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// 请求拦截器设置</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>interceptors<span class="token operator">?.</span>requestInterceptor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        config <span class="token operator">=</span> config<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span><span class="token function">requestInterceptor</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">this</span><span class="token punctuation">.</span>instance
        <span class="token punctuation">.</span><span class="token generic-function"><span class="token function">request</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span></span></span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token comment">//响应拦截器设置</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>interceptors<span class="token operator">?.</span>responseInterceptor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            res <span class="token operator">=</span> config<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span><span class="token function">responseInterceptor</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'===='</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>这样我们就能在请求时添加拦截器，例如实现取出<code>res.data.content</code>的功能：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// App.vue</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> myRequest<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    url<span class="token operator">:</span> <span class="token string">'url'</span><span class="token punctuation">,</span>
    <span class="token comment">// 单个请求的拦截器设置</span>
    interceptors<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// 直接返回IDataType中的content</span>
      <span class="token function-variable function">responseInterceptor</span><span class="token operator">:</span> <span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">=></span> res<span class="token punctuation">.</span>content<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'===='</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="get、post等方法的封装" tabindex="-1"><a class="header-anchor" href="#get、post等方法的封装" aria-hidden="true">#</a> get、post等方法的封装</h2>
<p>最后，我们对get、post等方法进行封装。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// request/request.ts</span>

<span class="token keyword">class</span> <span class="token class-name">MyRequest</span> <span class="token punctuation">{</span>
  <span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>config<span class="token operator">:</span> MyRequestConfig<span class="token operator">&lt;</span>IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token generic-function"><span class="token function">request</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token operator">...</span>config<span class="token punctuation">,</span>
      method<span class="token operator">:</span> <span class="token string">'GET'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token generic-function"><span class="token function">post</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>config<span class="token operator">:</span> MyRequestConfig<span class="token operator">&lt;</span>IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token generic-function"><span class="token function">request</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token operator">...</span>config<span class="token punctuation">,</span>
      method<span class="token operator">:</span> <span class="token string">'POST'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>调用方法和request相同。</p>
<h2 id="完整代码" tabindex="-1"><a class="header-anchor" href="#完整代码" aria-hidden="true">#</a> 完整代码</h2>
<p>最后附上完整代码：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// request/request.ts</span>

<span class="token keyword">import</span> axios<span class="token punctuation">,</span> <span class="token punctuation">{</span> AxiosInstance<span class="token punctuation">,</span> AxiosRequestConfig<span class="token punctuation">,</span> AxiosResponse <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'axios'</span><span class="token punctuation">;</span>

<span class="token keyword">interface</span> <span class="token class-name">IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token punctuation">{</span>
  content<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
  message<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  status<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 自定义拦截器接口</span>
<span class="token keyword">interface</span> <span class="token class-name">MyRequestInterceptors<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> AxiosResponse<span class="token operator">></span></span> <span class="token punctuation">{</span>
  <span class="token comment">// 请求成功</span>
  requestInterceptor<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span> <span class="token operator">=></span> AxiosRequestConfig<span class="token punctuation">;</span>
  <span class="token comment">// 请求失败</span>
  requestInterceptorCatch<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>error<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">any</span><span class="token punctuation">;</span>
  <span class="token comment">// 响应成功</span>
  responseInterceptor<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>res<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token constant">T</span><span class="token punctuation">;</span>
  <span class="token comment">// 响应失败</span>
  responseInterceptorCatch<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>error<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 自定义请求配置接口</span>
<span class="token keyword">interface</span> <span class="token class-name">MyRequestConfig<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> AxiosResponse<span class="token operator">></span></span> <span class="token keyword">extends</span> <span class="token class-name">AxiosRequestConfig</span> <span class="token punctuation">{</span>
  interceptors<span class="token operator">?</span><span class="token operator">:</span> MyRequestInterceptors<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MyRequest</span> <span class="token punctuation">{</span>
  <span class="token comment">// axios实例</span>
  instance<span class="token operator">:</span> AxiosInstance<span class="token punctuation">;</span>

  <span class="token comment">// 实例拦截器</span>
  interceptors<span class="token operator">?</span><span class="token operator">:</span> MyRequestInterceptors<span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>config<span class="token operator">:</span> MyRequestConfig<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 初始化实例配置</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//从实例配置中获取拦截器配置</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>interceptors <span class="token operator">=</span> config<span class="token punctuation">.</span>interceptors<span class="token punctuation">;</span>

    <span class="token comment">// 全局请求拦截</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
      <span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> config<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'全局请求失败拦截'</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 全局响应拦截</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
      <span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// res为AxiosResponse类型</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 取出其中的数据</span>
        <span class="token keyword">return</span> res<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'全局响应失败拦截'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> error<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 实例级别拦截</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>interceptors<span class="token operator">?.</span>requestInterceptor<span class="token punctuation">,</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>interceptors<span class="token operator">?.</span>requestInterceptorCatch
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>interceptors<span class="token operator">?.</span>responseInterceptor<span class="token punctuation">,</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>interceptors<span class="token operator">?.</span>responseInterceptorCatch
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token generic-function"><span class="token function">request</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>
    config<span class="token operator">:</span> MyRequestConfig<span class="token operator">&lt;</span>IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span>
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span><span class="token operator">&lt;</span>IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// 请求拦截器设置</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>interceptors<span class="token operator">?.</span>requestInterceptor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        config <span class="token operator">=</span> config<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span><span class="token function">requestInterceptor</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">this</span><span class="token punctuation">.</span>instance
        <span class="token punctuation">.</span><span class="token generic-function"><span class="token function">request</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span></span></span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token comment">//响应拦截器设置</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>interceptors<span class="token operator">?.</span>responseInterceptor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            res <span class="token operator">=</span> config<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span><span class="token function">responseInterceptor</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'===='</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>config<span class="token operator">:</span> MyRequestConfig<span class="token operator">&lt;</span>IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token generic-function"><span class="token function">request</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token operator">...</span>config<span class="token punctuation">,</span>
      method<span class="token operator">:</span> <span class="token string">'GET'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token generic-function"><span class="token function">post</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>config<span class="token operator">:</span> MyRequestConfig<span class="token operator">&lt;</span>IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>IDataType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token generic-function"><span class="token function">request</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token operator">...</span>config<span class="token punctuation">,</span>
      method<span class="token operator">:</span> <span class="token string">'POST'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> myRequest <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyRequest</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  baseURL<span class="token operator">:</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VITE_BASE_URL</span><span class="token punctuation">,</span>
  timeout<span class="token operator">:</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VITE_TIME_OUT</span><span class="token punctuation">,</span>
  interceptors<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">requestInterceptor</span><span class="token operator">:</span> <span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// 从localStorage中获取token</span>
      <span class="token comment">// const token = localStorage.getItem('token');</span>
      <span class="token keyword">const</span> token <span class="token operator">=</span> <span class="token string">'This is a token'</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>headers <span class="token operator">&amp;&amp;</span> token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        config<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>Authorization <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Bearer </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>token<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> config<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> myRequest<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br></div></div><p><a href="https://juejin.cn/post/7023006049732919309" target="_blank" rel="noopener noreferrer">参考文档<ExternalLinkIcon/></a></p>
</template>
