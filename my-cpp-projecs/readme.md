my-cpp-projects
====

### [STORM](https://github.com/pjc0247/STORM)
mysql ORM for C++.
```cpp
auto = results = query
  ->where("nickname", "foo")
  ->limit(5)
  ->find_many();
for(auto result : results)
  cout<<(*result)["level"]<<endl;
```

### [lemon](https://github.com/pjc02478/lemon)
Coroutines for C++
```cpp
void func(){
  printf("begin func\n");
    delay(time::second(2)); 
  printf("after 2 secs\n");
    delay(time::second(1));
  printf("after 1 sec\n");
}
```

### [DynamicThreadPool](https://github.com/pjc0247/DynamicProcessPool)
```cpp
void worker(int item) {
  printf("item queued %d\n", item);
}

auto pool = new DynamicProcessPool<int>(4, 8, 200, worker);

pool->enqueue(1);
pool->enqueue(2);
pool->enqueue(3);
```

### [base64-cpp](https://github.com/pjc0247/base64-c)

### [EventPie](https://github.com/pjc0247/EventPie)
