<template><h1 id="js小技巧" tabindex="-1"><a class="header-anchor" href="#js小技巧" aria-hidden="true">#</a> JS小技巧</h1>
<p>ES6推出后，JS多了很多新特性，让我们之前需要些很多代码才能实现的功能，用简单的方式就能够代替。这篇文章总结了一些平时会用到的JS小技巧。</p>
<h2 id="用-来判断null或undefined" tabindex="-1"><a class="header-anchor" href="#用-来判断null或undefined" aria-hidden="true">#</a> 用<code>??</code>来判断<code>null</code>或<code>undefined</code></h2>
<h3 id="提出问题" tabindex="-1"><a class="header-anchor" href="#提出问题" aria-hidden="true">#</a> 提出问题</h3>
<p>当我们想要引用一个对象的属性时，例如<code>object.property</code>，如果<code>property</code>不存在，则会返回<code>undefined</code>，就会造成许多不必要的麻烦。</p>
<p>比如说，我们想要从后端返回的数据中，提取一个字符串参数，但是后端的数据库中这一项是空的，返回的Json对象中就没有这一项，我们就会得到<code>undefined</code>。之后假设我们要对字符串进行一些操作（<code>split</code>等），就会报错，因为<code>undefined</code>的原型中没有这些函数。</p>
<h3 id="用-来设置默认值" tabindex="-1"><a class="header-anchor" href="#用-来设置默认值" aria-hidden="true">#</a> 用<code>||</code>来设置默认值</h3>
<p>通常遇到这种情况，我们会用<code>||</code>的返回值特性，左边为<strong>truthy</strong>值，就返回左边，左边为<strong>falsy</strong>值，就返回右边。例如<code>object.property || ''</code>，这样能给到一个默认值，不会出现<code>null</code>或者<code>undefined</code>的问题。</p>
<h3 id="truthy和falsy" tabindex="-1"><a class="header-anchor" href="#truthy和falsy" aria-hidden="true">#</a> <strong>truthy</strong>和<strong>falsy</strong></h3>
<p>前面提到了<strong>truthy</strong>和<strong>falsy</strong>，并不是truth和false，这是因为<code>||</code>在进行判断时，并不是只会判断Boolean类型的true和false，而是将JavaScript对象转换为Boolean值，再进行判断。转换后为true的值定义为<strong>truthy</strong>，转换后为假的值定义为<strong>falsy</strong>。在JavaScript中，只有8个Falsy值：</p>
<table>
<thead>
<tr>
<th>falsy</th>
<th>解释</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>false</code></td>
<td><code>false</code>关键字</td>
</tr>
<tr>
<td>0</td>
<td>数值0</td>
</tr>
<tr>
<td>-0</td>
<td>数值-1</td>
</tr>
<tr>
<td>0n</td>
<td>BigInt中的0</td>
</tr>
<tr>
<td>&quot;&quot;,'',``</td>
<td>空字符串</td>
</tr>
<tr>
<td>null</td>
<td>null缺少值</td>
</tr>
<tr>
<td>undefined</td>
<td>undefined原始值</td>
</tr>
<tr>
<td>NaN</td>
<td>NaN非数值</td>
</tr>
</tbody>
</table>
<h3 id="用-来设定默认值" tabindex="-1"><a class="header-anchor" href="#用-来设定默认值" aria-hidden="true">#</a> 用<code>??</code>来设定默认值</h3>
<p>当我们需要判断一个Number类型的属性时，用<code>||</code>的方法，0也会被视为<code>falsy</code>而返回右边的表达式。为了解决这一问题，ES2020推出了<code>??</code>运算符，只有左侧的值为<code>null</code>或<code>undefined</code>时，才会返回右侧的值。</p>
<h2 id="用-简化和-和三元运算符" tabindex="-1"><a class="header-anchor" href="#用-简化和-和三元运算符" aria-hidden="true">#</a> 用<code>?.</code>简化和<code>&amp;&amp;</code>和三元运算符</h2>
<p>在进行链式调用时，如果不进行判断，可能中间一个返回值为<code>null</code>或<code>undefined</code>后面就会报错，因此我们需要用<code>&amp;&amp;</code>或三元运算符进行判断：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> studentNum <span class="token operator">=</span> teacher<span class="token punctuation">.</span>studentList <span class="token operator">&amp;&amp;</span> teacher<span class="token punctuation">.</span>studentList<span class="token punctuation">.</span>length

<span class="token keyword">let</span> fooInput <span class="token operator">=</span> myForm<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'input[name=foo]'</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> fooValue <span class="token operator">=</span> fooInput <span class="token operator">?</span> fooInput<span class="token punctuation">.</span>value <span class="token operator">:</span> <span class="token keyword">undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>ES2020引入了<code>?.</code>来简化链式调用时的判断：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> studentNum <span class="token operator">=</span> teacher<span class="token punctuation">.</span>studentList<span class="token operator">?.</span>length
<span class="token keyword">let</span> fooValue <span class="token operator">=</span> myForm<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'input[name=foo]'</span><span class="token punctuation">)</span><span class="token operator">?.</span>value
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="使用array-prototype-at-取数组后几位" tabindex="-1"><a class="header-anchor" href="#使用array-prototype-at-取数组后几位" aria-hidden="true">#</a> 使用<code>Array.prototype.at()</code>取数组后几位</h2>
<p>当我们想要取数组最后一位数时，通常使用<code>arr[arr.length - 1]</code>的方式来取。</p>
<p>事实上我们有更简便的方式：<code>arr.at(-1)</code>。以下内容节选自MDN：</p>
<blockquote>
<p><code>at()</code> 方法接收一个整数值并返回该索引的项目，允许正数和负数。负整数从数组中的最后一个项目开始倒数。方括号符号没有问题。例如，<code>array[0]</code>将返回第一个项目。然而，对于后面的项目，不要使用<code>array.length</code>，例如，对于最后一个项目，可以调用<code>array.at(-1)</code>。</p>
</blockquote>
<p>因此，对于取数字中的倒数第n位，使用<code>arr.at(-n)</code>即可。</p>
</template>
