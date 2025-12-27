
const map = new Map();
let uuid = 1;

  /**
   * @param {Function} func
   * @param {number} delay
   * @param {number} period
   * @return {number}
   */
  function mySetInterval(func, delay, period) {
   let count = 0;
   uuid++

   const executor = (func, delay, period, count) => {
    const newDeplay = delay + period * count; 
    const timeoutId = setTimeout(() => {
      count++;
      func();
      executor(func, delay, period, count);
    }, newDeplay);

    map.set(uuid, timeoutId);

    return timeoutId;
   }

   const executorID = executor(func, delay, period, count);
   map.set(uuid, executorID); 
   return uuid;
  }

  /**
   * @param { number } id
   */
  function myClearInterval(id) {
   if (map.has(id)) {
      clearTimeout(map.get(id));
      map.delete(id)
   }  
  }



// Timers are implemented in a diff manner
    // when executed in browser > they behav diffly > they return an id
    // when executed in node env > they return an object