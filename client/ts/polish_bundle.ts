///<reference path="bundle.ts" />
///<reference path="./underscore/underscore.d.ts" />
///<reference path="./moment/moment.d.ts" />
class PolishBundle extends Bundle {
  mapping = {
    'skills/default_name':
      'Nowa umiejętność',
    //confirm_email:
    'navbar/edit':
      'Edytuj',
    'navbar/report':
      'Ranking',
    'navbar/arena':
      'Arena',
    'navbar/login':
      'Zaloguj się',
    'navbar/register':
      'Załóż konto',
    'navbar/logout':
      'Wyloguj się',
    'navbar/rules':
      'Zasady',
    'navbar/templates':
      'Szablony',
    'navbar/authentication_status/temporary':
      'Konto Tymczasowe - postępy nie będą zapisane',
    'navbar/authentication_status/anonymous':
      'Jesteś niezalogowany(a)',
    'navbar/authentication_status/regular': (user) =>{
      return 'Zalogowany jako ' + user.get('email');
    },
    'editor/nick':
      'Nick:',
    'editor/open_source':
      'Chcę by mój kod był dostępny jako OpenSource',
    'save_nick/response/other':
      'Nie udało się zmienić nicka',
    'save_is_open_source/response/other':
      'Nie udało się zmienić statusu OpenSource',
    'ranking/closed_soure':
      'Źródło prywatne',
    'ranking/username':
      'Gracz',
    'ranking/source':
      'Źródło',
    'learning_scope/only':
      'tylko',
    'learning_scope/ignored':
      'bez',

    'save_ast/response/other':
      'Nie udało się zapisać drzewa AST',

    'report/whats_next':
      'Co dalej?',
    'report/progress':
      'Postępy',
    'report/whats_next/explanation.html':
      'Na <b>czarno</b> oznaczone są te tematy, z których będziemy Ci wybierać zadania.',
    'report/comparison/users':
      'Klasa',
    'report/comparison/classes':
      'Szkoła',
    'report/comparison/schools':
      'Świat',
    'report/comparison/frenemies':
      'Rywale',
    'users_comparison/zoom-in':
      'Przybliż',
    'users_comparison/zoom-out':
      'Oddal',
    'progress/correct':
      (p) => this.percents(p) + ' poprawnie',
    'progress/wrong':
      (p) => this.percents(p) + ' błędnie',
    'progress/fresh':
      (p) => this.percents(p) + ' czeka',
    'bye/bye':
      'Do zobaczenia',
    'bye/duration' : (duration) => {
      moment.lang('pl');
      return 'Czas spędzony na nauce podczas tej sesji: ' + moment.duration(duration).humanize();
    },
    'logout/alert':
      'Wylogowano :)',
    'welcome/tour/label':
      'Uruchom przewodnik',
    'welcome/login/label':
      'Zaloguj. Mam już konto',
    'welcome/elevator_speech.html':
      '<b>ants</b> przygotuje Cię do <b>mat</b>ury z <b>mat</b>ematyki w niespotykany wcześniej sposób. Skutecznie, bo prosto!',

    'button/skip.html':
      '<span class="glyphicon skip glyphicon-step-forward"></span> Wolę teraz nie wskazywać odpowiedzi &hellip;',
    'button/i_know_but_i_am_in_haste.html':
      '<span class="glyphicon correct glyphicon-ok"></span> wiem<span class="detail"> jak zrobić to zadanie</span>, ale szkoda mi czasu',
    'button/i_dont_know_and_i_dont_care.html':
      '<span class="glyphicon wrong glyphicon-remove"></span> nie wiem<span class="detail"> jak zrobić to zadanie</span> i nie chcę wiedzieć',
    'button/i_dont_know_but_i_want_to_know.html':
      '<span class="glyphicon wrong glyphicon-remove"></span> nie wiem<span class="detail"> jak zrobić to zadanie</span>, ale chętnie się dowiem',
    'button/skip_without_prejudice.html':
      '<span class="glyphicon fresh glyphicon-question-sign"></span><span class="detail"> może do niego wróce, ale teraz</span> poproszę inne zadanie',
    'button/skip_this_subject.html':
      '<span class="glyphicon fresh glyphicon-question-sign"></span> nie chcę<span class="detail"> dzisiaj w ogóle</span> zadań z tego działu',
    'button/change_subject.html':
      '<span class="glyphicon fresh glyphicon-question-sign"></span> chcę wybrać konkretny dział<span class="detail"> z którego będę robić zadania</span>',
    'burn_down_chart/not_enough_data':
      'Spróbuj rozwiązać więcej zadań, by zobaczyć prognozę.',
    'burn_down_chart/week_ago':
      'tydzień temu',
    'burn_down_chart/today':
      'teraz',
    'burn_down_chart/deadline':
      'matura',
    'burn_down_chart/04-01':
      'prima aprilis',
    'burn_down_chart/03-08':
      'dzień kobiet',
    'burn_down_chart/02-14':
      'welntynki',
    'burn_down_chart/01-01':
      'nowy rok',
    'burn_down_chart/before':(seconds)=>{
      return 'Zdążysz na ' + this.duration(seconds) + ' przed maturą!';
    },
    'burn_down_chart/after':(seconds)=>{
      return 'Spóźnisz się ' + this.duration(seconds) + ' na maturę!';
    },
    'burn_down_chart/never':(seconds)=>{
      return 'Do roboty, bo nigdy nie zdążysz!';
    },

    'confirm_email/cancel': (email) =>
      'Jeśli to nie Twój adres email, lub nie chcesz zakładać u nas konta, po prostu opuść tę stronę.',
    'confirm_email/question': (email) =>
      'Czy potwierdzasz, że adres ' + email + ' należy do Ciebie i chcesz założyć u nas konto?',
    'confirm_email/confirm/label':
      'Potwierdzam',


    'change_password/email/label':
      'Twój adres email',

    'change_password/password/label':
      'Wymyśl nowe hasło do naszego serwisu',
    'change_password/password/placeholder':
      '',
    'change_password/password/hint':
      'Hasło musi mieć co najmniej jeden znak. Polecamy użyć jakiegoś łatwego do zapamiętania zdania.',

    'change_password/confirm/label':
      'Zapisz nowe hasło',

    'change_password/cancel':
      'Jeśli to nie Twój adres email, lub nie chcesz zmieniać hasła, po prostu opuść tę stronę.',

    'login/temporary_upgrade_info.html':
      '<strong>Dobra wiadomość!</strong> Zakładając teraz prawdziwe konto zachowasz dotychczasowe postępy i historię zadań:)',

    'login/email/label':
      'Twój adres email',
    'login/email/placeholder':
      '',
    'login/email/hint':
      'Adres email musi zawierać znak @ na przykład jan.nowak@wp.pl',

    'login/password/label':
      'Hasło (do naszego serwisu)',
    'login/password/placeholder':
      '',
    'login/password/hint':
      'Hasło musi mieć co najmniej jeden znak. Polecamy użyć jakiegoś łatwego do zapamiętania zdania.',

    'login/login/label':
      'Zaloguj',
    'login/create_account/label':
      'Utwórz konto',
    'login/recover/label':
      'Nie pamiętam hasła',

    'users/me/response/401':
      'Przepraszamy, ale musisz się ponownie zalogować z powodu zbyt długiej bezczynności',
    'users/me/response/other': (code) =>
      'Przepraszamy, ale serwer odpowiedział w sposób, którego sami się nie spodziewaliśmy. Spróbuj się ponownie zalogować. Jeśli to nie pomoże, to spróbuj odświeżyć stronę (CTRL+SHIFT+F5). Jeśli to też zawiedzie, proszę zgłoś nam "błąd numer ' + code+ ' podczas potwierdzania adresu", dzięki.',

    'change_password/response/200':
      'Twoje hasło zostało zmienione! Teraz możesz się zalogować nowym hasłem :D',
    'change_password/response/400':
      'Serwer twierdzi, że formularz wypełniono w błędny sposób. Jeśli uważasz inaczej, spróbuj odświeżyć stronę (CTRL+SHIFT+F5) i spróbować ponownie. Czy na pewno trafiasz tutaj klikając w link z wiadomości email pochodzącej od nas?',
    'change_password/response/401':
      'Serwer nie zaakceptował dowodu autentyczności zawartego w linku. To trochę dziwne. Czy na pewno trafiasz tutaj klikając w link z wiadomości email pochodzącej od nas? W razie dalszych problemów spróbuj przycisku "Nie pamiętam hasła" albo skontaktuj się z nami.',
    'change_password/response/403':
      'Twoje konto nie zostało aktywowane. To trochę dziwne. Musisz kliknąć w link aktywacyjny, który wysłaliśmy do Ciebie emailem na podany przez Ciebie adres. Sprawdź folder ze spamem jeśli nie możesz go znaleźć. W ostateczności skorzystaj z opcji "Nie pamiętam hasła" albo skontaktuj się z nami.',
    'change_password/response/404':
      'Nie możemy odnaleźć Twojego konta. To trochę dziwne. Czy na pewno trafiasz tutaj klikając w link z wiadomości email pochodzącej od nas? W razie dalszych problemów spróbuj przycisku "Nie pamiętam hasła" albo skontaktuj się z nami.',
    'change_password/response/other': (code) => {
      return 'Przepraszamy, ale serwer odpowiedział w sposób, którego sami się nie spodziewaliśmy. Spróbuj odświeżyć stronę (CTRL+SHIFT+F5). Jeśli to nie pomoże, proszę zgłoś nam "błąd numer ' + code+ ' podczas zmiany hasła", dzięki.';
    },

    'confirm_email/response/200':
      'Twoje konto zostało aktywowane! Teraz możesz się zalogować :D',
    'confirm_email/response/400':
      'Serwer twierdzi, że nie rozumie co Twoja przeglądarka do niego wysłała :) Spróbuj odświeżyć stronę (CTRL+SHIFT+F5). Czy na pewno trafiasz tutaj klikając w link z wiadomości email pochodzącej od nas? W razie dalszych problemów spróbuj przycisku "Nie pamiętam hasła" albo załóż konto jeszcze raz.',
    'confirm_email/response/401':
      'Serwer nie zaakceptował dowodu autentyczności zawartego w linku. To trochę dziwne. Czy na pewno trafiasz tutaj klikając w link z wiadomości email pochodzącej od nas? W razie dalszych problemów spróbuj przycisku "Nie pamiętam hasła" albo załóż konto jeszcze raz.',
    'confirm_email/response/403':
      'Twoje konto jest już aktywne, nie trzeba go znowu aktywować, po prostu zaloguj się.',
    'confirm_email/response/404':
      'Nie możemy odnaleźć Twojego konta. To trochę dziwne. Czy na pewno trafiasz tutaj klikając w link z wiadomości email pochodzącej od nas? W razie dalszych problemów spróbuj przycisku "Nie pamiętam hasła" albo załóż konto jeszcze raz.',
    'confirm_email/response/409':
      'Adres email się nie zgadza. To trochę dziwne. Czy na pewno trafiasz tutaj klikając w link z wiadomości email pochodzącej od nas? W razie dalszych problemów spróbuj przycisku "Nie pamiętam hasła", albo załóż konto jeszcze raz.',
    'confirm_email/response/other': (code) => {
      return 'Przepraszamy, ale serwer odpowiedział w sposób, którego sami się nie spodziewaliśmy. Spróbuj odświeżyć stronę (CTRL+SHIFT+F5). Jeśli to nie pomoże, proszę zgłoś nam "błąd numer ' + code+ ' podczas potwierdzania adresu", dzięki.';
    },


    'recover/response/200':
      'Na podany przez Ciebie adres email wysłaliśmy link pozwalający ustawić nowe hasło.',
    'recover/response/400':
      'Serwer twierdzi, że to co jest wpisane w polu "Twój adres email" nie jest poprawnym adresem email. Jeśli uważasz inaczej, spróbuj odświeżyć stronę (CTRL+SHIFT+F5) i spróbować ponownie. W razie dalszych problemów skontaktuj się z nami.',
    'recover/response/404':
      'Nie istnieje konto o takim adresie email. Być może masz wciśnięty klawisz CAPS-LOCK? Być może używasz innego adresu email?',
    'recover/response/other': (code) => {
      return 'Przepraszamy, ale serwer odpowiedział w sposób, którego sami się nie spodziewaliśmy. Spróbuj odświeżyć stronę (CTRL+SHIFT+F5). Jeśli to nie pomoże, proszę zgłoś nam "błąd numer ' + code+ ' podczas resetowania hasła", dzięki.';
    },


    'login/response/200':
      'Witaj!:D',
    'login/response/400':
      'Serwer twierdzi, że formularz wypełniono w błędny sposób. Jeśli uważasz inaczej, spróbuj odświeżyć stronę (CTRL+SHIFT+F5) i spróbować ponownie. W razie dalszych problemów skontaktuj się z nami.',
    'login/response/401':
      'Wpisane hasło nie jest poprawne dla tego adresu email. Być może masz wciśnięty klawisz CAPS-LOCK? Może podajesz dobre hasło, ale nie do naszego serwisu:) W ostateczności skorzystaj z opcji "nie pamiętam hasła".',
    'login/response/403':
      'Twoje konto nie zostało aktywowane. Musisz kliknąć w link, który wysłaliśmy do Ciebie emailem na podany przez Ciebie adres. Sprawdź folder ze spamem jeśli nie możesz go znaleźć. W ostateczności skorzystaj z opcji "nie pamiętam hasła" a wyślemy Ci link ponownie.',
    'login/response/404':
      'Nie istnieje konto o takim adresie email. Być może masz wciśnięty klawisz CAPS-LOCK? Być może używasz u nas innego adresu email? Może nie masz jeszcze konta u nas?',
    'login/response/other': (code) => {
      return 'Przepraszamy, ale serwer odpowiedział w sposób, którego sami się nie spodziewaliśmy. Spróbuj odświeżyć stronę (CTRL+SHIFT+F5). Jeśli to nie pomoże, proszę zgłoś nam "błąd numer ' + code+ ' podczas logowania", dzięki.';
    },

    'create_account/response/200':
      'Właśnie wysłaliśmy do Ciebie email z linkiem aktywacyjnym. Dopiero po jego kliknięciu konto stanie się aktywne i będzie można się na nie zalogować.',
    'create_account/response/400':
      'Serwer twierdzi, że formularz wypełniono w błędny sposób. Jeśli uważasz inaczej, spróbuj odświeżyć stronę (CTRL+SHIFT+F5) i spróbować ponownie. W razie dalszych problemów skontaktuj się z nami.',
    'create_account/response/403':
      'Twoje konto tymczasowe zostało już wcześniej zamienione na prawdziwe konto. Najprawdopodobniej przez Ciebie. Może spróbuj przycisku "Zaloguj", lub w ostateczności skorzystaj z opcji "nie pamiętam hasła".',
    'create_account/response/409':
      'Konto o takim adresie email już istnie. Całkiem prawdopodobne, że należy do Ciebie:) Może spróbuj przycisku "Zaloguj", lub w ostateczności skorzystaj z opcji "nie pamiętam hasła".',
    'create_account/response/other': (code) => {
      return 'Przepraszamy, ale serwer odpowiedział w sposób, którego sami się nie spodziewaliśmy. Spróbuj odświeżyć stronę (CTRL+SHIFT+F5). Jeśli to nie pomoże, proszę zgłoś nam "błąd numer ' + code+ ' podczas zakładania konta", dzięki.';
    },

    'subject_selector/none/label':
      '-- Przydziel dział --',
    'subject/unknown_label': (subject_id) => {
      return 'Nieznany dział ' + subject_id;
    },
    'subject/none' :
      'Nie wybrano działu',
    'subject/uninitialized':
      'trwa ładowanie',

    'task_template_edit/save/label':
      'Zapisz zmiany',
    'task_template_edit/randomize/label':
      'Wylosuj inne parametry',
    'task_template_edit/randomize/success_rate': (rate) =>
      '(' + Math.round(100*rate) + '%)',
    'task_template_edit/randomize/possibilities': (count) =>
      count + ' ' + this.dopasujDoLiczebnika(count,'zadanie','różne zadania','różnych zadań'),


    'skill_selector/none/label':
      '-- Kliknij by wybrać umiejętność --',
    'skill_selector/new/label':
      '-- Kliknij tutaj by stworzyć nową umiejętność --',
    'skill_selector/new/prompt':
      'Wpisz nazwę nowej umiejętności',
    'task_template_edit/skill/label':
      'To zadanie sprawdza:',
    'task_template_edit/tags/label':
      'Tagi',
    'task_template_edit/examples/label':
      'Przykłady poleceń',
    'task_template_edit/TeX/label':
      'Treść konkretnego zadania jako TeX',
    'task_template_edit/HTML/label':
      'Treść konkretnego zadania jako HTML',

    'task_template/save/response/200':
      'Zapisano program',
    'task_template/save/response/other':(code) => {
      return 'Przepraszamy, ale serwer odpowiedział w sposób, którego sami się nie spodziewaliśmy. Spróbuj odświeżyć stronę (CTRL+SHIFT+F5). Jeśli to nie pomoże, proszę zgłoś nam "błąd numer ' + code+ ' podczas zapisywania programu", dzięki.';
    },

    'arena/player1/label':
      'Program czerwonego',
    'arena/player2/label':
      'Program niebieskiego',
    'arena/map/label':
      'Mapa',
    'arena/fps/label':
      'FPS',
    'arena/run/label':
      'Start',
    'arena/blue':
      'Niebieski',
    'arena/red':
      'Czerwony',
    'arena/ants':
      'Mrówki',
    'arena/food':
      'Jedzenie',
    'arena/score':
      'Punkty',


    'into_buckets/label' :
      'wrzuć do koszyka',

    'matching_bucket/label/placeholder': (no) =>
      'koszyczek #' + no,
    'matching_bucket/match/label':
      'Połącz zaznaczone',
    'matching_bucket/unmatch/label':
      'Rozłącz zaznaczone',
    'matching_bucket/deselect_all/label':
      'Wyczyść zaznaczenie',
    'matching_bucket/empty/label':
      'Opróżnij koszyk',
    'material/video/watch':
      'obejrzyj',

    'materials_to_skills_matcher_page/save/response/200':
      'Powiązano materiał z umiejętnością',


    'templates_list_page/filter_control/placeholder':
      'Filtruj',

    'templates_list/skill/easier/label':
      'Prostsze',
    'templates_list/skill/harder/label':
      'Trudniejsze',
    'templates_list/skill/save/label':
      'Zapisz',
    'templates_list/skill/cancel/label':
      'Anuluj',
    'templates_list/unskilled/header':
      'Szablony nieprzypisane jeszcze do żadnej umiejętności:',

    'skill/save/response/200':
      'Zapisano nazwę i zbiór prostszych umiejętności',
    'skill/save/response/409':
      'Nie udało się zapisać zmian w zbiorze prostszych umiejętności. Najprawdopodobniej ktoś w międzyczasie dokonał zmian i powstałby cykl. Odśwież stronę i spróbuj ponownie',
    'skill/save/response/other':(code) => {
      return 'Przepraszamy, ale serwer odpowiedział w sposób, którego sami się nie spodziewaliśmy. Spróbuj odświeżyć stronę (CTRL+SHIFT+F5). Jeśli to nie pomoże, proszę zgłoś nam "błąd numer ' + code+ ' podczas zapisywania umiejętności", dzięki.';
    },

    'templates_list/header':
      'Lista wszystkich szablonów zadań',
    'templates_list/create_new_template/label':
      'Stwórz nowy szablon zadania',
    'templates_list/create_new_skill/label':
      'Stwórz nową umiejętność',
    'task_template/thumbnail/missing_snippet':
      'Nie udało się wygenerować treści',


    'report_page/no_class':
      'Nikogo tu nie widzisz, bo nie wiemy z jakiej klasy jesteś',
    'report_page/classify/label':
      'Zapisz się do klasy',

    'tutorial/next':
      'Dalej',
    'tutorial/previous':
      'Wstecz',
    'tutorial/skip':
      'Pomiń',
    'tutorial/done':
      'Zakończ prezentację',
    'tutorial/report_page/progress':
      'Rozwiązuj zadania i na bieżąco śledź swoje postępy w przygotowaniach do matury.\n\nTeraz widzisz tylko przykładowe wartości, ale jak rozwiążesz kilka zadań zobaczysz tutaj swoje wyniki.',
    'tutorial/report_page/comparison/class':
      'W tym miejscu będziesz widzieć osoby z Twojej klasy, które rozwiązały poprawnie więcej zadań od Ciebie.\n\nKażde, nawet najmniejsze poprawnie rozwiązane zadanie zmniejsza dystans między Wami.',
    'tutorial/report_page/comparison/frenemies':
      'Jeśli motywuje Cię rywalizacja, tutaj możesz dodać znajomych z którymi zmierzysz się w przygotowaniach do matury.',
    'tutorial/report_page/burn_down_chart':
      'Zobacz w jakim tempie musisz się uczyć żeby zdążyć do matury.\n\nNa podstawie dotychczasowych osiągnięć prognozujemy poziom Twoich umiejętności w przyszłości.',
    'tutorial/report_page/events':
      'Będziemy Cię na bieżąco informować o Twoich osiągnięciach i postępach Twoich rywali',
    'tutorial/menu':
      'W tym miejscu możesz przełączać się między rozwiązywaniem zadań i widokiem postępów.\n\nMożesz też założyć konto, aby Twoje postępy zostały zapamiętane po zamknięciu strony.',
    'tutorial/quiz':
      'Proszę, kliknij teraz "Zadania"',
    'tutorial/quiz_page/easy/question':
      'Nie czuj się urażony gdy system zada Ci proste pytanie. On uczy się razem z Tobą. Poziom zadań będzie się automatycznie dopasowywał do Twoich postępów.',
    'tutorial/quiz_page/easy/answers':
      'Kliknij prawidłową odpowiedź',
    'tutorial/quiz_page/boring/question':
      'Czasem zadanie w zasadzie jest proste, ale by je rozwiązać potrzebna jest kartka, ołówek i czas.',
    'tutorial/quiz_page/boring/skip':
      'Cenimy Twój czas i ufamy Ci - jeśli umiesz zrobić zadanie, ale Ci się nie chce go robić, po prostu nam powiedz. Kliknij ten przycisk.',
    'tutorial/quiz_page/boring/haste':
      'Kliknij ten przycisk - zadanie zostanie oznaczone jako zrobione poprawnie!',

    'tutorial/quiz_page/difficult/question':
      'Może się zdarzyć, że zadanie będzie trudne. Jeśli nie znasz odpowiedzi - to nic nie szkodzi. System w ten sposób próbuje precyzyjniej określić Twój aktualny poziom.',
    'tutorial/quiz_page/difficult/skip':
      'Szczerość popłaca. Nie strzelaj na oślep, tylko spokojnie przyznaj, że nie wiesz:) Inaczej nigdy nie będziemy mogli Cię niczego nauczyć, a system ciągle będzie Ci dawał za trudne zadania.',
    'tutorial/quiz_page/difficult/seek_help':
      'Świetnie! Pierwszym krokiem do oświecenia jest przyznać, że się nie umie:) Dzięki temu system wie jakie wykłady i artykuły Ci pomogą.',
    'tutorial/quiz_page/difficult/sidebar':
      'Te trzy wykłady i artykuły dobraliśmy pod kątem tego, że pomogły innym rozwiązać podobne zadanie. Mentorzy to osoby, które umieją zrobić to zadanie i mogą Ci pomóc na czacie.',
    'tutorial/quiz_page/difficult/history':
      'Jak pewnie się domyślasz, to jest historia wszystkich robionych przez Ciebie zadań. Możesz zawsze wrócić do starego zadania by zapoznać się z materiałami do niego, lub na nowo się z nim zmierzyć dla innych parametrów.',


    'help/materials':
      'Pomoce do zadania',
    'help/mentors':
      'Mentorzy',
    'help/reason/movie.html':
      (n) => '<b>' + n + ' osób</b> zrobiło to zadanie po obejrzeniu tego filmu',
    'help/reason/article.html':
      (n) => '<b>' + n + ' osób</b> zrobiło to zadanie po przeczytaniu tego artykułu',
    '':''
  }
  dopasujDoLiczebnika(n,godzine,godziny,godzin){
    if(n==1){
      return godzine;
    }
    n%=100;
    if(10<n && n<20){
      return godzin;
    }
    n%=10;
    if(2<=n && n<=4){
      return godziny;
    }
    return godzin;
  }
  duration(seconds){
    if(seconds>=84000){
      var dni=Math.floor(seconds/86400);
      return dni + ' ' + this.dopasujDoLiczebnika(dni,'dzień','dni','dni');
    }
    if(seconds>3600){
      var godziny=Math.floor(seconds/3600);
      return godziny + ' ' + this.dopasujDoLiczebnika(godziny,'godzinę','godziny','godzin');
    }
    if(seconds>60){
      var minuty=Math.floor(seconds/60);
      return minuty + ' ' + this.dopasujDoLiczebnika(minuty,'minutę','minuty','minut');
    }
    var sekundy = Math.floor(seconds);
    return  sekundy+ ' ' + this.dopasujDoLiczebnika(sekundy,'sekundę','sekundy','sekund');
  }
  percents(p){
    return Math.round(p*100) + '%';
  }
}
