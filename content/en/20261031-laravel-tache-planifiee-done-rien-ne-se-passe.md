---
title: "Laravel: the scheduled task says DONE, but nothing happens"
createdAt: "2026-10-31T09:00:00Z"
description: "Your Laravel scheduled task says DONE but does nothing? Its output goes to /dev/null, and since Laravel 12.10, DONE shows even when the task fails."
searchIntent: "Why does the Laravel scheduler (schedule:run) show DONE when the scheduled task does nothing, and how do I see the error hidden in /dev/null, on Laravel Forge or elsewhere?"
tags: ["tutorial", "development", "php", "laravel", "linux"]
---

**Short answer.** In Laravel, "DONE" does not prove that a scheduled task worked. Laravel sends each task's output to `/dev/null`: error messages are thrown away. And since Laravel 12.10, `schedule:run` shows DONE **even when the command fails**. To see what is going on, run the command by hand, read `storage/logs/laravel.log`, and send the task's output to a file with `appendOutputTo()`.

## The symptom

On SOBOA Foot, a Laravel app hosted on Laravel Forge, a scheduled task showed DONE. Yet nothing happened. And no error message: the output went to `/dev/null`.

`/dev/null` is the Linux bin. Whatever you send there disappears.

Run `php artisan schedule:run` by hand. You will see lines like these:

```
  2026-10-31 18:00:00 Running ['artisan' app:my-task] ........ 1s DONE
  ⇂ '/usr/bin/php8.3' 'artisan' app:my-task > '/dev/null' 2>&1
```

The second line says it all. `> '/dev/null' 2>&1` sends normal messages **and** errors to the bin. That is Laravel's default, for every task.

It is often not the only bin. The Laravel documentation recommends this cron line, which you find on many servers:

```
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

So the output of `schedule:run` itself also goes to `/dev/null`.

## Why DONE lies

DONE means "the scheduler saw no failure". It only looks at one thing: the command's **exit code** (0 for success, anything else for failure). Here are five cases where DONE shows while nothing happened.

### 1. The command fails, and Laravel still shows DONE

This is the sneakiest case. In the [`schedule:run` code](https://github.com/laravel/framework/blob/13.x/src/Illuminate/Console/Scheduling/ScheduleRunCommand.php){target="_blank" rel="noopener"}, Laravel works out the result as "true" or "false". But since version 12.10, [the code that prints the result](https://github.com/laravel/framework/blob/13.x/src/Illuminate/Console/View/Components/Task.php){target="_blank" rel="noopener"} expects a number: 1 for success, 2 for failure, 3 for a skipped task. "False" matches none of these numbers. So the display falls through to the default: DONE.

| Laravel version | Failing command |
| --- | --- |
| 10, 11, and 12.0 to 12.9 | FAIL |
| 12.10 and later, and 13 | DONE |

This is the state of the code on 31 October 2026, in the 12.x and 13.x branches.

The failure is not lost, though. Laravel writes it to `storage/logs/laravel.log`, as `Scheduled command [...] failed with exit code [1].` But the real error message went to `/dev/null`.

### 2. The command "succeeds" without doing anything

Your command catches the error (`try` / `catch`), prints a message with `$this->error()`, then ends normally. Exit code: 0. For Laravel, that is a success. The message goes to `/dev/null`.

The fix: return a failure.

```php
public function handle(): int
{
    try {
        // the task's work
    } catch (\Throwable $e) {
        report($e);                     // writes the error to laravel.log
        $this->error($e->getMessage());

        return self::FAILURE;           // exit code 1
    }

    return self::SUCCESS;
}
```

### 3. The task runs in the background

With `->runInBackground()`, DONE means "started", not "finished". Laravel does not check the result at that point.

### 4. The task was skipped

With `->withoutOverlapping()`, Laravel sets a lock while the task runs. If a previous run crashed, the lock can stay behind. Laravel then skips the task… and shows DONE: the exit code stays empty, and for PHP, "empty" equals 0.

The lock expires after 24 hours by default. To clear it right away:

```bash
php artisan schedule:clear-cache
```

### 5. The work goes to a queue

If the task pushes a job onto a queue (with `Schedule::job()`, or a command that calls `dispatch()`), DONE means "job queued". If no worker is running, the job waits and nothing happens.

If the worker runs old code, restart it after each deployment:

```bash
php artisan queue:restart
```

Failed jobs are listed with `php artisan queue:failed`.

## Find the error in five minutes

SSH into the server as the user that runs the cron (`forge` on Laravel Forge). Go to the site folder:

```bash
cd /home/forge/your-site.com
```

**1. See the tasks and their next run:**

```bash
php artisan schedule:list
```

**2. Run the command by hand, to see its real message:**

```bash
php8.3 artisan app:my-task -v
echo $?
```

`echo $?` prints the exit code: 0 means the command thinks it succeeded.

Use the same PHP version as the cron line: tasks run with the PHP that starts `schedule:run`. With another version, the result can change. While you are at it, check that this PHP is up to date: on Forge, it does not update itself (see [PHP2Shell](/en/20261021-php2shell-mettre-a-jour-php-debian-ubuntu-sans-forge)).

**3. Read the Laravel log:**

```bash
grep "Scheduled command" storage/logs/laravel.log | tail -n 5
```

If your logs are daily, the file is called something like `laravel-2026-10-31.log` instead.

Do not rely on `php artisan schedule:test`. It also sends the output to `/dev/null`, and it shows DONE whatever the result.

## Stop working blind

In `routes/console.php` (Laravel 11 and later; `app/Console/Kernel.php` before):

```php
use Illuminate\Support\Facades\Schedule;

Schedule::command('app:my-task')
    ->hourly()
    ->appendOutputTo(storage_path('logs/scheduler.log'))
    ->onFailure(function () {
        logger()->error('app:my-task failed');
    });
```

- `appendOutputTo()` adds each run's output to the end of a file, instead of throwing it away. That file grows: empty it now and then.
- `onFailure()` runs when the exit code is not 0. You can send an alert from there (email, Slack…). If mail is set up, `emailOutputOnFailure('you@example.com')` emails you the output directly when the task fails.

Both only help if the command really fails: hence the `return self::FAILURE` in case 2.

## In short

- DONE means "no failure seen", not "work done".
- By default, each task's output goes to `/dev/null`. Send it to a file with `appendOutputTo()`.
- Since Laravel 12.10, even a failure shows DONE. Trust the output file and `laravel.log`, not the screen.
- Make your commands really fail, with `return self::FAILURE`.
- Think about locks (`schedule:clear-cache`) and queue workers.

**Sources:**

- [Task Scheduling](https://laravel.com/framework/docs/13.x/scheduling){target="_blank" rel="noopener"}, Laravel documentation (cron line, `appendOutputTo`, `schedule:clear-cache`)
- [ScheduleRunCommand.php](https://github.com/laravel/framework/blob/13.x/src/Illuminate/Console/Scheduling/ScheduleRunCommand.php){target="_blank" rel="noopener"}: how each task's result is worked out
- [Task.php](https://github.com/laravel/framework/blob/13.x/src/Illuminate/Console/View/Components/Task.php){target="_blank" rel="noopener"}: how DONE, FAIL and SKIPPED are printed
- [Event.php](https://github.com/laravel/framework/blob/13.x/src/Illuminate/Console/Scheduling/Event.php){target="_blank" rel="noopener"}: default output to `/dev/null`

---
*[Jean-Luc Houédanou](https://houedanou.com)*
