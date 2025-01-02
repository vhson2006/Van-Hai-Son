"use strict";
/** Complexity O(n) */
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
/** Complexity O(n) */
function sum_to_n_b(n) {
    const sum_recursive = (n, total) => {
        if (n <= 1) {
            return 1;
        }
        return sum_recursive(n - 1, total + n);
    };
    return n <= 0 ? 0 : sum_recursive(n, 0);
}
/** Complexity O(0) */
function sum_to_n_c(n) {
    return n <= 0 ? 0 : n * (n + 1) / 2;
}
