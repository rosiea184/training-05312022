// number, bookean, string, null, undefined, symbol, bigint ===> primitive type data
// console.log(typeof 1);
// console.log(typeof 'hello');
// console.log(typeof null);
// console.log(typeof undefined);
// console.log(typeof true);

//*  Pass by value vs. pass by reference *//
// var a = 5
// function foo(input) {
//   input = 6
//   console.log(input);
// }

// foo(a)
// console.log(a);

// let b = 1
// let c = b
// b = 2

//* Coersion *//
// let result = true + false
// console.log(result);
// '==' VS '==='
// console.log('1' == 1); // true
// console.log('1' === 1); // false

//* Truthy & Falsy *//
// Falsy values in JS
// false, 0, '', null, undefined, NaN, document.all ===> falsy values

//* Objects *//
// let obj = {}
// console.log(obj);
// let obj2 = Object.create({})
// console.log('obj2:', Obj2); //plain objects

// class classObj{
//   constructor(name) {
//     this.name = name
//   }
// }

// let myObj = new classObj("John")
// console.log(myObj);


// function foo() { }
// console.dir(foo);

// let arr = [1, 2]
// console.log(arr);

// let obj = { name: 'J' }
// function foo(input) {
//   input.name = 'L'
//   console.log(input);
// }
// foo(obj)
// console.log(obj);

//* Var, Let, Const *//
// Scope

// var a = 5
// function foo() {
//   console.log(a);
//   if (true) {
//     var a = 3 // function scope
//   }
//   console.log(a);
// }
// foo()

// function foo() {
//   console.log(a);
//   if (true) {
//     let a = 5 // block scope
//   }
//   console.log(a);
// }
// foo()

// const obj = { name : 'Xin'}

