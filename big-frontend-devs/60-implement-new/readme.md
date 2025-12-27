````md
# JavaScript Prototypes & `new` — Deep Intuition Notes (Long-term Reference)

> These notes are written for **future-you (6+ months later)**.
> They focus on **WHY things exist**, not just WHAT they are.

---

## 0. The Core Problem JavaScript Had to Solve

JavaScript needed to answer this question:

> How can objects share behavior **without copying functions into every object**?

Copying functions:
- wastes memory
- breaks dynamic updates
- does not scale

The solution JS chose is:
👉 **Prototype-based delegation**

Instead of copying behavior, objects **delegate** behavior lookup to another object.

---

## 1. The Fundamental Mechanism: `[[Prototype]]`

### What is `[[Prototype]]`?
- An **internal engine pointer**
- Exists on **every object**
- Points to **another object**
- Controls **inheritance and behavior lookup**

This is NOT a JavaScript property.
It is part of the language engine itself.

---

### Why does it exist?

Because JavaScript objects do not have classes.

Instead of:
> “I am an instance of class X”

Objects say:
> “If I don’t have something, ask *that object*”

That “that object” is `[[Prototype]]`.

---

## 2. Property Lookup (The Most Important Rule)

When you access:

```js
obj.someMethod
````

JavaScript does:

1. Look on `obj`
2. If not found → follow `obj.[[Prototype]]`
3. Repeat until found or reach `null`

This is **delegation**, not copying.

---

## 3. Why `__proto__` Exists

### What is `__proto__`?

* A **getter/setter** exposed to developers
* It allows reading/writing `[[Prototype]]`
* Lives on `Object.prototype`

```js
obj.__proto__ === Object.getPrototypeOf(obj)
```

---

### Why was it needed?

Because developers needed:

* a way to **inspect inheritance**
* a way to **manually wire delegation**

But:

* `[[Prototype]]` is internal
* `__proto__` became the controlled “window” into it

---

### Important Clarification

> We **never actually use `__proto__` internally**.

When you do:

```js
obj.__proto__ = otherObj
```

What really happens is:

```js
obj.[[Prototype]] = otherObj
```

`__proto__` is just the interface.

---

## 4. Why `prototype` Exists (Function Side)

Now comes the second half of the system.

### Problem:

How do we define **shared behavior** for objects we haven’t created yet?

### Answer:

Attach shared behavior to the **constructor function**.

---

### What is `prototype`?

* A property that exists **only on functions**
* Holds the object that future instances should delegate to
* Exists **before any instances exist**

```js
function Person() {}
Person.prototype // object
```

---

### Why is it on the function?

Because:

* Functions create objects (`new`)
* The function is the **factory**
* The factory defines the **shared behavior**

Think:

* Function = blueprint
* `prototype` = shared abilities
* Instance = concrete object

---

## 5. The Critical Relationship

This is the most important invariant in JavaScript:

```js
instance.__proto__ === Constructor.prototype
```

This single relationship:

* enables inheritance
* enables `instanceof`
* enables method sharing

---

## 6. How `new` Transfers Function Relationships to Object Relationships

This is the key question you asked.

### Before `new`

We have:

* A **function**
* A **prototype object**

```js
Constructor.prototype
```

But **no instance yet**.

---

### When `new Constructor()` runs

JavaScript **converts a function relationship into an object relationship**.

It does this by:

1. Creating an object
2. Wiring its `[[Prototype]]` to `Constructor.prototype`

That’s the moment where:

> Functional definition → Object inheritance

---

### Concrete example

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return "Hi " + this.name;
};
```

When you do:

```js
const p = new Person("Alice");
```

Internally:

```js
const p = {};
p.[[Prototype]] = Person.prototype;
Person.call(p, "Alice");
```

Now:

* `p` is a real object
* `p` delegates behavior to `Person.prototype`

---

## 7. Why This Design Is Powerful

Because:

* Methods are stored **once**
* Instances are lightweight
* Behavior can change dynamically
* Memory usage is minimal

Example:

```js
Person.prototype.sayBye = function () {
  return "Bye";
};
```

All existing instances now have `sayBye`.

---

## 8. `Object.setPrototypeOf`

### What it does

```js
Object.setPrototypeOf(obj, proto)
```

* Mutates `obj.[[Prototype]]`
* Same effect as setting `__proto__`
* Official, spec-approved API

---

### Why it’s discouraged

* JS engines optimize based on stable prototypes
* Changing prototypes breaks those optimizations
* Causes performance de-optimization

Used mainly for:

* polyfills
* low-level abstractions
* learning / internals

---

## 9. `instanceof` Explained via Prototypes

```js
obj instanceof Constructor
```

Means:

> Is `Constructor.prototype` anywhere in `obj`’s prototype chain?

This is why returned objects break `instanceof`.

---

## 10. Why Classes Are “Syntactic Sugar”

```js
class A {
  method() {}
}
```

Internally becomes:

```js
function A() {}
A.prototype.method = function () {};
```

No new inheritance model.
Same prototype system.

---

## 11. One Mental Model to Keep Forever

> JavaScript does not copy behavior.
>
> Objects **delegate** behavior via `[[Prototype]]`.

---

## 12. Memory Anchors (Very Important)

* `prototype` → where shared behavior lives
* `__proto__` → how objects find shared behavior
* `[[Prototype]]` → real inheritance link
* `new` → converts function blueprint into object delegation

---

## 13. Final Staff-Level Insight

If you understand:

* how `[[Prototype]]` works
* why `prototype` is on functions
* how `new` wires them together

Then you understand:

* inheritance
* `extends`
* `instanceof`
* framework internals
* JavaScript itself

> Everything else is built on top of this.

---

```

If you want next, I strongly recommend:
- **Rebuilding `extends` from scratch**
- **Explaining why arrow functions cannot be constructors**
- **Walking the prototype chain step-by-step with diagrams**

Just tell me.
```
