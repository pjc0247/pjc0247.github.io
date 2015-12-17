my-nuget-packages
====

### [JenkinsClient.Net](https://github.com/pjc0247/jenkins-client.net)
Jenkins REST API client for .Net, written in C#.

```c#
var client = Client.Create("http://your_jenkins_addr", "username", "password");
var job = client.GetJob("job_name");

var item = await job.BuildAsync(new Dictionary<string, string>() {
    ["param1"] = "value1"
    ["param2"] = "value2"
});
Console.WriteLine("Build Queued");

/* 요청한 빌드가 jenkins 빌드 큐에서 실제 빌드로 옮겨질 때 까지 대기한다. */
await item.WaitForBuildStart();
Console.WriteLine("Build Started");

/* 요청한 빌드가 완료, 혹은 중지될때까지 대기한다. */
await item.WaitForBuildEnd();
Console.WriteLine("Build Finished");

Console.WriteLine($"Result : {buildTask.result}");
```
