## Processes

Running program

#### Resources

CPU, Memory and other

#### Context

- CPU context
    - PC
    - SP
    - FP
    - GP
- Memory context
    - Code, static variables, heap and shared
    - Stack of activation resord

#### Memory structure

- Text
    - Code
- Data
    - Global variables
    - Heap
- Stack
    - Activation records
        - Where return
        - Link to record
        - Local variable

#### Context switching

- Save context
- Restore another context
    - Load all other
    - Load PC

#### Kernel

- Support process
- As extention of current process

## TimeSharing

#### State

- Running
- Ready
- Blocked

#### Threads

- Kernel level
- User level

## Scheduling

#### Shortest First

#### First come first serve

- Non-preemptive
- No starvation

#### Round Robin

Each process gets quantum in turn

- Preemptive
- No starvation
- Wait at most $n-1$ quantums

#### Shortest Process Next

- Best non-preemptive
- Starvation
- Assume service time known
- Theoretical

#### Shortest Remaining time

- Best preemptive
- Assume service time known
- Theoretical

#### Multi-Level Feedback Queues

- Select from highest priority queue
- Run for $T = 2 ^ k$ quantum
    - Used $T$ : move to next lower queue, FIFO
    - Used $< T$ : back to same queue, RR
- Pre/Non-preemptive
- Starvation
- Complex, adaptive and responsive

#### Priority Scheduling

- Select from highest priority
- External criteria

#### Fair Share/Proportional Share

- Select with minimum `get / want`

#### Stride Scheduling

- Select with minimum pass value `P_x`, then `P_x += S_x`

- `S_x = L/R_x`
- `L` is a very large number

#### Realtime Scheduling

- Earliest Deadline First
    - Preemptive
    - Periodic and Aperiodic
    - $100\%$ utilization
    - Over head : odering
- Rate Monotonic Scheduling
    - Only periodic
    - Prioritize based on rates
    - Preemptive
    - `U = C / T`
    - `U1 + ... Un <= n(2^{1/n} - 1) < 69%`
    - `rate = 1/T`
    - `min 1/T`

## Synchronization

- To avoid race condition

- Wait for resources
- Four rules
    - At most one process in  Critical Section
    - Connot prevent entry if no other in CS
    - Should eventurally be able to enter CS
    - No assumption about CPU
    
#### Peterson's Solution

Take turns + State Intention

```c
shared int turn;
shared boolean intent[2] = {FALSE, FALSE};
// P0
intent[0] = TRUE;
turn = 1;
while (intent[1] && turn==1);
// < critical section >
intent[0] = FALSE;
// P1
intent[1] = TRUE;
turn = 0;
while (intent[0] && turn==0);
// < critical section >
intent[1] = FALSE;
```

#### Test-And-Set Lock

```c
TSL(int *lockptr) {
    int oldval;
    oldval = *lockptr
	*lockptr = 1;
	return ((oldval == 0) ? 1 : 0);
}
```

```c
shared int lock = 0;

// P0
while (! TSL(&lock));
// < critical section >
lock = 0;

// P1
while (! TSL(&lock));
// < critical section >
lock = 0;
```

- Test `if mem==0` and set `mem = 1`
- `if lock==1:`
    - `pass CS`
    - `lock = 0`
- `else:`
    - `loop`



**Both Peterson and TSL are still suffered by busy waiting**

## Semaphores

#### `wait(s)`

 `blockCurProcess() if s==0 else s-=1`

#### `signal(s)`

`unblockOneProcess() if exist else s+=1`

- No busy waiting but `wait(s)` and `signal(s)` need be atomic
- Mutual Exclusion : `s = 1`
- Order processes : 
    - `s = 0`
    - Pre process end with `signal(s)`
    - Post process start with `wait(s)`

## Inter Process Commulication

- Data transfer

- Synchronization

- Shared memory + Semaphores

- Producer

    - ```c
        wait(emptySlots);
        // produce
        signal(filledSlots);
        ```

- Consumer

    - ```c
        wait(filledSlots);
        // consume
        signal(emptySlots);
        ```

#### Monitor

Only one process can be active inside monitor

```c
monitor ProducerConsumer {
    int buf[N], in = 0, out = 0, count = 0;
    cond slotavail, itemavail;
    
    PutItem (int item) {
        if (count == N)
        	wait (slotavail);
        buf[in] = item;
        in = (in + 1)%N;
        count++;
        signal (itemavail);
    }
    
    GetItem () {
        int item;
        if (count == 0)
            wait (itemavail);
        item = buf[out];
        out = (out + 1)%N;
        count--;
        signal (slotavail);
        return (item);
    }
}
```

```c
// Producer
while (TRUE) {
    PutItem(Produce ());
}
// Consumer
while (TRUE) {
    Consume(GetItem ());
  }
```



#### Message passing

- No shared memory, running on different machines
- `send(dest, msg)` : asynchrony
- `receive(src, msg)` : synchrony
- Flow control : consumer and producer

## Dead Lock

- Processes are permanent blocked

- Four conditions
    - Mutual exclusion : Only one process may use a resource at same time
    - Hold and wait : Process holds resource while waitng for another
    - No preemption : Can’t take a resource away from a process
    - Circle wait : The waitng processes form a cycle

#### Banker's algorithm

- Safe state : deadlock absolute avoidable
- Given
    - process/recourse **claim** matrix
    - process/recourse **allocation** matrix
    - recourse **availability** vector

- Check
    - A process can run to completion
    - Return resources–resources can then be used by another process
    - Eventually, all the processes complete



## Memory Management

How to allocate and free portions of memory, to support multiple processes

- $50\%$ Rule : $m=n/2$

    - $n$ : number of blocks
    - $m$ : number of holes

- Unused memory rule : $f = k/(k+2)$

    - $b$ : average szie of blocks
    - $h$ : average size of holes
    - $k = h/b$ : average ratio of hole-to-block
    - $f$ : space lost to holes

- Buddy System

    - Alloc

    - ```python
        # find chunk larger than r else return failure
        while r ≤ sizeof(chunk)/2:
            divide chunk into 2 buddies # each 1/2 size
        allocate the chunk
        ```

    - Free

    - ```python
        while buddy is also free:
            merge with buddy
        ```



## Logical Memory

Logical memory is a process’s memory

#### Logical Addressing

- Assumes separate memory starting at 0
- Compiler generated
- Independent of location in physical memory

#### Hardwares

- Base register filled with start address 
- To translate logical address, add base 
- Achieves relocation 

- To move process : change base 

#### Protection

- Bound register works with base register

- Is address < bound

    - Yes: add to base

    - No: invalid address, TRAP

- Achieves protection

#### Segmented Address Space

Address space is a set of segments

- Segment Table
    - Valid bit
    - Base
    - Bound
    - Perm
- Physical address : `segmentTable(s) + i`

#### Paged Address Space

Linear sequence of pages in logical memory

Linear sequence of frames in physical memory

- Frame : a physical unit of informa6on

- Page : fits exactly into a frame

- Page Table
    - Valid bit
    - Demand paging bits
    - Frame
- Physical address : `pageTable(p).append(i)`



## Virtual Memory

- Keep only portion of logical memory in physical

- Rest is kept on disk
- Unit of memory is segment or page

#### Page Replacement Algorithms

- LRU

    - Remove page that was least recently used
    - Need to keep track of frame

- Clock Algorithm

    - ```python
        while True:
            if frames[i].ref == 0:
                select(frames[i])
                break
            else:
                frames[i].ref = 0
                i+=1
        ```

        

    - If ref bit 0, select frame

    - Else, set ref bit to 0

    - Advance clock hand 

    - If frame found, break out of loop else repeat)

- OPT >= LRU >~ Clock >~ FIFO

## File System

File : Logical unit of storage, container of data

#### Attributes

- Type
- Times
- Sizes
- Access control

#### Operations

- Creation: create, delete
- Prepare for access: open, close
- Access: read, write
- Search: move to location
- Atributes: get, set
- Mutual exclusion: lock, unlock
- Name management: rename

File System : a structured collection of files

#### Hierarchical File Name Space

- Name space is organized as a tree

#### Read/Write Model

- `fd = open (fname, usage)`
- `nr = read (fd, buf, size)`
- `nw = write (fd, buf, size)`
- `close (fd)`

#### Structure

- File System Metadata : Information about file system 

    - Sizes
    - In-use / free entries
- File Metadata : File control blocks

    - Attributes

        - type of file

        - size

        - permissions

    - References to data blocks
        - disk block map : 13 Pointers
        - Find file with filename 
- Data Blocks : File contents 

#### Performace

- Caching
- Clustering
    - Place related blocks close to each other: clustering
    - Reduces disk head movement, and thus seek time
- Block Size
    - The larger the block, the beTer the throughput
    - The smaller the block, the less wasted space

## Input/Output System

#### IO

- Input from aNached device to CPU/memory
- Output from CPU/memory to device

#### Buffering

**Device Dependent: Device Drivers <==> Device Controller**

- Encapsulates device-dependent code
    - Contains device-specific register reads/writes : `dread(), dwrite()`
- Implements a standard interface
    - `open (), close (), read (), write ()`
- Interrupt handlers

#### Device Independent

- Uniform interfacing for device drivers
- Naming, protection
- Uniform block size
- Buffering, caching
- Storage allocation
- Locking
- Error handling

## Protection

Processes access resources

#### Protection Matrix

- Rows are domains
- Columns are resources
- Matrix entry `[d, r]` contains permissions/rights

#### Access Control Lists

- For each resource, list (domain, permissions) pairs
- ACL is associated with **resource**
- if name is on list, ok to access
- Can be inefficient: must lookup on each access
- Revocation is easy; just remove from list

#### Capability Lists

- For each domain, list (resource, permissions) pairs
- Capability list associated with each **domain**
- Like key/ticket: if you have it, you get access
- Efficient: on access, just produce capability
- Hard to revoke

## Security

#### Cryptography

- Secret key encryption
    - Same key both sides
    - Public algorithm
    - DES & AES
    - Fast
    - Hard to distribute keys
- Public key encryption
  
    - Different two keys
    - Each user has 2 keys
    - A send B
      
        - A encrypts using B public
        - B decrypts using B private
    - RSA
    - slow
    - Easy to distribute key
- Combination
    - Public key to start session: exchange secret key
    - During session, use secret key

- Digital Signatures
    - A sends $K_{B,pub}(M, K_{A,priv}(M))$ to B
    - Only B can decrypt: $K_{B,priv}(K_{B,pub}(M, K_{A,priv}(M)))$
    - Decrypts using $K_{A,pub}$ proving A signed it

## Distributed Systems

A collection of independent computers that appear to its users as one computer

#### Three Characteristics

- Operate concurrently
- Fail independently
- Do not share global clock

#### Storage

- Read replication (Read > Write)
    - Lead database + follow database
    - Complexity
    - Consistency
- Sharding (simple data model and access patterns)
    - Separates very large databases the into smaller, faster, more easily managed parts(Shards)
    - A:F + F:N + N:Z
    - Limited data model, limited data access patterns
- Consistent Hashing => Consistency
    - Unique ID
    - Calculate the hash value of key, put it into one node accoring with the unique ID (`id[i] < hashValue < id[i+1]`)
    - This is origional node becomes the *master* node
    - Replicate to other nodes
    - $R + W > N$
- CAP Theorem
    - Consistent
    - Available
    - Partition tolerance
- Transaction

#### Computation

- MapReduce
    - Counter only one time
    - Shuffle, similar words close to each other
    - Dump into reduce, add same chars
- Hadoop
    - Spark
        - More general data model, object
    - Kafka

#### Messaging



