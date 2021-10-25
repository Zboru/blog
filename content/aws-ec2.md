---
title: JavaScript heap out of memory - kompilacja projektu na EC2 AWS
description: Kompilacja średnio-większego projektu na instancji t2.micro 
created_at: 1635161069473
---

# *TL:DR dodaj SWAP do instancji*

Niejednemu z nas mogło zdarzyć się spróbować *'zbudować'* projekt na instancji EC2, a dokładniej na t2.micro, czyli tej najsłabszej, darmowej. Być może wszystko przeszło pomyślnie i projekt skompilował się poprawnie, a może jednak natrafiłeś na problem związany z brakiem pamięci, a dokładniej `FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory`.

![Out of memory](/blog/images/articles/ec2-swap/out_of_memory.png)

Wywołanie błędu próbując skompilować projekt używając Laravel Mix

Jednym z rozwiązań w tej sytuacji jest dodanie pamięci SWAP do naszej instancji oraz pozwolenie Node.js jej użycie. Wiadomo, są inne rozwiązania takie jak:

1. Użycie mocniejszego typu instancji, z większą ilością pamięci RAM
2. Kompilowanie projektu na lokalnym środowisku i przesłanie plików na serwer

O ile rozwiązanie nr.1 jest w porządku, tak <u>wymaga ono wyjścia z darmowej oferty</u>. Co do rozwiązania pod punktem 2, jest ono niewskazane ze względu na dyskomfort i ogólny błąd w sztuce. W czasach, gdy obecne są rozwiązania CI/CD nie możemy sobie pozwolić, aby nasz projekt nie kompilował się na serwerze docelowym.

## Krok 1. Utwórz nowy wolumen EBS

Zaloguj się do [panelu AWS](https://aws.amazon.com/) i przejdź do instancji EC2. Z pionowego menu po lewej stronie wybierz opcję "**Volumes"** z kategorii **"Elastic&nbsp;Block&nbsp;Store"**. Utwórz nowy wolumen poprzez niebieski przycisk **"Create Volume"**. W formularzu zmieniamy wielkość wolumenu na mniejszą wartość, 8GB w zupełności wystarczy nam jako SWAP. Upewnij się że tworzony wolumen jest w tej samej strefie co istniejąca instancja EC2, w moim przypadku jest to eu-central-1b. Zapisujemy uzupełniony formularz i przechodzimy do drugiego kroku.
![aws_2.png](/blog/images/articles/ec2-swap/aws_2.png)

## Krok 2. Przypisz wolumen do instancji

Po zapisaniu formularza zostaniemy przekierowani na listę wolumenów. Klikając prawym przyciskiem myszy na utworzony wolumen wywołaj menu kontekstowe i wybierz **"Attach Volume"**.

![aws_3.png](/blog/images/articles/ec2-swap/aws_3.png)

Z pola dot. instancji wybierz tę, do której chcesz przypisać wolumen.

![aws_4.png](/blog/images/articles/ec2-swap/aws_4.png)

W momencie pomyślnego przypisania, p
artycja powinna być dostępna bez restartu instancji. Można to sprawdzić za pomocą komendy `lsblk` w terminalu.

![swap_1.png](/blog/images/articles/ec2-swap/swap_1.png)

## Krok 3. Utwórz partycję SWAP

Utwórz swap file o wielkości wolumenu za pomocą komendy

`sudo dd if=/dev/zero of=/dev/xvdc bs=1M count=8192`

W miejscu `/dev/xvdc` wstaw nazwę partycji, którą wskazuje Twoja instancja z listy `lsblk` .

Ustaw właściciela oraz odpowiednie uprawnienia dla partycji:

`sudo chown root:root /dev/xvdc`

`sudo chmod 600 /dev/xvdc`

Stwórz i oflaguj obszar wymiany

`sudo mkswap /dev/xvdc`

`sudo swapon /dev/xvdc`

Dodaj poniższą linijkę do `/etc/fstab` komendą `sudo nano /etc/fstab`

`/dev/xvdc swap swap defaults 0 0`

Jak zapiszesz i wyjdziesz z edytora, pozostaje tylko włączenie swap'u wpisując:

`sudo swapon -a`

Aby sprawdzić czy poprawnie utworzyliśmy partycję SWAP wystarczy że wpiszemy ponownie lsblk i zobaczymy oznaczenie [SWAP] obok naszej partycji.

![swap_5.png](/blog/images/articles/ec2-swap/swap_2.png)

## Krok 4. Popraw skrypt build'u

Aby Node.js mógł użyć większej ilości pamięci trzeba mu to przekazać za pomocą opcji `max-old-space-size`. Z dokumentacji oraz z wpisów innych developerów można wywnioskować kilka sposobów zastosowania tego ustawienia. Dokumentacja wskazuje na dodanie flagi podczas uruchamiania pliku, przykładowo:

`node --max-old-space-size=8192 index.js`

natomiast odpowiedzi na StackOverflow sugerują wprowadzenie do terminalu komendy

`NODE_OPTIONS=--max-old-space-size=8192`

i dopiero spróbować uruchomić kompilacje projektu.

Jeśli żadna z tych dwóch komend nie zadziała, spróbuj zawrzeć ustawienie tej opcji w skrypcie kompilacji w pliku `package.json`.
```json
"scripts": {
    ...
    "production": "NODE_OPTIONS=\"--max-old-space-size=8192\" mix --production",
},
```
Dopiero ta metoda u mnie *'zaskoczyła'* i dzięki temu mogłem dokonać produkcyjnego build'u aplikacji bez żadnych błędów. Jak widać na obrazku poniżej.



![compiled.png](/blog/images/articles/ec2-swap/compiled.png)
