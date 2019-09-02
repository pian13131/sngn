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

#### Shortes Remaining time

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
    - Post process end with `wait(s)`

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
    - Mutual exclusion : Only one process may use a resource at a 6me
    - Hold and wait : Process holds resource while wai6ng for another
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

