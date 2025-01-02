"use strict";
function sum_to_n_a(n) {
    if (n <= 0) {
        return 0;
    }
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum = sum + i;
    }
    return sum;
}
function sum_to_n_b(n) {
    const sum_recursive = (n) => {
        if (n <= 1) {
            return 1;
        }
        return n + sum_recursive(n - 1);
    };
    return n <= 0 ? 0 : sum_recursive(n);
}
function sum_to_n_c(n) {
    return n <= 0 ? 0 : n * (n + 1) / 2;
}
const def = [2, 99];
for (let i in def) {
    console.log(sum_to_n_a(def[i]));
    console.log(sum_to_n_b(def[i]));
    console.log(sum_to_n_c(def[i]));
}
