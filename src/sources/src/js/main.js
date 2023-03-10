document.addEventListener("DOMContentLoaded", function(event) {
    // Your code here
    
    console.log('It works!');
    fun('It also works!');
    console.log(es6Func('JS'));
    console.log(es6Func('JS', 'Popular Language'));
});

// Your functions here
function fun(params) {
    console.log('fun says: ' + params);
}

// Let's write on ES6!
const es6Func = (param1, param2 = 'ES6') => {
    let words = param1 +' — '+ param2;
    return `This is ${param1} and ${param2}, together: ${words}`;
}
