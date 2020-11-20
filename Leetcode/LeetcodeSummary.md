# **Backtracking**

### Combination, Permutation

- [x] 78  Subsets (subCb, using `nums`)
- [x] 90  Subsets II (subCb, using `nums`, duplicate)
- [x] 77  Combinations (cb by `k` numbers, using `1-n`)
- [ ] 39  Combination Sum (cb sum to `t`, using `nums`)
- [ ] 40  Combination Sum II (cb sum to `t`, using `nums`, duplicate)
- [ ] 216  Combination Sum III (cb by `k` numbers, sum to `t`, using `1-9`)
- [x] 46  Permutations (pm, using `nums`)
- [ ] 47  Permutations II (pm, using `nums`, duplicate)



1. **Choice can be made for current record**

2. **Constrain: `if someRuleMet` then add `record` to `res`**


```python
result = []
def backtrack(record, choices):
    if meetRule:
        result.add(record)
        return

    for choice in choices:
        makeChoice(record)
        backtrack(record, choices)
        cancelChoice(record)
```



- The whole process of backtracking is to **In-order** traverse the decision tree

- Change the `meetRule` will change the `node` you add to the results

- [ ] ##### 377  Combination Sum IV (*DP*)

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

- [x] 20   Valid Parentheses     
- [x] 22   Generate Parentheses
- [ ] 32   Longest Valid Parentheses
- [ ] 241   Different Ways to Add Parentheses     
- [ ] 301   Remove Invalid Parentheses

- One case of **combination**, which has special **constrain**:

- The number of `(`should equal than `)`

- As a special case, **stack** is useful for **Parentheses** problem

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

**Traverse all states and make choice with memo**

```python
for state1 in state1s:
    for state2 in state2s:
        ...
        dp[state1][state2][...] = makeChoice(choice1, choice2...)
```

1. **Define state `dp[i][j]`**
1. **Define `makeChoice()` for `min`/`max`**
2. **Define loop order**
3. **Define  `dp[0]`**

$$T = N_{sub} * T_{sub}$$

$S = N_{sub}$

### One Dimension

#### Number DP

- [x] 70   Climbing Stairs (`1` or `2` sum to `n`)
- [x] 279   Perfect Squares (`1,4,9,16` sums to `n`)
- [x] 322   Coin Change (`nums` sums to `n`)
- [x] 198 House Robber
- [x] 312 Burst Balloons
- [x] 152 Maximum Product Subarray

```python
def climbStairs(self, n: int) -> int:
    dp = [0]*(n+1)
    dp[0] = 1
    for i in range(1, n+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
```

```c++
int fib(int n) {
    if (n == 2 || n == 1) 
        return 1;
    int prev = 1, curr = 1;
    for (int i = 3; i <= n; i++) {
        int sum = prev + curr;
        prev = curr;
        curr = sum;
    }
    return curr;
}
```

- Be clear about the `dp[i]` and `nums[i]`, sometimes they have different `i` meaning
- `dp[i][j]` is for bottom up and `dp(i, j)` is for top down

#### String DP

- [x] 139   Word Break (`words` combine to `string`)
- [x] 10 Regular Expression Matching
- [x] 516 Longest Palindromic Subsequence
- [x] 1312 Minimum Insertion Steps to Make a String Palindrome
- [x] 1143 Longest Common Subsequence
- [x] 583 Delete Operation for Two Strings
- [x] 712 Minimum ASCII Delete Sum for Two Strings

- Most of the time, substring, subsequence, sub array, two string/array problem have `O(n*n)` complexity. You need 2d dp.
- Sometime even you only need `dp[]` to store states but the time can be also `O(n*n)`, because you `makeChoices()` might be a for loop

- `300 Longest Increasing Subsequence` can be opitimized to `O(nlogn)`

### Two Dimension

This kind of problem most of the time would give you the matrix

- [x] 62   Unique Paths (move from left-top to right-bottom)
- [ ] 63   Unique Paths II (move from left-top to right-bottom with obstacle)
- [ ] 120   Triangle (move from top to bottom with min sum)
- [ ] 221   Maximal Square (find max square in matrix)

Find the relation between **left** and **cur**, **up** and **cur**, if you traverse from **left top** to **right bottom**

Sometimes you even need relate **left-up** entry as well

Be careful about the over boundary, make sure `0<=x<m and 0<=y<n`

Sometimes, you need to set the finish check

after defining the state fuction, make sure right side of equation has been calculated. You may change the loop direction

Most of the time the right side contain **left, up, left-up**

2D dp means there should be multiple base case `dp[0][j]` and `dp[i][0]`. Only when their default value are 0, then you don't need to initialize

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

- [x] 121 Best Time to Buy and Sell Stock
- [x] 122 Best Time to Buy and Sell Stock II
- [ ] 123 Best Time to Buy and Sell Stock III
- [x] 188 Best Time to Buy and Sell Stock IV
- [ ] 309 Best Time to Buy and Sell Stock with Cooldown

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
# state: ith num, c target cap
# choice: add ith num or not
for i in range(len(nums)):
    for c in reversed(range(cap)):
        dp[i][c] = max(dp[i-1][c], dp[i-1][c-costs[i]] + values[i])
```

- [x] 416 Partition Equal Subset Sum 

```python
# subset backpack
for i in range(nums):
    for j in reversed(range(cap)):
        dp[i][j] = dp[i-1][j] || (j>=num && dp[i-1][j-num]) # dp[i-1][x]
```

- [x] 518 Coin Change 2
- [x] 322 Coin Change

```python
# complete backpack
for i in range(nums):
    for j in range(cap):
        dp[i][j] = dp[i-1][j]
        if j>=num:
            dp[i][j]+=dp[i][j-num] # dp[i][x]
```

### Greedy

Local maximum would result global maximum

Special kind of DP but with reduced complexity 

- [x] 435 无重叠区间
- [x] 452 用最少数量的箭引爆气球

```java
Arrays.sort(points, Comparator.comparingInt(x -> x[1]));
int end = points[0][1];
int count = 1;
for(int[] point : points) {
    if (point[0] > end) {
        count++;
        end = point[1];
    }
}
return count;
```

- [x] 55 Jump Game
- [x] 45 Jump Game II
- [x] 763 Partition Labels

We don't need to use dp to calculate the exact min/max choice, but choice the one with highest posibility

```python
for i in range(n):
    if farthest >= i:
        farthest = max(farthest, nums[i]+i)
    else:
        return False
return True
```

```python
for i in range(n-1):
    farthest = max(farthest, nums[i]+i)
    if (end==i):
        end = farthest
        jump+=1
    if farthest >= n-1:
        return jump+1
return jump
```

- [x] 877  Stone Game
- [x] 651 4 Keys Keyboard

### TopDown

# Linked List

### NodeModify

- [x] 206   Reverse Linked List 
- [x] 92   Reverse Linked List II (reverse between)
- [ ] 24   Swap Nodes in Pairs (reverse 2-by-2)
- [ ] 328   Odd Even Linked List (odd then even)



- [ ] 237   Delete Node in a Linked List     
- [ ] 19   Remove Nth Node From End of List     
- [ ] 83   Remove Duplicates from Sorted List     
- [ ] 203   Remove Linked List Elements     
- [ ] 82   Remove Duplicates from Sorted List II     
- [ ] 369   Plus One Linked List     
- [x] 2   Add Two Numbers     
- [ ] 160   Intersection of Two Linked Lists     
- [x] 21   Merge Two Sorted Lists    

- Write down with change lines on the paper may help a lot

```python
'''
* ---> * ---> *
|	   |      |
p      c      n
'''
```

```python
def reverseList(self, head: ListNode) -> ListNode:
  	p = ListNode()
    p.next = head
    c = head
    while c.next:
      n = c.next # ADD the next node pointer 
            
      c.next = n.next
      n.next = p.next # p.next may not be c
      p.next = n # this p will always be the pre of head
    
    return p.next
```

- The `while check` should stop ASAP to avoid null pointer, even if you stop before the final node, you can add extra operation to finish the modifying

```java
// reverse with recursion
private ListNode reverse(ListNode head) {
        if (head.next==null) return head; // newHead
        ListNode newEnd = head.next;
        ListNode newHead = reverse(head.next);
        newEnd.next = head;
        head.next = null;
        return newHead;
    }
```

```python
# reverse with count
self.rightEdge = None
def reverseWithCount(head, n):
    if n==1:
        self.rightEdge = head.next
        return head
   	newHead = reverseWithCount(head.next, n-1)
    newEnd.next = head
    head.next = self.rightEdge
    return newHead
```

- Traverse linked list also has both `front oder` and `post oder`

- [x] 234 Palindrome Linked List

```java
void traverse(ListNode head) {
    // 前序遍历代码
    traverse(head.next);
    // 后序遍历代码
}
```

```java
ListNode left;

boolean isPalindrome(ListNode head) {
    left = head;
    return traverse(head);
}

boolean traverse(ListNode right) {
    if (right == null) return true;
    boolean res = traverse(right.next);
    // 后序遍历代码
    res = res && (right.val == left.val);
    left = left.next;
    return res;
}
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

- [x] 125 Valid Palindrome
- [ ] 266 Palindrome Permutation
- [x] 5 Longest Palindromic Substring
- [x] 9 Palindrome Number
- [ ] 214 Shortest Palindrome
- [ ] 336 Palindrome Pairs
- [x] 131 Palindrome Partitioning
- [ ] 132 Palindrome Partitioning II
- [ ] 267 Palindrome Permutation II

```python
def longestPalindrome(self, s: str) -> str:
    self.res = ""
    self.chars = s
    for i in range(len(self.chars)):
        self.palindrome(i, i)
        self.palindrome(i, i+1)
    return self.res

def palindrome(self, l, r):
    while l>=0 and r<len(self.chars) and self.chars[l]==self.chars[r]:
        l-=1
        r+=1
    if r-l-1>len(self.res):
        self.res = self.chars[l+1:r]
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

- [x] 100   Same Tree
- [x] 101   Symmetric Tree 
- [x] 226   Invert Binary Tree
- [x] 116 Populating Next Right Pointers in Each Node
- [x] 114 Flatten Binary Tree to Linked List
- [x] 199 Binary Tree Right Side View
- [x] 236 Lowest Common Ancestor of a Binary Tree
- [ ] 257   Binary Tree Paths
- [ ] 129   Sum Root to Leaf Numbers
- [ ] 298   Binary Tree Longest Consecutive Sequence
- [ ] 111   Minimum Depth of Binary Tree
- [ ] 104   Maximum Depth of Binary Tree
- [ ] 110   Balanced Binary Tree
- [ ] 124   Binary Tree Maximum Path Sum
- [ ] 250   Count Univalue Subtrees
- [ ] 366   Find Leaves of Binary Tree
- [ ] 337   House Robber III

- Always remember use recursion.

- If consider leaf, use pre to pass the previous root.

- You can even traverse with two or more nodes at the same time.

- The **recursion order** means a lot

- The most important part of **recurssion** is understand the definition of the `recursion() `

- believe the definition of the recurrsion function and the frame work will handle the rest

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

- It is just BFS

- [x] 102 Binary Tree Level Order Traversal

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

### Build Tree

- [x] 105 Construct Binary Tree from **Preorder and Inorder** Traversal
- [x] 106 从中序与后序遍历序列构造二叉树
- [x] 654 最大二叉树
- [x] 1008 Construct Binary Search Tree from Preorder Traversal
- [x] 426 Convert Binary Search Tree to Sorted Doubly Linked List

```python
# preorder : [root, leftSubTree, rightSubTree]
# inorder : [leftSubTree, root, rightSubTree]
def buildTree(preorder, inorder):
    if len(preorder)==0:
        return None
    rootVal = preorder[0]
    i = findIndexOfVal(rootVal)
    root = TreeNode(rootVal)
    root.left = buildTree(preorder[1:1+leftSize], inorder[:i])
    root.right = buildTree(preorder[1+leftSize:], inorder[i+1:])
    return root
```

- [ ] 106 Construct Binary Tree from **Inorder and Postorder** Traversal

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

- [x] 297  Serialize and Deserialize Binary Tree

```java
public String serialize(TreeNode root) {
    if (root==null) return "#";
    return root.val + "," + serialize(root.left) + "," + serialize(root.right);
}

public TreeNode deserialize(String data) {
    LinkedList<String> nodeStrings = new LinkedList<>();
    for (String nodeString : data.split(",")) nodeStrings.addLast(nodeString);
    return deserialize(nodeStrings);
}

private TreeNode deserialize(LinkedList<String> nodeStrings) {
    String nodeString = nodeStrings.removeFirst();
    if (nodeString.equals("#")) return null;
    TreeNode cur = new TreeNode(Integer.parseInt(nodeString));
    cur.left = deserialize(nodeStrings);
    cur.right = deserialize(nodeStrings);
    return cur;
}
```



# Binary Search

- [x] 278   First Bad Version
- [x] 704 Binary Search
- [ ] 35   Search Insert Position     

```python
l = 0
r = n-1
while l <= r:
    m = l + (r - l)/2 # avoid overflow
    if nums[m] == target:
        return nums[n]
    elif nums[m] < target:
        l = m + 1
    elif nums[m] < target:
        r = m - 1
return -(l+1) # -(insertionIdx)-1
```

```java
i = Arrays.binarySearch(nums, key);
if (i<0) i = -i-1; // insertion point
```

- Aways consider `l` and `r` as `[l, r]` then the `while(l <= r)`. Always keeps in mind the `boundary value` then you would know how to update `l, r, m`

### Find Boundary

- [x] 34 Find First and Last Position of Element in Sorted Array

```python
# left boundary
l = 0
r = n-1
while l <= r:
  m = l + (r - l)/2
  if nums[m] == target: # let m move 1 by 1
    r -= 1 # l += 1
  elif nums[m] < target:
    l = m+1
  elif nums[m] > target:
    r = m-1
if l >= n || nums[l]!=target: # if r < 0 || nums[r]!=target
  return -1
return l # r
```

### Rotate

- [x] 33   Search in Rotated Sorted Array     
- [ ] 81   Search in Rotated Sorted Array II     
- [ ] 153   Find Minimum in Rotated Sorted Array     
- [ ] 154   Find Minimum in Rotated Sorted Array II     

- Check if `nums[m]` and `target` are on the same side of `nums[0]`

```python
(nums[m]>=nums[0])==(target>=nums[0])
```

### BestValue

- [x] 875 Koko Eating Bananas
- [ ] 774 Minimize Max Distance to Gas Station
- [x] 1011 Capacity To Ship Packages Within D Days

- Sometimes you may need update `r` or `l` with `m` in the loop, in that case, you may want to change the defination of `[l, r)` , otherwise `l<=r` may loop forever

```python
# binary search the best value
l = minVal
r = maxVal

while l<r:
    ...
    if isMeetTheRequirement(m):
        l = m # r = m
    else:
        r = m-1 # l = m-1
```

# Math

### N Sum

- [x] 1 Two Sum
- [ ] 167 Two Sum II
- [ ] 15 3Sum
- [ ] 18 4Sum

- Using two pointer when `nums` is sorted

```python
# two sum
def twoSum(self, nums, t):
    n = len(nums)
    l = 0
    r = n-1
    res = []
    while l<r:
        left = nums[l]
        right = nums[r]
        s = left + right
        if s > t:
            r-=1
        elif s < t:
            l+=1
        else:
            res.append([left, right])
            while l<r and nums[l]==left: l+=1
            while l<r and nums[r]==right: r-=1
    return res
```

```python
# N sum
self.res
def nSum(self, nums, t, N, record):
    n = len(nums)
    if N==2:
        self.res += [record + part for part in self.twoSum(nums, t)]
        return

    for i in range(n-N+1):
        if i==0 or nums[i]!=nums[i-1]: # skip with sort
            self.nSum(nums[i+1:], t-nums[i], N-1, record + [nums[i]])
```

- You may find it quiet similar with some **combination** problem. Both of them require the same method to avoid duplicate. So **NSum** may also be kind of **Backtracking**

- Also related with **Divide and Conquer**

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

### Factory

- [x] 172 阶乘后的零

```python
while n > 0:
    res += n // 5
    n //= 5
```

- [x] 793 阶乘后K个零

return 5 or 0

### MissingNumber

- [x] 448 Find All Numbers Disappeared in an Array
- [x] 645 Set Mismatch

`x ^ x ` equals 0

```python
for i in range(n):
    j = abs(nums[i])-1
    nums[j] = -abs(nums[j])

for i in range(n):
    if nums[i] > 0:
        res.append(i+1)
```

### JosephusCircle

- $N$ People fail in $M$th

$f(N,M)=(f(N−1,M)+M)\%N$

```python
def josephusCircle(n, m):
    p = 0
    for i in range(2, n+1):
        p = (p+m)%i
    return p+1
```



# DFS & BFS

- [x] 200   Number of Islands     
- [x] 130   Surrounded Regions     
- [ ] 364   Nested List Weight Sum II
- [x] 111 Minimum Depth of Binary Tree
- [x] 752 Open the Lock
- [ ] 51   N-Queens     
- [ ] 52   N-Queens II     

    



### BFS

- [x] 994 Rotting Oranges
- [ ] 126 Word Ladder II    
- [ ] 127 Word Ladder

- `queue` record which nodes that we want to visit in the future
- `visited` record places that we have visited (not need sometimes, tree)
- The key point is to find the shortest path, which DFS is hard to achieve.
- One property of bfs is that it can control the **step**

- Some case you can only use **BFS**, lets call it **relation spread problem** (127 Word Ladder). Define a kind of **relation**, **spread** from one set of points to others till reach the **End point**

- Some times when we know the target, we can do the bi-bfs. Start from both start point and end point.

```python
def bfs(start, target):
  queue.append(start)
    while queue:
      n = len(queue)
      for _ in range(n):
        cur = queue.popleft()
        if cur==target:
          return step
        for neighber in neighbers(cur):
            if isValidPos:
              visited.append(neighber)
              queue.append(neighber)
      step+=1
```

### DFS

- [ ] 547 Friend Circles

- DFS belongs to backtracking

- **DFS** is that we **recursively call itself** with changing parameters. When we enter DFS, we normally want to check if certain conditions are met, Then for each possible ways to go, we try DFS on them, get into the next recursion.

```python
def dfs(i, j):
    markAsVisited(i, j)
    for neighber in neighbers(i, j):
      if isValidPos:
      	dfs(neighber.x, neighber.y)
```

# Array

### Interval

- [x] 57   Insert Interval    
- [x] 56   Merge Intervals 
- [ ] 352   Data Stream as Disjoint Intervals    

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

- [x] 76 Minimum Window Substring
- [x] 567 Permutation in String
- [x] 438 Find All Anagrams in a String

- [ ] 30 Substring with Concatenation of All Words
- [ ] 3 Longest Substring Without Repeating Characters
- [ ] 209 Minimum Size Subarray Sum
- [ ] 340 Longest Substring with At Most K Distinct Characters
- [ ] 395 Longest Substring with At Least K Repeating Characters
- [ ] 159 Longest Substring with At Most Two Distinct Characters

```python
# [l, r)
while r < n:
  c = s[r]
  r+=1
  updateWhenAdd()
  while shouldShrinkWindow():
    d = s[l]
    l++
    updateWhenRemove()
```

There are key methods should be considered `updateWhenAdd()`, `updateWhenRemove()`, `shouldShrinkWindow()` and the final one is to decide where should we `updateRes()`

Most of the time we need the `valid` to track the status of window, `map` to track the data info of the `window` and another `map` to record the `need`



### Water

- [x] 11 Container With Most Water

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

### MoveItems

- [x] 26 删除排序数组中的重复项
- [ ] 83 删除排序链表中的重复元素
- [ ] 27 移除元素
- [x] 283 移动零

The key point is to use slow and fast pointer

```java
int p = 0;
for (int i = 0; i < nums.length; i++) {
    if (nums[p]!=nums[i]) { // move valid items to the front
        p++;
        nums[p] = nums[i];
    }
}
```

### TwoPointers

- [x] 141 环形链表
- [x] 142 环形链表II
- [ ] 167 两数之和 II - 输入有序数组
- [ ] 344 反转字符串
- [x] 19 删除链表倒数第 N 个元素

```python
'''
h: distance from head to cycle entry E
d: distance from E to X
c: cycle length
                          _____
                         /     \
        head_____h______E       \ c
                        \ d     /
                         X_____/   
        
slow = h + d
fast = 2(h + d)
fast traveled n loops
2(h+d) = h+d+nc --> h = nc - d
Thus if two pointers start from head and X, respectively, one first reaches E, the other also reaches E.
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

```java
// find mid of linked list
fast = slow = head;
while (fast != null && fast.next != null) {
    fast = fast.next.next;
    slow = slow.next;
}

return slow; // odd->mid, even->right to mid
```

```python
fast = slow = head
while n > 0:
    fast = fast.next
    n-=1
if !fast:
    return head
while fast and fast.next:
    fast = fast.next
    slow = slow.next
return slow
```



### Random

- [x] 380.常数时间插入、删除和获取随机元素
- [x] 710.黑名单中的随机数

Use `array` to store the results and `Random()` to generate index

### QuickSort

`frontOrderTraverse()`

```python
def partition(arr, low, high): 
    pivot = arr[low]
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

### MergeSort

- [ ] 148  Sort List

```python
def mergeSort(arr): 
    if len(arr) >1: 
        mid = len(arr)//2 # Finding the mid of the array 
        L = arr[:mid] # Dividing the array elements  
        R = arr[mid:] # into 2 halves 
  
        mergeSort(L) # Sorting the first half 
        mergeSort(R) # Sorting the second half 
  
        i = j = k = 0
          
        # Copy data to temp arrays L[] and R[] 
        while i < len(L) and j < len(R): 
            if L[i] < R[j]: 
                arr[k] = L[i] 
                i+= 1
            else: 
                arr[k] = R[j] 
                j+= 1
            k+= 1
          
        # Checking if any element was left 
        while i < len(L): 
            arr[k] = L[i] 
            i+= 1
            k+= 1
          
        while j < len(R): 
            arr[k] = R[j] 
            j+= 1
            k+= 1
```



### PatienceSort

- [x] 300 Longest Increasing Subsequence

```java
int n = nums.length;
int[] top = new int[n];
int len = 0;
for(int num : nums) {
    int i = Arrays.binarySearch(top, 0, len, num);
    if (i<0) i = -i-1;
    top[i] = num;
    if (i==len) len++;
}
return len;
```

### PrefixSum

- [ ] 112   Path Sum
- [ ] 113   Path Sum II

- [x] 437  Path Sum III

*Prefix sum* is a sum of the current value with all previous elements starting from the beginning of the structure.

- 1D arrays (sum the current value with all the previous integers)

- 2D arrays (sum of the current value with the integers above or on the left)

- binary trees (sum the values of the current node and all parent nodes)



1. `curPrefixSum`
2. `mp: curPrefixSum->cnt`

```python
for num in nums:
    # current prefix sum
    curr_sum += num

    # situation 1:
    # continuous subarray starts 
    # from the beginning of the array
    if curr_sum == k:
        count += 1

    # situation 2:
    # number of times the curr_sum − k has occurred already, 
    # determines the number of times a subarray with sum k 
    # has occurred up to the current index
    count += h[curr_sum - k]

    # add the current sum
    h[curr_sum] += 1
```

```python
def preorder(node: TreeNode, curr_sum) -> None:
    nonlocal count
    if not node: return 
    curr_sum += node.val
    if curr_sum == k:
        count += 1

    count += h[curr_sum - k] # h only record one single path to cur node
    
    h[curr_sum] += 1
    preorder(node.left, curr_sum)
    preorder(node.right, curr_sum)
    h[curr_sum] -= 1 # avoid found by other subtrees
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

### Encode/Decode

- [x] 394 Decode String

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

- revert number

    ```python
    while x != 0:
      r = r*10 + x%10
      x /= 10
    ```

    

# Thinkings

- Sometimes, **Brute force** method may be your only method, when you find it is really hard to find a fit model.
- **Object in Python** (138 Copy List with Random Pointer)
    - If `Object A` contains to `Object V`, when you change `V.val`, `A.V.val` will change as well
- About edge case, do not pay too much attention onto them at the start. You should get the approximately method as soon as possible
- in the iterate process, queue is BFS while stack is DFS
- `/2` reduce one unit, `length -> index` increase one unit
- $$T(N)=aT(\frac{b}{N})+Θ(N^d)$$, The equation represents dividing the problem up into $$a$$ subproblems of size $$\frac{b}{N}$$ in $$Θ(N^d)$$ time

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

- [x] 450 Delete Node in a BST
- [x] 230 BST第K小的元素（Medium）
- [x] 538 二叉搜索树转化累加树（Medium）
- [x] 1038 BST转累加树（Medium）
- [x] 701 二叉搜索树中的插入操作
- [x] 700 二叉搜索树中的搜索
- [ ] 98 验证二叉搜索树

`node.rightTree.vals >= node.val >= node.leftTree.vals`

in order traverse is sorted

```c++
void BST(TreeNode root, int target) {
 if (root.val == target)
     // 找到目标，做点什么
 if (root.val < target) 
     BST(root.right, target);
 if (root.val > target)
     BST(root.left, target);
}
```



```python
class Node:
    def __init__(self, val):
        self.val = val
        self.left = self.right = None

def find(root, val):
    if val > root.val:
        if not root.right:
            return False
        return root.right.find(val)
    elif val < root.val:
        if not root.left:
            return False
        return root.left.find(val)
    else:
        return True

def insert(root, val):
    if val > root.val:
        if not root.right:
            root.right = TreeNode(val)
            return True
        return root.right.insert(val)
    elif val < root.val:
        if not root.left:
            root.left = TreeNode(val)
            return True
        return root.left.insert(val)
    else:
        return False

def delete(root, val):
    if root == null:
        return null
    if root.val==val:
        if root.left==null: # left is null return right
            return root.right
        if root.right==null: # right is null return left
            return root.left
        minNode = root.right
        while minNode.left: # both non null return min in right tree/max in left tree
            minNode = minNode.left
        root.val = minNode.val
        root.right = delete(root.right, minNode.val)
    elif root.val > val:
        root.left = delete(root.left, val)
    elif root.val < val:
        root.right = delete(root.right, val)
    return root
```



### Monotonous Stack

- [x] 496 下一个更大元素I
- [x] 503 下一个更大元素II
- [x] 1019 Next Greater Node In Linked List
- [ ] 1118 一月有多少天

```python
for i in reversed(range(n)):
    while len(stack)>0 and stack[-1]<nums[i]:
        stack.pop()
    nextGreater[i] = -1 if len(stack)==0 else stack[-1]
    stack.append(nums[i])
```

```python
# circle
for i in reversed(range(n*2)):
    while len(stack)>0 and stack[-1]<=nums[i%n]:
        stack.pop()
    nextGreater[i%n] = -1 if len(stack)==0 else stack[-1]
    stack.append(nums[i%n])
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



### B+Tree

- all data stored in leaf tree
- every leaf is at the same level
- all leaf nodes have links to other leaf nodes
- 

# Outliers in top100

- [x] 6 ZigZag Conversion
- [ ] 8 String to Integer (atoi)
- [ ] 10 Regular Expression Matching