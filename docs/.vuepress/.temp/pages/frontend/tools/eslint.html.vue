<template><h1 id="eslint" tabindex="-1"><a class="header-anchor" href="#eslint" aria-hidden="true">#</a> ESLint</h1>
<blockquote>
<p><strong>Lint</strong>（Linter）是一种静态代码分析工具，用于标记代码中某些编码错误、风格问题和不具结构性（易导致 bug）的代码。简单理解就是一个代码检查器，检查目标代码是否符合语法和规定的风格习惯。</p>
<p>ESLint 是基于 ECMAScript/JavaScript 语法的 Lint，能够：</p>
<ul>
<li>查出JavaScript代码语法问题。</li>
<li>根据配置的规则，标记不符合规范的代码。</li>
<li>自动修复一些结构、风格问题。</li>
</ul>
<p>ESLint 的特点是灵活、高度自定义，用户可以通过多种方式配置在项目中应用的规则和其它配置，也可以自定义自己的规则，还可以通过插件的方式拓展功能。</p>
</blockquote>
<p>我主要使用ESLint来检查一些语法问题，以及代码规范，再用Prettier来格式化代码。</p>
<p>配合VS Code中的<a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" target="_blank" rel="noopener noreferrer">ESLint<ExternalLinkIcon/></a>和<a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode" target="_blank" rel="noopener noreferrer">Prettier - Code formatter<ExternalLinkIcon/></a>这两个插件，可以实现自动的代码检查，和自动的格式化（需要在VS Code的设置中配置保存时格式化代码）。</p>
<p>在Vue3的项目中，我会使用<code>plugin:vue/vue3-recommended</code>插件来实现对Vue3代码的校验，通过<code>airbnb-base</code>插件引入Airbnb风格的代码检查，最后用<code>plugin:prettier/recommended</code>插件在ESLint集成Prettier，同时解决ESLint和Prettier冲突的问题。下面贴出我的常用配置：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// .eslintrc.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  root<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  env<span class="token operator">:</span> <span class="token punctuation">{</span>
    browser<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// browser global variables</span>
    <span class="token comment">// adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.</span>
    es2021<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">'plugin:vue/vue3-recommended'</span><span class="token punctuation">,</span>
    <span class="token string">'airbnb-base'</span><span class="token punctuation">,</span>
    <span class="token string">'plugin:prettier/recommended'</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'@typescript-eslint'</span><span class="token punctuation">,</span> <span class="token string">'prettier'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  parserOptions<span class="token operator">:</span> <span class="token punctuation">{</span>
    ecmaVersion<span class="token operator">:</span> <span class="token number">12</span><span class="token punctuation">,</span>
    parser<span class="token operator">:</span> <span class="token string">'@typescript-eslint/parser'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  settings<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">'import/resolver'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      node<span class="token operator">:</span> <span class="token punctuation">{</span>
        extensions<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'.js'</span><span class="token punctuation">,</span> <span class="token string">'.jsx'</span><span class="token punctuation">,</span> <span class="token string">'.ts'</span><span class="token punctuation">,</span> <span class="token string">'.tsx'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  rules<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">'prettier/prettier'</span><span class="token operator">:</span> <span class="token string">'error'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'linebreak-style'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'import/no-extraneous-dependencies'</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">'error'</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        devDependencies<span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">'test/**'</span><span class="token punctuation">,</span> <span class="token comment">// tape, common npm pattern</span>
          <span class="token string">'tests/**'</span><span class="token punctuation">,</span> <span class="token comment">// also common npm pattern</span>
          <span class="token string">'spec/**'</span><span class="token punctuation">,</span> <span class="token comment">// mocha, rspec-like pattern</span>
          <span class="token string">'**/__tests__/**'</span><span class="token punctuation">,</span> <span class="token comment">// jest pattern</span>
          <span class="token string">'**/__mocks__/**'</span><span class="token punctuation">,</span> <span class="token comment">// jest pattern</span>
          <span class="token string">'test.{js,jsx}'</span><span class="token punctuation">,</span> <span class="token comment">// repos with a single test file</span>
          <span class="token string">'test-*.{js,jsx}'</span><span class="token punctuation">,</span> <span class="token comment">// repos with multiple top-level test files</span>
          <span class="token string">'**/*{.,_}{test,spec}.{js,jsx}'</span><span class="token punctuation">,</span> <span class="token comment">// tests where the extension or filename suffix denotes that it is a test</span>
          <span class="token string">'**/jest.config.js'</span><span class="token punctuation">,</span> <span class="token comment">// jest config</span>
          <span class="token string">'**/webpack.config.js'</span><span class="token punctuation">,</span> <span class="token comment">// webpack config</span>
          <span class="token string">'**/webpack.config.*.js'</span><span class="token punctuation">,</span> <span class="token comment">// webpack config</span>
          <span class="token string">'**/rollup.config.js'</span><span class="token punctuation">,</span> <span class="token comment">// rollup config</span>
          <span class="token string">'**/rollup.config.*.js'</span><span class="token punctuation">,</span> <span class="token comment">// rollup config</span>
          <span class="token string">'**/gulpfile.js'</span><span class="token punctuation">,</span> <span class="token comment">// gulp config</span>
          <span class="token string">'**/gulpfile.*.js'</span><span class="token punctuation">,</span> <span class="token comment">// gulp config</span>
          <span class="token string">'**/Gruntfile{,.js}'</span><span class="token punctuation">,</span> <span class="token comment">// grunt config</span>
          <span class="token string">'**/protractor.conf.js'</span><span class="token punctuation">,</span> <span class="token comment">// protractor config</span>
          <span class="token string">'**/protractor.conf.*.js'</span><span class="token punctuation">,</span> <span class="token comment">// protractor config</span>
          <span class="token string">'**vite**'</span><span class="token punctuation">,</span>
          <span class="token string">'**@vitejs**'</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        optionalDependencies<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">'no-param-reassign'</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">'error'</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        props<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        ignorePropertyModificationsFor<span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">'acc'</span><span class="token punctuation">,</span> <span class="token comment">// for reduce accumulators</span>
          <span class="token string">'accumulator'</span><span class="token punctuation">,</span> <span class="token comment">// for reduce accumulators</span>
          <span class="token string">'e'</span><span class="token punctuation">,</span> <span class="token comment">// for e.returnvalue</span>
          <span class="token string">'ctx'</span><span class="token punctuation">,</span> <span class="token comment">// for Koa routing</span>
          <span class="token string">'context'</span><span class="token punctuation">,</span> <span class="token comment">// for Koa routing</span>
          <span class="token string">'req'</span><span class="token punctuation">,</span> <span class="token comment">// for Express requests</span>
          <span class="token string">'request'</span><span class="token punctuation">,</span> <span class="token comment">// for Express requests</span>
          <span class="token string">'res'</span><span class="token punctuation">,</span> <span class="token comment">// for Express responses</span>
          <span class="token string">'response'</span><span class="token punctuation">,</span> <span class="token comment">// for Express responses</span>
          <span class="token string">'$scope'</span><span class="token punctuation">,</span> <span class="token comment">// for Angular 1 scopes</span>
          <span class="token string">'staticContext'</span><span class="token punctuation">,</span> <span class="token comment">// for ReactRouter context</span>
          <span class="token string">'state'</span><span class="token punctuation">,</span> <span class="token comment">// for vuex state</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">'import/extensions'</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">'error'</span><span class="token punctuation">,</span>
      <span class="token string">'ignorePackages'</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        js<span class="token operator">:</span> <span class="token string">'never'</span><span class="token punctuation">,</span>
        mjs<span class="token operator">:</span> <span class="token string">'never'</span><span class="token punctuation">,</span>
        jsx<span class="token operator">:</span> <span class="token string">'never'</span><span class="token punctuation">,</span>
        ts<span class="token operator">:</span> <span class="token string">'never'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br></div></div><p>最后，因为个人习惯使用单引号，添加了Prettier的配置:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// .prettierrc.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">singleQuote</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 使用单引号</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></template>
