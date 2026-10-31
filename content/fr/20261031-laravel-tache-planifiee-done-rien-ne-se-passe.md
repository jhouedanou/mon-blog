---
title: "Laravel : la tâche planifiée affiche DONE, mais rien ne se passe"
createdAt: "2026-10-31T09:00:00Z"
description: "Votre tâche Laravel affiche DONE mais ne fait rien ? Sa sortie part dans /dev/null, et depuis Laravel 12.10, DONE s'affiche même en cas d'échec."
searchIntent: "Pourquoi le planificateur Laravel (schedule:run) affiche DONE alors que la tâche planifiée ne fait rien, et comment voir l'erreur cachée dans /dev/null, sur Laravel Forge comme ailleurs ?"
tags: ["tutoriel", "dev", "php", "laravel", "linux"]
---

**Réponse courte.** Dans Laravel, « DONE » ne prouve pas qu'une tâche planifiée a marché. Laravel envoie la sortie de chaque tâche dans `/dev/null` : les messages d'erreur sont jetés. Et depuis Laravel 12.10, `schedule:run` affiche DONE **même quand la commande échoue**. Pour voir ce qui se passe, lancez la commande à la main, lisez `storage/logs/laravel.log`, et envoyez la sortie de la tâche dans un fichier avec `appendOutputTo()`.

## Le symptôme

Sur SOBOA Foot, une application Laravel hébergée sur Laravel Forge, une tâche planifiée affichait DONE. Pourtant, rien ne se passait. Et aucun message d'erreur : la sortie partait dans `/dev/null`.

`/dev/null`, c'est la poubelle de Linux. Tout ce qu'on y envoie disparaît.

Lancez `php artisan schedule:run` à la main. Vous verrez des lignes de ce genre :

```
  2026-10-31 18:00:00 Running ['artisan' app:ma-tache] ........ 1s DONE
  ⇂ '/usr/bin/php8.3' 'artisan' app:ma-tache > '/dev/null' 2>&1
```

La deuxième ligne dit tout. `> '/dev/null' 2>&1` envoie les messages normaux **et** les erreurs à la poubelle. C'est le réglage par défaut de Laravel, pour chaque tâche.

Ce n'est souvent pas la seule poubelle. La documentation de Laravel recommande cette ligne cron, que l'on retrouve sur beaucoup de serveurs :

```
* * * * * cd /chemin-du-projet && php artisan schedule:run >> /dev/null 2>&1
```

La sortie de `schedule:run` lui-même part donc aussi dans `/dev/null`.

## Pourquoi DONE ment

DONE veut dire « le planificateur n'a pas vu d'échec ». Il ne regarde qu'une chose : le **code de sortie** de la commande (0 pour un succès, autre chose pour un échec). Voici cinq cas où DONE s'affiche alors que rien ne s'est passé.

### 1. La commande échoue, et Laravel affiche quand même DONE

C'est le cas le plus traître. Dans le [code de `schedule:run`](https://github.com/laravel/framework/blob/13.x/src/Illuminate/Console/Scheduling/ScheduleRunCommand.php){target="_blank" rel="noopener"}, Laravel calcule le résultat sous forme de « vrai » ou « faux ». Mais depuis la version 12.10, [le code qui affiche le résultat](https://github.com/laravel/framework/blob/13.x/src/Illuminate/Console/View/Components/Task.php){target="_blank" rel="noopener"} attend un numéro : 1 pour un succès, 2 pour un échec, 3 pour une tâche sautée. « Faux » ne correspond à aucun de ces numéros. L'affichage prend donc le cas par défaut : DONE.

| Version de Laravel | Commande en échec |
| --- | --- |
| 10, 11, et 12.0 à 12.9 | FAIL |
| 12.10 et plus, et 13 | DONE |

C'est l'état du code au 31 octobre 2026, dans les branches 12.x et 13.x.

L'échec n'est pas perdu pour autant. Laravel l'écrit dans `storage/logs/laravel.log`, sous la forme `Scheduled command [...] failed with exit code [1].` Mais le vrai message d'erreur, lui, est parti dans `/dev/null`.

### 2. La commande « réussit » sans rien faire

Votre commande attrape l'erreur (`try` / `catch`), affiche un message avec `$this->error()`, puis se termine normalement. Code de sortie : 0. Pour Laravel, c'est un succès. Le message, lui, part dans `/dev/null`.

La correction : renvoyer un échec.

```php
public function handle(): int
{
    try {
        // le travail de la tâche
    } catch (\Throwable $e) {
        report($e);                     // écrit l'erreur dans laravel.log
        $this->error($e->getMessage());

        return self::FAILURE;           // code de sortie 1
    }

    return self::SUCCESS;
}
```

### 3. La tâche tourne en arrière-plan

Avec `->runInBackground()`, DONE veut dire « lancée », pas « terminée ». Laravel ne vérifie pas le résultat à ce moment-là.

### 4. La tâche a été sautée

Avec `->withoutOverlapping()`, Laravel pose un verrou pendant que la tâche tourne. Si une exécution précédente a planté, le verrou peut rester. Laravel saute alors la tâche… et affiche DONE : le code de sortie reste vide, et pour PHP, « vide » est égal à 0.

Le verrou expire au bout de 24 heures par défaut. Pour l'effacer tout de suite :

```bash
php artisan schedule:clear-cache
```

### 5. Le travail part dans une file d'attente

Si la tâche envoie un job dans une file (avec `Schedule::job()`, ou une commande qui appelle `dispatch()`), DONE veut dire « job mis dans la file ». Si aucun worker ne tourne, le job attend et rien ne se passe.

Si le worker tourne avec l'ancien code, il faut le relancer après chaque déploiement :

```bash
php artisan queue:restart
```

Les jobs en échec se listent avec `php artisan queue:failed`.

## Trouver l'erreur en cinq minutes

Connectez-vous en SSH au serveur, avec l'utilisateur qui lance le cron (`forge` sur Laravel Forge). Allez dans le dossier du site :

```bash
cd /home/forge/votre-site.com
```

**1. Voir les tâches et leur prochain passage :**

```bash
php artisan schedule:list
```

**2. Lancer la commande à la main, pour voir son vrai message :**

```bash
php8.3 artisan app:ma-tache -v
echo $?
```

`echo $?` affiche le code de sortie : 0 veut dire que la commande pense avoir réussi.

Utilisez la même version de PHP que la ligne cron : les tâches tournent avec le PHP qui lance `schedule:run`. Avec une autre version, le résultat peut changer. Au passage, vérifiez que ce PHP est à jour : sur Forge, il ne se met pas à jour tout seul (voir [PHP2Shell](/fr/20261021-php2shell-mettre-a-jour-php-debian-ubuntu-sans-forge)).

**3. Lire le journal de Laravel :**

```bash
grep "Scheduled command" storage/logs/laravel.log | tail -n 5
```

Si vos journaux sont quotidiens, le fichier s'appelle plutôt `laravel-2026-10-31.log`.

Ne comptez pas sur `php artisan schedule:test`. Il envoie lui aussi la sortie dans `/dev/null`, et il affiche DONE quel que soit le résultat.

## Ne plus travailler à l'aveugle

Dans `routes/console.php` (Laravel 11 et plus ; `app/Console/Kernel.php` avant) :

```php
use Illuminate\Support\Facades\Schedule;

Schedule::command('app:ma-tache')
    ->hourly()
    ->appendOutputTo(storage_path('logs/scheduler.log'))
    ->onFailure(function () {
        logger()->error('app:ma-tache a échoué');
    });
```

- `appendOutputTo()` ajoute la sortie de chaque passage à la fin d'un fichier, au lieu de la jeter. Ce fichier grossit : videz-le de temps en temps.
- `onFailure()` s'exécute quand le code de sortie n'est pas 0. Vous pouvez y envoyer une alerte (mail, Slack…). Si l'envoi de mails est configuré, `emailOutputOnFailure('vous@exemple.com')` vous envoie directement la sortie en cas d'échec.

Ces deux méthodes ne servent que si la commande échoue vraiment : d'où le `return self::FAILURE` du cas 2.

## En résumé

- DONE veut dire « pas d'échec vu », pas « travail fait ».
- Par défaut, la sortie de chaque tâche part dans `/dev/null`. Envoyez-la dans un fichier avec `appendOutputTo()`.
- Depuis Laravel 12.10, même un échec s'affiche DONE. Fiez-vous au fichier de sortie et à `laravel.log`, pas à l'écran.
- Faites échouer vos commandes pour de vrai, avec `return self::FAILURE`.
- Pensez aux verrous (`schedule:clear-cache`) et aux workers de file d'attente.

**Sources :**

- [Planification des tâches](https://laravel.com/framework/docs/13.x/scheduling){target="_blank" rel="noopener"}, documentation de Laravel (ligne cron, `appendOutputTo`, `schedule:clear-cache`)
- [ScheduleRunCommand.php](https://github.com/laravel/framework/blob/13.x/src/Illuminate/Console/Scheduling/ScheduleRunCommand.php){target="_blank" rel="noopener"} : calcul du résultat de chaque tâche
- [Task.php](https://github.com/laravel/framework/blob/13.x/src/Illuminate/Console/View/Components/Task.php){target="_blank" rel="noopener"} : affichage de DONE, FAIL et SKIPPED
- [Event.php](https://github.com/laravel/framework/blob/13.x/src/Illuminate/Console/Scheduling/Event.php){target="_blank" rel="noopener"} : sortie par défaut vers `/dev/null`

---
*[Jean-Luc Houédanou](https://houedanou.com)*
