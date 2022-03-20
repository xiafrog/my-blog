<template><h1 id="vuepress初体验" tabindex="-1"><a class="header-anchor" href="#vuepress初体验" aria-hidden="true">#</a> VuePress初体验</h1>
<h2 id="起因" tabindex="-1"><a class="header-anchor" href="#起因" aria-hidden="true">#</a> 起因</h2>
<p>最近因为找实习和做项目的原因，接触了很多新知识，想着需要有一个地方来记录自己学到的只是，因此就想着搭建一个个人的博客。</p>
<p>因为本身是做前端开发的，所以动态网站对我来说就有些复杂了，服务器的配置、Java环境的搭建对我来说都很有难度，那些动态的功能我也都用不到。最后，我选择做一个静态网站。</p>
<p>最近在学Vue，就顺理成章地想到了VuePress。VuePress2支持Vite作为打包工具，可以大大提升开发体验，还有丰富的主题。</p>
<h2 id="初步搭建" tabindex="-1"><a class="header-anchor" href="#初步搭建" aria-hidden="true">#</a> 初步搭建</h2>
<p>学习的第一步自然是查阅<a href="https://v2.vuepress.vuejs.org/zh/" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>。学Vue的时候，觉得Vue比React好的一点就是，官方文档非常详细，通俗易懂。</p>
<ol>
<li>
<p>创建一个新目录</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> my-blog
<span class="token builtin class-name">cd</span> my-blog
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
<li>
<p>初始化项目</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> init
<span class="token function">yarn</span> init
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这里使用了git和yarn。用git应该是方便以后的部署，而yarn其实可以用npm或者pnpm之类的去替换，但是官方用的yarn，就不做改动了。</p>
</li>
<li>
<p>安装本地依赖</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> -D vuepress@next
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>这里因为用的是VuePress2的版本，所以安装的是<code>vuepress@next</code>。</p>
</li>
<li>
<p>在<code>package.json</code>中添加启动脚本</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"docs:dev"</span><span class="token operator">:</span> <span class="token string">"vuepress dev docs"</span><span class="token punctuation">,</span>
    <span class="token property">"docs:build"</span><span class="token operator">:</span> <span class="token string">"vuepress build docs"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这里其实已经可以启动了</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> docs:dev
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>但是我还是继续做一些配置</p>
</li>
<li>
<p>编写<code>.gitignore</code>文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">'node_modules'</span> <span class="token operator">>></span> .gitignore
<span class="token builtin class-name">echo</span> <span class="token string">'.temp'</span> <span class="token operator">>></span> .gitignore
<span class="token builtin class-name">echo</span> <span class="token string">'.cache'</span> <span class="token operator">>></span> .gitignore
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
<li>
<p>在<code>docs/.vuepress</code>目录下新建config.ts文件，写一些基本配置</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineUserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vuepress"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> DefaultThemeOptions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vuepress"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token generic-function"><span class="token function">defineUserConfig</span><span class="token generic class-name"><span class="token operator">&lt;</span>DefaultThemeOptions<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
<span class="token comment">// 站点配置</span>
lang<span class="token operator">:</span> <span class="token string">"zh-CN"</span><span class="token punctuation">,</span>
title<span class="token operator">:</span> <span class="token string">"Hello VuePress"</span><span class="token punctuation">,</span>
description<span class="token operator">:</span> <span class="token string">"Just playing around"</span><span class="token punctuation">,</span>

<span class="token comment">// 主题和它的配置</span>
theme<span class="token operator">:</span> <span class="token string">"@vuepress/theme-default"</span><span class="token punctuation">,</span>
themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    logo<span class="token operator">:</span> <span class="token string">"https://vuejs.org/images/logo.png"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>这些配置等到定制主题的时候再去修改。</p>
</li>
<li>
<p>创建第一篇文档</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">'# Hello VuePress'</span> <span class="token operator">></span> docs/README.md
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>启动服务器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> docs:dev
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>可以在本地的<a href="http://localhost:8080/" target="_blank" rel="noopener noreferrer">http://localhost:8080/<ExternalLinkIcon/></a>访问到这篇<code>README.md</code>文档，其中的内容被自动解析为HTMl。</p>
<p><img src="@source/frontend/tools/1.png" alt="图1" loading="lazy"></p>
</li>
<li>
<p>约定式路由</p>
<p>VuePress采用了约定式路由的方式，<code>docs</code>目录下即为路由路径，其中<code>README.md</code>为根目录。</p>
<p>为了试验约定式路由，我写了这篇文档（在这里就不套娃了），放在<code>docs/vuepress.md</code>中。</p>
<p>将浏览器的URL改为<code>http://localhost:8080/vuepress</code>就看到了这篇文章。</p>
<p><img src="@source/frontend/tools/2.png" alt="图2" loading="lazy"></p>
</li>
</ol>
<h2 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h2>
<p>将网页部署到GitHub Pages上，这样就能以免费的方式，拥有一个公网的域名，可以访问自己的网站。</p>
<ol>
<li>
<p>在<code>config.ts</code>中设置</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>base<span class="token operator">:</span> <span class="token string">"/my-blog/"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>创建<code>.github/workflows/docs.yml</code>文件，配置GitHub Actions工作流</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> docs

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token comment"># 每当 push 到 master 分支时触发部署</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>master<span class="token punctuation">]</span>
  <span class="token comment"># 手动触发部署</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">docs</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录</span>
          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node.js
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># 选择要使用的 node 版本</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">"14"</span>

      <span class="token comment"># 缓存 node_modules</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Cache dependencies
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v2
        <span class="token key atrule">id</span><span class="token punctuation">:</span> yarn<span class="token punctuation">-</span>cache
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            **/node_modules</span>
          <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> runner.os <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>yarn<span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> hashFiles('<span class="token important">**/yarn.lock')</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">restore-keys</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            ${{ runner.os }}-yarn-</span>

      <span class="token comment"># 如果缓存没有命中，安装依赖</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">if</span><span class="token punctuation">:</span> steps.yarn<span class="token punctuation">-</span>cache.outputs.cache<span class="token punctuation">-</span>hit <span class="token tag">!=</span> 'true'
        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn <span class="token punctuation">-</span><span class="token punctuation">-</span>frozen<span class="token punctuation">-</span>lockfile

      <span class="token comment"># 运行构建脚本</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build VuePress site
        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn docs<span class="token punctuation">:</span>build

      <span class="token comment"># 查看 workflow 的文档来获取更多信息</span>
      <span class="token comment"># @see https://github.com/crazy-max/ghaction-github-pages</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to GitHub Pages
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> crazy<span class="token punctuation">-</span>max/ghaction<span class="token punctuation">-</span>github<span class="token punctuation">-</span>pages@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># 部署到 gh-pages 分支</span>
          <span class="token key atrule">target_branch</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages
          <span class="token comment"># 部署目录为 VuePress 的默认输出目录</span>
          <span class="token key atrule">build_dir</span><span class="token punctuation">:</span> dist
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token comment"># @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret</span>
          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br></div></div></li>
<li>
<p>将项目push到GitHub仓库，自动执行Action，即可完成部署。在<code>[https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;/]</code>中可以看到自己的页面。</p>
</li>
</ol>
<h2 id="配置主题" tabindex="-1"><a class="header-anchor" href="#配置主题" aria-hidden="true">#</a> 配置主题</h2>
<p>默认的主题其实更适合于写文档，而我需要找一个适用于博客的主题，并且做一些配置，能有基础的页面样式、导航和路由之类的功能。这里选择了<a href="https://vuepress-theme-hope.github.io/v2/zh/" target="_blank" rel="noopener noreferrer">vuepress-theme-hope<ExternalLinkIcon/></a>的v2版本，这个主题提供了完整的博客功能。</p>
<h3 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h3>
<p>删除原来的docs文件夹，用主题的脚手架重新生成。当然，要记得保存之前写的文档。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> init vuepress-theme-hope@next docs
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>输入命令后，按照选项一步一步选即可。选完就能看到<a href="http://localhost:8080/" target="_blank" rel="noopener noreferrer">demo<ExternalLinkIcon/></a>了。</p>
<p><img src="@source/frontend/tools/3.png" alt="图3" loading="lazy"></p>
<h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3>
<h4 id="全局配置" tabindex="-1"><a class="header-anchor" href="#全局配置" aria-hidden="true">#</a> 全局配置</h4>
<p>修改<code>config.ts</code>对项目进行基本的配置，<a href="https://github.com/xiafrog/my-blog/blob/master/docs/.vuepress/config.ts" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a>可以看到本项目的配置。</p>
<p>主要对默认的路由路径以及语言进行了设置。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineHopeConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vuepress-theme-hope"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> themeConfig <span class="token keyword">from</span> <span class="token string">"./themeConfig"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineHopeConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  base<span class="token operator">:</span> <span class="token string">"/my-blog/"</span><span class="token punctuation">,</span>

  dest<span class="token operator">:</span> <span class="token string">"./dist"</span><span class="token punctuation">,</span>

  head<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span>
      <span class="token string">"link"</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        rel<span class="token operator">:</span> <span class="token string">"stylesheet"</span><span class="token punctuation">,</span>
        href<span class="token operator">:</span> <span class="token string">"//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css"</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>

  locales<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">"/"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      lang<span class="token operator">:</span> <span class="token string">"zh-CN"</span><span class="token punctuation">,</span>
      title<span class="token operator">:</span> <span class="token string">"鱼塘"</span><span class="token punctuation">,</span>
      description<span class="token operator">:</span> <span class="token string">"俞浩然的个人博客"</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  themeConfig<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="highlight-lines"><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br></div><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><ul>
<li>在写这一部分的过程中，本来以为代码行高亮的功能是内置插件，在VuePress中也是默认开启的。但是不生效，只能用<code>markdown.code.highlightLines: true</code>手动开启。最后发现，原来是逗号间不能有空格.</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token comment">&lt;!-- 错误 --></span>
```ts {5, 19-25}

<span class="token comment">&lt;!-- 正确 --></span>
```ts {5,19-25}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="主题配置" tabindex="-1"><a class="header-anchor" href="#主题配置" aria-hidden="true">#</a> 主题配置</h4>
<p>修改<code>themeConfig.ts</code>对项目进行基本的配置，<a href="https://github.com/xiafrog/my-blog/blob/master/docs/.vuepress/themeConfig.ts" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a>可以看到本项目的配置。</p>
<p>主要参考了官方文档中的<a href="https://vuepress-theme-hope.github.io/v2/zh/config/theme/#%E9%85%8D%E7%BD%AE%E4%BB%8B%E7%BB%8D" target="_blank" rel="noopener noreferrer">主题配置<ExternalLinkIcon/></a></p>
<p>其中，单独配置了导航栏和侧边栏。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">//navbar.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineNavbarConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vuepress-theme-hope"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineNavbarConfig</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token string">"/"</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    text<span class="token operator">:</span> <span class="token string">"前端"</span><span class="token punctuation">,</span>
    icon<span class="token operator">:</span> <span class="token string">"template"</span><span class="token punctuation">,</span>
    prefix<span class="token operator">:</span> <span class="token string">"/frontend/"</span><span class="token punctuation">,</span>
    children<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        text<span class="token operator">:</span> <span class="token string">"前端工具"</span><span class="token punctuation">,</span>
        prefix<span class="token operator">:</span> <span class="token string">"tools/"</span><span class="token punctuation">,</span>
        children<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"vuepress.md"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//sidebar.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineSidebarConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vuepress-theme-hope"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineSidebarConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">//按照目录结构自动配置</span>
  <span class="token string-property property">"/frontend/"</span><span class="token operator">:</span> <span class="token string">"structure"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h3 id="博客主页" tabindex="-1"><a class="header-anchor" href="#博客主页" aria-hidden="true">#</a> 博客主页</h3>
<p>博客主页在文档目录下的<a href="https://github.com/xiafrog/my-blog/blob/master/docs/README.md" target="_blank" rel="noopener noreferrer"><code>README.md</code><ExternalLinkIcon/></a>中进行设置，主要是用页面的yml进行配置。</p>
<h2 id="完成" tabindex="-1"><a class="header-anchor" href="#完成" aria-hidden="true">#</a> 完成</h2>
<p>用git push到之前设置到的master分支，自动执行GitHub Action，Page就自动更新啦！🥰</p>
</template>
