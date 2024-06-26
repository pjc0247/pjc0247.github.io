# 지연 평가와 무한 자료형

차시: 5

### eager evaluation

```sql
SELECT * FROM student WHERE age >= 15 AND grade = 1 AND status = 0;
```

위 SQL문을 javascript 코드로 한번 변환해보겠습니다.

아주 간단한 접근은 아래와 같이 해볼 수 있습니다.

```cpp
getStudents()
  .filter(x => x.age >= 15)
  .filter(x => x.grade === 1)
  .filter(x => x.status === 0)
```

그럼 이제 위 코드가 실제로 어떻게 실행되는지 가상으로 시뮬레이션 해보겠습니다.

```cpp
getStudents() // 1억개 가져옴 (전체 테이블이 1억개라고 가정)
  .filter(x => x.age >= 15)   // 3천만개로 줄어듬
  .filter(x => x.grade === 1)  // 1천만개로 줄어듬
  .filter(x => x.status === 0)  // 100개로 줄어듬
```

(100개 가져오려고 1억 + 1억 + 3천만 + 1천만번 연산을 해야함)

이것을 **eager evaluation** 이라고 부릅니다.

굉장히 멍청해 보일 수 있지만 코딩을 할 때 가장 많이 쓰이는 일반적인 접근방법이며, 그렇게 느리지 않을수도 있습니다.

하지만 제가 예시로 가져온 `getStudents` 같은 케이스에서는 확실하게 느리며, 경우에 따라선 쓸 수 없을 수준일 수 있습니다.

### lazy evaluation

데이터가 일반적인 방법으로 다루기 매우 거대하다면 지연 실행(lazy evaluation)을 통해 빠르게 만들어볼 수 있습니다.

만약 우리가 조건문을 만날 때 마다 바로바로 실행시키지 않고 실제로 데이터가 필요해지는 시점까지 계산을 미룬다면 해당 시점에 우리는 `어떤 조건을 가지고 데이터를 가져와야 하는지` 를 모두 알 수 있습니다.

이는 곧 가져오기 계획을 세울 수 있다는것을 의미합니다.

### 실행 계획 세우기

```sql
SELECT * FROM student
  WHERE age >= 15
  AND grade = 1
  AND status = 0;
```

DB는 SQL을 파싱할 때 우리가 위에서 작성한 코드처럼 조건문을 만날때마다 바로바로 실행하지 않습니다.

![Untitled](lazy/Untitled.png)

파싱이 모두 끝나면 DB는 쿼리에 어떤 조건문이 들어있는지를 파악할 수 있고 해당 조건문의 COST를 비교해보는 시간을 가질 수 있습니다.

DB에 인덱싱이라는 기능이 있다는 걸 알고 계실 겁니다.

인덱싱의 기본 개념은 데이터를 찾을 때 미리 저장된 몇가지 힌트를 참조하여, 풀스캔 혹은 비효율적인 스캔을 수행하는 대신 최적의 성능을 보장하는 개념입니다.

우리가 사용하는 가상의 DB(OurSQL)은 특정 조건문에 대해 몇개의 ROW들이 매칭되는지의 힌트를 미리 저장하는 기능이 있다고 가정해보겠습니다.

(실제 DB에 이런 기능이 있는지는 잘 모릅니다. 이번 회차는 DB 구조를 배우는 회차가 아닙니다)

![Untitled](lazy/Untitled%201.png)

```cpp
// DB가 내부적으로 가지고 있는 각 조건에 일치하는 row 수
// (암튼 우리 DB는 개쩔어서 이런게 있다고 쳐볼게요)
age >= 15 인 사람: 3천만명
grade = 1 인 사람: 2천만명
status = 0 인 사람: 500명 
```

이런 맵핵같은 정보가 있으므로, DB는 최적의 실행계획을 세울 수 있습니다.

- `status = 0` 을 가장 먼저 실행합니다.
- `grade = 1` 을 실행합니다.
- `age >= 15` 을 실행합니다.

아래 3개의 SQL문을 한번 봐주세요:

조건은 모두 같으니 결과값도 같은 쿼리들입니다. 다만 조건을 거는 순서만 다릅니다.

```sql
SELECT * FROM student
  WHERE age >= 15
  AND grade = 1
  AND status = 0;

SELECT * FROM student
  WHERE grade = 1
  AND age >= 15
  AND status = 0;

SELECT * FROM student
  WHERE status = 0
  AND grade = 1
  AND age >= 15;
```

eager evaluation이었다면 위 SQL문의 실행속도는 완전히 달랐을것입니다.

하지만 우리는 이제 `;` 이 나올때까지 실행을 지연시키기 때문에 `실행 계획` 을 세울 수 있고 유저가 어떤 순서로 명령어를 넣던지 항상 최고의 속도로 결과물을 가져올 수 있게 되었습니다.

(복잡한 쿼리는 안그럴수도 있겠지만 적어도 WHERE 3개 걸린 위 쿼리에서는 그래야 하겠지요)

### 무한 자료형

```tsx
const results = [];
const n = 50;

for (let i=1;;i++) {
  if (is_prime_number(n))
    results.push(i);  

  if (results.length >= n) break;
}
```

위 코드는 처음 50개의 소수를 구하는 간단한 소스입니다.

이 코드를 요즘의 트렌드에 맞춰 `선언형` 으로 작성해볼 수 있을까요?

```tsx
const results = seq(1, 1000000)
  .filter(x => is_prime_number(x))
  .slice(0, 50);
```

이 코드는 정말 이상합니다. 

50번째 소수가 어디서 나타나는지 알수가 없으니 일단 대략적인 큰 값(1000000)까지 반복하면서 소수를 구하는 코드를 작성했습니다.

- 숫자 1000000안에서 n번째 소수가 없으면 어떻게 될까요?
- 우리는 처음 50개의 소수만 필요합니다. 그럼에도 불구하고 일단 다 실행한다음 `slice` 로 앞에 50개만 가져왔습니다.

이제 지연 평가를 통해 이 코드를 어떻게 선언형으로 바꿀 수 있는지, 그리고 무한 자료형이란 무엇인지 알아보겠습니다.

먼저 아래는 지연평가로 바꿔본 소수 50개 찾기 코드입니다.

```tsx
// 호출 순서가 바뀌었습니다! 하지만 이게 중요한건 아닙니다.
// 메소드 체이닝으로 호출순서는 다시 원래대로 돌릴 수 있습니다.
// ORM이나 LINQ를 생각해보세요
const result = L.take(50,
  L.filter(x=> is_prime_nubmer(x),
     L.seq()));
  
console.log(toAry(result));
```

이 코드는 깔끔합니다. 그러면서 `범위를 임의로 크게 지정해야 하는 문제` 도 없고, `불필요한 범위까지 소수를 구한 뒤 잘라내는 문제` 도 없습니다.

최종적으로,  우리가 작성한 코드는 어떤 작업을 해야하는지 나열하는 명령형이 아니라, 어떤 수열에서 어떤 숫자들이 필요하고 몇개가 필요한지만 적는 `선언형` 코드가 되었습니다.

(위 코드는 아래 글에서 가져온 베이스 함수들을 기반으로 합니다.)

[[Javascript] 지연 평가(Lazy evaluation) 를 이용한 성능 개선 - armadillo’s blog (armadillo-dev.github.io)](https://armadillo-dev.github.io/javascript/whit-is-lazy-evaluation/)

- 코드 보기
    
    ```tsx
    // 지연 평가 함수 모음
    const L = {}
    
    L.seq = function* () {
      let index = 0;
    
      while (true) {
        yield index++;
      }
    }
    
    L.filter = function* (f, iter) {
      for (let item of iter) {
        if(f(item)) yield item
      }
    }
    
    L.take = function* (limit, iter) {
      for (let item of iter) {
        yield item
        if (!--limit) break
      }
    }
    
    toAry = function(iter) {
      const result = []
      for (let item of iter) {
        result.push(item)
      }
      return result;
    }
    ```
    

이 코드의 재밌는점은 하나 더 있습니다.

- 파생되는 수열을 zero-cost로 무한하게 생성할 수 있습니다.
- 뒤에 붙는 조건이 앞의 코드에 영향을 미치지 않습니다.

`뒤에 붙는 조건이 앞의 코드에 영향을 미치지 않습니다.` 의 내용에 대해서 좀 더 자세히 알아보겠습니다.

우리는 소수 목록에서 다시 `7이 들어가는 소수` 목록을 구하려고 합니다.

lazy evaluation일 경우 코드는 아래와 같습니다.

```tsx
const p = L.take(50,
  L.filter(x=> is_prime_nubmer(x),
     L.seq()));

// 문자중에 7이 들어가는 소수의 목록입니다.
const p_with_7 = L.fitler(x => `${x}`.includes(`7`), p);
```

이제 이게 왜 깔끔한지

왜 eager evaluation에서 이걸 표현하기 불편한지를 알아보기 위해 이 항목의 처음으로 되돌아가보겠습니다.

![Untitled](lazy/Untitled%202.png)

- 만약 첫번째 코드에 `7이 들어가는 소수` 를 찾는 조건을 추가하려면 빨간 동그라미 부분에 `&& COND` 와 같이 조건식을 수정해야 합니다. (조건을 더하기 위해선 원래 코드가 수정되어야 합니다.)
- 두번째 코드는 사실 근본부터 잘못되었습니다. 조건이 추가될수록 일치하는 숫자가 발견될 확률이 적으니 `1000000` 라고 적은 부분은 조건이 추가될때마다 계속 올라가야 합니다. (사실 이 숫자를 올리는게 답이 아니죠)

그럼 lazy evaluation이 무조건 좋을까요?

왜 우리는 평소 코딩에서 eager evaluation을 사용하나요?

```tsx
const p = L.take(50,
  L.filter(x=> is_prime_nubmer(x),
     L.seq()));

// 1~9로 시작하는 소수의 목록을 각각 가져옵니다.
const starts_with_1 = L.fitler(x => `${x}`.startsWith(`1`), p);
const starts_with_2 = L.fitler(x => `${x}`.startsWith(`2`), p);
...
const starts_with_9 = L.fitler(x => `${x}`.startsWith(`9`), p);
```

눈치 채신 분도 있겠지만 위 코드는 어쩌면 eager evaluation 보다 더 안좋습니다!

이 부분을 해결하는 방법은 ~~~ 에서 배웁니다.