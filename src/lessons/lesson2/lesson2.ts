import {useState} from "react";

console.log('lesson 2');

// Lexical environment
// http://jsflow.org/docs/lex-env/

//// Closure
// https://learn.javascript.ru/closure
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%B7%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F-%D0%B2-javascript-%D1%80%D0%B0%D0%B7-%D0%B8-%D0%BD%D0%B0%D0%B2%D1%81%D0%B5%D0%B3%D0%B4%D0%B0-c211805b6898
// https://www.youtube.com/watch?v=pahO5XjnfLA

//// Сurrying
// https://learn.javascript.ru/currying-partials
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%BA%D0%B0%D1%80%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B2-javascript-5ec4a1d88827

// Pattern Module
// https://habr.com/ru/company/ruvds/blog/419997/

// Recursion
// https://learn.javascript.ru/recursion
// https://www.youtube.com/watch?v=Kuq6oIN3PH0


// Task 01
// Реализовать функцию sum которая суммирует 2 числа следующим образом sum(3)(6) === 9
/*
const sum=(a: number, b: number)=>{
    return a+b
}
sum(3,6)
console.log(sum(3,6))
*/

// Task 02
// Реализовать функцию makeCounter которая работает следующим образом:
// const counter = makeCounter();
// counter(); // 1
// counter(); // 2
// const counter2 = makeCounter();
// counter2(); // 1
// counter(); // 3

/*
const makeCounter = () => {
  let counter = 1
    return()=>{
      console.log(counter++)
    }
}

let counter = makeCounter()
let counter2 = makeCounter()

counter()
counter()
counter2()
counter()
*/


// Task 03
// Переписать функцию из Task 02 так, что бы она принимала число в качестве аргумента и это число было стартовым значением счетчика
// и возвращала следующий объект методов:
// increase: +1
// decrease: -1
// reset: установить счетчик в 0;
// set: установить счетчик в заданное значение;

/*
function makeCounter(n: number) {

    const obj = {
        increase() {
            n += 1
            return n
        },
        decrease() {
            n -= 1
            return n
        },
        reset() {
            n = 0
            return n
        },
        set(m: number) {
            n = m
            return n
        }
    }

    return obj

}

console.log(makeCounter(1).set(7))*/

// Task 04*
// Реализовать функцию superSum которая принимает число в качестве аргумента, которое указывает на количество слагаемых
// и что бы корректно работали следующие вызовы:
// 1) superSum(0) //0
// 2) superSum(3)(2)(5)(3) //10
// 3) superSum(3)(2)(5,3) //10
// 4) superSum(3)(2,5,3) //10
// 5) superSum(3)(2,5)(3) //10
// 6) superSum(3)(2,5)(3,9) //10

// P.S. типизируйте только аргументы, а при вызове функции используйте @ts-ignore

/*
const superSum = (fn: { (x: number, y: number): number; (x: number, y: number): number; call?: any; }, seed: number) => {
    const reduceValue = (args: any[], seedValue: number) =>
        args.reduce((acc, a) => {
            return fn.call(fn, acc, a);
        }, seedValue);
    const next = (...args: undefined[]) => {
        // @ts-ignore
        return (...x) => {
            if (!x.length) {
                return reduceValue(args, seed);
            }
            return next(...args, reduceValue(x, seed));
        };
    };
    return next();
};

const iSum = superSum((x: any, y: any) => x + y, 0);

console.log(iSum(0)()); // 0
console.log(iSum(3)(2)(5)(3)()); // 13
console.log(iSum(3)(2)(5,3)()); // 13
console.log(iSum(3)(2,5,3)()); // 13
console.log(iSum(3)(2,5)(3)()); // 13
console.log(iSum(3)(2,5)(3,9)()); // 22

*/




// Task 05
// решить все задачи по рекурсии которые даны в конце статьи https://learn.javascript.ru/recursion

//Task 05.1
//Напишите функцию sumTo(n), которая вычисляет сумму чисел 1 + 2 + ... + n.
//Решение с помощью цикла:
function sumTo(n: number) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

alert( sumTo(100) );

//Решение через рекурсию:

    function sumTo2(n: number) {
        if (n == 1) return 1;
        return n + sumTo(n - 1);
    }

alert( sumTo2(100) );

//Решение по формуле: sumTo(n) = n*(n+1)/2:

function sumTo3(n: number) {
    return n * (n + 1) / 2;
}

alert( sumTo3(100) );

//Task 05.2
/*Вычислить факториал
Факториал натурального числа – это число, умноженное на "себя минус один", затем на "себя минус два", и так далее до 1. Факториал n обозначается как n!
Определение факториала можно записать как:
    n! = n * (n - 1) * (n - 2) * ...*1
Примеры значений для разных n:
    1! = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24
5! = 5 * 4 * 3 * 2 * 1 = 120
Задача – написать функцию factorial(n), которая возвращает n!, используя рекурсию.*/
//Другими словами, factorial(n) можно получить как n умноженное на результат factorial(n-1). И результат для n-1, в свою очередь, может быть вычислен рекурсивно и так далее до 1.

// @ts-ignore
function factorial(n: number) {
    return (n != 1) ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120

//Базисом рекурсии является значение 1. А можно было бы сделать базисом и 0, однако это добавило рекурсии дополнительный шаг:

    function factorial1(n: number) {
        return n ? n * factorial(n - 1) : 1;
    }

alert( factorial1(5) ); // 120

//task 05.3
/*Числа Фибоначчи
важность: 5
Последовательность чисел Фибоначчи определяется формулой Fn = Fn-1 + Fn-2. То есть, следующее число получается как сумма двух предыдущих.
    Первые два числа равны 1, затем 2(1+1), затем 3(1+2), 5(2+3) и так далее: 1, 1, 2, 3, 5, 8, 13, 21....
Числа Фибоначчи тесно связаны с золотым сечением и множеством природных явлений вокруг нас.
    Напишите функцию fib(n) которая возвращает n-е число Фибоначчи.*/

function fib(n: number) {
    let a = 1;
    let b = 1;
    for (let i = 3; i <= n; i++) {
        let c = a + b;
        a = b;
        b = c;
    }
    return b;
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
alert( fib(77) ); // 5527939700884757

//task5.4
/*
Вывод односвязного списка
Допустим, у нас есть односвязный список (как описано в главе Рекурсия и стек):

let list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};
Напишите функцию printList(list), которая выводит элементы списка по одному.
    Сделайте два варианта решения: используя цикл и через рекурсию.*/

//Решение с использованием цикла:

    let list = {
        value: 1,
        next: {
            value: 2,
            next: {
                value: 3,
                next: {
                    value: 4,
                    next: null
                }
            }
        }
    };

function printList(list: any) {
   /* let tmp = list;*/

   /* while (tmp) {
        alert(tmp.value);
        tmp = tmp.next;
    }*/
    while(list) {
        alert(list.value);
        list = list.next;
    }
}

printList(list)

/*Решение через рекурсию
Рекурсивный вариант printList(list) следует простой логике: для вывода списка мы должны вывести текущий list, затем сделать то же самое для list.next:*/

let list1 = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

function printList1(list1:any) {

    alert(list1.value); // выводим текущий элемент

    if (list1.next) {
        printList(list1.next); // делаем то же самое для остальной части списка
    }

}

printList1(list1);


//task5.5
/*Вывод односвязного списка в обратном порядке
Выведите односвязный список из предыдущего задания Вывод односвязного списка в обратном порядке.
    Сделайте два решения: с использованием цикла и через рекурсию.*/

/*С использованием рекурсии
Рекурсивная логика в этом случае немного сложнее.
    Сначала надо вывести оставшуюся часть списка, а затем текущий элемент:*/

    let list3 = {
        value: 1,
        next: {
            value: 2,
            next: {
                value: 3,
                next: {
                    value: 4,
                    next: null
                }
            }
        }
    };

function printReverseList(list3:any) {

    if (list3.next) {
        printReverseList(list.next);
    }

    alert(list3.value);
}

printReverseList(list3);

/*
С использованием цикла
Вариант с использованием цикла сложнее, чем в предыдущей задаче.
    Нет способа сразу получить последнее значение в списке list. Мы также не можем «вернуться назад», к предыдущему элементу списка.
    Поэтому мы можем сначала перебрать элементы в прямом порядке и запомнить их в массиве, а затем вывести то, что мы запомнили, в обратном порядке:
*/

    let list4 = {
        value: 1,
        next: {
            value: 2,
            next: {
                value: 3,
                next: {
                    value: 4,
                    next: null
                }
            }
        }
    };

function printReverseList2(list4:any) {
    let arr = [];
    let tmp4 = list4;

    while (tmp4) {
        arr.push(tmp4.value);
        tmp4 = tmp4.next;
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        alert( arr[i] );
    }
}

printReverseList2(list4);

// Task 06
// написать функцию, которая повторяет функционал метода flat массива на всю глубину.
/*

function customFlat(arr: any):any {
    //@ts-ignore
    return arr.reduce((acc, current) => {
        if(Array.isArray(current)) return acc.concat(customFlat(current))
        return [...acc, current]
    }, [])
}
let a = [1,2,3,[4,5,[6,7]]]
console.log(customFlat(a))
*/

// just a plug
export default () => {};