class Observable {
  constructor(setup) {
    this._setup = setup
  }

  subscribe(subscriber) {
    // normalize subscriber
    const observer =
      typeof subscriber === 'function'
        ? { next: subscriber }
        : subscriber || {}

    let closed = false

    const safeSubscriber = {
      next: (value) => {
        if (!closed && observer.next) {
          observer.next(value)
        }
      },
      error: (err) => {
        if (!closed) {
          closed = true
          observer.error && observer.error(err)
        }
      },
      complete: () => {
        if (!closed) {
          closed = true
          observer.complete && observer.complete()
        }
      }
    }

    // run producer
    this._setup(safeSubscriber)

    // return subscription
    return {
      unsubscribe() {
        closed = true
      }
    }
  }
}
