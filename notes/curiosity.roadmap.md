# JavaScript Engine Deep Dive Roadmap

## Concept 1: Heap vs Stack

### What it is

JavaScript (and most languages) uses **two main areas of memory**:

1. **Stack**
   - Stores **primitive values** (numbers, booleans, undefined, null) and **references to objects**.
   - LIFO (Last In First Out) structure — very fast allocation and deallocation.
   - Automatically cleaned up when a function returns.

2. **Heap**
   - Stores **objects, arrays, functions** (everything that’s not a primitive).
   - Not automatically organized — GC cleans up unreachable objects.
   - Access is slower than stack, but it allows dynamic allocation and variable size.

---

### Why it matters

- Understanding this is **critical for memory management intuition**.
- Helps you understand **closures retaining memory**.
- Explains **why large arrays/objects impact performance**.
- Foundation for understanding **GC, WeakRef, FinalizationRegistry**.

---

### Deep engine-level questions to ask yourself

1. When I write:

```js
let a = 42;
let b = { x: 1 };
````

* Where does `a` live?
* Where does `b` live?
* When `b` is no longer referenced, how does the engine know it can be freed?

2. What happens under the hood when I do:

```js
function foo() {
    let obj = { data: new Array(1000).fill(0) };
}
foo();
```

* How is memory allocated for `obj` and its array?
* When `foo` returns, what remains on the stack?
* When and how does GC clean the array in the heap?

3. How would you **implement a mini JS-like heap + stack in Go**?

   * Stack: LIFO slice of values
   * Heap: map of IDs → object structs
   * Allocation / deallocation rules
   * Optional: simulate garbage collection by reference counting

---

### Suggested exercise

1. Implement a **tiny runtime in Go**:

   * Stack as a slice of values (`[]interface{}`)
   * Heap as `map[int]*Object`
   * Functions push/pop stack frames
   * Object allocation gives unique ID in heap
   * Optional: implement a simple **mark-and-sweep GC** to free unreachable objects

2. Print stack & heap after function calls.

3. Experiment: what happens if you retain a reference in a closure?

This is **exactly the kind of thinking Chrome DevTools engineers do** when designing memory management, caches, or optimizing JS execution.

---

## 50 Top-Tier JavaScript Concepts & Questions

### Theme 1: Memory & Garbage Collection (9 concepts)

1. Heap vs Stack
2. Garbage Collection (GC)
3. Mark-and-Sweep
4. Generational GC
5. Incremental & concurrent GC
6. Memory leaks in closures
7. WeakMap & WeakSet
8. WeakRef & FinalizationRegistry
9. Hidden classes / shapes

### Theme 2: Execution Context & Call Stack (5 concepts)

10. Call stack mechanics
11. Execution context
12. Variable environments & scopes
13. Hoisting
14. Tail-call optimization

### Theme 3: Event Loop & Concurrency (8 concepts)

15. Event loop architecture
16. Microtask vs Macrotask queue
17. Task scheduling
18. Async/await internals
19. Message channels & postMessage
20. Timers (`setTimeout`, `setInterval`)
21. Long-running tasks and UI blocking
22. Web Workers & threads

### Theme 4: Performance & Optimization (8 concepts)

23. Inline caches
24. Hidden classes / shapes revisited
25. Polymorphic vs monomorphic calls
26. JIT compilation
27. Deoptimization / bailouts
28. Garbage pressure & allocation churn
29. Array optimizations
30. String internals / rope strings

### Theme 5: Data Structures & Low-Level Representation (7 concepts)

31. Maps & Sets internals
32. Typed arrays & ArrayBuffer
33. SharedArrayBuffer & Atomics
34. Symbol & hidden properties
35. Property descriptors
36. Object vs array memory layout
37. Sparse vs dense arrays

### Theme 6: JS Engine Internals & Compilation (5 concepts)

38. Parsing & AST generation
39. Bytecode vs machine code
40. Optimizing compiler pipelines
41. Inline function expansion
42. Spec compliance vs optimization

### Theme 7: Advanced Patterns / APIs (5 concepts)

43. Proxies & traps
44. Descriptors vs getters/setters
45. Iterators & generators
46. WeakRefs in real caching
47. Async iteration
48. FinalizationRegistry edge cases
49. BigInt & numeric representations
50. Internal string encoding & decoding

---

### How to use this roadmap

* Pick a theme (Memory, Event Loop, Optimization)

* For each concept:

  1. Ask: *Why was this created?*
  2. Ask: *What problem does it solve internally?*
  3. Ask: *What tradeoffs exist?*
  4. Optionally, read **V8 source / SpiderMonkey source / TC39 proposals** for this API

* Start small: even understanding **hidden classes + inline caches** is enough to understand *how Chrome devs think about JS performance*.

---

### Next Steps

1. Pick **Heap vs Stack**.

2. Try implementing a tiny runtime in Go that models:

   * Stack frames
   * Heap allocation
   * Simple object references
   * Optional: mark-and-sweep GC

3. Once done, move to **GC concepts, closures, or event loop**.

4. Gradually explore engine internals for optimization patterns.


---

If you want, I can **also prepare the Go skeleton for the stack+heap runtime** in the same markdown so you can start coding immediately. Do you want me to do that?
