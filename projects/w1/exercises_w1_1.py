# 加减乘除
# 1 + 1   # => 2
# 8 - 1   # => 7
# 10 * 2  # => 20
# 35 / 5  # => 7.0

# 地板除，先除以再向下取整
# 5 // 3    # 1     商的整数部分（向下取整）
# -5 // 3      # => -2
print(-5 // 3)  # -2     商的整数部分（向下取整）
# 5.0 // 3.0   # => 1.0  # works on floats too
# -5.0 // 3.0  # => -2.0

# The result of division is always a float
# 10.0 / 3  # => 3.3333333333333335

# # Modulo operation
# 7 % 3  # => 1
# # i % j have the same sign as j, unlike C
# -7 % 3  # => 2
print(-7 % 3)  # 2
print(7 % 3)  # 1
print(-7 / 3)  # -2.3333333333333335
print(-7 // 3)  # -3，地板除得出商，被除数-（除数 * 商）= 余数,

# Enforce precedence with parentheses
1 + 3 * 2  # => 7
(1 + 3) * 2  # => 8 括号的结合更强，先算括号里面的

# True   # => True
# False  # => False

# negate with not
# not True   # => False
# not False  # => True

# True and False  # => False
# False or True   # => True

# True and False are actually 1 and 0 but with different keywords
# True 1; False 0
# True + True  # => 2
# True * 8     # => 8
# False - 5    # => -5

# Comparison operators look at the numerical value of True and False
# 0 == False   # => True
# 2 > True     # => True
# 2 == True    # => False
# -5 != False  # => True

# None, 0, and empty strings/lists/dicts/tuples/sets all evaluate to False.
# All other values are True
# None, 0, and empty strings/lists/dicts/tuples/sets判断来说都是False，其他的值都是True
bool(0)  # => False
bool("")  # => False
bool([])  # => False
bool({})  # => False
bool(())  # => False
bool(set())  # => False
bool(4)  # => True
bool(-6)  # => True

# Equality is ==
# 1 == 1  # => True
# 2 == 1  # => False

# Inequality is !=
# 1 != 1  # => False
# 2 != 1  # => True

# More comparisons
# 1 < 10  # => True
# 1 > 10  # => False
# 2 <= 2  # => True
# 2 >= 2  # => True

# (is vs. ==) is checks if two variables refer to the same object, but == checks
# if the objects pointed to have the same values.
# a = [1, 2, 3, 4]  # Point a at a new list, [1, 2, 3, 4]
# b = a             # Point b at what a is pointing to a， b 两个都指向一个对象
# b is a            # => True, a and b refer to the same object，是一个对象
# b == a            # => True, a's and b's objects are equal 一个对对象的==肯定相同
# b = [1, 2, 3, 4]  # Point b at a new list, [1, 2, 3, 4] 值虽然相同，但是b是另外一个对象
# b is a            # => False, a and b do not refer to the same object 两个只想的不同对象
# b == a            # => True, a's and b's objects are equal 但是内容相同

# Strings are created with " or '
"This is a string."
"This is also a string."

# Strings can be added too
# "Hello " + "world!"  # => "Hello world!" +可以拼接字符串
# # String literals (but not variables) can be concatenated without using '+'
# "Hello " "world!"    # => "Hello world!"
# A string can be treated like a list of characters
"Hello world!"[
    0
]  # => 'H' 字符串也可以使用类似数组的下标，0开始，根据位置获取位置对应的字符

# You can find the length of a string
len("This is a string")  # => 16， 不是.length()，是len()函数，传入字符串作为参数

# Since Python 3.6, you can use f-strings or formatted string literals.
name = "Reiko"
f"She said her name is {name}."  # => "She said her name is Reiko"
# Any valid Python expression inside these braces is returned to the string.
f"{name} is {len(name)} characters long."  # => "Reiko is 5 characters long."

age = 24
print(
    f"{name} is {age} years old."
)  # => "Reiko is 24 years old." f开头，后面字符串，中间{}里面可以放变量，或者表达式，最后会返回一个字符串

# None is an object
# None  # => None
# # Don't use the equality "==" symbol to compare objects to None
# # Use "is" instead. This checks for equality of object identity.
# "etc" is None  # => False
# None is None   # => True

####################################################
## 2. Variables and Collections
####################################################
# Python has a print function
print("I'm Python. Nice to meet you!")  # => I'm Python. Nice to meet you!
# By default the print function also prints out a newline at the end.
# Use the optional argument end to change the end string.
print("Hello, World", end="!")  # => Hello, World!

# Simple way to get input data from console
# input_string_var = input("Enter some data: ")  # Returns the data as a string
# print(f"You entered: {input_string_var}")


# list
# list 初始化
li = []  # 空列表
other_li = [4, 5, 6]  # 初始化列表，里面有三个元素

# 赋值相关修改
# Add stuff to the end of a list with append
li.append(1)  # li is now [1]
li.append(2)  # li is now [1, 2]
li.append(4)  # li is now [1, 2, 4]
li.append(3)  # li is now [1, 2, 4, 3]
print(li)  # [1, 2, 4, 3]
# Remove from the end with pop
li.pop()  # => 3 and li is now [1, 2, 4]
print(li)  # [1, 2, 4]
# Let's put it back
li.append(3)  # li is now [1, 2, 4, 3] again.

# Access a list like you would any array
li[0]  # => 1
# Look at the last element
li[-1]  # => 3


print(li)  # [1, 2, 4, 3]
# You can look at ranges with slice syntax.
# The start index is included, the end index is not
# (It's a closed/open range for you mathy types.)
li[1:3]  # Return list from index 1 to 2 => [2, 4]
li[2:]  # Return list starting from index 2 => [4, 3]
li[:3]  # Return list from beginning until index 3  => [1, 2, 4]
li[::2]  # Return list selecting elements with a step size of 2 => [1, 4] step2
li[::-1]  # Return list in reverse order => [3, 4, 2, 1]
li[::-2]  # Return list in reverse order with a step size of 2 => [3, 2]
# Use any combination of these to make advanced slices
# li[start:end:step]

# Make a shallow copy using slices
li2 = li[:]  # => li2 = [1, 2, 4, 3] but (li2 is li) will result in false.
# 生成一个新的对象，浅拷贝
print(li2 is li)
print(li2 == li)

print(li)  # [1, 2, 4, 3]
# Remove arbitrary elements from a list with "del"
del li[2]  # li is now [1, 2, 3] 根据index删除元素
print(li)  # [1, 2, 3]

print(li)
# Remove first occurrence of a value
li.remove(2)  # li is now [1, 3] 根据值删除元素
# print(li)
# li.remove(
#     2
# )  # Raises a ValueError as 2 is not in the list 根据值删除元素，如果值不存在会报错
li.insert(1, 2)  # li is now [1, 2, 3] 在指定位置插入元素
print(li)  # [1, 2, 3]
li.index(2)  # 1  # => 1, the index of the first occurrence of 2
print(li.index(2))  # 11 in li  # => True


li + other_li  # => [1, 2, 3, 4, 5, 6]
li.extend(other_li)  # Now li is [1, 2, 3, 4, 5, 6]
# 1 in li  # => True
len(li)  # => 6

# Tuples are like lists but are immutable.
tup = (1, 2, 3)
tup[0]  # => 1
# tup[0] = 3  # Raises a TypeError


# Note that a tuple of length one has to have a comma after the last element but
# tuples of other lengths, even zero, do not.
# type((1))   # => <class 'int'> 这么写就是数字一加了括号，容易和括号混淆
# type((1,))  # => <class 'tuple'> 这么写就认为是一个元组，里面有一个元素
# type(())    # => <class 'tuple'> 也可以这么写，表示一个空元组


# You can do most of the list operations on tuples too
# len(tup)  # => 3
# tup + (4, 5, 6)  # => (1, 2, 3, 4, 5, 6)
# tup[:2]  # => (1, 2)
# 2 in tup  # => True

# 多值赋值
# You can unpack tuples (or lists) into variables
a, b, c = (1, 2, 3)  # a is now 1, b is now 2 and c is now 3
# You can also do extended unpacking
a, *b, c = (1, 2, 3, 4)  # a is now 1, b is now [2, 3] and c is now 4
# Tuples are created by default if you leave out the parentheses
d, e, f = 4, 5, 6  # tuple 4, 5, 6 is unpacked into variables d, e and f
# respectively such that d = 4, e = 5 and f = 6
# Now look how easy it is to swap two values
e, d = (
    d,
    e,
)  # d is now 5 and e is now 4，用于交换两个变量的值，e,d = d,e，d和e的值就交换了


empty_dict = {}
filled_dict = {"one": 1, "two": 2, "three": 3}
# invalid_dict = {
#     [1, 2, 3]: "123"
# }  # => Yield a TypeError: unhashable type: 'list' keys must be hashable, so you can't use a list as a key. Tuples are hashable, so you can use them as keys.
# valid_dict = {(1, 2, 3): [1, 2, 3]}  # Values can be of any type, however.

filled_dict["one"]  # => 1
list(filled_dict.keys())  # => ["three", "two", "one"] in Python <3.7
print(list(filled_dict.keys()))  # => ['one', 'two', 'three'] in Python >=3.7
list(filled_dict.values())  # => [3, 2, 1]
print(list(filled_dict.values()))  # => [1, 2, 3]
# # Check for existence of keys in a dictionary with "in"
# "one" in filled_dict  # => True
# 1 in filled_dict      # => False
# filled_dict["four"]  # KeyError
print(filled_dict.get("one"))  # => 1
print(filled_dict.get("four"))  # => None
print(filled_dict.get("one", 4))  # => 1
print(filled_dict.get("four", 4))  # => 4
print(filled_dict.get("four"))  # => None

# "setdefault()" inserts into a dictionary only if the given key isn't present
filled_dict.setdefault("five", 5)  # filled_dict["five"] is set to 5
filled_dict.setdefault("five", 6)  # filled_dict["five"] is still 5

# From Python 3.5 you can also use the additional unpacking options
# {"a": 1, **{"b": 2}}  # => {'a': 1, 'b': 2}
# {"a": 1, **{"a": 2}}  # => {'a': 2}
# d3 = {**d1, **d2} 合并字典，d1和d2的key相同，后面的会覆盖前面的


# Sets store ... well sets
empty_set = set()
# Initialize a set with a bunch of values.
some_set = {1, 1, 2, 2, 3, 4}  # some_set is now {1, 2, 3, 4}
# Similar to keys of a dictionary, elements of a set have to be immutable.
# invalid_set = {[1], 1}  # => Raises a TypeError: unhashable type: 'list'，set的值需要不可变
valid_set = {(1,), 1}
print(valid_set)


####################################################
## 3. Control Flow and Iterables
####################################################


# Let's just make a variable
some_var = 5

# Here is an if statement. Indentation is significant in Python!
# Convention is to use four spaces, not tabs.
# This prints "some_var is smaller than 10"
if some_var > 10:
    print("some_var is totally bigger than 10.")
elif some_var < 10:  # This elif clause is optional.
    print("some_var is smaller than 10.")
else:  # This is optional too.
    print("some_var is indeed 10.")

# Match/Case — Introduced in Python 3.10
# It compares a value against multiple patterns and executes the matching case block.

command = "run"

# match command:
#     case "run":
#         print("The robot started to run 🏃‍♂️")
#     case "speak" | "say_hi":  # multiple options (OR pattern)
#         print("The robot said hi 🗣️")
#     case code if command.isdigit():  # conditional
#         print(f"The robot execute code: {code}")
#     case _:  # _ is a wildcard that never fails (like default/else)
#         print("Invalid command ❌")


"""
For loops iterate over lists
prints:
    dog is a mammal
    cat is a mammal
    mouse is a mammal
"""
for animal in ["dog", "cat", "mouse"]:
    # You can use format() to interpolate formatted strings
    print(f"{animal} is a mammal")

for i in range(4):
    print(i)

for i in range(4, 8):  # 4，5， 6， 7
    print(i)

for i in range(4, 8, 2):  # step 2
    print(i)

# 列表添加对应index
animals = ["dog", "cat", "mouse"]
for i, value in enumerate(animals):
    print(i, value)


# Handle exceptions with a try/except block
try:
    # Use "raise" to raise an error
    raise IndexError("This is an index error")
except IndexError as e:
    pass  # Refrain from this, provide a recovery (next example).
except (TypeError, NameError):
    pass  # Multiple exceptions can be processed jointly.
else:  # Optional clause to the try/except block. Must follow
    # all except blocks.
    print("All good!")  # Runs only if the code in try raises no exceptions
finally:  # Execute under all circumstances
    print("We can clean up resources here")


# Instead of try/finally to cleanup resources you can use a with statement
with open("README.md", encoding="utf-8") as f1:
    for line in f1:
        print(line)


# 位置参数转换为字典
def varargs(*args):
    return args


varargs(1, 2, 3)  # => (1, 2, 3)


# 关键字参数转换为字典
# You can define functions that take a variable number of
# keyword arguments, as well
def keyword_args(**kwargs):
    return kwargs


def show(*args, **kwargs):
    print(args)  # 元组
    print(kwargs)  # 字典


show(1, 2, 3, name="张三", age=20)


# Closures in nested functions:
# We can use the nonlocal keyword to work with variables in nested scope which shouldn't be declared in the inner functions.
def create_avg():
    total = 0
    count = 0

    def avg(n):
        nonlocal total, count
        total += n
        count += 1
        return total / count

    return avg


avg = create_avg()
print(avg(3))  # => 3.0
print(avg(5))  # (3+5)/2 => 4.0
print(avg(7))  # (8+7)/3 => 5.0
