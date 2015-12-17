my-gems
====

### [roap](https://github.com/pjc0247/roap)
__roap__ is a gem that allows the AOP(Aspect Oriented Programming) in Ruby via method's comments.
```rb
#sha1-digested password
def request_login id, password
  puts password # 33a5c3270038edc370f609b9917575b9342e3286 (value that has been SHA1 encrypted by 'sha1-digested' aspect.)
end

request_login "pjc0247", "my_secret_password"
```

### [roap_rpc](https://github.com/pjc0247/roap_rpc)

### [roap_vd](https://github.com/pjc0247/roap_vd)
provides `Code Contracts` features using __roap__.
```rb
class Foo
  # @restrictions
  #   id       => length(0..32), regex([a-zA-Z0-9]+)
  #   password => length(32)
  #               typeof(String)
  def login id, password
    # ....
  end
end
```

### [roap_thread_safe](https://github.com/pjc0247/roap_thread_safe)
```rb
class Counter
  def initialize
    @cnt = 0
  end

  #thread-safe
  def step
    @cnt += 1
  end

  #thread-safe
  def count
    @cnt
  end
end
```
(Since there is a GIL(Global Interpreter Lock), the example above is already thread-safe without `thread-safe` aspect in MRI.)

### [roap_test_helper](https://github.com/pjc0247/roap_test_helper)
```rb
#test-me [4,1] => 5
def self.sum a,b
  return a+b
end
```
```rb
class DaeguString
  # @example
  #   v = Foo.new
  #   v.concat "MILK", "DOT" #=> "MILKDOT"
  def concat msg1, msg2
    return msg1 + msg2
  end
end
```
```rb
options = [:suppress_stdout, :stop_on_failure]

Roap::TestHelper::test_all *options
```

### [em-filewatcher](https://github.com/pjc0247/em-filewatcher)
__em-filewatcher__ provides a directory monitoring interface which is suitable for `eventmachine`.
```rb
require 'em-filewatcher'

EM::run do
  EM::FileWatcher.start_watch "*.rb" do |path, event|
    puts path

    case event
      when :new
        puts "created"
      when :delete
        puts "deleted"
      when :changed
        puts "changed"
    end
  end
end
```

### [local_session](https://github.com/pjc0247/local_session)
keeps all local variables remaining between executions.
```rb
require 'local_session'

count ||= 0

puts "count : #{count}"

count += 1 # 'count' will keep its value till next execution.
```
```
ruby test.rb
count : 0
ruby test.rb
count : 1
ruby test.rb
count : 2
```

### [watchgod](https://github.com/pjc0247/WatchGod)
With Watchgod, you can subscribe `jwvg0425`'s Github activities through push notifications. Don't miss his new commits/comments.

### [unitypath](https://github.com/pjc0247/unitypath)
returns right path where `Unity3d` is installed.

### [get_indent](https://github.com/pjc0247/get_indent)

### [external_api](https://github.com/pjc0247/ExternalAPI)
makes easier 'Win32API' class.
```rb
require 'external_api'

user32 = ExternalAPI.new("user32")

user32.load("MessageBoxA", 'PPPI', 'I')
user32.load("SetCursorPos", 'II', 'I')

user32.MessageBoxA(0, "hello", "caption", 0)
user32.SetCursorPos(100,100)
```

### [merge_plist](https://github.com/pjc0247/merge_plist)
