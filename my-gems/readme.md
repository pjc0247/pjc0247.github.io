my-gems
====

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

### [merge_plist](https://github.com/pjc0247/merge_plist)

### [roap](https://github.com/pjc0247/roap)

### [roap_rpc](https://github.com/pjc0247/roap_rpc)

### [roap_vd](https://github.com/pjc0247/roap_vd)

### [roap_thread_safe](https://github.com/pjc0247/roap_thread_safe)

### [roap_test_helper](https://github.com/pjc0247/roap_test_helper)

