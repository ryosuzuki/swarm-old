

async function fetchJSONAsync(url) {
  let response = await fetch(url);
  let body = await response.json();
  return body;
}

var request = {
  notes: () => {
    return getURL('notes')
  }
  tweets: () => {
    return getURL('tweets')
  }
  checkins: () => {
    return getURL('checkins')
  }
  visits: () => {
    return getURL('visits')
  }
  keywords: () => {
    return getURL('keywords')
  }
}


request.notes()
.then(request.tweets)
.then(request.checkins)
.then(request.visits)
.then(request.keywords)


var tasks = [
  request.notes,
  request.tweets,
  request.checkins,
  request.visits,
  request.keywords
]

var promise = Promise.resolve()
for (let i = 0; i < tasks.length; i++) {
  let task = tasks[i]
  promise = promise.then(task)
}

tasks.reduce((promise, task) => {
  return promise.then(task)
}, Promise.resolve())





function taskA(resolve) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('task a');
      resolve()
    }, 1000)
  })
}
function taskB() {
  console.log('task b');
}
function onRejected(error) {
  console.log('error: a or b', error);
}
function finalTask() {
  console.log('finish');
}


var promise = Promise.resolve();
promise
.then(taskA)
.then(taskB)
.catch(onRejected)
.then(finalTask);

console.log('start')

return

var promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('hello world')
  }, 1000)
})

promise
.then((val) => {
  console.log(val)
})
.catch((err) => {
  console.error(err)
})


console.log('start')
return







var resolve = (val) => {
  console.log(val)
}

var reject = (err) => {
  console.error(err)
}

promise.then(resolve, reject)



var co = require('co')

var p = (str) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(str)
    }, 1000)
  })
}

co(function *() {
  let res1 = yield p('Async 1')
  console.log(res1)
  let res2 = yield p('Async 2')
  console.log(res2)
  let res3 = yield p('Async 3')
  console.log(res3)
})

console.log('Sync 1')



function Deferred() {
  this.promise = new Promise(function (resolve, reject) {
    this._resolve = resolve;
    this._reject = reject;
  }.bind(this));
}
Deferred.prototype.resolve = function (value) {
  this._resolve(value);
};
Deferred.prototype.reject = function (reason) {
  this._reject(reason);
};


function getURL(URL) {
  var deferred = new Deferred();
  var req = new XMLHttpRequest();
  req.open('GET', URL, true);
  req.onload = function () {
    if (req.status === 200) {
      deferred.resolve(req.responseText);
    } else {
      deferred.reject(new Error(req.statusText));
    }
  };
  req.onerror = function () {
    deferred.reject(new Error(req.statusText));
  };
  req.send();
  return deferred.promise;
}


function getURL(URL) {
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', URL, true);
    req.onload = function () {
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = function () {
      reject(new Error(req.statusText));
    };
    req.send();
  });
}





var getURL = (url) => {
  return new Promise((resolve, reject) => {
    var req = new XMLHttpRequest()
    req.open('GET', url, true)
    req.onload = () => {
      if (req.status === 200) {
        resolve(req.responseText)
      } else {
        reject(new Error(req.statusText))
      }
    }
    req.onerror = () => {
      reject(new Error(req.statusText))
    }
    req.send()
  })
}

const url = 'https://google.com'
getURL(url)
.then((val) => {
  console.log(val)
})
.catch((err) => {
  console.error(err)
})

return