class BrowserHistory {
  
  /**
   * @param {string} url
   * if url is set, it means new tab with url
   * otherwise, it is empty new tab
   */
  constructor(url) {
    this.pointer = 0;
    this.history = [url];
  }
  /**
   * @param { string } url
   */

  getVisitUpdatedLength() {

    // if the history is empty
    if (this.pointer === -1) {
      return 0;
    }
    return this.pointer+1;

  }

  visit(url) {
    this.history.length = this.getVisitUpdatedLength();
    this.history.push(url);
    this.pointer++;
  }
  
  /**
   * @return {string} current url
   */
  get current() {
    if (this.pointer == -1) return undefined;
    const current = this.history[this.pointer];
    return current;
  }
  
  // go to previous entry
  goBack() {
    this.pointer = Math.max(0, this.pointer - 1);
  }
  
  // go to next visited url
  forward() {
    if (this.pointer === this.history.length -1) {
      return
    }
    this.pointer++
  }
}

/*
  
  *-------------------*
  | Test Cases        |
  *-------------------*

  empty new tab: new BrowserHistory()  

new tab with url: new BrowserHistory('A')  

empty new tab, visit('A'), visit('B')  

empty new tab, visit('A'), visit('B'), goBack()  

new empty tab, visit('A'), visit('B'), goBack(), goBack()  

new tab with url('X'), visit('A'), visit('B'), goBack(), goBack()  

new empty tab: goBack() stops at empty history  

new empty tab with url('X'): goBack() stops at initial url  

cannot foward() if no more visited url  

visit() should keep the old entries  

visit() should truncate the visited url we can forward to 

*/