---
icon: creative
category: [前端, 编程语言]
tag: [前端, JavaScript]
star: true
---

# JS小技巧

ES6推出后，JS多了很多新特性，让我们之前需要些很多代码才能实现的功能，用简单的方式就能够代替。这篇文章总结了一些平时会用到的JS小技巧。

## 用`??`来判断`null`或`undefined`

### 提出问题

当我们想要引用一个对象的属性时，例如`object.property`，如果`property`不存在，则会返回`undefined`，就会造成许多不必要的麻烦。

比如说，我们想要从后端返回的数据中，提取一个字符串参数，但是后端的数据库中这一项是空的，返回的Json对象中就没有这一项，我们就会得到`undefined`。之后假设我们要对字符串进行一些操作（`split`等），就会报错，因为`undefined`的原型中没有这些函数。

### 用`||`来设置默认值

通常遇到这种情况，我们会用`||`的返回值特性，左边为**truthy**值，就返回左边，左边为**falsy**值，就返回右边。例如`object.property || ''`，这样能给到一个默认值，不会出现`null`或者`undefined`的问题。

### **truthy**和**falsy**

前面提到了**truthy**和**falsy**，并不是truth和false，这是因为`||`在进行判断时，并不是只会判断Boolean类型的true和false，而是将JavaScript对象转换为Boolean值，再进行判断。转换后为true的值定义为**truthy**，转换后为假的值定义为**falsy**。在JavaScript中，只有8个Falsy值：

| falsy | 解释 |
| -- | -- |
| `false` | `false`关键字|
| 0 | 数值0 |
| -0 | 数值-1 |
| 0n | BigInt中的0|
| "",'',`` | 空字符串 |
| null | null缺少值 |
| undefined | undefined原始值 |
| NaN | NaN非数值 |

### 用`??`来设定默认值

当我们需要判断一个Number类型的属性时，用`||`的方法，0也会被视为`falsy`而返回右边的表达式。为了解决这一问题，ES2020推出了`??`运算符，只有左侧的值为`null`或`undefined`时，才会返回右侧的值。

## 用`?.`简化和`&&`和三元运算符

在进行链式调用时，如果不进行判断，可能中间一个返回值为`null`或`undefined`后面就会报错，因此我们需要用`&&`或三元运算符进行判断：

```js
let studentNum = teacher.studentList && teacher.studentList.length

let fooInput = myForm.querySelector('input[name=foo]')
let fooValue = fooInput ? fooInput.value : undefined
```

ES2020引入了`?.`来简化链式调用时的判断：

```js
let studentNum = teacher.studentList?.length
let fooValue = myForm.querySelector('input[name=foo]')?.value
```

## 使用`Array.prototype.at()`取数组后几位

当我们想要取数组最后一位数时，通常使用`arr[arr.length - 1]`的方式来取。

事实上我们有更简便的方式：`arr.at(-1)`。以下内容节选自MDN：

>`at()` 方法接收一个整数值并返回该索引的项目，允许正数和负数。负整数从数组中的最后一个项目开始倒数。方括号符号没有问题。例如，`array[0]`将返回第一个项目。然而，对于后面的项目，不要使用`array.length`，例如，对于最后一个项目，可以调用`array.at(-1)`。

因此，对于取数字中的倒数第n位，使用`arr.at(-n)`即可。
