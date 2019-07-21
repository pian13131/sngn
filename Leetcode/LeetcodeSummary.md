# Backtracking

### Combination, Permutation

- **78  Subsets** (subCb, using `nums`)
- **90  Subsets II** (subCb, using `nums`, duplicate)
- **77  Combinations** (cb by `k` numbers, using `1-n`)
- **39  Combination Sum** (cb sum to `t`, using `nums`)
- **40  Combination Sum II** (cb sum to `t`, using `nums`, duplicate)
- **216  Combination Sum III** (cb by `k` numbers, sum to `t`, using `1-9`)
- **46  Permutations** (pm, using `nums`)
- **47  Permutations II** (pm, using `nums`, duplicate)

```python
def func(self, nums, target, k):
  	res = []
  	n = len(nums)
  	def find(t, cb):
    	if appendRuleMet:
      		res.append(cb)
      		return
    	for i in range(n):
      		if skipRuleMet:
        		continue
      		if breakRuleMet:
        		break
      		find(t-nums[i], cb+[nums[i]])
  	find(target, [])
  	return res
```

##### `nums.sort()` and `i>0 and nums[i]==nums[i-1]`

It is a `skipRule` when duplicate number in `nums`

##### `start from` 

When the order does **not** matter, you may need require `for loop` start from current number

##### `appendRule`

Depends on different problems, sometimes the rule is always met

##### `breakRule`

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

##### 

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

# Linked List

#### NodeModify

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

#### CycleLink/FsPointer

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

### Tricks

- `''.join(string)`

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

### Sliding Window/Sub String

- 76 Minimum Window Substring
- 30 Substring with Concatenation of All Words
- 3 Longest Substring Without Repeating Characters
- 340 Longest Substring with At Most K Distinct Characters
- 395 Longest Substring with At Least K Repeating Characters
- 159 Longest Substring with At Most Two Distinct Characters

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

### Rotate

- 33   Search in Rotated Sorted Array     
- 81   Search in Rotated Sorted Array II     
- 153   Find Minimum in Rotated Sorted Array     
- 154   Find Minimum in Rotated Sorted Array II     

Check if `nums[m]` and `target` are on the same side of `nums[0]`

```python
(nums[m]>nums[0])==(target>nums[0])
```

- 162   Find Peak Element     
- 374   Guess Number Higher or Lower     
- 34   Search for a Range     
- 349   Intersection of Two Arrays     
- 350   Intersection of Two Arrays II     
- 315   Count of Smaller Numbers After Self     
- 300   Longest Increasing Subsequence     
- 354   Russian Doll Envelopes    

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
- 127   Word Ladder    
- 51   N-Queens     
- 52   N-Queens II     
- 126   Word Ladder II    

**BFS** is to use a **queue** to record which nodes that we want to visit in the future, and also we record the places that we have visited, so that we don't visit them anymore. Take the front element from queue, do some calculation. Then we get its neighbors, push them to the queue.

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
-  56   Merge Intervals 
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

#### 