# 列表
# 声明和赋值
li = []  # 空list
li = [2, 4, 6, 7]  # 定义list给非空值

li.append(1)  # 列表的最后追加元素
li.pop()  # 列表的最后弹出一个元素，并返回这个元素

# 索引，获取元素
li[0]  # 列表的特点，根据位置下标访问一个元素内容从0开始
li[-1]  # 从下标-1开始访问，就是列表的最后一个元素
# li[5]  # 下标越界，直接会抛出异常IndexError: list index out of range

# 切片，:的方式切出一段的list
li[1:3]  # 从位置1开始，到位置3，包含1，不包含3
li[2:]  # 从位置2开始到列表最后，右边的值缺省到列表最后
li[:3]  # 从第一个位置0开始到位置3，不包含位置3
li[
    ::2
]  # 前面两个位置缺省，表示从list头到尾，最后的2，表示的步长，等于间隔了一个1，取第二个
li[
    ::-1
]  # 第三个数-1 表示步长1，就是不间隔了，-号就表示从尾部开始向前，就等于列表元素现有位置的倒序了
li2 = li[:]  # 这么处理就相当于li2浅拷贝了li着列表

# remove
li.remove(2)  # 根据元素删除值，
# li.remove(2)  # 没有这个值，会抛出异常Raises a ValueError as 2 is not in the list
# 在位置1，设置元素2，原来的元素后移
li.insert(1, 2)
li.index(2)  # 根据元素查找返回第一次的位置
# li.index(5)  # 找不到元素会抛出异常
other_li = [5, 7, 8]
li + other_li  # list拼接
li.extend(other_li)

# 1 in li  # 判断元素在不在list中 不是contains
len(li)  # 列表的长度，不是.length()

# 元组(),不可变的list
tup = (1, 2, 3)
tup[0]  # 1
# type((1))  # => <class 'int'>
type((1,))  # => <class 'tuple'>
type(())  # => <class 'tuple'>

a, b, c = (1, 2, 3)  # 元组元素分别解包给值
a, *b, c = (1, 2, 3, 4)  # 1 [2, 3] 4，两头的解包分别给值，中间的剩下的都给一个list
d, e, f = 4, 5, 6  # 多个值的直接赋值 tuple 4, 5, 6
e, d = d, e  # 直接交换，不需要中间变量

# 字典（map）
empty_dict = {}
filled_dict = {
    "one": 1,
    "two": 2,
    "three": 3,
}  # {}大括号，看着像个json格式，key 对用value
# invalid_dict = {[1,2,3]: "123"}  # => Yield a TypeError: unhashable type: 'list' key不能是可变的
valid_dict = {
    (1, 2, 3): [1, 2, 3]
}  # Values can be of any type, however. key是元组，这种就可以

# 根据key后去value
filled_dict["one"]  # => 1
list[filled_dict.keys()]  # 字典的key，3.7之后的版本这里的key顺序就是添加数据的顺序
list[filled_dict.values()]  # 字典的value，3.7之后的版本这里的key顺序就是添加数据的顺序
# "one" in filled_dict  # => True key可以判断是否in
# 1 in filled_dict  # => False value不可以判断in
# filled_dict["four"]  # KeyError 不存在的情况会抛出异常

# get 根据key后去元素，和list通过下标获取元素一样的
filled_dict.get("one")  # 1

# 根据key获取元素，不存在就给参数的值
filled_dict.get("one", 4)  # => 1
filled_dict.get("four", 4)  # => 4

# setdefault，原来的key没有，则设置参数值，已经有了就不再设置
filled_dict.setdefault("five", 5)  # filled_dict["five"] is set to 5
filled_dict.setdefault("five", 6)  # filled_dict["five"] is still 5

# 更新key的值
filled_dict.update({"four": 4})
filled_dict["four"] = 4  # 另一种方式

# 根据key删除字典元素
del filled_dict["one"]  # Removes the key "one" from filled dict

# From Python 3.5 you can also use the additional unpacking options
# 就是解包，解包字典里的这个字典，根据key，没有相同的key，就直接添加这个key，value
# 如果key存在了，会覆盖原有的value
# {"a": 1, **{"b": 2}}  # => {'a': 1, 'b': 2}
# {"a": 1, **{"a": 2}}  # => {'a': 2}

# set
empty_set = set()
some_set = {1, 1, 2, 2, 3, 4}  # some_set is now {1, 2, 3, 4}

# set不能放可变的值
invalid_set = {[1], 1}  # => Raises a TypeError: unhashable type: 'list'
valid_set = {(1,), 1}  # 不可变的值可以
filled_set = some_set
filled_set.add(5)  # filled_set is now {1, 2, 3, 4, 5}
filled_set.add(
    5
)  # it remains as before {1, 2, 3, 4, 5}，一个元素在一个set中只会有一个，重复添加不会有作用
other_set = {3, 4, 5, 6}
filled_set & other_set  # => {3, 4, 5} &完全相同的值的set
filled_set | other_set  # => {1, 2, 3, 4, 5, 6} 不相同的值合并
# {1, 2, 3, 4} - {2, 3, 5}  # => {1, 4} 左侧在右侧没有的值
# {1, 2, 3, 4} ^ {2, 3, 5}  # => {1, 4, 5} # 两侧有差异的值
# {1, 2} >= {1, 2, 3}  # => False
# {1, 2} <= {1, 2, 3}  # => True
# 2 in filled_set  # => True
# 10 in filled_set  # => False
# filled_set = some_set.copy()  # filled_set is {1, 2, 3, 4, 5}
# filled_set is some_set  # => False


# 控制和迭代器
some_var = 5
# 这是个if语句。注意缩进在Python里是有意义的！
# 缩进要使用 4 个空格而不是 tabs。
# 这段代码会打印 "some_var is smaller than 10"
# :和缩进代替括号，表示代码块
if some_var > 10:
    print("some_var is totally bigger than 10.")
elif some_var < 10:  # elif 语句是可选的
    print("some_var is smaller than 10.")
else:  # else 也是可选的
    print("some_var is indeed 10.")

"""
用 for 循环语句遍历列表
打印:
    dog is a mammal
    cat is a mammal
    mouse is a mammal
"""
for animal in ["dog", "cat", "mouse"]:
    # 你可以使用 f格式化字符串并插入值
    print(f"{animal} is a mammal")

# range range(number)返回数字从0到number的
for i in range(4):
    print(i)
# range(lower, upper)
for i in range(4, 9):
    print(i)  # 前闭后开，包含4，不包含9
# range(lower, upper, step) setp不给值默认1，2就会间隔一个
"""
"range(lower, upper, step)" 会返回一个，从 lower 到 upper、并且间隔值为 step 的迭代器。
如果 step 未传入则会使用默认值 1
prints:
    4
    6
"""
for i in range(4, 8, 2):
    print(i)

"""
遍历列表，并且同时返回列表里的每一个元素的索引和数值。
prints:
    0 dog
    1 cat
    2 mouse
"""
# 遍历列表，返货index和元素
animals = ["dog", "cat", "mouse"]
for i, value in enumerate(animals):
    print(i, value)

# while 循环直到条件不满足
x = 0
while x < 4:
    print(x)
    x += 1  # x = x + 1 的简写

# 异常
try:
    raise IndexError("IndexError")
except IndexError as e:
    pass
except (TypeError, NameError):
    pass  # 可以同时处理不同类的错误
else:  # else语句是可选的，必须在所有的except之后
    print("All good!")  # 只有当try运行完没有错误的时候这句才会运行
finally:  # 在任何情况下都会执行
    print("We can clean up resources here")
# 你可以使用 with 语句来代替 try/finally 对操作进行结束的操作
with open("readme.md", encoding="utf8") as f1:
    for line in f1:
        print(line)

# Python 提供一个叫做可迭代 (iterable) 的基本抽象。一个可迭代对象是可以被当作序列
# 的对象。比如说上面 range 返回的对象就是可迭代的

filled_dict = {"one": 1, "two": 2, "three": 3}
our_iterable = filled_dict.keys()
print(our_iterable)  # => dict_keys(['one', 'two', 'three'])，是一个实现可迭代接口的对象
# 可迭代对象可以遍历
for i in our_iterable:
    print(i)  # 打印 one, two, three

# 但是不可以随机访问
our_iterable[1]  # 抛出TypeError
# 可迭代对象知道怎么生成迭代器
our_iterator = iter(our_iterable)

# 迭代器是一个可以记住遍历的位置的对象
# 用 "next()" 获得下一个对象
next(our_iterator)  # => "one"

# 再一次调取 "next()" 时会记得位置
next(our_iterator)  # => "two"
next(our_iterator)  # => "three"

# 当迭代器所有元素都取出后，会抛出 StopIteration
next(our_iterator)  # 抛出 StopIteration

# 我们还可以通过遍历访问所有的值，实际上，for 内部实现了迭代
our_iterator = iter(our_iterable)
for i in our_iterator:
    print(i)  # 依次打印 one, two,


## 4. 函数
# 用def定义新函数
def add(x, y):
    print(f"x is {x} and y is {y}")
    return x + y  # 用 return 语句返回


# 调用函数
add(5, 6)  # => 打印 "x is 5 and y is 6" 并且返回 11

# 也可以用关键字参数来调用函数
add(y=6, x=5)  # 关键字参数可以用任何顺序


# 可变参数,参数可以传多个，实际会变成一个list
def varargs(*args):
    return args


varargs(1, 2, 3)  # => (1, 2, 3)


# 还有关键字的可变参数**，两个*
# 我们也可以定义一个关键字可变参数函数
def keyword_args(**kwargs):
    return kwargs


# 我们来看看结果是什么：
keyword_args(big="foot", loch="ness")  # => {"big": "foot", "loch": "ness"}


# 这两种可变参数可以混着用
def all_the_args(*args, **kwargs):
    print(args)
    print(kwargs)


"""
all_the_args(1, 2, a=3, b=4) prints:
    (1, 2)
    {"a": 3, "b": 4}
"""
# 调用可变参数函数时可以做跟上面相反的，用 * 展开元组，用 ** 展开字典。
args = (1, 2, 3, 4)
kwargs = {"a": 3, "b": 4}
all_the_args(*args)  # 相当于 all_the_args(1, 2, 3, 4)
all_the_args(**kwargs)  # 相当于 all_the_args(a=3, b=4)
all_the_args(*args, **kwargs)  # 相当于 all_the_args(1, 2, 3, 4, a=3, b=4)


# 使用返回多个数值（返回值为元组类型）
def swap(x, y):
    return y, x  # 用不带括号的元组的格式来返回多个数值
    # (注意: 括号不需要加，但是也可以加)


x = 1
y = 2
x, y = swap(x, y)  # => x = 2, y = 1
# (x, y) = swap(x,y)  # 同上，括号不需要加，但是也可以加

# 函数作用域
x = 5


def setX(num):
    # 局部作用域的 x 和全局域的 x 是不同的
    x = num  # => 43
    print(x)  # => 43


def setGlobalX(num):
    global x
    print(x)  # => 5
    x = num  # 现在全局域的 x 被赋值
    print(x)  # => 6


setX(43)
setGlobalX(6)


# 函数在 Python 是一等公民
def create_adder(x):
    def adder(y):
        return x + y

    return adder
