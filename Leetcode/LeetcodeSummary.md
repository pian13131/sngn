# **Backtracking**

### Combination, Permutation

- **78  Subsets** (subCb, using `nums`)
- **90  Subsets II** (subCb, using `nums`, duplicate)
- **77  Combinations** (cb by `k` numbers, using `1-n`)
- **39  Combination Sum** (cb sum to `t`, using `nums`)
- **40  Combination Sum II** (cb sum to `t`, using `nums`, duplicate)
- **216  Combination Sum III** (cb by `k` numbers, sum to `t`, using `1-9`)
- **46  Permutations** (pm, using `nums`)
- **47  Permutations II** (pm, using `nums`, duplicate)

#### Three key steps

1. **Choice: `enumerate()` and `recurssion()`**

2. **Constrain: `if someRuleMet`**

3. **Goal: `res.append()`**

```python
def func(self, nums, target, k):
  	res = []
  	n = len(nums)
  	def find(t, cb):
    	if appendRuleMet:  # goal
      		res.append(cb)
      		return
    	for i in range(n): # enumerate
      		if skipRuleMet: # rule
        		continue
      		if breakRuleMet:
        		break
      		find(t-nums[i], cb+[nums[i]]) # recursion
  	find(target, [])
  	return res
```

`nums.sort()` and `i>0 and nums[i]==nums[i-1]`

It is a `skipRule` when duplicate number in `nums`

`start from` 

When the order does **not** matter, you may need require `for loop` start from current number

`appendRule`

Depends on different problems, sometimes the rule is always met

`breakRule`

Most of the time required in **Sum** related problems

- ##### 377  Combination Sum IV (*DP*)

This one is asked to get the **number** of combination. So backtracking becomes dp

Dp does not care about the **content**, but only the **count**

When it aks you to return an integer, consider about dp

```python
def combinationSum4(self, nums: List[int], target: int) -> int:
      mp = {}
      nums.sort()
      def find(t):
          if t in mp: # 1. check memo
              return mp[t]
          if t==0: # 2. set boundary
              return 1
          res = 0
          for e in nums: # 3. cal new value
              if e > t:
                  break
              res += find(t-e)
          mp[t] = res # 4. set memo
          return res
      return find(target)
```

### Parentheses

- 20   Valid Parentheses     
- 22   Generate Parentheses     
- 32   Longest Valid Parentheses     
- 241   Different Ways to Add Parentheses     
- 301   Remove Invalid Parentheses    

One case of **combination**, which has special **constrain**:

**The number of `(`should equal than `)`**

As a special case, **stack** is useful for **Parentheses** problem

# Divide and Conquer

### Operators(TODO)

- 241 Different Ways to Add Parentheses

- 224 Basic Calculator
- 282 Expression Add Operators

```python
def dac(arr):
    if endRuleMet:
        return unitResult # set the end
    for i in range(len(arr)):
        res1 = dac(arr[:i]) # divide
        res2 = dac(arr[i+1:])
        res = doSomething(res1, res2, arr[i]) # conquer
    return res
```



# Dynamic Programming

### One Dimension

#### Number DP

This kind of problem most of the time would input a `n`, then you need dp from `1` to `n` with a `for` loop

- 70   Climbing Stairs (`1` or `2` sum to `n`)
- 279   Perfect Squares (`1,4,9,16` sums to `n`)
- 322   Coin Change (`nums` sums to `n`)

```python
def climbStairs(self, n: int) -> int:
    dp = [0]*(n+1)
    dp[0] = 1
    for i in range(1, n+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
```

#### String DP

- 139   Word Break (`words` combine to `string`)
- 10 Regular Expression Matching

### Two Dimension

This kind of problem most of the time would give you the matrix

- 62   Unique Paths (move from left-top to right-bottom)
- 63   Unique Paths II (move from left-top to right-bottom with obstacle)
- 120   Triangle (move from top to bottom with min sum)
- 221   Maximal Square (find max square in matrix)

Find the relation between **left** and **cur**, **up** and **cur**, if you traverse from **left top** to **right bottom**

Sometimes you even need relate **left-up** entry as well

Be careful about the over boundary, make sure `0<=x<m and 0<=y<n`

Sometimes, you need to set the finish check

```python
dp = [[0]*(n) for _ in range(m)]
dp[0][0] = 1 # set the initial value
def get(x, y):
    if 0<=x<m and 0<=y<n:
        return dp[x][y]
    else: # handle the over boundary
        return 0

for i in range(m):
    for j in range(n):
        if i==0 and j==0: # skip the initial value
            continue
        dp[i][j] = get(i-1, j) + get(i, j-1) # relate to left and up one
return dp[-1][-1]
```

### Stock

- 121 Best Time to Buy and Sell Stock
- 122 Best Time to Buy and Sell Stock II
- 123 Best Time to Buy and Sell Stock III
- 188 Best Time to Buy and Sell Stock IV
- 309 Best Time to Buy and Sell Stock with Cooldown

**`dp[i][k][b]`**

`i` : day

`k` : transaction

`b` : remain

- Base cases:

    ```python
    dp[-1][k][0] = 0, dp[-1][k][1] = -inf
    dp[i][0][0] = 0, dp[i][0][1] = -inf
    ```

- Recurrence relations:

    ```python
    dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
    #                     rest                 sell
    dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
    #					  rest				   buy
    
    # when k=1, dp[i][k-1][0] will always be 0, we have
    dp[i][k][1] = max(dp[i-1][k][1], -prices[i])
    ```

**Arbitrary `k`**

- `k >= n//2`

    Just regard `k` as `inf`

    ```python
    dp0 = max(dp0, dp1 + price)
    dp1 = max(dp1, dp0_old - price)
    ```

- `k < n//2`

    Iterate `k`

    ```python
    dp0 = [0]*(k+1)
    dp1 = [-inf]*(k+1)
    for j in range(k, 0, -1): # reverse count
        dp0[j] = max(dp0[j], dp1[j] + price)
        dp1[j] = max(dp1[j], dp0[j - 1] - price)
    ```

```python
def stockWithK(self, k, prices):
    dp0 = [0]*(k+1)
    dp1 = [-self.inf]*(k+1)
    for price in prices:
        for j in range(k, 0, -1):
            dp0[j] = max(dp0[j], dp1[j] + price)
            dp1[j] = max(dp1[j], dp0[j-1] - price)
    return dp0[k]
def stockWithInf(self, prices):
    dp0 = 0
    dp1 = -self.inf
    for price in prices:
        tmp = dp0
        dp0 = max(dp0, dp1 + price)
        dp1 = max(dp1, tmp - price)
    return dp0

def maxProfit(self, k: int, prices: List[int]) -> int:
    self.inf = float('inf')
    if k >= len(prices)//2:
        return self.stockWithInf(prices)
    else:
        return self.stockWithK(k, prices)
```

### Backpack

```python
# 01 backpack problem
# costs : cost for each items
# values : value for each items
for i in range(numOfItems):
    for c in reversed(range(capacity)):
        dp[i][c] = max(dp[i-1][c], dp[i-1][c-costs[i]] + values[i])
```



# Linked List

### NodeModify

- 206   Reverse Linked List 
- 92   Reverse Linked List II (reverse between)
- 24   Swap Nodes in Pairs (reverse 2-by-2)
- 328   Odd Even Linked List (odd then even)



- 237   Delete Node in a Linked List     
- 19   Remove Nth Node From End of List     
- 83   Remove Duplicates from Sorted List     
- 203   Remove Linked List Elements     
- 82   Remove Duplicates from Sorted List II     
- 369   Plus One Linked List     
- 2   Add Two Numbers     
- 160   Intersection of Two Linked Lists     
- 21   Merge Two Sorted Lists    

Write down with change lines on the paper may help a lot

```python
'''
* ---> * ---> *
|	   |      |
p      c      n
'''
```

```python
def reverseList(self, head: ListNode) -> ListNode:
        p = None
        c = head
        while c:
            n = c.next # ADD the next node pointer 
            
            c.next = p # CHANGE all next vals
            
            p = c # change p, c to MOVE to next state
            c = n
        return p
```

Most of the time, **CHANGE** on each node need `n` times, but the last time will result the pointer point to **Null**. So sometime you may need add one more **CHANGE** step after loop

In the **CHANGE** step, be careful the order.

In the **CHANGE** step, the pointer still point to the current node before the **MOVE** step, but the nodes order may have been changed. That is why you need drawing to help you

The `while check` should stop ASAP to avoid null pointer, even if you stop before the final node, you can add extra operation to finish the modifying

### CycleLink/FsPointer

- 141   Linked List Cycle    
- 142   Linked List Cycle II

```python
'''
 * ---> * ---> * --> *
 |	          |     |
s,f           * <-- *
'''
def detectCycle(self, head):
    if head == None:
        return None
    s = f = head
    while f and f.next: # No loop : f out
        s = s.next # move before check
        f = f.next.next
        if s == f: # Loop : s meets f
            s2 = head
    		while s!=s2:
                s = s.next
                s2 = s2.next
    		return s
    return None
    
```



# String

### Regular Expression

- **^a** : start with a

- **a$** : end with a
- ***** : 0 or more
- **+** : 1 or more
- **?** : 0 or 1
- **{3}** : 3, **{3,}** : 3 or more, **{3,5}** : 3 to 5 
- **()** : group, default as 1
- **(a|b|c), [abc], [a-b]** : a or b or c

#### Classes

- **\d** : digit, **\D** : non-digit
- **\w** : word, **\W** : non-word
- **\s** : space, **\S** : non-space
- **\b** : boundary, **\B** : non-boundary
- **.** : any
- **\\** : escape

#### Flag

- **/abc/g** : all abc
- **/^\d+/m, /\d+$/m** : start/end includes the line start/end
- **/abc/i** : case insensitive

```python
import re
findall() # list of matches, rtype: list
search() # if any, rtype: bool
split() # split by matches, rtype: list
sub() # replace, rtype: list
```

### Palindrome

- 125 Valid Palindrome
- 266 Palindrome Permutation
- 5 Longest Palindromic Substring
- 9 Palindrome Number
- 214 Shortest Palindrome
- 336 Palindrome Pairs
- 131 Palindrome Partitioning
- 132 Palindrome Partitioning II
- 267 Palindrome Permutation II

```python
'''
odd : s[i+j]==s[i-j]
even : s[i+j+1]==s[i-j]
whole : s == s[::-1]
from end : s[:-i] == rev[i:]
'''
for i in range(n):
    # odd
    for j in range(n):
        if not (i+j<n and i-j>=0): # check boundary
            break
        if s[i+j]==s[i-j]: # so good so far
            doSomething()
        else: # no more
            break
    # even
    for j in range(n):
        if not (i+j+1<n and i-j>=0):
            break
        if s[i+j+1]==s[i-j]:
            doSomething()
        else:
            break
```

```python
# utilize the divide trick
N = len(S)
ans = 0
for center in range(2*N - 1): # 2*N-1 kinds of center, both odd and even
    left = center // 2
    right = left + center % 2
    while left >= 0 and right < N and S[left] == S[right]:
        ans += 1
        left -= 1
        right += 1
return ans
```



# Tree

- 100   Same Tree
- 101   Symmetric Tree 
- 226   Invert Binary Tree
- 257   Binary Tree Paths
- 112   Path Sum
- 113   Path Sum II
- 129   Sum Root to Leaf Numbers
- 298   Binary Tree Longest Consecutive Sequence
- 111   Minimum Depth of Binary Tree
- 104   Maximum Depth of Binary Tree
- 110   Balanced Binary Tree
- 124   Binary Tree Maximum Path Sum
- 250   Count Univalue Subtrees
- 366   Find Leaves of Binary Tree
- 337   House Robber III

Always remember use recursion.

If consider leaf, use pre to pass the previous root.

You can even traverse with two or more nodes at the same time.

The **recurssion order** means a lot

```python
def traverseTree(self, root):
    if endRuleMet: # set end rule
        doSomething()
        return
    # set recurssion order: pre, in, post / leftFrist, rightFrist
    # eg: inorder, leftFirst
    doSomethingWithRoot(root)
    traverseTree(root.left)
    traverseTree(root.right)
```

### Iteration Tree

- 102 Binary Tree Level Order Traversal

```python
h = 0
queue = collections.deque([root]) # FIFO use queue, FILO use stack
while queue:
    mp.append([])
    l = len(queue)
    for i in range(l):
        node = queue.popleft()
        mp[h].append(node.val)
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    h+=1
```

### Recover Tree

- 105 Construct Binary Tree from **Preorder and Inorder** Traversal

```python
# preorder : [root, allOtherNodes]
# inorder : [leftSubTree, root, rightSubTree]
def buildTree(preorder, inorder):
    def build(stop):
        if inorder and inorder[-1] != stop:
            root = TreeNode(preorder.pop())
            root.left = build(root.val)
            inorder.pop()
            root.right = build(stop)
            return root
    preorder.reverse()
    inorder.reverse()
    return build(None)
```

- 106 Construct Binary Tree from **Inorder and Postorder** Traversal

```python
# postorder : [allOtherNodes, root]
# inorder : [leftSubTree, root, rightSubTree]
def buildTree(inorder, postorder):
    def build(stop):
        if inorder and inorder[-1] != stop:
            root = TreeNode(postorder.pop())
            root.right = build(root.val)
            inorder.pop()
            root.left = build(stop)
            return root
    return build(None)
```



# Binary Search

- 278   First Bad Version     
- 35   Search Insert Position     

```python
l = 0
r = len(nums)-1
while l<r:
    m = (l+r)//2
    if nums[m] < target:
        l = m+1
    elif nums[m] > target:
        r = m-1
    else:
        return m
```

You may need handle some edge situations, just avoid add code in the while loop

- 4 Median of Two Sorted Arrays

### Rotate

- 33   Search in Rotated Sorted Array     
- 81   Search in Rotated Sorted Array II     
- 153   Find Minimum in Rotated Sorted Array     
- 154   Find Minimum in Rotated Sorted Array II     

Check if `nums[m]` and `target` are on the same side of `nums[0]`

```python
(nums[m]>nums[0])==(target>nums[0])
```

### Cuts

- 875 Koko Eating Bananas
774. 774 Minimize Max Distance to Gas Station
774. 1011 Capacity To Ship Packages Within D Days

```python
def cutIntoGroups(self, W: List[int], D: int) -> int:
    l = max(W)
    r = sum(W)
    def meetRule():
        s = 0
        cnt = 1
        for w in W:
            if s+w>m:
                s = 0
                cnt+=1
            s+=w
        return cnt<=D
    
    while l<r:
        m =  (l+r)//2
        if not meetRule():
            l = m+1
        else:
            r = m
    return l
```



# Math

### N Sum

- 1 Two Sum
- 167 Two Sum II
- 15 3Sum
- 18 4Sum

```python
results = []
def findNsum(nums, target, N, result):
    if len(nums) < N or N < 2 or target < nums[0]*N or target > nums[-1]*N:  # early termination
        return
    if N == 2: # two pointers solve sorted 2-sum problem
        l,r = 0,len(nums)-1
        while l < r:
            s = nums[l] + nums[r]
            if s == target:
                results.append(result + [nums[l], nums[r]])
                l += 1
                while l < r and nums[l] == nums[l-1]: # skip duplicate
                    l += 1
            elif s < target:
                l += 1
            else:
                r -= 1
    else: # recursively reduce N
        for i in range(len(nums)-N+1):
            if i == 0 or (i > 0 and nums[i-1] != nums[i]): # skip duplicate
                findNsum(nums[i+1:], target-nums[i], N-1, result+[nums[i]])
    
findNsum(sorted(nums), target, 4, [])
return results
```

You may find it quiet similar with some **combination** problem. Both of them require the same method to avoid duplicate. So **NSum** may also be kind of **Backtracking**

Also related with **Divide and Conquer**

```python
resList = []
def findNSum(nums, t, N, res):
    if endRuleMet:
        return
    if N==2:
        find2Sum(nums, t)
    else:
        for num in nums:
            findNSum(nums-[num], t-num, N-1, res+[num])
findNSum(sorted(sums), t, 4, [])
return resList
```

# DFS & BFS

- 200   Number of Islands     
- 130   Surrounded Regions     
- 364   Nested List Weight Sum II     
- 51   N-Queens     
- 52   N-Queens II     
- 126   Word Ladder II    

**BFS** is to use a **deque** to record which nodes that we want to visit in the future, and also we record the places that we have visited, so that we don't visit them anymore. Take the front element from queue, do some calculation. Then we get its neighbors, push them to the queue.

Some case you can only use **BFS**, lets call it **relation spread problem** (127 Word Ladder). Define a kind of **relation**, **spread** from one set of points to others till reach the **End point**

```python
def bfs(i, j):
    queue = collections.deque()
    queue.append((i, j)) # start from (i, j)
    markAsVisited(i, j)
    while queue:
        x, y = queue.popleft()
        for neighber in neighbers(x, y):
            if isValidPos and dfsRuleMet:
                markAsVisited(neighber.x, neighber.y)
                queue.append(neighber.x, neighber.y)
for i in range(m):
    for j in range(n):
        if dfsRuleMet:
        	bfs(i, j)
```

**DFS** is that we **recursively call itself** with changing parameters. When we enter DFS, we normally want to check if certain conditions are met, Then for each possible ways to go, we try DFS on them, get into the next recursion.

```python
def dfs(i, j):
    if isValidPos and dfsRuleMet:
        markAsVisited(i, j)
        for neighber in neighbers(i, j):
            dfs(neighber.x, neighber.y)
        doSomething()
for i in range(m):
    for j in range(n):
        if dfsRuleMet:
        	dfs(i, j)
```

Both of them have two **loops** , one is traverse all node manually, other one, for **BFS** is to use **queue** to loop nodes, for **DFS** is to use **recurssion** to loop nodes

In fact, most them are used to **dye**, the common loop is used to count

# Array

### Interval

- 57   Insert Interval    
- 56   Merge Intervals 
- 352   Data Stream as Disjoint Intervals    

```python
class Interval:
    def __init__(self, l, r):
        self.l = l
        self.r = r
class Solution:
    def merge(self, intervals):
        res = []
        for interval in sorted(intervals, key=lambda x:x[0]): # sort
            if not res or res[-1].r<interval.l: # compare last invertal with cur
                res.append(interval) # insert
            else:
                res[-1].r = max(res[-1].r, interval.r) # merge
        return res
```

### Sliding Window/Sub String

- 76 Minimum Window Substring
- 30 Substring with Concatenation of All Words
- 3 Longest Substring Without Repeating Characters
- 209 Minimum Size Subarray Sum
- 340 Longest Substring with At Most K Distinct Characters
- 395 Longest Substring with At Least K Repeating Characters
- 159 Longest Substring with At Most Two Distinct Characters

Contains two moves: `toBeValid()`, `toMinimize()/toMaximize()`

```python
# Minimize
i = 0
for j, c in enumerate(s): # Move right pointer, toBeValid()
    update(state)
    if isValid(state):
        while isValid(state): # Move left pointer, toMinimize()
            update(state)
            i+=1
        updateResult()
```

```python
# Maximize
i = 0
for j, c in enumerate(s): # Move right pointer, toMaximize()
    update(state)
    if isNotValid(state):
        updateResult()
        while isNotValid(state): # Move left pointer, toBeValid()
            update(state)
            i+=1
updateResult()
```



### Water

- 11 Container With Most Water

- ```python
    while i < j:
        water = max(water, (j - i) * min(height[i], height[j]))
        if height[i] < height[j]:
            i += 1
        else:
            j -= 1
    ```

- 42 Trapping Rain Water

- ```python
    while l < r:
        lh, rh = max(lh, ht[l]), max(rh, ht[r])
        if lh <= rh:
            res += lh - ht[l]
            l+=1
        else:
            res += rh - ht[r]
            r-=1
    ```



### QuickSort

```python
def getPivot(arr, low, high):
    return high # you can choose different ways

def partition(arr, low, high): 
    pivotIndex = getPivot(arr, low, high)
    pivot = arr[pivotIndex]
    arr[pivotIndex], arr[low] = arr[low], arr[pivotIndex]
    i = low
    
    for j in range(low, high+1): 
        if arr[j] < pivot: 
            i = i+1
            arr[j], arr[i] = arr[i], arr[j] 
            
    arr[low], arr[i] = arr[i], arr[low] 
    return i
  
def quickSort(arr, low, high): 
    if low < high: 
        pi = partition(arr,low,high) 
        quickSort(arr, low, pi-1) 
        quickSort(arr, pi+1, high)
```



# Queue(TODO)

### Monoqueue

```python
'''
Monoqueue:
push: push an element into the queue; O (1) (amortized)
pop: pop an element out of the queue; O(1) (pop = remove, it can't report this element)
max: report the max element in queue;O(1)
'''
class Monoq:
    def __init__(self):
        self.que = []
    def pushq(self, v):
        c = 0
        while self.que and self.que[-1][0]<v:
            c += self.que[-1][1] + 1
            self.que.pop()
        self.que.append([v, c])
    def maxval(self):
        return self.que[0][0]
    def popq(self):
        if self.que[0][1]>0:
            self.que[0][1]-=1
            return
        self.que = self.que[1:]
```

### Deque

```python
from collections import deque
dq = deque('item')
dq.pop()
dq.append()
dq.popleft()
dq.appendleft()
```

# Heap/PriorityQueue

- 23 Merge k Sorted Lists
- 347 Top K Frequent Elements
- 253 Meeting Rooms II
- 973 K Closest Points to Origin
- 215 Kth Largest Element in an Array

```python
from heapq import *
heap = []
heappush(heap, item)
heappop(heap)
heappushpop(heap, item) # push and then pop
heapreplace(heap, item) # pop and then push
heapify(heap) # convert into heap
heap[0] # the smallest one
```

The items in the heap is sorted in **binary search tree** not in normal order

If you want to access sorted items make sure use `nlargest(n, heap, key=None)` or `nsmallest(n, heap, key=None)` 

When you need sort **fix number of items** , you may need heap

When you only care about the **max** or **min** that kind of edge value

When the item of **Heap** is like **(cnt, val)**, it becomes **PriorityQueue**

The **one key point** of heap is that you need **doSomething** during the sort (**merge k sorted list**), otherwhise, you can just use `sort(key=lambda x:fun(x))`. **Another one** is you want to fix the size

- 218 The Skyline Problem

```python
def getSkyline(self, buildings):
    # add start-building events
    # also add end-building events(acts as buildings with 0 height)
    # and sort the events in left -> right order
    events = [(L, -H, R) for L, R, H in buildings]
    events += list({(R, 0, 0) for _, R, _ in buildings})
    events.sort()

    # res: result, [x, height]
    # live: heap, [-height, ending position]
    res = [[0, 0]]
    live = [(0, float("inf"))]
    for pos, negH, R in events:
        # 1, pop buildings that are already ended
        # 2, if it's the start-building event, make the building alive
        # 3, if previous keypoint height != current highest height, edit the result
        while live[0][1] <= pos: heappop(live)
        if negH: heappush(live, (negH, R))
        if res[-1][1] != -live[0][0]:
            res += [ [pos, -live[0][0]] ]
    return res[1:]
```

- 295 Find Median from Data Stream

```python
class MedianFinder:
    def __init__(self):
        """
        initialize your data structure here.
        """
        self.hp = [],[]

    def addNum(self, num: int) -> None:
        sm, lg = self.hp
        heappush(sm, -heappushpop(lg, num)) # always get the max val in lg into sm
        if len(lg) < len(sm): # key len(sm)-len(lg) <= 1
            heappush(lg, -heappop(sm))

    def findMedian(self) -> float:
        sm, lg = self.hp
        if len(lg) > len(sm):
            return lg[0]
        else:
            return (lg[0] - sm[0])/2
```



# Stack

### Largest Rectangle in Histogram

```python
s = [-1] # stack store the increasing index
res = 0 # largest area
H=[0] # digest all remains in stack
for i in range(len(H)):
    while s[-1] != -1 and H[s[-1]] >= H[i]: # 1. push in 1st index 2. when decrease:
        									# pop, cal area
        res = max(res, H[s.pop()]*(i-s[-1]-1))
    s.append(i) # keep push in index
```

# Graph

### Shortest Path Problem

- **Dijkstra's**
    Shortest path from **one node** to all nodes

- ```python
    # dist[u] = distance from s to u
    graph = collections.defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))
    
    pq = [(0, s)]
    dist = {}
    while pq:
        d, node = heapq.heappop(pq)
        if node in dist: continue
        dist[node] = d
        for nei, d2 in graph[node]:
            if nei not in dist:
                heapq.heappush(pq, (d+d2, nei))
    return prev
    ```

- **Bellman-Ford**
    Shortest path from **one node** to all nodes, negative edges allowed

- ```python
    dist[K-1] = 0
    for i in range(N):
        for u,v,w in V:
            dist[v] = min(dist[v], dist[u]+w)
    ```

- **Floyd-Warshall**
    Shortest path between **all pairs** of vertices, negative edges allowed

- ```python
    # V = vertices in graph
    # dist = n x n array of minimum distances
    for v in range(v1, vn):
    	dist[v][v] = 0
    for u,v,w in V:
    	dist[u][v] = w
    for k in range(v1, vn):
    	for i in range(v1, vn):
            for j in range(v1, vn):
    			dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]) 
    ```

    

### Topological Sort

```python
def getInDegree(mp): # use in degree to avoid graph loop
    dgr = collections.defaultdict(int)
    for u in mp:
        for v in mp[u]:
            dgr[v] += 1
    return dgr

def sort(mp):
    stack = []
    dgr = self.getInDegree(mp)
    for u in mp: # start from all 0 in-degree node
        if dgr[u]==0:
            stack.append(u)
    res = []
    while stack:
        cur = stack.pop()
        res.append(cur)
        for v in mp[cur]:
            dgr[v]-=1
            if dgr[v]==0: # add to stack when it is 0 in-degree
                stack.append(v)
    return res
```

# Tricks

- Rotate matrix

- ```python
    # spiral matrix
    mx[:] = map(list,zip(*mx[::-1]))	# clock
    mx[:] = map(list,zip(*mx))[::-1]	# unclock
    ```

- Swap min and max

- ```python
    minval = - maxval
    ```

- Connect string list

- ```python
  ''.join(string)
  ```

- Check with list

- ```python
    result = filter(rule, items)
    ```

- Find middle (**234 Palindrome Linked List**)

    - Use **slow** and **fast** pointer
    - May be usable in **Palindrome** problem
    - 
    
- Newton Method (**69 Sqrt(x)**)
  
- ```python
  def mySqrt(self, x: int):
      r = x
      while r*r > x:
          r = (r + x//r) // 2
      return r
  ```
  
  In fact, it is just generic binary search 
  
- Insert index (**981 Time Based Key-Value Store**)

- ```python
    # arr is sorted
    bisect.bisect_left(arr, x)
    bisect.bisect_right(arr, x)
    ```
    
- push and sort

- ```python
    for num in nums:
        idx = bisect.bisect_left(sortedList, num)
        sortedList.insert(idx, num)
    ```

- Default Dict

- ```python
    listDict = collections.defaultdict(list)
    ```

- Strip

- ```shell
    >>> '   spacious   '.strip()
    'spacious'
    >>> 'www.example.com'.strip('cmowz.')
    'example'
    ```

- Prime (204 Count Primes)

- ```python
    if isPrime(nums[i])==False:
        nums[i*i:n:i] = [False]*len(nums[i*i:n:i])
    ```

- Itertools

- ```python
    permutations(iterable, length=None)
    combinations(iterable, length=None)
    product(*iterables, repeat=1)
    ```

- Interval insert

- ```python
    a[1::2], a[::2] = a[:h], a[h:]
    ```

- Next higher/lower (975 Odd Even Jump)

- ```python
    next_higher = [0]*n
    stack = []
    for a,i in sorted([a,i] for i,a in enumerate(arr)):
        while stack and stack[-1]<i:
            next_higher[stack.pop()] = i
        stack.append(i)
    ```

- Sub array sum (325 Maximum Size Subarray Sum Equals k)

- ```python
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

- Generator

- ```python
    # a generator that yields items instead of returning a list
    def firstn(n):
    	num = 0
    	while num < n:
    		yield num
    		num += 1
    sum_of_first_n = sum(firstn(1000000))
    ```

- Bits

- ```python
    bits = [0,1,1,0,1]
    state = 0
    # convert to state
    for i,bit in enumerate(bits):
      if bit==1:
        state^= 1<<i
    # get state[idx]
    stateAtIdx = (state>>idx)&1
    ```

- Semaphore

- ```python
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

- Customize Comparator (179. Largest Number)

    ```python
    class LargerNumKey(str):
        def __lt__(x, y):
            return x+y > y+x
    arr.sort(key=LargerNumKey)
    ```

- XOR to find unique

- ```python
    res = 0
    for num in nums:
        res ^= num
    # the final res will be the non-even-times number
    ```

- Level traverse (117 Populating Next Right Pointers in Each Node II)

    - With iterate (queue) traverse, it is much easier to traverse in level
    - If you want to specific the level number, add `for i in range(len(q))`, in this loop all nodes are in same level

- Counter

    ```python
    from collections import Counter
    cnter = Counter(nums)
    (cnter1 & cnter2).elements() # all intersect numbers
    ```

- Try - Except

- ```python
    try:
        doSomething()
    except: # you can add specific exception
        handleExeption()
    ```

    

# Thinkings

- Sometimes, **Brute force** method may be your only method, when you find it is really hard to find a fit model.
- **Object in Python** (138 Copy List with Random Pointer)
    - If `Object A` contains to `Object V`, when you change `V.val`, `A.V.val` will change as well
- About edge case, do not pay too much attention onto them at the start. You should get the approximately method as soon as possible
- in the iterate process, queue is BFS while stack is DFS

# Data Structure Design

### Double Linked List

```python
class Node:
    def __init__(self, k, v):
        self.key = k
        self.val = v
        self.freq = 1
        self.prev = self.next = None

class DLinkedList:
    def __init__(self):
        self.head = Node(None,None)
        self.tail = Node(None,None)
        self.head.next = self.tail
        self.tail.prev = self.head
        self.size = 0
        
    def __len__(self):
        return self.size
    
    def add(self, node):
        p = self.tail.prev
        p.next = node
        node.next = self.tail
        self.tail.prev = node
        node.prev = p
        self.size+=1
        
    def pop(self, node=None):
        if self.size==0:
            return
        if not node:
            node = self.head.next
        
        p = node.prev
        n = node.next
        p.next = n
        n.prev = p
        self.size-=1
        
        return node
```



### Least Recently Used Cache

**Dict** : access node in $O(1)$

**Double Linked List** : remove node in $O(1)$

```python
class LRUCache:

    def __init__(self, capacity: int):
        self.c = capacity
        self.d = {}
        self.dll = DLinkedList()

    def get(self, key: int) -> int:
        if key in self.d:
            n = self.d[key]
            self.dll.pop(n)
            self.dll.add(n)
            return n.val
        else:
            return -1

    def put(self, key: int, value: int) -> None:
        if key in self.d:
            self.dll.pop(self.d[key])
        n = Node(key, value)
        self.dll.add(n)
        self.d[key] = n
        if len(self.d) > self.c:
            n = self.dll.head.next
            self.dll.pop(n)
            del self.d[n.key]
```



### Least Frequently Used Cache

**Dict Node** : access node in $O(1)$

**Dict Freq** : record the least frequency

**Double Linked List** : remove node in $O(1)$

```python
from collections import defaultdict
class LFUCache:
    def __init__(self, cap):
        self.size = 0
        self.c = cap
        self.nodemp = {}
        self.freqmp = defaultdict(DLinkedList)
        self.minfreq = 0
        
    def update(self, node):
        f = node.freq
        self.freqmp[f].pop(node)
        if self.minfreq==f and not self.freqmp[f]:
            self.minfreq += 1
        node.freq += 1
        self.freqmp[node.freq].add(node)
        
    def get(self, key):
        if key not in self.nodemp:
            return -1
        node = self.nodemp[key]
        self.update(node)
        return node.val
    
    def put(self, key, val):
        if self.c==0:
            return
        if key in self.nodemp:
            node = self.nodemp[key]
            self.update(node)
            node.val = val
        else:
            if self.size==self.c:
                node = self.freqmp[self.minfreq].pop()
                del self.nodemp[node.key]
                self.size-=1
                
            node = Node(key, val)
            self.nodemp[key] = node
            self.freqmp[1].add(node)
            self.minfreq = 1
            self.size+=1
```



### HashMap

```python
class HashMap:
    def __init__(self):
        self.store = [None for _ in range(16)]
        self.size = 0

    def get(self, key):
        key_hash = hash(key)
        index = self._position(key_hash)
        if not self.store[index]:
            return None
        else:
            list_at_index = self.store[index]
            for i in list_at_index:
                if i.key == key:
                    return i.value
            return None

    def put(self, key, value):
        p = Node(key, value)
        key_hash = hash(key)
        index = self._position(key_hash)
        if not self.store[index]:
            self.store[index] = [p]
            self.size += 1
        else:
            list_at_index = self.store[index]
            if p not in list_at_index:
                list_at_index.append(p)
                self.size += 1
            else:
                for i in list_at_index:
                    if i == p:
                        i.value = value
                        break

    def __len__(self):
        return self.size

    def _hash(self, key):
        if isinstance(key, int):
            return key
        result = 5381
        for char in key:
            result = 33 * result + ord(char)
        return result

    def _position(self, key_hash):
        return key_hash % 15


class Node:
    def __init__(self, key, value):
        self.key = key
        self.value = value

    def __eq__(self, other):
        return self.key == other.key
```



### TrieTree

```python
class TrieNode: 
    def __init__(self): 
        self.children = [None]*26
        self.isEndOfWord = False
  
class Trie: 
    def __init__(self): 
        self.root = self.getNode() 
  
    def getNode(self): 
        return TrieNode() 
  
    def _charToIndex(self,ch): 
        return ord(ch)-ord('a') 
  
  
    def insert(self,key): 
        pCrawl = self.root 
        length = len(key) 
        for level in range(length): 
            index = self._charToIndex(key[level]) 
            if not pCrawl.children[index]: 
                pCrawl.children[index] = self.getNode() 
            pCrawl = pCrawl.children[index] 
        pCrawl.isEndOfWord = True
  
    def search(self, key): 
        pCrawl = self.root 
        length = len(key)
        for level in range(length): 
            index = self._charToIndex(key[level]) 
            if not pCrawl.children[index]: 
                return False
            pCrawl = pCrawl.children[index] 
  
        return pCrawl != None and pCrawl.isEndOfWord 
```



### RandomSet

```python
from random import *
class RandomizedSet:
    def __init__(self):
        self.mp = {}
        self.nums = []

    def insert(self, val: int) -> bool:
        if val not in self.mp:
            self.nums.append(val)
            self.mp[val] = len(self.nums)-1
            return True
        else:
            return False

    def remove(self, val: int) -> bool:
        if val in self.mp:
            idx, last = self.mp[val], self.nums[-1]
            self.mp[last] = idx
            self.nums[idx] = last
            self.nums.pop()
            del self.mp[val]
            return True
        else:
            return False

    def getRandom(self) -> int:
        k = randint(0, len(self.nums)-1)
        return self.nums[k]
```



### MinHeap

```python
class MinHeap:
    def __init__(self, cap):
        self.cap = cap
        self.heap = [0]*cap
        self.size = 0
        
    def peek(self):
        if size==0:
            return None
        return heap[0]
    
    def pop(self):
        if size==0:
            return None
        minVal = heap[0]
        heap[0] = heap[size-1]
        size-=1
        self.heapifyDown()
        return minVal
    
    def add(self, val):
        heap[size] = val
        size+=1
        self.heapifyUp()
    
    def heapifyDown(self, idx = 0):
        while self.hasLeftChild(idx):
            smChildIdx = getLeftChildIdx(idx)
            if self.hasRightChild(idx) and self.rightChild(idx)<self.leftChild(idx):
                smChildIdx = getRightChildIdx(idx)
                
            if heap[idx]<heap[smChildIdx]:
                break
            else:
                heap[idx], heap[smChildIdx] = heap[smChildIdx], heap[idx]
                
            idx = smChildIdx
            
    def heapifyUp(self, idx = self.size-1):
        while self.hasParent(idx) and heap[idx]<self.parent(idx):
            parentIdx = self.getParentIdx(idx)
            heap[parentIdx], heap[idx] = heap[idx], heap[parentIdx]
            idx = parentIdx
            
    def getLeftChildIdx(self, idx):
        return 2*idx+1
    
    def getRightChildIdx(self, idx):
        return 2*idx+2
    
    def getParentIdx(self, idx):
        return (idx-1)//2
    
    def hasRightChild(self, idx):
        return self.getRightChildIdx(idx) < size
    
    def hasLeftChild(self, idx):
        return self.getLeftChildIdx(idx) < size
    
    def hasParentIdx(self, idx):
        return self.getParentIdx(idx) >= 0
```



### Disjoint Set Union

```python
class DSU:
    def __init__(self):
        self.par = {}
        
    def find(self, x):
        if x not in self.par:
            self.par[x] = x
        elif self.par[x] != x:
            self.par[x] = self.find(self.par[x])
        return self.par[x]
    def union(self, x, y):
        self.par[self.find(x)] = self.find(y)
```

**DSU with rank**

```python
class DSU(object):
    def __init__(self):
        self.par = {}
        self.rnk = collections.defaultdict(int)

    def find(self, x):
        if x not in self.par:
            self.par[x] = x
        elif self.par[x] != x:
            self.par[x] = self.find(self.par[x])
        return self.par[x]

    def union(self, x, y):
        xr, yr = self.find(x), self.find(y)
        if xr == yr:
            return False
        elif self.rnk[xr] < self.rnk[yr]:
            self.par[xr] = yr
        elif self.rnk[xr] > self.rnk[yr]:
            self.par[yr] = xr
        else:
            self.par[yr] = xr
            self.rnk[xr] += 1
        return True
```

### Binary Search Tree

```python
class Node:
    def __init__(self, val):
        self.val = val
        self.left = self.right = None
        
    def insert(self, node):
        if node.val > self.val:
            if not self.right:
                self.right = node
                return True
            return self.right.insert(node)
        elif node.val < self.val:
            if not self.left:
                self.left = node
                return True
            return self.left.insert(node)
        else: # already in bst
            return False
```

### Monotonous Stack(TODO)

```python

```

### Segment Tree

```python
"""
all leaves are num in nums
balanced binary tree
parent = fun(left, right)
"""
class SegmentTreeNode:
    def __init__(self, start, end, val):
        self.start = start
        self.end = end
        self.val = val # val = fun(left.val, right.val) : sum, min, max
        self.left = None
        self.right = None
        
def build(start, end, vals):
    if start==end:
        return SegmentTreeNode(start, end, vals[start]) # leaf
    mid = (start + end) // 2
    left = build(start, mid, vals)
    right = build(mid+1, end, vals)
    return SegmentTreeNode(start, end, fun(left.val, right.val))

def update(root, idx, val):
    if root.start == root.end == idx:
        root.val = val
    mid = (start+end)//2
    if idx <= mid:
        update(root.left, idx, val)
    else:
        update(root.right, idx, val)
        
    root.val = fun(root.left.val, root.right.val)
    
def query(root, i, j):
    if root.start == i and root.end == j:
        return root.val
    mid = (start + end) // 2
    if j <= mid:
        return query(root.left, i, j)
    elif i > mid:
        return query(root.right, i, j)
    else:
        return fun(query(root.left, i, mid), query(root.right, mid+1, j))
```

