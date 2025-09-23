/* ---------------------------------- 실습 1 ---------------------------------- */
class Developer {
  name: string; // 어디서든 접근 가능한 접근 제어자 설정
  age: number; // 클래스 내부와 파생 클래스에서 접근 가능한 접근 제어자
  position: string; // 클래스 내부에서만 접근 가능한 접근 제어자 설정
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  sayHi() {
    console.log(
      `저는 ${this.age}살이고 이름은 ${this.name}입니다. 포지션은
${this.position}입니다`
    );
  }
}

class FrontendDeveloper extends Developer {
  protected react: boolean;

  constructor(name: string, age: number, position: string, react: boolean) {
    super(name, age, position);
    this.react = react;
  }
}
// Developer 클래스를 상속받는 FrontendDeveloper 클래스를 선언해주세요
// 규칙 1. FrontendDeveloper 클래스에 'react'라는 이름의 새로운 필드를 선
// 언해주세요.
// (해당 필드의 접근 제어자는 protected, 타입은 boolean으로 설정)
// 규칙 2. 오류가 나지 않도록 constructor를 작성해주세요.(주의: super를 잊
// 지 마세요!)

/* ---------------------------------- 실습 2 ---------------------------------- */
class Developer1 {
  constructor(
    public name: string,
    protected age: number,
    private position: string
  ) {}

  sayHi() {
    console.log(
      `저는 ${this.age}살이고 이름은 ${this.name}입니다. 포지션은
${this.position}입니다`
    );
  }
}

/* ----------------------------------- 실습3 ---------------------------------- */
function forEach<T, U>(arr: T[], callback: (item: T) => void) {
  // forEach는 반환값이 없으므로 void
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]); // 배열의 모든 요소에 콜백함수를 한번씩 수행
  }
}

/* ---------------------------------- 실습 4 ---------------------------------- */
interface Student {
  type: 'student';
  school: string;
}
interface Developer {
  type: 'developer';
  skill: string;
}
//User 인터페이스를 제네릭 인터페이스로 업그레이드 해주세요.(제네릭 타입은 T로 설정해주세요.)
interface User<T> { 
  name: string;
  profile: T;
}
//제네릭을 이용해 매개변수 타입을 나타내어 불필요한 타일 좁히기를 없애주세요
function goToSchool(user: User<Student>) {
  if (user.profile.type !== 'student') {
    console.log('잘 못 오셨습니다');
    return;
  }
  const school = user.profile.school;
  console.log(`${school}로 등교 완료`);
}
