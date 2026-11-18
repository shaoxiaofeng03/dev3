---
title: 零基础算法题单
---

# 零基础算法 6 周题单

计划里每天留了 **25 分钟算法**。你没有刷过题，所以这 25 分钟不是「随便刷两道」，而是按下面的题单走：**前 6 周只做基础题型，把模板练成肌肉记忆**，第 7 周之后再上 Hot 100 的剩余部分。

## 一、先接受四件事

1. **25 分钟只够 1 题。** 不是 3 题。做不完是正常的，顺延到第二天，不要挤占主线（RAG/Agent）的时间。
2. **第一遍允许看题解。** 但要求：看完关掉，自己默写一遍；第二天不看答案再写一遍。写不出来等于没学。
3. **手写用 Java。** 面试是 Java，项目是 Python，别混。Java 写法要注意 `int` 溢出、`StringBuilder`、数组拷贝这几个高频坑。
4. **题都在力扣（leetcode.cn）上做。** 下面题单里的题名可以直接点开；不用买会员（这些题全部免费）；手机上也能刷，但写代码请用电脑。

## 二、每天 25 分钟怎么花

| 阶段 | 时间 | 做什么 |
| --- | --- | --- |
| 读题 + 想思路 | 5 min | 只写伪代码和复杂度，不动键盘 |
| 编码 | 15 min | 写不出来就看题解，看懂后自己重写 |
| 复盘 | 5 min | 记一句：这题的「套路名」+ 我卡在哪 |

## 三、W1：数组与复杂度（8 题）

| # | 题目 | 难度 | 备注 |
| --- | --- | --- | --- |
| 1 | [两数之和](https://leetcode.cn/problems/two-sum/) | 易 | 暴力 → 哈希，理解「用空间换时间」 |
| 2 | [移动零](https://leetcode.cn/problems/move-zeroes/) | 易 | 双指针原地交换 |
| 3 | [合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/) | 易 | 从后往前双指针 |
| 4 | [删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/) | 易 | 快慢指针 |
| 5 | [轮转数组](https://leetcode.cn/problems/rotate-array/) | 中 | 三次反转 |
| 6 | [加一](https://leetcode.cn/problems/plus-one/) | 易 | 进位边界 |
| 7 | [最大子数组和](https://leetcode.cn/problems/maximum-subarray/) | 中 | 动态规划入门（也可贪心） |
| 8 | [买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/) | 易 | 一次遍历维护最小值 |

## 四、W2：哈希、双指针、滑动窗口（10 题）

| # | 题目 | 难度 | 备注 |
| --- | --- | --- | --- |
| 1 | [有效的字母异位词](https://leetcode.cn/problems/valid-anagram/) | 易 | 计数数组 / 哈希 |
| 2 | [存在重复元素](https://leetcode.cn/problems/contains-duplicate/) | 易 | 集合 |
| 3 | [最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/) | 中 | 哈希 + 只从序列起点扩展 |
| 4 | [字母异位词分组](https://leetcode.cn/problems/group-anagrams/) | 中 | 哈希 key 的设计 |
| 5 | [三数之和](https://leetcode.cn/problems/3sum/) | 中 | 排序 + 双指针 + 去重 |
| 6 | [盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/) | 中 | 双指针移动规则 |
| 7 | [无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/) | 中 | 滑动窗口模板 |
| 8 | [长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/) | 中 | 滑动窗口（正数才可用） |
| 9 | [找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/) | 中 | 定长窗口 |
| 10 | [最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring/) | 难 | 选做，窗口模板的终极形态 |

## 五、W3：链表、栈队列、二叉树（14 题）

| # | 题目 | 难度 | 备注 |
| --- | --- | --- | --- |
| 1 | [反转链表](https://leetcode.cn/problems/reverse-linked-list/) | 易 | 三指针 |
| 2 | [合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/) | 易 | 哑节点 |
| 3 | [环形链表](https://leetcode.cn/problems/linked-list-cycle/) | 易 | 快慢指针 |
| 4 | [相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/) | 易 | 双指针走完彼此的路 |
| 5 | [有效的括号](https://leetcode.cn/problems/valid-parentheses/) | 易 | 栈 |
| 6 | [最小栈](https://leetcode.cn/problems/min-stack/) | 中 | 辅助栈 |
| 7 | [每日温度](https://leetcode.cn/problems/daily-temperatures/) | 中 | 单调栈 |
| 8 | [逆波兰表达式求值](https://leetcode.cn/problems/evaluate-reverse-polish-notation/) | 中 | 栈的应用 |
| 9 | [用队列实现栈](https://leetcode.cn/problems/implement-stack-using-queues/) | 易 | 结构转换 |
| 10 | [字符串解码](https://leetcode.cn/problems/decode-string/) | 中 | 双栈 |
| 11 | [二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/) | 易 | 递归 |
| 12 | [翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/) | 易 | 递归 |
| 13 | [对称二叉树](https://leetcode.cn/problems/symmetric-tree/) | 易 | 双指针递归 |
| 14 | [二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/) | 中 | BFS 模板 |

> 进阶（有余力再做）：路径总和、二叉树展开为链表、从前序与中序遍历构造二叉树、二叉树的最近公共祖先。

## 六、W4：二分、贪心、DP 入门（12 题）

| # | 题目 | 难度 | 备注 |
| --- | --- | --- | --- |
| 1 | [二分查找](https://leetcode.cn/problems/binary-search/) | 易 | 区间写法要固定一种 |
| 2 | [搜索插入位置](https://leetcode.cn/problems/search-insert-position/) | 易 | 边界 |
| 3 | [搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/) | 中 | 二分的变体 |
| 4 | [寻找旋转排序数组中的最小值](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/) | 中 | 同上 |
| 5 | [跳跃游戏](https://leetcode.cn/problems/jump-game/) | 中 | 贪心：维护最远可达 |
| 6 | [跳跃游戏 II](https://leetcode.cn/problems/jump-game-ii/) | 中 | 贪心：层数 |
| 7 | [爬楼梯](https://leetcode.cn/problems/climbing-stairs/) | 易 | DP 入门 |
| 8 | [打家劫舍](https://leetcode.cn/problems/house-robber/) | 中 | 状态转移 |
| 9 | [最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/) | 中 | O(n²) 先写对 |
| 10 | [合并区间](https://leetcode.cn/problems/merge-intervals/) | 中 | 排序 + 合并 |
| 11 | [插入区间](https://leetcode.cn/problems/insert-interval/) | 中 | 分类讨论 |
| 12 | [不同路径](https://leetcode.cn/problems/unique-paths/) | 中 | 二维 DP |

## 七、W5–W6：排序、回溯、DP 巩固

计划进入 RAG 阶段后，算法时间不变，但题目换成「复习 + 模板化」：

- **排序**：颜色分类、数组中的第 K 个最大元素、前 K 个高频元素
- **二分**：在排序数组中查找元素的第一个和最后一个位置、x 的平方根、搜索二维矩阵
- **回溯**：全排列、子集、组合总和、电话号码的字母组合
- **DP**：零钱兑换、单词拆分、最长公共子序列、最长回文子串（编辑距离选做）

## 八、错题本怎么记

每道错题只记三行：

```
题目：三数之和
套路：排序 + 双指针，外层固定一个数
我卡在：去重条件写错（i 和 i-1 比较，不是 i 和 i+1）
```

每周日复盘时，**只重做错题**，不要重做会的题。

## 九、银行 / 研究所的笔试

南京的银行、研究所、部分国企有统一笔试，内容和刷题是两条线：

- 行测（言语、数量、逻辑、资料分析）
- 英语（阅读理解为主）
- 计算机基础（操作系统、网络、数据库、数据结构选择题）

建议第 16 周开始，每天 30 分钟，连续两周。数量关系部分和你刷的算法有重叠，不用额外学。

## 十、什么时候可以停

当你满足下面任意两条，就可以把算法降到每周 3 次维持手感：

- 前 6 周题单里的「必做」全部能不看答案写出
- 随便抽一道中等题，能在 25 分钟内写出可运行的 Java 代码
- 能说清每道题的时间 / 空间复杂度

把省下来的时间投到项目深度上——那才是你区别于其他候选人的地方。
