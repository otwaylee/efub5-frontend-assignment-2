/* ----------------------------------- 실습1 ---------------------------------- */

function info(name: string, age?: number): string {
  if (age) {
    return `안녕하세요, ${age}살 ${name}입니다.`;
  } else {
    return `안녕하세요, ${name}입니다`;
  }
}

console.log(info('이펍'));
console.log(info('이펍', 20));

/* ----------------------------------- 실습2 ---------------------------------- */
function combine(input: string): string;
function combine(input: number): number;

function combine(input: string | number): string | number {
  if (typeof input === 'string') {
    return 'Hello,' + input;
  } else {
    return input * 2;
  }
}

let result1 = combine('John');
console.log(result1);

let result2 = combine(5);
console.log(result2);

/* ----------------------------------- 실습3 ---------------------------------- */
interface Info {
  (name?: string, age?: number): string;
}

const info2: Info = (name, age) => {
  if (age) {
    return `안녕하세요, ${age}살 ${name}입니다`;
  } else {
    return `안녕하세요, ${name}입니다`;
  }
};

console.log(info2('이펍'));
console.log(info2('이펍', 20));

/* ----------------------------------- 실습4 ---------------------------------- */
interface Person {
  name: string;
  age: number;
}

interface Me extends Person {
  school: string;
}

const me: Me = {
  name: '이화',
  age: 20,
  school: 'Ewha',
};

console.log(me);
