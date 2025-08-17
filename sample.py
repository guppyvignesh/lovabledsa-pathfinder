# def append_to_list(value, lst=[]):
#     lst.append(value)
#     return lst

# print(append_to_list(1))
# print(append_to_list(2))
# print(append_to_list(3, ['a', 'b']))
# print(append_to_list(4))

# Write a Python generator function fib_generator(n) that yields the first n Fibonacci numbers.
def fib_generator(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b
        
        
# x = 10
# lst = [lambda y : x + y for x in range(5)]
# print(lst)
# print([f(0) for f in lst])
# reason for always getting 4 is that the lambda captures the variable x, not its value at the time of creation.

print(2**16)
