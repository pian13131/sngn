#### RotateMatrix

```python
# spiral matrix
mx[:] = map(list,zip(*mx[::-1]))	# clock
mx[:] = map(list,zip(*mx))[::-1]	# unclock
```

#### Join

```python
''.join(string)
```

#### Filter

```python
result = filter(rule, items)
```

#### BinarySearch

```python
# arr is sorted
bisect.bisect_left(arr, x)
bisect.bisect_right(arr, x)
# insert in order
for num in nums:
    idx = bisect.bisect_left(sortedList, num)
    sortedList.insert(idx, num)
```

#### DefaultDict

```python
listDict = collections.defaultdict(list)
```

#### Strip

```shell
>>> '   spacious   '.strip()
'spacious'
>>> 'www.example.com'.strip('cmowz.')
'example'
```

#### Itertools

```python
permutations(iterable, length=None)
combinations(iterable, length=None)
product(*iterables, repeat=1)
```

Interval insert

```python
a[1::2], a[::2] = a[:h], a[h:]
```

Next higher/lower (975 Odd Even Jump)

```python
next_higher = [0]*n
stack = []
for a,i in sorted([a,i] for i,a in enumerate(arr)):
    while stack and stack[-1]<i:
        next_higher[stack.pop()] = i
    stack.append(i)
```

Sub array sum (325 Maximum Size Subarray Sum Equals k)

```python
'''
record prefix sum into dict, then we can check sub array sum in O(1)
'''
s = 0
mp = {0:-1}
res = 0
for i in range(n):
    s += nums[i]
    if s not in mp:
        mp[s] = i

    if s-k in mp:
        res = max(res, i-mp[s-k])
```

Generator

```python
# a generator that yields items instead of returning a list
def firstn(n):
	num = 0
	while num < n:
		yield num
		num += 1
sum_of_first_n = sum(firstn(1000000))
```

Bits

```python
bits = [0,1,1,0,1]
state = 0
# convert to state
for i,bit in enumerate(bits):
  if bit==1:
    state^= 1<<i
# get state[idx]
stateAtIdx = (state>>idx)&1
```

Semaphore

```python
from threading import Semaphore
smp = Semaphore(1)
with smp: # wait()
    # critical section
smp.release() # signal()
```

```java
import java.util.concurrent.*;
Semaphore smp = new Semaphore(1);
smp.acquire(); // wait()
// critical section
smp.release(); // signal()
```

Customize Comparator (179. Largest Number)

```python
class LargerNumKey(str):
    def __lt__(x, y):
        return x+y > y+x
arr.sort(key=LargerNumKey)
```

XOR to find unique

```python
res = 0
for num in nums:
    res ^= num
# the final res will be the non-even-times number
```

Level traverse (117 Populating Next Right Pointers in Each Node II)

- With iterate (queue) traverse, it is much easier to traverse in level
- If you want to specific the level number, add `for i in range(len(q))`, in this loop all nodes are in same level

Counter

```python
from collections import Counter
cnter = Counter(nums)
(cnter1 & cnter2).elements() # all intersect numbers
```

Try - Except

```python
try:
    doSomething()
except: # you can add specific exception
    handleExeption()
```

revert number

```python
while x != 0:
  r = r*10 + x%10
  x /= 10
```

