<!-- 1) What is the difference between var, let, and const?

The main difference between var, let, and const lies in their scoping and reassignment capabilities. Var is function-scoped and can be both redeclared and reassigned. Let is block-scoped and can be reassigned but not redeclared within the same scope. Const is also block-scoped but cannot be reassigned or redeclared after its initial assignment, making it ideal for constant values.

2) What is the difference between map(), forEach(), and filter()?

These are all array methods with distinct purposes. Map creates a new array by applying a function to each element of the original array. ForEach executes a provided function once for each array element but does not return a new array. Filter creates a new array containing only the elements that satisfy a provided testing function.

3) What are arrow functions in ES6?

Arrow functions are a concise syntax for writing functions in ES6 that use a fat arrow notation. They have lexical this binding, meaning they inherit the this value from their surrounding context rather than having their own. Arrow functions cannot be used as constructors and provide implicit return when written without curly braces.

4) How does destructuring assignment work in ES6?

Destructuring assignment is a syntax that allows you to extract values from arrays or properties from objects into distinct variables. It provides a concise way to unpack values from complex data structures, making code more readable and reducing the need for multiple lines of assignment statements.

5) Explain template literals in ES6. How are they different from string concatenation?

Template literals are string literals delimited by backticks that allow embedded expressions and multi-line strings. They differ from traditional string concatenation by providing a more readable syntax, allowing direct variable insertion without plus operators, supporting expression evaluation within strings, and enabling multi-line strings without escape characters. -->