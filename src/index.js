let x;
// let y;
// let f = n => n * 100 + 100;

let active;

let onXChanged = function(cb) {
  active = cb;
  active();
  active = null;
};

class Dep {
  constructor() {
    this.deps = new Set();
  }
  depend() {
    if (active) {
      this.deps.add(active);
    }
  }
  notify() {
    this.deps.forEach(dep => dep());
  }
}

let ref = initValue => {
  let value = initValue;
  let dep = new Dep();

  return Object.defineProperty({}, "value", {
    get() {
      dep.depend();
      return value;
    },
    set(newValue) {
      value = newValue;
      dep.notify();
    }
  });
};

x = ref(1); // 200

onXChanged(() => {
  document.write(`hello ${x.value}`);
});

x.value = 2; // 300
x.value = 3; // 400
