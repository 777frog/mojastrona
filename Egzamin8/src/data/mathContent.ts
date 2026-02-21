export const mathContent = {
  id: 'matematyka',
  name: 'Matematyka',
  icon: '📐',
  color: 'from-blue-500 to-indigo-600',
  price: 49.99,
  sections: [
    {
      id: 'liczby',
      title: '1. Liczby i działania',
      topics: [
        {
          title: 'Zbiory liczbowe',
          content: `
**Liczby naturalne (ℕ):** 0, 1, 2, 3, 4, 5, ... (liczby całkowite nieujemne)

**Liczby całkowite (ℤ):** ..., -3, -2, -1, 0, 1, 2, 3, ... (naturalne + ujemne)

**Liczby wymierne (ℚ):** wszystkie liczby, które można zapisać jako ułamek p/q, gdzie q≠0
- Przykłady: 1/2, -3/4, 0.5, 2.333..., 7

**Liczby niewymierne:** nie można zapisać jako ułamek
- Przykłady: √2, √3, π, e

**Liczby rzeczywiste (ℝ):** wszystkie wymierne i niewymierne
          `
        },
        {
          title: 'Działania na ułamkach',
          content: `
**Dodawanie i odejmowanie ułamków:**
- Sprowadź do wspólnego mianownika
- a/b ± c/d = (ad ± bc) / bd
- Przykład: 2/3 + 1/4 = 8/12 + 3/12 = 11/12

**Mnożenie ułamków:**
- a/b × c/d = ac/bd
- Przykład: 2/3 × 3/5 = 6/15 = 2/5

**Dzielenie ułamków:**
- a/b ÷ c/d = a/b × d/c = ad/bc
- Przykład: 2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6

**Ułamki dziesiętne:**
- 0.25 = 25/100 = 1/4
- 0.333... = 1/3
- Zamiana: dziel licznik przez mianownik
          `
        },
        {
          title: 'Potęgi i pierwiastki',
          content: `
**Potęga o wykładniku naturalnym:**
- aⁿ = a × a × a × ... (n razy)
- 2³ = 2 × 2 × 2 = 8
- 5² = 25

**Własności potęg:**
- aᵐ × aⁿ = aᵐ⁺ⁿ
- aᵐ ÷ aⁿ = aᵐ⁻ⁿ
- (aᵐ)ⁿ = aᵐˣⁿ
- (ab)ⁿ = aⁿ × bⁿ
- a⁰ = 1 (dla a≠0)
- a⁻ⁿ = 1/aⁿ

**Pierwiastki:**
- √a = b, gdy b² = a
- √4 = 2, √9 = 3, √16 = 4, √25 = 5
- ∛8 = 2, ∛27 = 3

**Własności pierwiastków:**
- √(a×b) = √a × √b
- √(a/b) = √a / √b
- (√a)² = a
          `
        },
        {
          title: 'Procenty',
          content: `
**Procent to setna część całości:**
- 1% = 1/100 = 0.01
- 50% = 1/2 = 0.5
- 25% = 1/4 = 0.25

**Obliczanie procentu z liczby:**
- p% z a = (p/100) × a
- 20% z 150 = 0.2 × 150 = 30

**Jakim procentem jest a z b:**
- (a/b) × 100%
- 30 z 150 = (30/150) × 100% = 20%

**Podwyżki i obniżki:**
- Podwyżka o p%: nowa = stara × (1 + p/100)
- Obniżka o p%: nowa = stara × (1 - p/100)
- Cena 100 zł po podwyżce o 20%: 100 × 1.2 = 120 zł
- Cena 100 zł po obniżce o 15%: 100 × 0.85 = 85 zł

**Procent składany:**
- Po n okresach: K = K₀ × (1 + p/100)ⁿ
          `
        }
      ]
    },
    {
      id: 'algebra',
      title: '2. Algebra - Wyrażenia algebraiczne',
      topics: [
        {
          title: 'Wyrażenia algebraiczne',
          content: `
**Jednomian:** iloczyn liczb i liter (np. 3x, -2ab, 5x²y)

**Wielomian:** suma jednomianów (np. 2x² + 3x - 5)

**Redukcja wyrazów podobnych:**
- 3x + 5x = 8x
- 4a² - 2a² + a² = 3a²
- 2xy + 3xy - xy = 4xy

**Mnożenie jednomianów:**
- 2x × 3x = 6x²
- (-3a) × 4ab = -12a²b
- 2x² × 5x³ = 10x⁵
          `
        },
        {
          title: 'Wzory skróconego mnożenia',
          content: `
**SUPER WAŻNE - naucz się na pamięć!**

**Kwadrat sumy:**
(a + b)² = a² + 2ab + b²

**Kwadrat różnicy:**
(a - b)² = a² - 2ab + b²

**Różnica kwadratów:**
a² - b² = (a - b)(a + b)

**Przykłady:**
- (x + 3)² = x² + 6x + 9
- (2a - 5)² = 4a² - 20a + 25
- x² - 16 = (x - 4)(x + 4)
- 9a² - 4b² = (3a - 2b)(3a + 2b)
          `
        },
        {
          title: 'Równania',
          content: `
**Równanie liniowe (pierwszego stopnia):**
ax + b = 0 → x = -b/a

**Rozwiązywanie równań - zasady:**
1. Wymnóż nawiasy
2. Przenieś x-y na jedną stronę, liczby na drugą
3. Zredukuj wyrazy podobne
4. Podziel przez współczynnik przy x

**Przykład:**
3(x - 2) + 4 = 2x + 5
3x - 6 + 4 = 2x + 5
3x - 2 = 2x + 5
3x - 2x = 5 + 2
x = 7

**Równanie kwadratowe:** ax² + bx + c = 0
- Δ = b² - 4ac
- Δ > 0: dwa rozwiązania x = (-b ± √Δ) / 2a
- Δ = 0: jedno rozwiązanie x = -b / 2a
- Δ < 0: brak rozwiązań
          `
        },
        {
          title: 'Układy równań',
          content: `
**Układ dwóch równań z dwiema niewiadomymi:**

**Metoda podstawiania:**
1. Wyznacz jedną zmienną z jednego równania
2. Podstaw do drugiego równania
3. Rozwiąż i wróć do pierwszego

**Przykład:**
x + y = 5
2x - y = 4
—
Z pierwszego: y = 5 - x
Podstawiam: 2x - (5 - x) = 4
2x - 5 + x = 4
3x = 9, x = 3
y = 5 - 3 = 2
Odpowiedź: x = 3, y = 2

**Metoda przeciwnych współczynników:**
1. Pomnóż równania, by współczynniki się zniosły
2. Dodaj równania
3. Rozwiąż i podstaw
          `
        },
        {
          title: 'Nierówności',
          content: `
**Rozwiązywanie nierówności:**
- Tak samo jak równania, ALE:
- Przy mnożeniu/dzieleniu przez liczbę UJEMNĄ - znak nierówności się ODWRACA!

**Przykład:**
-2x + 6 > 0
-2x > -6
x < 3  (znak się odwrócił!)

**Przedziały liczbowe:**
- x > 3 → (3, +∞)
- x ≤ 5 → (-∞, 5]
- 2 < x ≤ 7 → (2, 7]

**Na osi liczbowej:**
- Kółko puste ○ = nie zawiera
- Kółko pełne ● = zawiera
          `
        }
      ]
    },
    {
      id: 'funkcje',
      title: '3. Funkcje',
      topics: [
        {
          title: 'Pojęcie funkcji',
          content: `
**Funkcja** przyporządkowuje każdemu x dokładnie jedną wartość y.

**Dziedzina:** zbiór argumentów (x-ów)
**Zbiór wartości:** zbiór y-ków

**Sposoby opisu funkcji:**
- Wzorem: y = 2x + 1
- Tabelą
- Wykresem
- Słownie

**Odczytywanie z wykresu:**
- Punkt (2, 5) oznacza: dla x=2, y=5
- f(2) = 5

**Miejsce zerowe:** x, dla którego f(x) = 0
(punkt przecięcia z osią OX)
          `
        },
        {
          title: 'Funkcja liniowa',
          content: `
**Wzór:** y = ax + b (lub f(x) = ax + b)

**a = współczynnik kierunkowy:**
- a > 0 → funkcja rosnąca ↗
- a < 0 → funkcja malejąca ↘
- a = 0 → funkcja stała (pozioma prosta)

**b = wyraz wolny:**
- punkt przecięcia z osią OY: (0, b)

**Miejsce zerowe:**
0 = ax + b → x = -b/a

**Rysowanie wykresu:**
1. Oblicz miejsce zerowe (x = -b/a, 0)
2. Oblicz punkt na osi Y (0, b)
3. Połącz punkty prostą

**Przykład:** y = 2x - 4
- a = 2 > 0 → rosnąca
- b = -4 → przecina OY w (0, -4)
- Miejsce zerowe: x = 4/2 = 2 → (2, 0)
          `
        },
        {
          title: 'Funkcja kwadratowa',
          content: `
**Wzór:** y = ax² + bx + c

**Wykres:** parabola
- a > 0 → ramiona do góry ∪
- a < 0 → ramiona do dołu ∩

**Wierzchołek paraboli:**
- p = -b/(2a)
- q = -Δ/(4a) gdzie Δ = b² - 4ac
- Wierzchołek: W(p, q)

**Miejsca zerowe:**
- Δ > 0: dwa miejsca zerowe
- Δ = 0: jedno miejsce zerowe (wierzchołek na osi OX)
- Δ < 0: brak miejsc zerowych

**Postać kanoniczna:** y = a(x - p)² + q
**Postać iloczynowa:** y = a(x - x₁)(x - x₂)

**Oś symetrii:** x = p = -b/(2a)
          `
        },
        {
          title: 'Proporcjonalność',
          content: `
**Proporcjonalność prosta:** y = ax (a ≠ 0)
- Wykres przechodzi przez (0, 0)
- y rośnie/maleje razem z x
- y/x = const (stały stosunek)
- Przykład: cena ~ ilość

**Proporcjonalność odwrotna:** y = a/x (a ≠ 0)
- xy = const (stały iloczyn)
- Wykres - hiperbola
- Gdy x rośnie, y maleje i odwrotnie
- Przykład: czas = droga/prędkość

**Zadania:**
Jeśli 5 robotników wykona pracę w 12 dni, to ile dni potrzeba 4 robotnikom?
5 × 12 = 4 × x
x = 60/4 = 15 dni
          `
        }
      ]
    },
    {
      id: 'geometria',
      title: '4. Geometria płaska',
      topics: [
        {
          title: 'Kąty',
          content: `
**Rodzaje kątów:**
- Ostry: 0° < α < 90°
- Prosty: α = 90°
- Rozwarty: 90° < α < 180°
- Półpełny: α = 180°
- Pełny: α = 360°

**Kąty w trójkącie:** suma = 180°

**Kąty przy równoległych prostych:**
- Odpowiadające - równe
- Naprzemianległe - równe
- Przyległe - suma 180°

**Kąty w wielokącie (n-kąt):**
- Suma kątów wewnętrznych: (n-2) × 180°
- Czworokąt: 360°
- Pięciokąt: 540°
- Sześciokąt: 720°
          `
        },
        {
          title: 'Trójkąty',
          content: `
**Podział ze względu na boki:**
- Równoboczny: 3 równe boki, kąty 60°
- Równoramienny: 2 równe boki
- Różnoboczny: wszystkie różne

**Podział ze względu na kąty:**
- Ostrokątny: wszystkie kąty ostre
- Prostokątny: jeden kąt prosty (90°)
- Rozwartokątny: jeden kąt rozwarty

**Twierdzenie Pitagorasa (trójkąt prostokątny):**
a² + b² = c²
gdzie c = przeciwprostokątna (najdłuższy bok)

**Popularne trójkąty pitagorejskie:**
- 3, 4, 5
- 5, 12, 13
- 8, 15, 17
- 7, 24, 25

**Wysokość trójkąta:** prostopadła do podstawy
**Pole:** P = (1/2) × a × h
          `
        },
        {
          title: 'Czworokąty',
          content: `
**Kwadrat:**
- 4 równe boki, 4 kąty proste
- P = a²
- Obwód = 4a
- Przekątna: d = a√2

**Prostokąt:**
- Przeciwległe boki równe, 4 kąty proste
- P = a × b
- Obwód = 2a + 2b
- Przekątna: d = √(a² + b²)

**Romb:**
- 4 równe boki, przekątne prostopadłe
- P = (d₁ × d₂) / 2
- Obwód = 4a

**Równoległobok:**
- Przeciwległe boki równoległe i równe
- P = a × h
- Obwód = 2a + 2b

**Trapez:**
- Jedna para boków równoległa
- P = [(a + b) × h] / 2
          `
        },
        {
          title: 'Okrąg i koło',
          content: `
**Okrąg:** linia (brzeg)
**Koło:** powierzchnia (z wnętrzem)

**Wzory:**
- Obwód okręgu: L = 2πr = πd
- Pole koła: P = πr²

**π ≈ 3.14 lub 22/7**

**Elementy:**
- Promień (r): od środka do brzegu
- Średnica (d): d = 2r
- Cięciwa: odcinek łączący 2 punkty na okręgu
- Łuk: część okręgu

**Kąt środkowy i wpisany:**
- Kąt środkowy oparty na łuku = 2 × kąt wpisany oparty na tym samym łuku

**Styczna do okręgu:**
- Prostopadła do promienia w punkcie styczności
          `
        },
        {
          title: 'Pola i obwody - podsumowanie',
          content: `
**WZORY DO ZAPAMIĘTANIA:**

| Figura | Pole | Obwód |
|--------|------|-------|
| Kwadrat | a² | 4a |
| Prostokąt | ab | 2(a+b) |
| Trójkąt | ½ah | a+b+c |
| Równoległobok | ah | 2(a+b) |
| Romb | ½d₁d₂ | 4a |
| Trapez | ½(a+b)h | a+b+c+d |
| Koło | πr² | 2πr |

**Trójkąt równoboczny:** P = (a²√3)/4

**Trójkąt prostokątny:** P = ½ × a × b (przyprostokątne)

**Sześciokąt foremny:** P = (3a²√3)/2
          `
        }
      ]
    },
    {
      id: 'bryly',
      title: '5. Geometria przestrzenna',
      topics: [
        {
          title: 'Graniastosłupy',
          content: `
**Graniastosłup prosty:**
- Podstawy: przystające wielokąty
- Ściany boczne: prostokąty

**Objętość:** V = Pp × H
(pole podstawy × wysokość)

**Pole powierzchni całkowitej:**
Pc = 2 × Pp + Pb
(2 × pole podstawy + pole boczne)

**Pole powierzchni bocznej:**
Pb = obwód podstawy × wysokość

**Prostopadłościan (pudełko):**
- V = a × b × c
- Pc = 2(ab + bc + ac)
- Przekątna: d = √(a² + b² + c²)

**Sześcian:**
- V = a³
- Pc = 6a²
- Przekątna ściany: a√2
- Przekątna sześcianu: a√3
          `
        },
        {
          title: 'Ostrosłupy',
          content: `
**Ostrosłup:**
- Jedna podstawa (wielokąt)
- Ściany boczne: trójkąty
- Wierzchołek: punkt, gdzie zbiegają się ściany

**Objętość:** V = (1/3) × Pp × H

**Pole powierzchni:**
Pc = Pp + suma pól ścian bocznych

**Ostrosłup prawidłowy:**
- Podstawa: wielokąt foremny
- Wierzchołek nad środkiem podstawy
- Wszystkie ściany boczne przystające

**Apotema:** wysokość ściany bocznej (od podstawy do wierzchołka)

**Pb (prawidłowy) = ½ × obwód podstawy × apotema**
          `
        },
        {
          title: 'Walec',
          content: `
**Walec:**
- Podstawy: dwa przystające koła
- Powierzchnia boczna: prostokąt "zwinięty"

**Objętość:** V = πr²h

**Pole podstawy:** Pp = πr²

**Pole powierzchni bocznej:** 
Pb = 2πrh (obwód podstawy × wysokość)

**Pole powierzchni całkowitej:**
Pc = 2πr² + 2πrh = 2πr(r + h)

**Przekrój osiowy:** prostokąt o wymiarach 2r × h

**Siatka walca:**
- 2 koła (podstawy)
- 1 prostokąt (powierzchnia boczna)
          `
        },
        {
          title: 'Stożek',
          content: `
**Stożek:**
- Jedna podstawa: koło
- Powierzchnia boczna: "parasol"
- Wierzchołek

**Objętość:** V = (1/3)πr²h

**Tworząca (l):** odcinek od wierzchołka do brzegu podstawy
l² = r² + h² (Pitagoras!)

**Pole powierzchni bocznej:** 
Pb = πrl

**Pole powierzchni całkowitej:**
Pc = πr² + πrl = πr(r + l)

**Przekrój osiowy:** trójkąt równoramienny

**Siatka stożka:**
- 1 koło (podstawa)
- 1 wycinek koła (powierzchnia boczna)
          `
        },
        {
          title: 'Kula',
          content: `
**Kula (sfera):**
- Wszystkie punkty w tej samej odległości od środka

**Objętość:** V = (4/3)πr³

**Pole powierzchni:** P = 4πr²

**Średnica:** d = 2r

**Przekrój kuli:** zawsze koło
- Przekrój przez środek: koło wielkie (największy możliwy)

**Półkula:**
- V = (2/3)πr³
- P = 3πr² (koło podstawy + półsfera)

**Zależności:**
- Objętość kuli = 2 × objętość stożka wpisanego (ten sam r i h = r)
          `
        }
      ]
    },
    {
      id: 'statystyka',
      title: '6. Statystyka i prawdopodobieństwo',
      topics: [
        {
          title: 'Średnia arytmetyczna',
          content: `
**Średnia arytmetyczna:**
x̄ = (x₁ + x₂ + ... + xₙ) / n

**Przykład:**
Oceny: 4, 5, 3, 4, 5, 3, 4
Średnia = (4+5+3+4+5+3+4)/7 = 28/7 = 4

**Średnia ważona:**
x̄ = (w₁x₁ + w₂x₂ + ...) / (w₁ + w₂ + ...)

**Przykład (oceny z wagami):**
Sprawdzian (waga 3): 4
Kartkówka (waga 1): 5
Średnia = (3×4 + 1×5)/(3+1) = 17/4 = 4.25

**Zadania ze średnią:**
"Średnia 5 liczb to 12. Jaka jest ich suma?"
Suma = 5 × 12 = 60
          `
        },
        {
          title: 'Mediana i moda',
          content: `
**Mediana:** wartość środkowa (po uporządkowaniu)

**Parzysta liczba danych:**
Mediana = średnia dwóch środkowych

**Przykład:**
Dane: 3, 7, 2, 9, 5, 4
Uporządkowane: 2, 3, 4, 5, 7, 9
Mediana = (4+5)/2 = 4.5

**Nieparzysta liczba danych:**
Dane: 3, 7, 2, 9, 5
Uporządkowane: 2, 3, 5, 7, 9
Mediana = 5 (środkowa)

**Moda (dominanta):**
Wartość występująca najczęściej

**Przykład:**
2, 3, 3, 4, 5, 3, 7
Moda = 3 (występuje 3 razy)

**Zbiór może mieć kilka mod lub nie mieć żadnej!**
          `
        },
        {
          title: 'Wykresy i diagramy',
          content: `
**Diagram słupkowy:**
- Wysokość słupka = wartość/liczebność
- Dobre do porównywania kategorii

**Diagram kołowy:**
- Kąt wycinka = (część/całość) × 360°
- 25% = 90°, 50% = 180°

**Wykres liniowy:**
- Pokazuje zmiany w czasie
- Punkty połączone linią

**Histogram:**
- Słupki stykają się
- Przedziały danych

**Odczytywanie wykresów:**
1. Przeczytaj tytuł i opisy osi
2. Zwróć uwagę na skalę
3. Odczytuj dokładnie wartości

**Pułapki:**
- Oś Y nie zaczyna się od 0
- Różne skale
          `
        },
        {
          title: 'Prawdopodobieństwo',
          content: `
**Prawdopodobieństwo:**
P(A) = liczba zdarzeń sprzyjających / liczba wszystkich zdarzeń

**Zakres:** 0 ≤ P(A) ≤ 1
- P = 0: zdarzenie niemożliwe
- P = 1: zdarzenie pewne

**Przykład - rzut kostką:**
P(wypadnie 6) = 1/6
P(wypadnie parzysta) = 3/6 = 1/2
P(wypadnie < 5) = 4/6 = 2/3

**Przykład - losowanie kuli:**
W urnie: 4 białe, 3 czerwone, 2 niebieskie (razem 9)
P(biała) = 4/9
P(nie niebieska) = 7/9

**Zdarzenie przeciwne:**
P(nie A) = 1 - P(A)

**Prawdopodobieństwo w procentach:**
P = 1/4 = 25%
          `
        }
      ]
    },
    {
      id: 'zadania',
      title: '7. Zadania tekstowe',
      topics: [
        {
          title: 'Strategie rozwiązywania',
          content: `
**Kroki rozwiązywania zadań tekstowych:**

1. **Przeczytaj uważnie** (2-3 razy)
2. **Wypisz dane** - co wiesz?
3. **Określ niewiadome** - czego szukasz?
4. **Narysuj** rysunek/schemat jeśli możesz
5. **Ułóż równanie** lub wykonaj obliczenia
6. **Rozwiąż** i sprawdź sens odpowiedzi
7. **Napisz odpowiedź** pełnym zdaniem

**Słowa-klucze:**
- "o ile więcej/mniej" → odejmowanie
- "ile razy więcej/mniej" → dzielenie
- "razem/łącznie" → dodawanie
- "zostało/pozostało" → odejmowanie
- "każdy/na osobę" → dzielenie
          `
        },
        {
          title: 'Zadania z procentami',
          content: `
**Typ 1: Oblicz procent z liczby**
"Ile to jest 35% z 240?"
0.35 × 240 = 84

**Typ 2: Jakim procentem jest?**
"Jakim procentem liczby 80 jest 20?"
(20/80) × 100% = 25%

**Typ 3: Podwyżki/obniżki**
"Cena wzrosła o 15% i wynosi 460 zł. Ile wynosiła wcześniej?"
x × 1.15 = 460
x = 460/1.15 = 400 zł

**Typ 4: Procent od procentu**
"Cena spadła o 20%, potem wzrosła o 20%. Jaka jest teraz?"
100 × 0.8 × 1.2 = 96 (NIE 100!)

**Promocje:**
"2 produkty za cenę 1" = 50% zniżki
"3 za 2" = 33.3% zniżki
          `
        },
        {
          title: 'Zadania o prędkości',
          content: `
**Podstawowy wzór:**
s = v × t
(droga = prędkość × czas)

**Przekształcenia:**
- v = s/t (prędkość = droga/czas)
- t = s/v (czas = droga/prędkość)

**Jednostki:**
- km/h → m/s: dziel przez 3.6
- m/s → km/h: mnóż przez 3.6
- 36 km/h = 10 m/s
- 90 km/h = 25 m/s

**Prędkość średnia:**
v_śr = całkowita droga / całkowity czas

**Uwaga:** średnia prędkość ≠ średnia arytmetyczna prędkości!

**Spotkanie dwóch obiektów:**
- Jadą ku sobie: prędkości się dodają
- Jadą w tym samym kierunku: prędkości się odejmują
          `
        },
        {
          title: 'Zadania o pracy',
          content: `
**Zasada:**
Praca = wydajność × czas

**Jeśli osoba robi całość w t godzin:**
Wydajność = 1/t (część pracy na godzinę)

**Przykład:**
"Adam maluje pokój w 6h, Bartek w 4h. Ile razem?"

Wydajność Adama: 1/6 pokoju/h
Wydajność Bartka: 1/4 pokoju/h
Razem: 1/6 + 1/4 = 5/12 pokoju/h

Czas: 1 ÷ (5/12) = 12/5 = 2.4h = 2h 24min

**Zadania o napełnianiu:**
- Kran napełnia w 3h → 1/3 basenu/h
- Odpływ opróżnia w 6h → 1/6 basenu/h
- Razem: 1/3 - 1/6 = 1/6 basenu/h
- Napełni się w 6h
          `
        }
      ]
    }
  ]
};
