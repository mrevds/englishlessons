// Контент для уроков с поддержкой различных типов контента

export type ContentBlock = 
  | { type: 'text'; content: string }
  | { type: 'heading'; level: 2 | 3; content: string; icon?: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'code'; content: string; language?: string }
  | { type: 'formula'; content: string }
  | { type: 'highlight'; variant: 'info' | 'warning' | 'success' | 'tip'; content: string }
  | { type: 'comparison'; items: Array<{ label: string; countable?: string; uncountable?: string }> };

export interface LessonContent {
  id: number;
  title: string;
  description: string;
  content: {
    introduction: string | ContentBlock[];
    rules: (string | ContentBlock[])[];
    examples: Array<{
      sentence: string;
      translation: string;
      highlight?: boolean;
      icon?: string;
    }>;
    practice: string | ContentBlock[];
  };
}

export const lessonsContent: LessonContent[] = [
  {
    id: 1,
    title: 'Nouns: Countable and Uncountable',
    description: 'Существительные: исчисляемые и неисчисляемые',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Две категории существительных в английском' },
        { type: 'text', content: 'Существительные в английском делятся на две основные категории:' },
        { 
          type: 'highlight', 
          variant: 'info',
          content: '**Countable Nouns** (Исчисляемые) — предметы, которые можно посчитать\n**Uncountable Nouns** (Неисчисляемые) — вещества, массы, абстракции' 
        },
        { 
          type: 'highlight', 
          variant: 'warning',
          content: '**ВАЖНО:** Правильное понимание этой разницы критически важно для использования артиклей, квантификаторов и глагольных форм!' 
        }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'ИСЧИСЛЯЕМЫЕ существительные (Countable)' },
          { type: 'text', content: '**Формула:** имеют единственное и множественное число' },
          { type: 'code', content: 'Singular → Plural\nbook → books\ncat → cats\nchild → children' },
          { type: 'text', content: '✓ Можно использовать с числительными:' },
          { type: 'list', items: ['**one** apple', '**two** apples', '**three** students'] }
        ],
        [
          { type: 'heading', level: 3, content: 'НЕИСЧИСЛЯЕМЫЕ существительные (Uncountable)' },
          { type: 'highlight', variant: 'warning', content: '✗ **НЕТ** множественного числа\n✓ **ВСЕГДА** в единственном числе' },
          { type: 'text', content: '**Категории неисчисляемых:**' },
          { type: 'list', items: [
            'Жидкости: water, milk, coffee',
            'Материалы: wood, glass, paper',
            'Деньги: money, cash',
            'Абстракции: information, advice, knowledge',
            'Собирательные: furniture, luggage, equipment'
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'КВАНТИФИКАТОРЫ для исчисляемых' },
          { type: 'table', headers: ['Квантификатор', 'Пример', 'Перевод'], rows: [
            ['a/an', 'a book', 'одна книга'],
            ['many', 'many books', 'много книг'],
            ['a few', 'a few apples', 'несколько яблок'],
            ['several', 'several students', 'несколько студентов'],
            ['a number of', 'a number of cars', 'несколько машин']
          ]},
          { type: 'formula', content: 'How many + countable plural?' }
        ],
        [
          { type: 'heading', level: 3, content: 'КВАНТИФИКАТОРЫ для неисчисляемых' },
          { type: 'table', headers: ['Квантификатор', 'Пример', 'Перевод'], rows: [
            ['much', 'much water', 'много воды'],
            ['a little', 'a little sugar', 'немного сахара'],
            ['a bit of', 'a bit of advice', 'немного совета'],
            ['a great deal of', 'a great deal of information', 'много информации']
          ]},
          { type: 'formula', content: 'How much + uncountable?' }
        ],
        [
          { type: 'heading', level: 3, content: 'ДВОЙНОЕ ЗНАЧЕНИЕ - одно слово, два смысла!' },
          { type: 'text', content: 'Некоторые существительные меняют категорию в зависимости от значения:' },
          { type: 'comparison', items: [
            { label: 'paper', uncountable: 'бумага (материал)', countable: 'a paper = газета' },
            { label: 'glass', uncountable: 'стекло (материал)', countable: 'a glass = стакан' },
            { label: 'coffee', uncountable: 'кофе (напиток)', countable: 'a coffee = чашка кофе' },
            { label: 'chocolate', uncountable: 'шоколад (масса)', countable: 'a chocolate = конфета' },
            { label: 'hair', uncountable: 'волосы (вся масса)', countable: 'a hair = один волос' }
          ]},
          { type: 'highlight', variant: 'warning', content: '⚠ Будьте внимательны к контексту!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ИЗМЕРЕНИЕ неисчисляемых существительных' },
          { type: 'text', content: 'Чтобы "посчитать" неисчисляемое, используем **контейнеры** и **единицы измерения**:' },
          { type: 'formula', content: 'a/an + container/measure + of + uncountable' },
          { type: 'code', content: 'a glass of water — стакан воды\na cup of coffee — чашка кофе\na piece of advice — совет (один)\na slice of bread — кусок хлеба\na spoonful of sugar — ложка сахара\na loaf of bread — буханка хлеба\na bar of chocolate — плитка шоколада' }
        ],
        [
          { type: 'heading', level: 3, content: 'СОГЛАСОВАНИЕ с глаголом' },
          { type: 'highlight', variant: 'warning', content: '**ПРАВИЛО:** С неисчисляемыми существительными глагол **ВСЕГДА** в единственном числе!' },
          { type: 'code', content: '✓ The information is useful. (НЕ are)\n✓ The furniture was expensive. (НЕ were)\n✓ Money doesn\'t grow on trees. (НЕ don\'t)' },
          { type: 'highlight', variant: 'tip', content: '→ Даже если по смыслу "много" — грамматически единственное число!' }
        ],
        [
          { type: 'heading', level: 3, content: 'УНИВЕРСАЛЬНЫЕ квантификаторы' },
          { type: 'text', content: '**Some** и **any** работают с ОБОИМИ типами:' },
          { type: 'table', headers: ['Контекст', 'Countable', 'Uncountable'], rows: [
            ['✓ Утверждение', 'some books', 'some water'],
            ['? Вопрос', 'any books?', 'any water?'],
            ['✗ Отрицание', 'not any books', 'not any water']
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'ЗАПОМНИТЕ эти неисчисляемые!' },
          { type: 'text', content: '**Частые ошибки с uncountable nouns:**' },
          { type: 'highlight', variant: 'warning', content: '→ **Никогда не говорите:**' },
          { type: 'code', content: '✗ an advice → ✓ some advice / a piece of advice\n✗ informations → ✓ information (всегда singular!)\n✗ furnitures → ✓ furniture\n✗ a luggage → ✓ luggage / a piece of luggage\n✗ a homework → ✓ homework' },
          { type: 'highlight', variant: 'warning', content: '! Эти ошибки делают даже продвинутые студенты!' }
        ]
      ],
      examples: [
        { sentence: 'I have three books, two pens and one notebook on my desk.', translation: 'У меня на столе три книги, две ручки и одна тетрадь.', highlight: true },
        { sentence: 'There is much water in the bottle, but we need more.', translation: 'В бутылке много воды, но нам нужно больше.' },
        { sentence: 'How many apples do you need for the pie?', translation: 'Сколько яблок тебе нужно для пирога?' },
        { sentence: 'How much money do you have in your wallet?', translation: 'Сколько денег у тебя в кошельке?' },
        { sentence: 'She gave me some useful advice about my career.', translation: 'Она дала мне полезный совет о моей карьере.' },
        { sentence: 'We bought new furniture for the living room.', translation: 'Мы купили новую мебель для гостиной.', highlight: true },
        { sentence: 'Could I have a glass of water and a piece of cake, please?', translation: 'Можно мне стакан воды и кусок торта, пожалуйста?' },
        { sentence: 'The research shows that people need less sugar.', translation: 'Исследование показывает, что людям нужно меньше сахара.' },
        { sentence: 'I don\'t have much time, but I have a few minutes to talk.', translation: 'У меня мало времени, но есть несколько минут поговорить.' },
        { sentence: 'There were only a few people at the meeting, but they had many good ideas.', translation: 'На встрече было мало людей, но у них было много хороших идей.' },
        { sentence: 'I\'ll have a coffee and two chocolates, please.', translation: 'Мне кофе (= чашку) и две конфеты, пожалуйста.' },
        { sentence: 'The information is correct, not "informations are".', translation: 'Информация верная (всегда единственное число!).', highlight: true }
      ],
      practice: [
        { type: 'heading', level: 2, content: 'Практика' },
        { type: 'text', content: '**Задание 1:** Определите тип (C = countable, U = uncountable):' },
        { type: 'text', content: 'chair ____, milk ____, student ____, advice ____, car ____, rice ____, information ____, pencil ____, luggage ____, banana ____, knowledge ____, book ____, salt ____, idea ____, furniture ____, happiness ____, question ____' },
        { type: 'text', content: '**Задание 2:** Выберите правильный квантификатор (many/much/a few/a little):' },
        { type: 'list', items: [
          'How ______ water do you need?',
          'There are ______ people in the room.',
          'I don\'t have ______ time.',
          'She has ______ friends at school.'
        ]},
        { type: 'text', content: '**Задание 3:** Исправьте ошибки:' },
        { type: 'code', content: '✗ I need an advice. → ✓ __________\n✗ There are many furnitures. → ✓ __________\n✗ The informations are useful. → ✓ __________\n✗ I have three luggages. → ✓ __________' },
        { type: 'highlight', variant: 'tip', content: '→ **Совет:** Если сомневаетесь — используйте some или a piece of!' }
      ]
    },
  },
  {
    id: 2,
    title: 'Singular and Plural Nouns',
    description: 'Единственное и множественное число существительных',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Образование множественного числа в английском' },
        { type: 'text', content: 'Образование множественного числа существительных в английском языке следует определённым правилам, но также имеет множество исключений, которые необходимо запомнить.' },
        { 
          type: 'highlight', 
          variant: 'warning',
          content: '**ВАЖНО:** Правильное понимание этих правил критически важно для грамотной речи и письма!' 
        }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'СТАНДАРТНОЕ правило: добавляем -S' },
          { type: 'text', content: '**Формула:** существительное + **-s**' },
          { type: 'code', content: 'cat → cats\ndog → dogs\nbook → books\ntable → tables\ncar → cars\npen → pens' },
          { type: 'highlight', variant: 'info', content: '✓ Это правило работает для большинства существительных' }
        ],
        [
          { type: 'heading', level: 3, content: 'После ШИПЯЩИХ звуков: добавляем -ES' },
          { type: 'text', content: 'После звуков **-s, -ss, -sh, -ch, -x, -z** добавляем **-es**' },
          { type: 'table', headers: ['Окончание', 'Единственное число', 'Множественное число'], rows: [
            ['-s/-ss', 'bus / class', 'buses / classes'],
            ['-sh', 'brush / dish', 'brushes / dishes'],
            ['-ch', 'watch / beach', 'watches / beaches'],
            ['-x', 'box / fox', 'boxes / foxes'],
            ['-z', 'quiz', 'quizzes']
          ]},
          { type: 'formula', content: 'существительное + -ES (после шипящих)' }
        ],
        [
          { type: 'heading', level: 3, content: 'Существительные на -O: особые правила' },
          { type: 'text', content: '**Правило:** Если перед **-o** согласная → обычно **-es**' },
          { type: 'comparison', items: [
            { label: 'potato', countable: 'potatoes', uncountable: '(согласная + o)' },
            { label: 'tomato', countable: 'tomatoes', uncountable: '(согласная + o)' },
            { label: 'hero', countable: 'heroes', uncountable: '(согласная + o)' }
          ]},
          { type: 'highlight', variant: 'warning', content: '⚠ **ИСКЛЮЧЕНИЯ:** photo → photos, piano → pianos, kilo → kilos, video → videos' }
        ],
        [
          { type: 'heading', level: 3, content: 'Существительные на -Y: два варианта' },
          { type: 'table', headers: ['Условие', 'Правило', 'Примеры'], rows: [
            ['Согласная + Y', 'Y → IES', 'baby → babies, city → cities, lady → ladies, story → stories'],
            ['Гласная + Y', 'просто + S', 'boy → boys, day → days, key → keys, toy → toys']
          ]},
          { type: 'formula', content: 'согласная + Y → IES\nгласная + Y → S' },
          { type: 'highlight', variant: 'tip', content: '→ **Совет:** Проверьте букву ПЕРЕД Y!' }
        ],
        [
          { type: 'heading', level: 3, content: 'Существительные на -F/-FE: меняем на -VES' },
          { type: 'text', content: '**Правило:** -F/-FE обычно меняется на **-VES**' },
          { type: 'code', content: 'knife → knives\nwife → wives\nlife → lives\nleaf → leaves\nshelf → shelves\nwolf → wolves\nthief → thieves' },
          { type: 'highlight', variant: 'warning', content: '⚠ **ИСКЛЮЧЕНИЯ:** roof → roofs, chief → chiefs, belief → beliefs, cliff → cliffs' }
        ],
        [
          { type: 'heading', level: 3, content: 'НЕПРАВИЛЬНЫЕ формы (Irregular Plurals)' },
          { type: 'text', content: '**Эти формы нужно ЗАПОМНИТЬ!**' },
          { type: 'table', headers: ['Единственное', 'Множественное', 'Перевод'], rows: [
            ['man', 'men', 'мужчина - мужчины'],
            ['woman', 'women', 'женщина - женщины'],
            ['child', 'children', 'ребёнок - дети'],
            ['foot', 'feet', 'ступня - ступни'],
            ['tooth', 'teeth', 'зуб - зубы'],
            ['mouse', 'mice', 'мышь - мыши'],
            ['goose', 'geese', 'гусь - гуси'],
            ['ox', 'oxen', 'бык - быки'],
            ['person', 'people', 'человек - люди']
          ]},
          { type: 'highlight', variant: 'warning', content: '! Эти формы НЕ следуют обычным правилам - только запоминание!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ОДИНАКОВАЯ форма в обоих числах' },
          { type: 'text', content: 'Некоторые существительные НЕ меняются во множественном числе:' },
          { type: 'code', content: 'one sheep → two sheep\none deer → three deer\none fish → many fish\none species → several species\none series → two series\none aircraft → five aircraft' },
          { type: 'highlight', variant: 'info', content: '→ Обычно это животные и технические термины' }
        ],
        [
          { type: 'heading', level: 3, content: 'ЛАТИНСКИЕ и ГРЕЧЕСКИЕ слова' },
          { type: 'text', content: 'Научные и академические термины часто сохраняют оригинальные формы:' },
          { type: 'table', headers: ['Единственное', 'Множественное', 'Правило'], rows: [
            ['analysis', 'analyses', '-is → -es'],
            ['crisis', 'crises', '-is → -es'],
            ['phenomenon', 'phenomena', '-on → -a'],
            ['criterion', 'criteria', '-on → -a'],
            ['radius', 'radii', '-us → -i'],
            ['cactus', 'cacti', '-us → -i'],
            ['formula', 'formulae / formulas', 'два варианта']
          ]},
          { type: 'highlight', variant: 'tip', content: '→ В современном английском часто используют обычную форму на -s' }
        ],
        [
          { type: 'heading', level: 3, content: 'СОСТАВНЫЕ существительные' },
          { type: 'text', content: '**Правило:** Изменяется ГЛАВНОЕ слово (обычно первое)' },
          { type: 'code', content: 'mother-in-law → mothers-in-law\nson-in-law → sons-in-law\npasser-by → passers-by\nlooker-on → lookers-on' },
          { type: 'highlight', variant: 'info', content: '→ НО если составное слово пишется слитно: bedroom → bedrooms' }
        ]
      ],
      examples: [
        { sentence: 'One cat, two cats, three dogs and four rabbits.', translation: 'Одна кошка, две кошки, три собаки и четыре кролика.', highlight: true },
        { sentence: 'This is my child. These are my children. They are good children.', translation: 'Это мой ребенок. Это мои дети. Они хорошие дети.' },
        { sentence: 'I see a man and three women walking down the street.', translation: 'Я вижу мужчину и трех женщин, идущих по улице.' },
        { sentence: 'There are many boxes, glasses and brushes in the room.', translation: 'В комнате много коробок, стаканов и щёток.' },
        { sentence: 'The farmer has twenty sheep, ten geese and five oxen on his farm.', translation: 'У фермера двадцать овец, десять гусей и пять быков на ферме.', highlight: true },
        { sentence: 'All the wives brought their knives to cut the potatoes and tomatoes.', translation: 'Все жены принесли свои ножи, чтобы порезать картофель и помидоры.' },
        { sentence: 'My mother-in-law and her sisters-in-law are coming for dinner.', translation: 'Моя свекровь и её невестки приходят на ужин.' },
        { sentence: 'Children should brush their teeth after every meal.', translation: 'Дети должны чистить зубы после каждого приёма пищи.' },
        { sentence: 'The two crises required different analyses and criteria.', translation: 'Два кризиса требовали разных анализов и критериев.', highlight: true },
        { sentence: 'We saw many deer and a few moose in the forest.', translation: 'Мы увидели много оленей и несколько лосей в лесу.' },
        { sentence: 'These phenomena were studied by several scientists.', translation: 'Эти явления изучали несколько учёных.' },
        { sentence: 'Both brothers-in-law are passers-by who witnessed the accident.', translation: 'Оба зятя - прохожие, которые стали свидетелями аварии.' }
      ],
      practice: [
        { type: 'heading', level: 2, content: 'Практика' },
        { type: 'text', content: '**Задание 1:** Образуйте множественное число:' },
        { type: 'code', content: 'mouse → ____\nclass → ____\ncountry → ____\nfoot → ____\nwatch → ____\ntomato → ____\nknife → ____\nbaby → ____\nphoto → ____\nsheep → ____\nwoman → ____\ntooth → ____\nbox → ____\ncity → ____\nhero → ____\nleaf → ____' },
        { type: 'text', content: '**Задание 2:** Исправьте ошибки:' },
        { type: 'list', items: [
          '✗ Three childs are playing. → ✓ __________',
          '✗ I have two foots. → ✓ __________',
          '✗ She bought two tomatos. → ✓ __________',
          '✗ There are many sheeps on the farm. → ✓ __________',
          '✗ We need two knifes. → ✓ __________'
        ]},
        { type: 'text', content: '**Задание 3:** Составьте предложения со следующими формами множественного числа:' },
        { type: 'list', items: [
          'men and women',
          'teeth and feet',
          'boxes and glasses',
          'children and mice',
          'analyses and crises'
        ]},
        { type: 'highlight', variant: 'tip', content: '→ **Совет:** Если сомневаетесь - проверьте тип окончания!' }
      ]
    },
  },
  {
    id: 3,
    title: 'Possessive Nouns',
    description: 'Притяжательные существительные',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Притяжательная форма существительных' },
        { type: 'text', content: 'Притяжательная форма существительных (possessive case) выражает принадлежность, владение или связь между предметами и людьми.' },
        { 
          type: 'highlight', 
          variant: 'info',
          content: '**Зачем это нужно?** Делает речь более естественной и экономной: вместо "the car of John" говорим "John\'s car"' 
        },
        { 
          type: 'highlight', 
          variant: 'warning',
          content: '⚠ **ВАЖНО:** Апостроф ставится ДО или ПОСЛЕ -s в зависимости от числа существительного!' 
        }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'ЕДИНСТВЕННОЕ число: добавляем \'S' },
          { type: 'formula', content: 'существительное + \'S' },
          { type: 'code', content: "John's car — машина Джона\nthe cat's tail — хвост кошки\nmy sister's friend — друг моей сестры\nthe teacher's desk — стол учителя\nLondon's streets — улицы Лондона" },
          { type: 'highlight', variant: 'success', content: '✓ Это самое распространённое правило!' }
        ],
        [
          { type: 'heading', level: 3, content: 'МНОЖЕСТВЕННОЕ число на -S: только АПОСТРОФ' },
          { type: 'text', content: 'Если существительное во множественном числе уже оканчивается на **-s**, добавляем только **\'**' },
          { type: 'formula', content: 'существительные на -s + \' (только апостроф!)' },
          { type: 'code', content: "the students' books — книги студентов\nmy parents' house — дом моих родителей\nthe girls' room — комната девочек\nthe teachers' lounge — комната отдыха учителей" },
          { type: 'highlight', variant: 'tip', content: '→ **НЕ пишите** students\'s — это ошибка!' }
        ],
        [
          { type: 'heading', level: 3, content: 'НЕПРАВИЛЬНЫЕ формы множественного числа: \'S' },
          { type: 'text', content: 'Если множественное число **НЕ** оканчивается на -s (irregular plurals), добавляем **\'s**' },
          { type: 'table', headers: ['Множественное число', 'Притяжательная форма', 'Пример'], rows: [
            ['children', "children's", "children's toys (игрушки детей)"],
            ['men', "men's", "men's clothes (мужская одежда)"],
            ['women', "women's", "women's rights (права женщин)"],
            ['people', "people's", "people's choice (выбор людей)"],
            ['mice', "mice's", "mice's cage (клетка мышей)"]
          ]},
          { type: 'formula', content: 'irregular plural + \'S' }
        ],
        [
          { type: 'heading', level: 3, content: 'Имена на -S: два варианта!' },
          { type: 'text', content: 'Для имён собственных, оканчивающихся на **-s**, существуют **ОБА** варианта:' },
          { type: 'comparison', items: [
            { label: "James's car", countable: '✓ более современный вариант', uncountable: 'произносится [джеймзиз]' },
            { label: "James' car", countable: '✓ традиционный вариант', uncountable: 'произносится [джеймз]' }
          ]},
          { type: 'code', content: "Charles's book = Charles' book\nJones's house = Jones' house\nDickens's novels = Dickens' novels" },
          { type: 'highlight', variant: 'info', content: '→ Оба варианта правильны! Выбирайте один стиль и придерживайтесь его' }
        ],
        [
          { type: 'heading', level: 3, content: 'СОСТАВНЫЕ существительные: \'S к последнему слову' },
          { type: 'text', content: 'В составных существительных **\'s** добавляется только к **последнему** слову:' },
          { type: 'code', content: "my mother-in-law's house — дом моей свекрови\nthe passer-by's comment — комментарий прохожего\nmy sister-in-law's car — машина моей золовки\nthe commander-in-chief's orders — приказы главнокомандующего" },
          { type: 'formula', content: 'составное слово + \'S (к последнему элементу)' }
        ],
        [
          { type: 'heading', level: 3, content: 'СОВМЕСТНОЕ vs РАЗДЕЛЬНОЕ владение' },
          { type: 'table', headers: ['Тип', 'Форма', 'Пример', 'Значение'], rows: [
            ['Совместное', "John and Mary's", "John and Mary's house", 'один общий дом'],
            ['Раздельное', "John's and Mary's", "John's and Mary's houses", 'у каждого свой дом']
          ]},
          { type: 'highlight', variant: 'warning', content: '⚠ **Обратите внимание:** house (ед.ч.) vs houses (мн.ч.) тоже указывает на тип владения!' },
          { type: 'code', content: "Tom and Jerry's apartment — их общая квартира\nTom's and Jerry's apartments — у каждого своя" }
        ],
        [
          { type: 'heading', level: 3, content: 'ВРЕМЯ и РАССТОЯНИЕ: используем \'S!' },
          { type: 'text', content: 'С выражениями **времени** и **расстояния** используется притяжательная форма:' },
          { type: 'code', content: "yesterday's news — вчерашние новости\ntoday's weather — сегодняшняя погода\ntomorrow's meeting — завтрашняя встреча\na week's holiday — недельный отпуск\ntwo weeks' vacation — двухнедельный отпуск\na mile's distance — расстояние в милю\nan hour's drive — час езды" },
          { type: 'highlight', variant: 'tip', content: '→ **НЕ говорите** "the news of yesterday" — это звучит неестественно!' }
        ],
        [
          { type: 'heading', level: 3, content: 'НЕОДУШЕВЛЁННЫЕ предметы: OF или \'S?' },
          { type: 'text', content: '**Правило:** С неодушевлёнными предметами обычно используем конструкцию **of**:' },
          { type: 'comparison', items: [
            { label: 'the leg of the table', countable: '✓ с предметами', uncountable: 'ножка стола' },
            { label: 'the end of the street', countable: '✓ с предметами', uncountable: 'конец улицы' },
            { label: "London's streets", countable: '✓ с местами/организациями', uncountable: 'улицы Лондона' },
            { label: "the company's policy", countable: '✓ с организациями', uncountable: 'политика компании' }
          ]},
          { type: 'highlight', variant: 'info', content: '→ НО названия мест, организаций, время, расстояние — используют \'s' }
        ],
        [
          { type: 'heading', level: 3, content: 'ОПУЩЕНИЕ существительного после \'S' },
          { type: 'text', content: 'После притяжательной формы существительное можно опустить, если понятно из контекста:' },
          { type: 'table', headers: ['Полная форма', 'Сокращённая форма', 'Перевод'], rows: [
            ["Let's meet at John's house", "Let's meet at John's", 'Встретимся у Джона'],
            ["I'm going to the doctor's office", "I'm going to the doctor's", 'Я иду к врачу'],
            ["She bought it at the butcher's shop", "She bought it at the butcher's", 'Она купила это в мясной лавке']
          ]},
          { type: 'highlight', variant: 'tip', content: '→ Часто используется с профессиями и местами' }
        ]
      ],
      examples: [
        { sentence: 'This is Peter\'s book, and that is his sister\'s notebook.', translation: 'Это книга Питера, а то - тетрадь его сестры.', highlight: true },
        { sentence: 'The children\'s room is clean, but the boys\' room is messy.', translation: 'Детская комната чистая, но комната мальчиков грязная.' },
        { sentence: 'My parents\' house is big, but my grandparents\' apartment is small.', translation: 'Дом моих родителей большой, но квартира моих бабушки и дедушки маленькая.' },
        { sentence: 'The dog\'s tail is long, and the cat\'s whiskers are white.', translation: 'Хвост собаки длинный, а усы кошки белые.' },
        { sentence: 'James\'s car is newer than Charles\' motorcycle.', translation: 'Машина Джеймса новее, чем мотоцикл Чарльза.' },
        { sentence: 'We\'re having dinner at my mother-in-law\'s tonight.', translation: 'Мы ужинаем у моей свекрови сегодня вечером.', highlight: true },
        { sentence: 'I read yesterday\'s newspaper and today\'s news online.', translation: 'Я прочитал вчерашнюю газету и сегодняшние новости онлайн.' },
        { sentence: 'The company\'s profits increased, but the employees\' salaries didn\'t.', translation: 'Прибыль компании выросла, но зарплаты сотрудников нет.' },
        { sentence: 'This is John and Mary\'s house, but these are John\'s and Mary\'s separate cars.', translation: 'Это дом Джона и Мэри (общий), но это раздельные машины Джона и Мэри.', highlight: true },
        { sentence: 'Women\'s fashion changes every season, unlike men\'s styles.', translation: 'Женская мода меняется каждый сезон, в отличие от мужских стилей.' },
        { sentence: 'Let\'s meet at John\'s around 7 PM.', translation: 'Давай встретимся у Джона около 7 вечера.' },
        { sentence: 'It\'s only a stone\'s throw from here — very close!', translation: 'Это совсем близко отсюда — буквально в двух шагах!' }
      ],
      practice: [
        { type: 'heading', level: 2, content: 'Практика' },
        { type: 'text', content: '**Задание 1:** Образуйте притяжательную форму:' },
        { type: 'code', content: 'the boy (toys) → ____\nthe girls (school) → ____\nJames (car) → ____\nthe mice (cage) → ____\nmy brother-in-law (office) → ____\nthe children (playground) → ____\nCharles (house) → ____\ntoday (meeting) → ____\nLondon (museums) → ____\nJohn and Sarah (wedding) → ____' },
        { type: 'text', content: '**Задание 2:** Исправьте ошибки:' },
        { type: 'list', items: [
          "✗ The students's books → ✓ __________",
          "✗ Womens' rights → ✓ __________",
          "✗ My mother in law's car → ✓ __________",
          "✗ John's and Mary's house (общий дом) → ✓ __________"
        ]},
        { type: 'text', content: '**Задание 3:** Выберите правильный вариант (of или \'s):' },
        { type: 'list', items: [
          '(the leg / the table) — the leg of the table или the table\'s leg?',
          '(yesterday / news) — yesterday\'s news или the news of yesterday?',
          '(the company / policy) — the company\'s policy или the policy of the company?',
          '(the door / the room) — the door of the room или the room\'s door?'
        ]},
        { type: 'highlight', variant: 'tip', content: '→ **Совет:** Запомните — время, расстояние, места, организации → используйте \'s!' }
      ]
    },
  },
  {
    id: 4,
    title: 'Personal Pronouns',
    description: 'Личные местоимения',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Личные местоимения в английском' },
        { type: 'text', content: 'Личные местоимения (personal pronouns) заменяют существительные в предложении, чтобы избежать повторений и сделать речь более естественной.' },
        { 
          type: 'highlight', 
          variant: 'info',
          content: '**Две формы местоимений:** Subject (подлежащее) и Object (дополнение)' 
        },
        { 
          type: 'highlight', 
          variant: 'warning',
          content: '⚠ **ВАЖНО:** Форма зависит от позиции в предложении!' 
        }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'ТАБЛИЦА личных местоимений' },
          { type: 'text', content: 'Полная таблица всех форм:' },
          { type: 'table', headers: ['Лицо', 'Subject (подлежащее)', 'Object (дополнение)', 'Перевод'], rows: [
            ['1 ед.ч.', 'I', 'me', 'я / меня, мне'],
            ['2 ед./мн.ч.', 'you', 'you', 'ты, вы / тебя, тебе, вас, вам'],
            ['3 ед.ч. муж.', 'he', 'him', 'он / его, ему'],
            ['3 ед.ч. жен.', 'she', 'her', 'она / её, ей'],
            ['3 ед.ч. ср.', 'it', 'it', 'оно / его, ему'],
            ['1 мн.ч.', 'we', 'us', 'мы / нас, нам'],
            ['3 мн.ч.', 'they', 'them', 'они / их, им']
          ]},
          { type: 'highlight', variant: 'info', content: '→ You и It не меняют форму!' }
        ],
        [
          { type: 'heading', level: 3, content: 'SUBJECT PRONOUNS (формы подлежащего)' },
          { type: 'text', content: '**Используются ПЕРЕД глаголом** как подлежащее предложения:' },
          { type: 'formula', content: 'Subject Pronoun + VERB' },
          { type: 'code', content: 'I go — я иду\nYou like — ты любишь\nHe works — он работает\nShe sings — она поёт\nIt runs — оно бежит\nWe study — мы учимся\nThey play — они играют' },
          { type: 'highlight', variant: 'success', content: '✓ Эти местоимения ВСЕГДА идут перед глаголом!' }
        ],
        [
          { type: 'heading', level: 3, content: 'OBJECT PRONOUNS (формы дополнения)' },
          { type: 'text', content: '**Используются ПОСЛЕ глагола** как дополнение:' },
          { type: 'formula', content: 'VERB + Object Pronoun' },
          { type: 'code', content: 'help me — помоги мне\nsee you — вижу тебя\nlove him — люблю его\ntell her — скажи ей\nread it — читаю это\ncall us — позвони нам\nknow them — знаю их' },
          { type: 'highlight', variant: 'tip', content: '→ Дополнение = кого? что? кому? чему?' }
        ],
        [
          { type: 'heading', level: 3, content: 'После ПРЕДЛОГОВ: всегда OBJECT!' },
          { type: 'text', content: '**ПРАВИЛО:** После любых предлогов используется форма дополнения:' },
          { type: 'table', headers: ['Предлог', 'Форма', 'Пример'], rows: [
            ['for', 'me/you/him/her', 'for me (для меня)'],
            ['with', 'us/them', 'with us (с нами)'],
            ['to', 'him/her', 'to her (ей)'],
            ['about', 'you/them', 'about them (о них)'],
            ['without', 'me/him', 'without him (без него)'],
            ['between', 'you and me', 'between you and me (между нами)']
          ]},
          { type: 'highlight', variant: 'warning', content: '! **НИКОГДА НЕ:** between you and I (ошибка!) → between you and me ✓' }
        ],
        [
          { type: 'heading', level: 3, content: 'После BE: формальное vs разговорное' },
          { type: 'comparison', items: [
            { label: 'Формально правильно', countable: 'It is I', uncountable: 'This is he' },
            { label: 'Разговорный вариант', countable: "It's me", uncountable: "This is him" }
          ]},
          { type: 'text', content: '**В современном английском почти всегда используется разговорный вариант:**' },
          { type: 'code', content: "Who's there? — It's me! (не It is I)\nWho did it? — It was him. (не It was he)" },
          { type: 'highlight', variant: 'tip', content: '→ В обычной речи используйте разговорные формы!' }
        ],
        [
          { type: 'heading', level: 3, content: 'В СРАВНЕНИЯХ: формальное vs разговорное' },
          { type: 'text', content: 'После **than** и **as** есть два варианта:' },
          { type: 'comparison', items: [
            { label: 'Формально', countable: 'He is taller than I am', uncountable: 'полное предложение с глаголом' },
            { label: 'Разговорное', countable: 'He is taller than me', uncountable: 'форма дополнения' }
          ]},
          { type: 'code', content: 'She runs faster than I do. (формально)\nShe runs faster than me. (разговорно) ✓\n\nYou are as smart as he is. (формально)\nYou are as smart as him. (разговорно) ✓' },
          { type: 'highlight', variant: 'info', content: '→ Оба варианта правильны, но разговорный чаще!' }
        ],
        [
          { type: 'heading', level: 3, content: 'IT — особое местоимение' },
          { type: 'text', content: '**IT используется для:**' },
          { type: 'list', items: [
            '**Предметов и животных:** The book is here. It is interesting.',
            '**Погоды:** It is cold. It\'s raining. It\'s sunny.',
            '**Времени:** It\'s 5 o\'clock. It\'s Monday. It\'s late.',
            '**Расстояния:** It\'s 10 km to the city. It\'s far from here.',
            '**Безличных конструкций:** It\'s difficult. It\'s important. It\'s possible.'
          ]},
          { type: 'highlight', variant: 'warning', content: '⚠ В английском НЕ опускайте IT в безличных предложениях!' },
          { type: 'code', content: '✓ It is cold today.\n✗ Is cold today. (ошибка!)' }
        ],
        [
          { type: 'heading', level: 3, content: 'THEY для одного человека (singular they)' },
          { type: 'text', content: 'В современном английском **they** может использоваться для **одного человека**, когда пол неизвестен или неважен:' },
          { type: 'code', content: 'Someone left their bag. They should come back for it.\nEverybody did their homework. They all passed.\nIf a student is late, they should apologize.' },
          { type: 'highlight', variant: 'info', content: '→ Это стандарт в современном английском!' }
        ],
        [
          { type: 'heading', level: 3, content: 'РАСПРОСТРАНЁННЫЕ ошибки' },
          { type: 'table', headers: ['Ошибка ✗', 'Правильно ✓', 'Объяснение'], rows: [
            ['Me and John went', 'John and I went', 'подлежащее = subject form'],
            ['Between you and I', 'Between you and me', 'после предлога = object'],
            ['He taller than I', 'He is taller than I am / than me', 'нужен глагол или object'],
            ['Is raining', "It's raining / It is raining", 'нужно IT'],
            ['Give to I', 'Give to me', 'после предлога = object']
          ]},
          { type: 'highlight', variant: 'warning', content: '! Эти ошибки делают даже продвинутые студенты — будьте внимательны!' }
        ]
      ],
      examples: [
        { sentence: 'I like him, but he doesn\'t like me. She knows about us.', translation: 'Он мне нравится, но я ему не нравлюсь. Она знает о нас.', highlight: true },
        { sentence: 'She gave it to them, and they thanked her for it.', translation: 'Она дала это им, и они поблагодарили её за это.' },
        { sentence: 'We know her very well, and she knows us too.', translation: 'Мы знаем её очень хорошо, и она тоже знает нас.' },
        { sentence: 'Tell us about your trip. We want to hear everything about it.', translation: 'Расскажи нам о своей поездке. Мы хотим услышать всё об этом.' },
        { sentence: 'He called me yesterday, but I couldn\'t talk to him.', translation: 'Он позвонил мне вчера, но я не мог с ним поговорить.' },
        { sentence: 'They invited us to their party, so we should bring something for them.', translation: 'Они пригласили нас на свою вечеринку, поэтому нам следует принести что-то для них.', highlight: true },
        { sentence: 'The book is interesting. It was written by a famous author. I enjoyed reading it.', translation: 'Книга интересная. Она была написана знаменитым автором. Мне понравилось её читать.' },
        { sentence: 'My sister and I went shopping. She bought a dress and I bought shoes. We spent a lot!', translation: 'Мы с сестрой ходили за покупками. Она купила платье, а я купила туфли. Мы много потратили!' },
        { sentence: 'Between you and me, I think he likes her more than she likes him.', translation: 'Между нами говоря, я думаю, он любит её больше, чем она его.', highlight: true },
        { sentence: 'Someone called for you. They said they would call back later.', translation: 'Кто-то звонил тебе. Они сказали, что перезвонят позже.' },
        { sentence: 'It\'s raining and it\'s cold. We should stay at home.', translation: 'Идёт дождь и холодно. Нам следует остаться дома.' },
        { sentence: 'Who\'s at the door? — It\'s me!', translation: 'Кто там у двери? — Это я!' }
      ],
      practice: [
        { type: 'heading', level: 2, content: 'Практика' },
        { type: 'text', content: '**Задание 1:** Выберите правильную форму:' },
        { type: 'code', content: '(I/me) like (he/him). → ____\n(She/her) called (we/us). → ____\nBetween you and (I/me). → ____\n(They/them) know (she/her). → ____\nIt was (I/me) who did it. → ____' },
        { type: 'text', content: '**Задание 2:** Замените существительные местоимениями:' },
        { type: 'list', items: [
          'John likes Mary. → __________ likes __________.',
          'Mary calls John. → __________ calls __________.',
          'We see the cat. → We see __________.',
          'The students know the teacher. → __________ know __________.',
          'Tell Tom and me about your plans. → Tell __________ about your plans.'
        ]},
        { type: 'text', content: '**Задание 3:** Исправьте ошибки:' },
        { type: 'code', content: '✗ Me and Sarah went shopping. → ✓ __________\n✗ Give this to I. → ✓ __________\n✗ Between he and I. → ✓ __________\n✗ Is cold today. → ✓ __________\n✗ She taller than I. → ✓ __________' },
        { type: 'highlight', variant: 'tip', content: '→ **Совет:** Перед глаголом = subject, после глагола/предлога = object!' }
      ]
    },
  },
  {
    id: 5,
    title: 'Possessive Pronouns',
    description: 'Притяжательные местоимения',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Притяжательные местоимения: две формы' },
        { type: 'text', content: 'Притяжательные местоимения (possessive pronouns) выражают принадлежность и существуют в **двух формах**:' },
        { 
          type: 'highlight', 
          variant: 'info',
          content: '**1. Possessive Determiners** (определители) — перед существительным\n**2. Possessive Pronouns** (самостоятельные) — вместо существительного' 
        },
        { 
          type: 'highlight', 
          variant: 'warning',
          content: '⚠ **ВАЖНО:** its (притяжательное) ≠ it\'s (it is)!' 
        }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'ТАБЛИЦА притяжательных местоимений' },
          { type: 'text', content: 'Полная таблица обеих форм:' },
          { type: 'table', headers: ['Лицо', 'Determiners (+ сущ.)', 'Pronouns (отдельно)', 'Перевод'], rows: [
            ['1 ед.ч.', 'my', 'mine', 'мой, моя, моё'],
            ['2 ед./мн.ч.', 'your', 'yours', 'твой, ваш'],
            ['3 ед.ч. муж.', 'his', 'his', 'его'],
            ['3 ед.ч. жен.', 'her', 'hers', 'её'],
            ['3 ед.ч. ср.', 'its', '—', 'его/её (неодуш.)'],
            ['1 мн.ч.', 'our', 'ours', 'наш, наша, наше'],
            ['3 мн.ч.', 'their', 'theirs', 'их']
          ]},
          { type: 'highlight', variant: 'info', content: '→ His не меняется! Its не имеет самостоятельной формы.' }
        ],
        [
          { type: 'heading', level: 3, content: 'POSSESSIVE DETERMINERS (перед существительным)' },
          { type: 'text', content: '**ВСЕГДА стоят ПЕРЕД существительным:**' },
          { type: 'formula', content: 'Determiner + NOUN' },
          { type: 'code', content: 'my book — моя книга\nyour house — твой дом\nhis car — его машина\nher cat — её кошка\nits tail — его/её хвост\nour teacher — наш учитель\ntheir friends — их друзья' },
          { type: 'highlight', variant: 'warning', content: '! **НЕ используйте** артикли: my book (НЕ the my book)' }
        ],
        [
          { type: 'heading', level: 3, content: 'POSSESSIVE PRONOUNS (самостоятельные)' },
          { type: 'text', content: '**Используются ВМЕСТО существительного, без существительного после:**' },
          { type: 'formula', content: 'Pronoun (без существительного)' },
          { type: 'code', content: 'This book is mine. — Эта книга моя.\nThe house is yours. — Дом твой.\nThe car is his. — Машина его.\nThe cat is hers. — Кошка её.\nThe idea is ours. — Идея наша.\nThe victory is theirs. — Победа их.' },
          { type: 'highlight', variant: 'tip', content: '→ Помогают избежать повторений: my book → mine' }
        ],
        [
          { type: 'heading', level: 3, content: 'ITS vs IT\'S — критичная разница!' },
          { type: 'comparison', items: [
            { label: 'its', countable: 'притяжательное (БЕЗ апострофа)', uncountable: 'его/её принадлежность' },
            { label: "it's", countable: 'сокращение it is (С апострофом)', uncountable: 'это есть / это' }
          ]},
          { type: 'code', content: "✓ The dog wagged its tail. (его хвост)\n✓ It's a beautiful day. (это красивый день)\n\n✗ The cat lost it's collar. (ОШИБКА!)\n✓ The cat lost its collar. (правильно)" },
          { type: 'highlight', variant: 'warning', content: '! Это одна из самых частых ошибок даже у носителей!' }
        ],
        [
          { type: 'heading', level: 3, content: 'HIS — особый случай' },
          { type: 'text', content: '**His** остаётся неизменным в обеих формах:' },
          { type: 'code', content: 'his book — его книга (determiner)\nThe book is his. — Книга его. (pronoun)\n\nhis idea = the idea is his' },
          { type: 'highlight', variant: 'info', content: '→ Единственное местоимение, которое не меняет форму!' }
        ],
        [
          { type: 'heading', level: 3, content: 'Вопросы с WHOSE (чей?)' },
          { type: 'text', content: 'На вопрос **Whose** можно ответить обеими формами:' },
          { type: 'table', headers: ['Вопрос', 'Ответ с determiner', 'Ответ с pronoun'], rows: [
            ['Whose book is this?', "It's my book.", "It's mine."],
            ['Whose car is that?', "It's her car.", "It's hers."],
            ['Whose keys are these?', 'They\'re our keys.', 'They\'re ours.']
          ]},
          { type: 'highlight', variant: 'tip', content: '→ Самостоятельная форма короче и естественнее!' }
        ],
        [
          { type: 'heading', level: 3, content: 'С ЧАСТЯМИ ТЕЛА — используем притяжательные!' },
          { type: 'text', content: 'В английском с частями тела используются **притяжательные местоимения**, а НЕ артикли:' },
          { type: 'comparison', items: [
            { label: '✓ Правильно', countable: 'I hurt my arm', uncountable: 'притяжательное местоимение' },
            { label: '✗ Неправильно', countable: 'I hurt the arm', uncountable: 'артикль (по-русски)' }
          ]},
          { type: 'code', content: '✓ She opened her eyes.\n✓ He broke his leg.\n✓ They washed their hands.\n✓ I brush my teeth.\n\n✗ She opened the eyes. (ошибка!)' },
          { type: 'highlight', variant: 'warning', content: '! Это отличается от русского языка!' }
        ],
        [
          { type: 'heading', level: 3, content: 'Конструкция A FRIEND OF MINE' },
          { type: 'text', content: 'Устойчивая конструкция для "один из моих..."' },
          { type: 'formula', content: 'A/AN + существительное + OF + притяжательное местоимение' },
          { type: 'code', content: 'a friend of mine — один из моих друзей\na colleague of hers — один из её коллег\na relative of ours — один из наших родственников\nan idea of his — одна из его идей\na book of yours — одна из твоих книг' },
          { type: 'highlight', variant: 'tip', content: '→ НЕ говорите "a my friend" — это ошибка!' }
        ],
        [
          { type: 'heading', level: 3, content: 'БЕЗ АРТИКЛЕЙ после притяжательных!' },
          { type: 'text', content: '**ВАЖНОЕ ПРАВИЛО:** Притяжательные местоимения заменяют артикли:' },
          { type: 'table', headers: ['Ошибка ✗', 'Правильно ✓'], rows: [
            ['the my book', 'my book'],
            ['a our house', 'our house'],
            ['an her idea', 'her idea'],
            ['the their car', 'their car']
          ]},
          { type: 'highlight', variant: 'warning', content: '⚠ Нельзя использовать артикль + притяжательное местоимение вместе!' }
        ],
        [
          { type: 'heading', level: 3, content: 'РАСПРОСТРАНЁННЫЕ ошибки' },
          { type: 'table', headers: ['Ошибка ✗', 'Правильно ✓', 'Объяснение'], rows: [
            ["The dog lost it's toy", 'The dog lost its toy', 'its без апострофа!'],
            ['This is my book. That is you.', 'This is my book. That is yours.', 'нужна самостоятельная форма'],
            ['The my car is red', 'My car is red', 'не нужен артикль'],
            ['A my friend called', 'A friend of mine called', 'используйте of mine'],
            ['I hurt the hand', 'I hurt my hand', 'с частями тела — притяжательное']
          ]},
          { type: 'highlight', variant: 'warning', content: '! Будьте особенно внимательны с its/it\'s!' }
        ]
      ],
      examples: [
        { sentence: 'This is my car, and that is yours. His car is newer than mine.', translation: 'Это моя машина, а та - твоя. Его машина новее, чем моя.', highlight: true },
        { sentence: 'Her house is bigger than ours, but their house is the biggest.', translation: 'Её дом больше нашего, но их дом самый большой.' },
        { sentence: 'Is this pen yours or his? Mine is on the table.', translation: 'Эта ручка твоя или его? Моя на столе.' },
        { sentence: 'Their garden is beautiful, but I prefer mine. Hers is too small.', translation: 'Их сад красивый, но я предпочитаю свой. Её слишком маленький.' },
        { sentence: 'The dog wagged its tail when it saw its owner.', translation: 'Собака завиляла хвостом, когда увидела своего хозяина.', highlight: true },
        { sentence: 'I forgot my umbrella. Can I borrow yours?', translation: 'Я забыл свой зонт. Могу я одолжить твой?' },
        { sentence: 'Our team won, but theirs played better. Your team didn\'t even show up!', translation: 'Наша команда выиграла, но их играла лучше. Ваша команда даже не появилась!' },
        { sentence: 'A friend of mine recommended this restaurant. A colleague of hers works here.', translation: 'Один мой друг рекомендовал этот ресторан. Один её коллега здесь работает.', highlight: true },
        { sentence: 'Whose keys are these? They\'re not mine, maybe they\'re yours.', translation: 'Чьи это ключи? Они не мои, может быть, они твои.' },
        { sentence: 'My parents live in London, and his parents live in Paris. Hers live in Rome.', translation: 'Мои родители живут в Лондоне, его родители живут в Париже. Её живут в Риме.' },
        { sentence: 'She closed her eyes and held her breath.', translation: 'Она закрыла глаза и задержала дыхание.' },
        { sentence: 'It\'s a beautiful day, and the cat is licking its paws in the sun.', translation: 'Прекрасный день, и кошка лижет свои лапы на солнце.' }
      ],
      practice: [
        { type: 'heading', level: 2, content: 'Практика' },
        { type: 'text', content: '**Задание 1:** Заполните пропуски правильной формой:' },
        { type: 'code', content: 'This is ____ (I) book. The book is ____ (I).\nThat\'s ____ (they) car. The car is ____ (they).\nIs this ____ (you) pen? Yes, it\'s ____ (I).\n____ (she) house is bigger than ____ (we).\nThe cat licked ____ (it) paws.' },
        { type: 'text', content: '**Задание 2:** Исправьте ошибки:' },
        { type: 'list', items: [
          "✗ The dog lost it's collar. → ✓ __________",
          '✗ The my car is red. → ✓ __________',
          '✗ A my friend called me. → ✓ __________',
          '✗ This book is my. → ✓ __________',
          '✗ I hurt the arm. → ✓ __________'
        ]},
        { type: 'text', content: '**Задание 3:** Выберите правильный вариант:' },
        { type: 'code', content: 'Is this (your/yours) phone? → ____\nThe house is (our/ours). → ____\nA friend of (me/mine) called. → ____\n(It\'s/Its) raining today. → ____\nThe bird hurt (it\'s/its) wing. → ____' },
        { type: 'text', content: '**Задание 4:** Переведите на английский:' },
        { type: 'list', items: [
          'Это моя книга, а та — твоя. → __________',
          'Собака виляет хвостом. → __________',
          'Один мой друг живёт в Лондоне. → __________',
          'Я закрыл глаза. → __________'
        ]},
        { type: 'highlight', variant: 'tip', content: '→ **Совет:** Перед существительным = determiner, отдельно = pronoun!' }
      ]
    },
  },
  {
    id: 6,
    title: 'Reflexive Pronouns',
    description: 'Возвратные местоимения',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Возвратные местоимения в английском' },
        { type: 'text', content: 'Возвратные местоимения (reflexive pronouns) используются когда действие направлено на само подлежащее — субъект и объект действия одно лицо.' },
        { 
          type: 'highlight', 
          variant: 'info',
          content: '**Образование:** Личное/притяжательное местоимение + **-self** (ед.ч.) / **-selves** (мн.ч.)' 
        },
        { 
          type: 'highlight', 
          variant: 'warning',
          content: '⚠ **ДВА использования:** Возвратное действие + Усиление (эмфаза)' 
        }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'ТАБЛИЦА возвратных местоимений' },
          { type: 'table', headers: ['Лицо', 'Местоимение', 'Возвратное', 'Перевод'], rows: [
            ['1 ед.ч.', 'I', 'myself', 'я сам/сама, себя'],
            ['2 ед.ч.', 'you', 'yourself', 'ты сам/сама, себя'],
            ['3 ед.ч. муж.', 'he', 'himself', 'он сам, себя'],
            ['3 ед.ч. жен.', 'she', 'herself', 'она сама, себя'],
            ['3 ед.ч. ср.', 'it', 'itself', 'оно само, себя'],
            ['1 мн.ч.', 'we', 'ourselves', 'мы сами, себя'],
            ['2 мн.ч.', 'you', 'yourselves', 'вы сами, себя'],
            ['3 мн.ч.', 'they', 'themselves', 'они сами, себя']
          ]},
          { type: 'highlight', variant: 'tip', content: '→ Обратите внимание: your**self** (ед.ч.) vs your**selves** (мн.ч.)' }
        ],
        [
          { type: 'heading', level: 3, content: 'ВОЗВРАТНОЕ ДЕЙСТВИЕ (reflexive action)' },
          { type: 'text', content: 'Когда подлежащее и дополнение — **ОДНО И ТО ЖЕ** лицо:' },
          { type: 'formula', content: 'Subject + VERB + reflexive pronoun' },
          { type: 'code', content: 'I cut myself. — Я порезался (сам себя).\nShe looked at herself. — Она посмотрела на себя.\nHe hurt himself. — Он ушибся.\nWe enjoyed ourselves. — Мы хорошо провели время.\nThey introduced themselves. — Они представились.' },
          { type: 'highlight', variant: 'info', content: '→ Действие возвращается к тому, кто его совершает' }
        ],
        [
          { type: 'heading', level: 3, content: 'УСИЛЕНИЕ / ЭМФАЗА (emphasis)' },
          { type: 'text', content: 'Для подчёркивания, что действие выполнено **ИМЕННО ЭТИМ** лицом:' },
          { type: 'code', content: 'I myself saw it. — Я САМ это видел.\nThe president himself came. — САМ президент пришёл.\nShe herself cooked dinner. — Она САМА приготовила ужин.\nWe ourselves built the house. — Мы САМИ построили дом.' },
          { type: 'highlight', variant: 'tip', content: '→ Можно убрать без изменения основного смысла предложения' }
        ],
        [
          { type: 'heading', level: 3, content: 'BY + ВОЗВРАТНОЕ МЕСТОИМЕНИЕ = "сам, без помощи"' },
          { type: 'text', content: '**BY + reflexive = самостоятельно, без посторонней помощи:**' },
          { type: 'table', headers: ['Конструкция', 'Значение', 'Пример'], rows: [
            ['by myself', 'сам, один', 'I did it by myself.'],
            ['by yourself', 'сам (ты)', 'Can you do it by yourself?'],
            ['by himself/herself', 'сам/сама', 'She lives by herself.'],
            ['by ourselves', 'сами (мы)', 'We built it by ourselves.'],
            ['by themselves', 'сами (они)', 'They fixed it by themselves.']
          ]},
          { type: 'code', content: 'He did it by himself. — Он сделал это сам.\nShe lives by herself. — Она живёт одна.\nI prefer working by myself. — Я предпочитаю работать один.' }
        ],
        [
          { type: 'heading', level: 3, content: 'Глаголы, где возвратное ОПЦИОНАЛЬНО' },
          { type: 'text', content: 'После этих глаголов возвратное местоимение **можно опустить:**' },
          { type: 'list', items: [
            '**wash** — He washed (himself).',
            '**shave** — He shaved (himself).',
            '**dress** — She dressed (herself) quickly.',
            '**shower** — I showered (myself) and left.',
            '**change** — He changed (himself) and went out.'
          ]},
          { type: 'highlight', variant: 'info', content: '→ Можно добавить для усиления, но обычно опускают' }
        ],
        [
          { type: 'heading', level: 3, content: 'Глаголы БЕЗ возвратных местоимений!' },
          { type: 'text', content: '**ВАЖНО:** Эти глаголы **НЕ** используются с возвратными местоимениями:' },
          { type: 'table', headers: ['Глагол', 'Правильно ✓', 'Неправильно ✗'], rows: [
            ['feel', 'I feel good', 'I feel myself good ✗'],
            ['relax', 'He relaxed', 'He relaxed himself ✗'],
            ['concentrate', 'She concentrated', 'She concentrated herself ✗'],
            ['meet', 'We met at 5 PM', 'We met ourselves ✗'],
            ['afford', 'I can afford it', 'I can afford myself it ✗'],
            ['complain', 'They complain', 'They complain themselves ✗']
          ]},
          { type: 'highlight', variant: 'warning', content: '⚠ Это распространённая ошибка — избегайте её!' }
        ],
        [
          { type: 'heading', level: 3, content: 'УСТОЙЧИВЫЕ выражения' },
          { type: 'text', content: 'Часто используемые фразы с возвратными местоимениями:' },
          { type: 'code', content: 'Help yourself! — Угощайтесь!\nHelp yourselves! — Угощайтесь! (мн.ч.)\nEnjoy yourself! — Хорошо проведи время!\nBehave yourself! — Веди себя хорошо!\nBe yourself! — Будь собой!\nMake yourself at home! — Чувствуй себя как дома!\nTalk to yourself — Разговаривать с самим собой\nThink to yourself — Думать про себя' },
          { type: 'highlight', variant: 'tip', content: '→ Эти выражения нужно запомнить!' }
        ],
        [
          { type: 'heading', level: 3, content: 'REFLEXIVE vs EACH OTHER — критичная разница!' },
          { type: 'comparison', items: [
            { label: 'REFLEXIVE (себя)', countable: 'каждый сам на/для себя', uncountable: 'They looked at themselves' },
            { label: 'EACH OTHER (друг друга)', countable: 'взаимное действие', uncountable: 'They looked at each other' }
          ]},
          { type: 'code', content: 'They love themselves. — Они любят себя (самолюбивые).\nThey love each other. — Они любят друг друга. ✓\n\nWe talked to ourselves. — Мы разговаривали сами с собой.\nWe talked to each other. — Мы разговаривали друг с другом. ✓' },
          { type: 'highlight', variant: 'warning', content: '! Значение кардинально меняется!' }
        ],
        [
          { type: 'heading', level: 3, content: 'РАСПРОСТРАНЁННЫЕ ошибки' },
          { type: 'table', headers: ['Ошибка ✗', 'Правильно ✓', 'Объяснение'], rows: [
            ['I feel myself good', 'I feel good', 'feel не нужно reflexive'],
            ['They met themselves', 'They met (each other)', 'meet не нужно reflexive'],
            ['We enjoyed us', 'We enjoyed ourselves', 'неправильная форма'],
            ['He cut hisself', 'He cut himself', 'неправильная форма'],
            ['I want to relax myself', 'I want to relax', 'relax не нужно reflexive']
          ]},
          { type: 'highlight', variant: 'warning', content: '⚠ Будьте внимательны с глаголами, которые НЕ требуют возвратных!' }
        ]
      ],
      examples: [
        { sentence: 'She looked at herself in the mirror and smiled.', translation: 'Она посмотрела на себя в зеркало и улыбнулась.', highlight: true },
        { sentence: 'We enjoyed ourselves at the party last night.', translation: 'Мы хорошо провели время на вечеринке прошлым вечером.' },
        { sentence: 'He made dinner by himself because his wife was away.', translation: 'Он приготовил ужин сам, потому что его жены не было.', highlight: true },
        { sentence: 'Did you hurt yourself when you fell?', translation: 'Ты ушибся, когда упал?' },
        { sentence: 'The children behaved themselves during the lesson.', translation: 'Дети хорошо вели себя во время урока.' },
        { sentence: 'I taught myself to play the guitar using online tutorials.', translation: 'Я научился играть на гитаре сам, используя онлайн-уроки.' },
        { sentence: 'She talks to herself when she is nervous.', translation: 'Она разговаривает сама с собой, когда нервничает.' },
        { sentence: 'Help yourselves to some coffee and cookies!', translation: 'Угощайтесь кофе и печеньем!', highlight: true },
        { sentence: 'The CEO himself answered my email, which was surprising.', translation: 'Сам генеральный директор ответил на мой email, что было удивительно.' },
        { sentence: 'They built the house themselves without any professional help.', translation: 'Они построили дом сами без какой-либо профессиональной помощи.' },
        { sentence: 'Be yourself and don\'t try to impress everyone.', translation: 'Будь собой и не пытайся всех впечатлить.' },
        { sentence: 'Make yourself at home while I prepare dinner.', translation: 'Чувствуй себя как дома, пока я готовлю ужин.' }
      ],
      practice: [
        { type: 'heading', level: 2, content: 'Практика' },
        { type: 'text', content: '**Задание 1:** Вставьте правильное возвратное местоимение:' },
        { type: 'code', content: 'I taught ____ English.\nShe cut ____ while cooking.\nWe enjoyed ____ at the concert.\nDid he hurt ____?\nThe cat washed ____.\nHelp ____ to some food!\nChildren, behave ____!' },
        { type: 'text', content: '**Задание 2:** Reflexive или Each Other?'},
        { type: 'list', items: [
          'They love ____. (друг друга)',
          'They looked at ____ in the mirror. (себя)',
          'We talked to ____ all night. (друг с другом)',
          'He always talks to ____. (сам с собой)',
          'The children introduced ____ to the teacher. (представились)'
        ]},
        { type: 'text', content: '**Задание 3:** Исправьте ошибки:' },
        { type: 'code', content: '✗ I feel myself good today. → ✓ __________\n✗ They met themselves at the cafe. → ✓ __________\n✗ He cut hisself shaving. → ✓ __________\n✗ She wants to relax herself. → ✓ __________\n✗ We enjoyed us at the party. → ✓ __________' },
        { type: 'text', content: '**Задание 4:** Переведите:' },
        { type: 'list', items: [
          'Я сделал это сам (без помощи). → __________',
          'Угощайтесь! → __________',
          'Будь собой! → __________',
          'Она живёт одна. → __________'
        ]},
        { type: 'highlight', variant: 'tip', content: '→ **Совет:** Проверьте, нужно ли возвратное местоимение для этого глагола!' }
      ]
    },
  },
  {
    id: 7,
    title: 'Relative Pronouns: Who, Which, That',
    description: 'Относительные местоимения',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Относительные местоимения в английском' },
        { type: 'text', content: 'Относительные местоимения (relative pronouns) соединяют придаточные определительные предложения с главным, помогая избежать повторений и сделать речь более естественной.' },
        { 
          type: 'highlight', 
          variant: 'info',
          content: '**Пять основных:** who, which, that, whose, whom' 
        },
        { 
          type: 'highlight', 
          variant: 'warning',
          content: '⚠ **ВАЖНО:** Выбор зависит от того, к чему относится (люди/предметы) и функции в предложении!' 
        }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'ТАБЛИЦА относительных местоимений' },
          { type: 'table', headers: ['Местоимение', 'Для кого/чего', 'Функция', 'Пример'], rows: [
            ['who', 'люди', 'подлежащее/дополнение', 'The man who lives here'],
            ['which', 'вещи/животные', 'подлежащее/дополнение', 'The book which I read'],
            ['that', 'люди/вещи', 'подлежащее/дополнение', 'The car that I bought'],
            ['whose', 'люди/вещи', 'принадлежность', 'The man whose car...'],
            ['whom', 'люди (формально)', 'дополнение', 'The person whom I met']
          ]},
          { type: 'highlight', variant: 'info', content: '→ That — универсальное, более разговорное' }
        ],
        [
          { type: 'heading', level: 3, content: 'WHO — для ЛЮДЕЙ' },
          { type: 'text', content: '**Используется для людей** в роли подлежащего или дополнения:' },
          { type: 'formula', content: 'The person + WHO + verb/clause' },
          { type: 'code', content: 'ПОДЛЕЖАЩЕЕ:\nThe man who lives here is a teacher.\nThe woman who called is my friend.\n\nДОПОЛНЕНИЕ:\nThe person who I met was kind.\nThe girl who you saw is my sister.' },
          { type: 'highlight', variant: 'success', content: '✓ Who — самое распространённое для людей!' }
        ],
        [
          { type: 'heading', level: 3, content: 'WHICH — для ВЕЩЕЙ и ЖИВОТНЫХ' },
          { type: 'text', content: '**Используется для вещей, животных и абстрактных понятий:**' },
          { type: 'code', content: 'The book which I read was interesting.\nThe dog which barked is my neighbor\'s.\nThe idea which you suggested is brilliant.\nThe car which he bought is expensive.' },
          { type: 'highlight', variant: 'tip', content: '→ Никогда не используйте which для людей!' }
        ],
        [
          { type: 'heading', level: 3, content: 'THAT — УНИВЕРСАЛЬНОЕ (люди + вещи)' },
          { type: 'text', content: '**That можно использовать вместо who и which:**' },
          { type: 'comparison', items: [
            { label: 'С людьми', countable: 'The man that called', uncountable: 'вместо who' },
            { label: 'С вещами', countable: 'The book that I read', uncountable: 'вместо which' }
          ]},
          { type: 'text', content: '**ОБЯЗАТЕЛЬНО that после:**' },
          { type: 'list', items: [
            '**the only:** He\'s the only person that understands me',
            '**the first/last:** This is the first book that I read',
            '**превосходная степень:** It\'s the best film that I\'ve seen',
            '**all, everything, nothing, something:** Everything that he said was true'
          ]},
          { type: 'highlight', variant: 'warning', content: '! That более разговорное, чем who/which' }
        ],
        [
          { type: 'heading', level: 3, content: 'WHOSE — для ПРИНАДЛЕЖНОСТИ (чей/чья/чьё)' },
          { type: 'text', content: '**Выражает принадлежность:**' },
          { type: 'formula', content: 'noun + WHOSE + noun + verb' },
          { type: 'code', content: 'The man whose car was stolen called the police.\nThe girl whose mother is a doctor studies medicine.\nThe house whose roof was damaged needs repair.\nI know a person whose job is very interesting.' },
          { type: 'table', headers: ['С людьми', 'С вещами'], rows: [
            ['The man whose wife...', 'The house whose roof...'],
            ['The student whose book...', 'The company whose profits...']
          ]},
          { type: 'highlight', variant: 'tip', content: '→ Whose работает и с людьми, и с вещами!' }
        ],
        [
          { type: 'heading', level: 3, content: 'WHOM — ФОРМАЛЬНАЯ форма (кого/кому)' },
          { type: 'text', content: '**Формальная форма для дополнения (только для людей):**' },
          { type: 'comparison', items: [
            { label: 'Формально', countable: 'The person whom I met', uncountable: 'письменная речь' },
            { label: 'Разговорно', countable: 'The person who I met', uncountable: 'обычная речь' }
          ]},
          { type: 'code', content: 'ФОРМАЛЬНО:\nThe person whom I spoke to was helpful.\nThe woman whom you saw is my teacher.\n\nРАЗГОВОРНО (чаще):\nThe person who I spoke to was helpful.\nThe woman who you saw is my teacher.' },
          { type: 'highlight', variant: 'info', content: '→ В разговорной речи почти всегда используют who!' }
        ],
        [
          { type: 'heading', level: 3, content: 'DEFINING vs NON-DEFINING clauses' },
          { type: 'text', content: '**Два типа придаточных предложений:**' },
          { type: 'table', headers: ['Тип', 'Запятые', 'Значение', 'That?'], rows: [
            ['Defining', 'БЕЗ запятых', 'важная информация', 'можно'],
            ['Non-defining', 'С ЗАПЯТЫМИ', 'доп. информация', 'НЕЛЬЗЯ']
          ]},
          { type: 'code', content: 'DEFINING (без запятых):\nThe book that I need is on the shelf.\nThe man who called is my friend.\n→ Нельзя убрать — потеряется смысл\n\nNON-DEFINING (с запятыми):\nMy brother, who lives in London, is a doctor.\nThis book, which I bought yesterday, is great.\n→ Можно убрать — основной смысл сохранится' },
          { type: 'highlight', variant: 'warning', content: '⚠ В non-defining НЕЛЬЗЯ использовать that!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ОПУЩЕНИЕ относительных местоимений' },
          { type: 'text', content: '**В defining clauses можно опустить who/which/that, если они ДОПОЛНЕНИЯ:**' },
          { type: 'comparison', items: [
            { label: 'С местоимением', countable: 'The book which I read', uncountable: 'полная форма' },
            { label: 'Без местоимения', countable: 'The book I read', uncountable: 'сокращённая ✓' }
          ]},
          { type: 'code', content: '✓ The book (which/that) I read was good.\n✓ The person (who/that) I met was nice.\n✓ The car (which/that) he bought is new.\n\n✗ The man who called... (НЕЛЬЗЯ опустить!)\n→ who = подлежащее, не дополнение' },
          { type: 'highlight', variant: 'warning', content: '! Опускать можно ТОЛЬКО если местоимение — дополнение!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ПРЕДЛОГИ с относительными местоимениями' },
          { type: 'text', content: '**Предлоги могут стоять В КОНЦЕ или ПЕРЕД местоимением:**' },
          { type: 'comparison', items: [
            { label: 'Разговорный вариант', countable: 'предлог в конце', uncountable: 'The person who I spoke to' },
            { label: 'Формальный вариант', countable: 'предлог перед whom', uncountable: 'The person to whom I spoke' }
          ]},
          { type: 'code', content: 'РАЗГОВОРНО (предлог в конце):\nThe house which I live in is old.\nThe person who I work with is nice.\nThe topic that we talked about was interesting.\n\nФОРМАЛЬНО (предлог перед whom/which):\nThe house in which I live is old.\nThe person with whom I work is nice.\nThe topic about which we talked was interesting.' },
          { type: 'highlight', variant: 'tip', content: '→ Разговорный вариант более естественный!' }
        ],
        [
          { type: 'heading', level: 3, content: 'WHERE и WHEN — для места и времени' },
          { type: 'text', content: '**Where (где) и when (когда) тоже вводят relative clauses:**' },
          { type: 'table', headers: ['Слово', 'Использование', 'Пример'], rows: [
            ['where', 'место', 'The place where I was born'],
            ['when', 'время', 'The day when we met'],
            ['why', 'причина', 'The reason why I left']
          ]},
          { type: 'code', content: 'WHERE:\nThis is the house where I grew up.\nThe restaurant where we ate was expensive.\n\nWHEN:\nI remember the day when I met her.\nThat was the year when I graduated.\n\nWHY:\nThat\'s the reason why I called you.' },
          { type: 'highlight', variant: 'info', content: '→ Можно заменить: where = in which, when = on which' }
        ]
      ],
      examples: [
        { sentence: 'The woman who called you yesterday is my sister.', translation: 'Женщина, которая звонила тебе вчера, — моя сестра.', highlight: true },
        { sentence: 'This is the house which we want to buy next year.', translation: 'Это дом, который мы хотим купить в следующем году.' },
        { sentence: 'I like people that are honest and straightforward.', translation: 'Мне нравятся люди, которые честны и прямолинейны.' },
        { sentence: 'The man whose dog bit me should pay for my medical bills.', translation: 'Мужчина, чья собака меня укусила, должен оплатить мои медицинские счета.', highlight: true },
        { sentence: 'My best friend, who lives in Paris, is coming to visit me.', translation: 'Мой лучший друг, который живёт в Париже, приезжает навестить меня.' },
        { sentence: 'That\'s the restaurant where we had our first date.', translation: 'Это ресторан, где у нас было первое свидание.' },
        { sentence: 'She\'s the first person that has ever understood me.', translation: 'Она первый человек, который когда-либо меня понимал.', highlight: true },
        { sentence: 'The book I borrowed from you is really interesting.', translation: 'Книга, которую я одолжил у тебя, действительно интересная.' },
        { sentence: 'The people with whom I work are very friendly.', translation: 'Люди, с которыми я работаю, очень дружелюбны.' },
        { sentence: 'I\'ll never forget the day when I graduated from university.', translation: 'Я никогда не забуду день, когда я окончил университет.' },
        { sentence: 'This is the most beautiful place that I have ever visited.', translation: 'Это самое красивое место, которое я когда-либо посещал.', highlight: true },
        { sentence: 'The person whom you need to contact is Mr. Brown, who works in the office.', translation: 'Человек, с которым вам нужно связаться, — мистер Браун, который работает в офисе.' }
      ],
      practice: [
        { type: 'heading', level: 2, content: 'Практика' },
        { type: 'text', content: '**Задание 1:** Выберите правильное местоимение (who/which/that/whose/whom):' },
        { type: 'code', content: 'The man ____ lives next door is a doctor.\nThe book ____ I read was boring.\nThe woman ____ car was stolen called the police.\nThe person ____ I spoke to was very helpful.\nThis is the best film ____ I have ever seen.' },
        { type: 'text', content: '**Задание 2:** Соедините предложения, используя относительные местоимения:' },
        { type: 'list', items: [
          'The girl is my friend. She speaks French. → __________',
          'The book is on the table. I bought it yesterday. → __________',
          'The man called me. His car was stolen. → __________',
          'The hotel was expensive. We stayed there. → __________'
        ]},
        { type: 'text', content: '**Задание 3:** Определите тип (defining/non-defining) и расставьте запятые:' },
        { type: 'code', content: 'My brother who lives in London is a doctor.\nThe book that I need is on the shelf.\nMary who is my best friend called me.\nThe car which he bought is red.' },
        { type: 'text', content: '**Задание 4:** Где можно опустить относительное местоимение?:' },
        { type: 'list', items: [
          'The book which I read was good. → __________',
          'The man who called is my friend. → __________',
          'The car that he bought is new. → __________',
          'The woman who lives here is a teacher. → __________'
        ]},
        { type: 'highlight', variant: 'tip', content: '→ **Совет:** Для людей — who/that, для вещей — which/that, для принадлежности — whose!' }
      ]
    },
  },
  {
    id: 8,
    title: 'Articles: A and An',
    description: 'Неопределённые артикли',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Неопределённые артикли A и AN' },
        { type: 'text', content: 'Неопределённые артикли a и an — одни из самых частотных слов в английском. Используются с исчисляемыми существительными в единственном числе.' },
        { 
          type: 'highlight', 
          variant: 'warning',
          content: '**КЛЮЧЕВОЕ ПРАВИЛО:** Выбор a/an зависит НЕ от буквы, а от **ЗВУКА**!' 
        },
        { 
          type: 'highlight', 
          variant: 'info',
          content: '**Значение:** "один из многих" или "любой представитель группы"' 
        }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'A — перед СОГЛАСНЫМ звуком' },
          { type: 'formula', content: 'A + слово с согласным ЗВУКОМ' },
          { type: 'code', content: 'a cat — кошка\na book — книга\na house — дом\na dog — собака\na car — машина' },
          { type: 'text', content: '**ВАЖНО:** Смотрим на ЗВУК, не на букву:' },
          { type: 'table', headers: ['Слово', 'Артикль', 'Почему?'], rows: [
            ['university', 'a university', 'звук [j] — согласный'],
            ['European', 'a European', 'звук [j] — согласный'],
            ['one-way street', 'a one-way street', 'звук [w] — согласный'],
            ['useful tool', 'a useful tool', 'звук [j] — согласный']
          ]},
          { type: 'highlight', variant: 'tip', content: '→ Слушайте первый ЗВУК, не смотрите на букву!' }
        ],
        [
          { type: 'heading', level: 3, content: 'AN — перед ГЛАСНЫМ звуком' },
          { type: 'formula', content: 'AN + слово с гласным ЗВУКОМ' },
          { type: 'code', content: 'an apple — яблоко\nan elephant — слон\nan idea — идея\nan orange — апельсин\nan umbrella — зонт' },
          { type: 'text', content: '**ВАЖНО:** Звук, не буква! Буква H может не произноситься:' },
          { type: 'table', headers: ['Слово', 'Артикль', 'Почему?'], rows: [
            ['hour', 'an hour', 'h НЕ произносится → звук [a]'],
            ['honest man', 'an honest man', 'h НЕ произносится → звук [o]'],
            ['heir', 'an heir', 'h НЕ произносится → звук [e]'],
            ['MBA', 'an MBA', 'звук [em] — гласный']
          ]},
          { type: 'highlight', variant: 'warning', content: '⚠ НО: a hotel, a house (h произносится!)' }
        ],
        [
          { type: 'heading', level: 3, content: 'ПЕРВОЕ упоминание → A/AN' },
          { type: 'text', content: 'Когда **впервые** говорим о предмете — используем a/an:' },
          { type: 'code', content: 'I saw a dog in the park.\n↓\nThe dog was black.\n\n(первое упоминание = a, второе = the)' },
          { type: 'highlight', variant: 'info', content: '→ A/AN = новая информация, THE = уже известная' }
        ],
        [
          { type: 'heading', level: 3, content: 'ПРОФЕССИИ и НАЦИОНАЛЬНОСТИ' },
          { type: 'text', content: '**С профессиями и национальностями ВСЕГДА используем a/an:**' },
          { type: 'table', headers: ['Профессия', 'Пример', 'Перевод'], rows: [
            ['teacher', 'She is a teacher', 'Она учитель'],
            ['engineer', 'He is an engineer', 'Он инженер'],
            ['doctor', 'I want to be a doctor', 'Я хочу быть врачом'],
            ['student', 'He is a student', 'Он студент']
          ]},
          { type: 'code', content: 'He is a Russian. — Он русский.\nShe is an American. — Она американка.\nI am a teacher. — Я учитель.' },
          { type: 'highlight', variant: 'warning', content: '! В русском нет артикля, но в английском ОБЯЗАТЕЛЬНО a/an!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ЧИСЛИТЕЛЬНЫЕ: a = one' },
          { type: 'text', content: '**A/AN = один** с hundred, thousand, million:' },
          { type: 'code', content: 'a hundred people = one hundred people\na thousand times = one thousand times\na million dollars = one million dollars' },
          { type: 'highlight', variant: 'info', content: '→ A/AN здесь значит "один"' }
        ],
        [
          { type: 'heading', level: 3, content: 'ВОСКЛИЦАНИЯ с WHAT' },
          { type: 'text', content: '**В восклицательных предложениях используем a/an:**' },
          { type: 'formula', content: 'What + A/AN + прилагательное + существительное!' },
          { type: 'code', content: 'What a beautiful day! — Какой прекрасный день!\nWhat an amazing story! — Какая удивительная история!\nWhat a wonderful surprise! — Какой замечательный сюрприз!\nWhat an interesting book! — Какая интересная книга!' },
          { type: 'highlight', variant: 'tip', content: '→ НЕ забывайте артикль после what!' }
        ],
        [
          { type: 'heading', level: 3, content: 'УСТОЙЧИВЫЕ ВЫРАЖЕНИЯ' },
          { type: 'text', content: 'Часто используемые фразы с a/an:' },
          { type: 'table', headers: ['Выражение', 'Перевод', 'Пример'], rows: [
            ['have a cold', 'простудиться', 'I have a cold'],
            ['have a good time', 'хорошо провести время', 'Have a good time!'],
            ['in a hurry', 'в спешке', 'I\'m in a hurry'],
            ['as a rule', 'как правило', 'As a rule, I wake up early'],
            ['at a distance', 'на расстоянии', 'We saw it at a distance'],
            ['take a break', 'сделать перерыв', 'Let\'s take a break'],
            ['make a decision', 'принять решение', 'We need to make a decision']
          ]},
          { type: 'highlight', variant: 'tip', content: '→ Эти выражения нужно запомнить!' }
        ],
        [
          { type: 'heading', level: 3, content: 'КОГДА НЕ используем A/AN' },
          { type: 'text', content: '**A/AN НЕ используется:**' },
          { type: 'table', headers: ['Случай', 'Неправильно ✗', 'Правильно ✓'], rows: [
            ['Неисчисляемые', 'a water', 'water / some water'],
            ['Неисчисляемые', 'an advice', 'advice / some advice'],
            ['Неисчисляемые', 'a money', 'money / some money'],
            ['Множественное число', 'a books', 'books / some books'],
            ['Множественное число', 'an apples', 'apples / some apples']
          ]},
          { type: 'highlight', variant: 'warning', content: '⚠ A/AN только с исчисляемыми в единственном числе!' }
        ],
        [
          { type: 'heading', level: 3, content: 'КВАНТИФИКАТОРЫ с A' },
          { type: 'text', content: 'Выражения количества с артиклем a:' },
          { type: 'code', content: 'a few — несколько (с исчисляемыми)\nI have a few books.\n\na little — немного (с неисчисляемыми)\nI have a little time.\n\na lot of — много (с любыми)\nI have a lot of friends.\n\na couple of — пара\nI need a couple of minutes.' },
          { type: 'highlight', variant: 'info', content: '→ A показывает, что количество небольшое, но достаточное' }
        ]
      ],
      examples: [
        { sentence: 'I need a pen and an eraser for my exam.', translation: 'Мне нужна ручка и ластик для экзамена.', highlight: true },
        { sentence: 'She is an engineer at a big company.', translation: 'Она инженер в большой компании.' },
        { sentence: 'There is a book on the table and an umbrella by the door.', translation: 'На столе книга, а у двери зонт.' },
        { sentence: 'He bought an old car for a thousand dollars.', translation: 'Он купил старую машину за тысячу долларов.' },
        { sentence: 'What an interesting story you told us!', translation: 'Какую интересную историю ты нам рассказал!', highlight: true },
        { sentence: 'A European company opened an office in an Asian country.', translation: 'Европейская компания открыла офис в азиатской стране.' },
        { sentence: 'I waited for an hour, but she didn\'t come.', translation: 'Я ждал час, но она не пришла.', highlight: true },
        { sentence: 'He is a very honest man with a good reputation.', translation: 'Он очень честный человек с хорошей репутацией.' },
        { sentence: 'Can I have a glass of water and a piece of cake?', translation: 'Можно мне стакан воды и кусок торта?' },
        { sentence: 'A dog is a man\'s best friend, as they say.', translation: 'Собака — лучший друг человека, как говорится.' },
        { sentence: 'I\'m in a hurry — I have a meeting in an hour!', translation: 'Я спешу — у меня встреча через час!' },
        { sentence: 'She has a cold and needs to see a doctor.', translation: 'Она простужена и ей нужно к врачу.' }
      ],
      practice: [
        { type: 'heading', level: 2, content: 'Практика' },
        { type: 'text', content: '**Задание 1:** Выберите a или an:' },
        { type: 'code', content: '___ apple\n___ car\n___ honest man\n___ university\n___ hour\n___ European city\n___ MBA\n___ one-year course\n___ unique opportunity\n___ umbrella\n___ heir\n___ useful tool\n___ orange\n___ hotel\n___ uniform' },
        { type: 'text', content: '**Задание 2:** Исправьте ошибки:' },
        { type: 'list', items: [
          '✗ She is teacher. → ✓ __________',
          '✗ I need a advice. → ✓ __________',
          '✗ He bought a books. → ✓ __________',
          '✗ What beautiful day! → ✓ __________',
          '✗ I waited for a hour. → ✓ __________'
        ]},
        { type: 'text', content: '**Задание 3:** Переведите на английский:' },
        { type: 'list', items: [
          'Я учитель. → __________',
          'Какой интересный фильм! → __________',
          'Мне нужен совет. → __________',
          'Он честный человек. → __________'
        ]},
        { type: 'highlight', variant: 'tip', content: '→ **Совет:** Произнесите слово вслух и слушайте первый ЗВУК!' }
      ]
    },
  },
  {
    id: 9,
    title: 'The Definite Article: The',
    description: 'Определённый артикль',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Определённый артикль THE' },
        { type: 'text', content: 'Определённый артикль the — **самое частое** слово в английском языке. Указывает на конкретный, определённый предмет, известный собеседникам.' },
        { 
          type: 'highlight', 
          variant: 'info',
          content: '**В отличие от a/an:** THE работает с ед.ч., мн.ч. и неисчисляемыми!' 
        },
        { 
          type: 'highlight', 
          variant: 'warning',
          content: '⚠ **Значение:** "тот самый, конкретный" (известный из контекста)' 
        }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'КОНКРЕТНЫЙ предмет из контекста' },
          { type: 'text', content: '**THE = тот самый**, известный из ситуации:' },
          { type: 'code', content: 'Close the door. — Закрой дверь (эту, в комнате).\nOpen the window. — Открой окно (это, здесь).\nWhere is the key? — Где ключ (тот, о котором мы говорили)?' },
          { type: 'highlight', variant: 'success', content: '✓ Понятно, какой именно предмет имеется в виду!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ПОВТОРНОЕ упоминание' },
          { type: 'text', content: '**Первый раз = a/an, второй раз = the:**' },
          { type: 'formula', content: 'I saw A cat. THE cat was black.' },
          { type: 'code', content: 'I bought a book yesterday.\n↓\nThe book is very interesting.\n\nA man came to the office.\n↓\nThe man asked for you.' },
          { type: 'highlight', variant: 'info', content: '→ A/AN = новая информация, THE = уже известная' }
        ],
        [
          { type: 'heading', level: 3, content: 'ЕДИНСТВЕННЫЙ в своём роде' },
          { type: 'text', content: '**С уникальными объектами всегда используем THE:**' },
          { type: 'table', headers: ['Категория', 'Примеры'], rows: [
            ['Небесные тела', 'the sun, the moon, the Earth, the sky'],
            ['Общие понятия', 'the world, the universe, the environment'],
            ['Природные явления', 'the weather, the climate, the atmosphere']
          ]},
          { type: 'code', content: 'The sun rises in the east.\nThe moon is beautiful tonight.\nThe Earth revolves around the sun.\nThe sky is blue.' },
          { type: 'highlight', variant: 'tip', content: '→ Единственный в своём роде = всегда THE!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ПРЕВОСХОДНАЯ степень прилагательных' },
          { type: 'text', content: '**С превосходной степенью ВСЕГДА the:**' },
          { type: 'formula', content: 'THE + superlative + noun' },
          { type: 'code', content: 'the best — лучший\nthe biggest — самый большой\nthe most interesting — самый интересный\nthe oldest — самый старый\nthe highest — самый высокий' },
          { type: 'table', headers: ['Форма', 'Пример'], rows: [
            ['the + -est', 'She is the tallest girl'],
            ['the most + adj', 'It\'s the most beautiful place']
          ]},
          { type: 'highlight', variant: 'warning', content: '! Превосходная степень БЕЗ the — грубая ошибка!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ПОРЯДКОВЫЕ числительные' },
          { type: 'text', content: '**С порядковыми числительными используем the:**' },
          { type: 'code', content: 'the first — первый\nthe second — второй\nthe third — третий\nthe last — последний\nthe next — следующий' },
          { type: 'table', headers: ['Порядковое', 'Пример', 'Перевод'], rows: [
            ['the first', 'the first time', 'первый раз'],
            ['the second', 'the second day', 'второй день'],
            ['the last', 'the last person', 'последний человек']
          ]},
          { type: 'highlight', variant: 'info', content: '→ НО количественные БЕЗ the: two books, three days' }
        ],
        [
          { type: 'heading', level: 3, content: 'МУЗЫКАЛЬНЫЕ ИНСТРУМЕНТЫ' },
          { type: 'text', content: '**С глаголом play используем the:**' },
          { type: 'formula', content: 'play THE + musical instrument' },
          { type: 'code', content: 'play the piano — играть на пианино\nplay the guitar — играть на гитаре\nplay the violin — играть на скрипке\nplay the drums — играть на барабанах' },
          { type: 'highlight', variant: 'warning', content: '⚠ НО виды спорта БЕЗ the: play football, play tennis' }
        ],
        [
          { type: 'heading', level: 3, content: 'ГЕОГРАФИЧЕСКИЕ названия С the' },
          { type: 'text', content: '**THE используется с определёнными географическими объектами:**' },
          { type: 'table', headers: ['Категория', 'Примеры'], rows: [
            ['Океаны, моря, реки', 'the Atlantic Ocean, the Black Sea, the Thames'],
            ['Горные цепи', 'the Alps, the Himalayas, the Andes'],
            ['Пустыни', 'the Sahara Desert, the Gobi'],
            ['Группы островов', 'the Philippines, the Canary Islands'],
            ['Страны с мн.ч./союзами', 'the USA, the UK, the Netherlands, the UAE']
          ]},
          { type: 'highlight', variant: 'success', content: '✓ Запомните эти категории!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ГЕОГРАФИЧЕСКИЕ названия БЕЗ the' },
          { type: 'text', content: '**НЕ используем the с:**' },
          { type: 'table', headers: ['Категория', 'Примеры'], rows: [
            ['Большинство стран', 'Russia, France, China, Japan'],
            ['Города', 'London, Moscow, Paris, New York'],
            ['Континенты', 'Europe, Asia, Africa, America'],
            ['Улицы, площади', 'Oxford Street, Red Square, Fifth Avenue'],
            ['Одиночные горы', 'Mount Everest, Mont Blanc'],
            ['Озёра', 'Lake Baikal, Lake Michigan']
          ]},
          { type: 'highlight', variant: 'warning', content: '⚠ Исключение: the Hague (Гаага)' }
        ],
        [
          { type: 'heading', level: 3, content: 'ЗДАНИЯ и УЧРЕЖДЕНИЯ' },
          { type: 'text', content: '**С известными зданиями и учреждениями:**' },
          { type: 'code', content: 'the British Museum — Британский музей\nthe Kremlin — Кремль\nthe White House — Белый дом\nthe Eiffel Tower — Эйфелева башня\nthe Empire State Building — Эмпайр-стейт-билдинг' },
          { type: 'highlight', variant: 'info', content: '→ Исключение: Buckingham Palace (БЕЗ the)' }
        ],
        [
          { type: 'heading', level: 3, content: 'УСТОЙЧИВЫЕ ВЫРАЖЕНИЯ с the' },
          { type: 'text', content: 'Часто используемые фразы:' },
          { type: 'table', headers: ['С the', 'БЕЗ the'], rows: [
            ['in the morning', 'at night'],
            ['in the afternoon', 'at noon'],
            ['in the evening', 'at midnight'],
            ['go to the cinema', 'watch TV'],
            ['listen to the radio', 'go home'],
            ['play the piano', 'play football']
          ]},
          { type: 'highlight', variant: 'tip', content: '→ Эти выражения нужно запомнить!' }
        ],
        [
          { type: 'heading', level: 3, content: 'С СЕМЬЯМИ (множественное число)' },
          { type: 'text', content: '**Фамилия во множественном числе с the:**' },
          { type: 'formula', content: 'THE + фамилия во мн.ч. = вся семья' },
          { type: 'code', content: 'the Smiths — семья Смитов\nthe Johnsons — семья Джонсонов\nthe Browns — семья Браунов\nthe Ivanovs — семья Ивановых' },
          { type: 'highlight', variant: 'info', content: '→ The Smiths = Mr. Smith, Mrs. Smith и их дети' }
        ],
        [
          { type: 'heading', level: 3, content: 'С ОПРЕДЕЛЯЮЩИМИ придаточными' },
          { type: 'text', content: '**Существительное + придаточное/фраза → the:**' },
          { type: 'code', content: 'the book that I bought — книга, которую я купил\nthe man in the blue suit — мужчина в синем костюме\nthe woman I met yesterday — женщина, которую я встретил вчера\nthe house on the corner — дом на углу' },
          { type: 'highlight', variant: 'tip', content: '→ Придаточное делает предмет определённым!' }
        ]
      ],
      examples: [
        { sentence: 'Please close the door and open the window.', translation: 'Пожалуйста, закрой дверь и открой окно.', highlight: true },
        { sentence: 'I saw a cat yesterday. The cat was sitting under a tree.', translation: 'Я вчера видел кошку. Кошка сидела под деревом.' },
        { sentence: 'The sun rises in the east and sets in the west.', translation: 'Солнце встаёт на востоке и садится на западе.', highlight: true },
        { sentence: 'She is the best student in the class and got the highest grade.', translation: 'Она лучшая ученица в классе и получила высший балл.' },
        { sentence: 'This is the first time I\'ve visited the United States.', translation: 'Это первый раз, когда я посещаю Соединённые Штаты.', highlight: true },
        { sentence: 'My daughter plays the piano and my son plays the guitar.', translation: 'Моя дочь играет на пианино, а мой сын играет на гитаре.' },
        { sentence: 'We crossed the Atlantic Ocean by ship last summer.', translation: 'Прошлым летом мы пересекли Атлантический океан на корабле.' },
        { sentence: 'The Smiths invited us to dinner at their house.', translation: 'Смиты пригласили нас на ужин к себе домой.' },
        { sentence: 'In the morning I go jogging, and in the evening I go to the gym.', translation: 'Утром я бегаю, а вечером хожу в спортзал.', highlight: true },
        { sentence: 'The book that you recommended was absolutely fascinating.', translation: 'Книга, которую ты рекомендовал, была абсолютно захватывающей.' },
        { sentence: 'The man in the black suit is the CEO of the company.', translation: 'Мужчина в чёрном костюме — генеральный директор компании.' },
        { sentence: 'Let\'s go to the cinema tonight or listen to the radio at home.', translation: 'Давай пойдём в кино сегодня вечером или послушаем радио дома.' }
      ],
      practice: [
        { type: 'heading', level: 2, content: 'Практика' },
        { type: 'text', content: '**Задание 1:** Вставьте the или оставьте пропуск (Ø):' },
        { type: 'code', content: 'I live in ___ Russia, ___ Moscow.\n___ sun is shining.\nShe plays ___ piano.\nHe is ___ best student.\nWe visited ___ British Museum.\n___ Mount Everest is in ___ Himalayas.\nI watch ___ TV every day.\nIn ___ evening I read books.\n___ Atlantic Ocean is big.' },
        { type: 'text', content: '**Задание 2:** Исправьте ошибки:' },
        { type: 'list', items: [
          '✗ She is best student. → ✓ __________',
          '✗ I saw the cat. Cat was black. → ✓ __________',
          '✗ He lives in the London. → ✓ __________',
          '✗ I play piano. → ✓ __________',
          '✗ Sun rises in east. → ✓ __________'
        ]},
        { type: 'text', content: '**Задание 3:** Переведите на английский:' },
        { type: 'list', items: [
          'Он лучший студент в классе. → __________',
          'Мы пересекли Атлантический океан. → __________',
          'Она играет на гитаре. → __________',
          'Семья Смитов живёт в Лондоне. → __________'
        ]},
        { type: 'highlight', variant: 'tip', content: '→ **Совет:** THE = "тот самый", известный из контекста!' }
      ]
    },
  },
  {
    id: 10,
    title: 'Demonstratives: This, That, These, Those',
    description: 'Указательные местоимения',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Указательные местоимения в английском' },
        { type: 'text', content: 'Указательные местоимения (demonstratives) помогают указать на предметы в пространстве или времени. Они показывают, насколько близко или далеко находится предмет.' },
        { 
          type: 'highlight', 
          variant: 'info',
          content: '**Четыре формы:** this/that (единственное число), these/those (множественное число)' 
        },
        { 
          type: 'highlight', 
          variant: 'warning',
          content: '⚠ **ВАЖНО:** Выбор зависит от расстояния И числа!' 
        }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'ТАБЛИЦА указательных местоимений' },
          { type: 'table', headers: ['Расстояние', 'Единственное число', 'Множественное число', 'Перевод'], rows: [
            ['БЛИЗКО', 'this', 'these', 'этот/эта/это, эти'],
            ['ДАЛЕКО', 'that', 'those', 'тот/та/то, те']
          ]},
          { type: 'formula', content: 'THIS/THESE → близко\nTHAT/THOSE → далеко' },
          { type: 'highlight', variant: 'success', content: '✓ Главный критерий — расстояние!' }
        ],
        [
          { type: 'heading', level: 3, content: 'THIS — единственное число, БЛИЗКО' },
          { type: 'text', content: '**Используется для одного предмета рядом:**' },
          { type: 'code', content: 'This book is interesting. — Эта книга интересная.\nThis is my car. — Это моя машина.\nI like this song. — Мне нравится эта песня.\nWhat is this? — Что это?' },
          { type: 'highlight', variant: 'tip', content: '→ This = я могу дотронуться, это рядом со мной' }
        ],
        [
          { type: 'heading', level: 3, content: 'THAT — единственное число, ДАЛЕКО' },
          { type: 'text', content: '**Используется для одного предмета вдали:**' },
          { type: 'code', content: 'That house is beautiful. — Тот дом красивый.\nThat is your pen. — Та ручка твоя.\nI want that car. — Я хочу ту машину.\nWhat is that? — Что то там?' },
          { type: 'highlight', variant: 'tip', content: '→ That = далеко от меня, мне нужно пройти' }
        ],
        [
          { type: 'heading', level: 3, content: 'THESE — множественное число, БЛИЗКО' },
          { type: 'text', content: '**Используется для нескольких предметов рядом:**' },
          { type: 'code', content: 'These books are mine. — Эти книги мои.\nThese are my friends. — Это мои друзья.\nI love these shoes. — Мне нравятся эти туфли.\nWhat are these? — Что это (множество)?' },
          { type: 'table', headers: ['Единственное', 'Множественное'], rows: [
            ['this book', 'these books'],
            ['this apple', 'these apples'],
            ['this person', 'these people']
          ]},
          { type: 'highlight', variant: 'success', content: '✓ These = множественное от this' }
        ],
        [
          { type: 'heading', level: 3, content: 'THOSE — множественное число, ДАЛЕКО' },
          { type: 'text', content: '**Используется для нескольких предметов вдали:**' },
          { type: 'code', content: 'Those cars are expensive. — Те машины дорогие.\nThose are my colleagues. — Те люди мои коллеги.\nI want those cookies. — Я хочу те печенья.\nWho are those people? — Кто те люди?' },
          { type: 'table', headers: ['Единственное', 'Множественное'], rows: [
            ['that car', 'those cars'],
            ['that building', 'those buildings'],
            ['that student', 'those students']
          ]},
          { type: 'highlight', variant: 'success', content: '✓ Those = множественное от that' }
        ],
        [
          { type: 'heading', level: 3, content: 'РАССТОЯНИЕ в пространстве' },
          { type: 'text', content: '**Визуализация расстояния:**' },
          { type: 'comparison', items: [
            { label: 'БЛИЗКО (this/these)', countable: 'рядом со мной', uncountable: 'могу дотронуться' },
            { label: 'ДАЛЕКО (that/those)', countable: 'вдали от меня', uncountable: 'нужно пройти' }
          ]},
          { type: 'code', content: 'РЯДОМ:\nThis pen in my hand is blue.\nThese books on my desk are new.\n\nВДАЛИ:\nThat pen over there is red.\nThose books on the shelf are old.' },
          { type: 'highlight', variant: 'info', content: '→ Часто используют over there (вон там) с that/those' }
        ],
        [
          { type: 'heading', level: 3, content: 'РАССТОЯНИЕ во времени' },
          { type: 'text', content: '**This/these — для текущего времени:**' },
          { type: 'code', content: 'this week — на этой неделе\nthis month — в этом месяце\nthis year — в этом году\nthese days — в эти дни (сейчас)' },
          { type: 'text', content: '**That/those — для прошлого времени:**' },
          { type: 'code', content: 'that day — в тот день\nthat week — на той неделе\nthose days — в те дни (давно)' },
          { type: 'highlight', variant: 'warning', content: '⚠ Прошлое = далеко во времени → that/those' }
        ],
        [
          { type: 'heading', level: 3, content: 'КАК ОПРЕДЕЛИТЕЛЬ перед существительным' },
          { type: 'text', content: '**Стоят ПЕРЕД существительным (как артикль):**' },
          { type: 'formula', content: 'this/that/these/those + NOUN' },
          { type: 'code', content: 'this book — эта книга\nthat car — та машина\nthese students — эти студенты\nthose houses — те дома' },
          { type: 'highlight', variant: 'warning', content: '! НЕ используйте артикль: this book (НЕ a this book)' }
        ],
        [
          { type: 'heading', level: 3, content: 'КАК МЕСТОИМЕНИЕ (без существительного)' },
          { type: 'text', content: '**Могут стоять ОТДЕЛЬНО, заменяя существительное:**' },
          { type: 'code', content: 'This is my phone. — Это мой телефон.\nThat is interesting. — То интересно.\nThese are expensive. — Эти дорогие.\nThose are mine. — Те мои.' },
          { type: 'table', headers: ['С существительным', 'Без существительного'], rows: [
            ['This book is good.', 'This is good.'],
            ['That car is fast.', 'That is fast.'],
            ['These apples are fresh.', 'These are fresh.'],
            ['Those people are kind.', 'Those are kind.']
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'ВОПРОСЫ с указательными местоимениями' },
          { type: 'text', content: '**Типичные вопросительные конструкции:**' },
          { type: 'table', headers: ['Вопрос', 'Ответ с определителем', 'Ответ с местоимением'], rows: [
            ['What is this?', 'This is a book.', 'This is a book. / It\'s a book.'],
            ['What are these?', 'These are apples.', 'These are apples. / They\'re apples.'],
            ['Who is that?', 'That is my friend.', 'That is John. / He\'s John.'],
            ['Whose are those?', 'Those are Tom\'s books.', 'Those are his. / They\'re his.']
          ]},
          { type: 'highlight', variant: 'tip', content: '→ В ответах можно заменить на it/they' }
        ],
        [
          { type: 'heading', level: 3, content: 'СРАВНЕНИЕ: This vs That' },
          { type: 'text', content: '**Часто используются вместе для противопоставления:**' },
          { type: 'code', content: 'This car is mine, and that car is yours.\nЭта машина моя, а та машина твоя.\n\nI like this book, but I don\'t like that one.\nМне нравится эта книга, но не нравится та.\n\nThese apples are fresh, but those are old.\nЭти яблоки свежие, а те старые.' },
          { type: 'highlight', variant: 'success', content: '✓ Помогает чётко различить два объекта!' }
        ],
        [
          { type: 'heading', level: 3, content: 'РАСПРОСТРАНЁННЫЕ ошибки' },
          { type: 'table', headers: ['Ошибка ✗', 'Правильно ✓', 'Объяснение'], rows: [
            ['this books', 'these books', 'books = множественное → these'],
            ['these car', 'this car', 'car = единственное → this'],
            ['a this book', 'this book', 'не нужен артикль'],
            ['that are my car', 'that is my car', 'that = единственное → is'],
            ['these is good', 'these are good', 'these = множественное → are']
          ]},
          { type: 'highlight', variant: 'warning', content: '! Самая частая ошибка — путать число (this/these, that/those)!' }
        ]
      ],
      examples: [
        { sentence: 'This is my new phone, and that is my old one over there.', translation: 'Это мой новый телефон, а то там — мой старый.', highlight: true },
        { sentence: 'These books on my desk are interesting, but those books on the shelf are boring.', translation: 'Эти книги на моём столе интересные, но те книги на полке скучные.' },
        { sentence: 'What is this? — This is a dictionary.', translation: 'Что это? — Это словарь.' },
        { sentence: 'Who are those people over there? — Those are my colleagues.', translation: 'Кто те люди там? — Те мои коллеги.', highlight: true },
        { sentence: 'I love this weather! These days are perfect for walking.', translation: 'Я обожаю эту погоду! Эти дни идеальны для прогулок.' },
        { sentence: 'Do you remember those days when we were young?', translation: 'Ты помнишь те дни, когда мы были молоды?' },
        { sentence: 'This pen doesn\'t work. Can I use that one?', translation: 'Эта ручка не работает. Могу я взять ту?', highlight: true },
        { sentence: 'These cookies are delicious! Where did you buy them?', translation: 'Эти печенья восхитительны! Где ты их купил?' },
        { sentence: 'That building over there is my office.', translation: 'То здание вон там — мой офис.' },
        { sentence: 'This is exactly what I need!', translation: 'Это именно то, что мне нужно!' },
        { sentence: 'Are these your keys or those?', translation: 'Это твои ключи или те?' },
        { sentence: 'I prefer this restaurant to that one.', translation: 'Я предпочитаю этот ресторан тому.' }
      ],
      practice: [
        { type: 'heading', level: 2, content: 'Практика' },
        { type: 'text', content: '**Задание 1:** Выберите правильную форму (this/that/these/those):' },
        { type: 'code', content: '________ book (in my hand) is interesting.\n________ cars (over there) are expensive.\n________ is my friend (next to me).\n________ days (in the past) were difficult.\n________ apples (on this table) are fresh.' },
        { type: 'text', content: '**Задание 2:** Укажите близкое и далёкое:' },
        { type: 'list', items: [
          'pen (рядом, ед.ч.) → __________',
          'people (далеко, мн.ч.) → __________',
          'house (далеко, ед.ч.) → __________',
          'books (рядом, мн.ч.) → __________'
        ]},
        { type: 'text', content: '**Задание 3:** Исправьте ошибки:' },
        { type: 'code', content: '✗ This books are mine. → ✓ __________\n✗ These is my car. → ✓ __________\n✗ A this pen is broken. → ✓ __________\n✗ That are my friends. → ✓ __________\n✗ Those car is red. → ✓ __________' },
        { type: 'text', content: '**Задание 4:** Переведите предложения:' },
        { type: 'list', items: [
          'Эта книга моя, а та твоя. → __________',
          'Что это? → __________',
          'Те люди вон там мои друзья. → __________',
          'Эти яблоки свежие. → __________'
        ]},
        { type: 'highlight', variant: 'tip', content: '→ **Совет:** This/these — близко, that/those — далеко. This/that — ед.ч., these/those — мн.ч.!' }
      ]
    },
  },
  {
    id: 11,
    title: 'Adjectives - Degrees of Comparison',
    description: 'Степени сравнения прилагательных',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Степени сравнения прилагательных в английском' },
        { type: 'text', content: 'Прилагательные имеют три степени сравнения для выражения различных уровней качества или характеристики.' },
        { 
          type: 'highlight', 
          variant: 'info',
          content: '**Три степени:** Positive (положительная), Comparative (сравнительная), Superlative (превосходная)' 
        },
        { 
          type: 'highlight', 
          variant: 'warning',
          content: '⚠ **ВАЖНО:** Способ образования зависит от длины прилагательного!' 
        }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'ТАБЛИЦА степеней сравнения' },
          { type: 'table', headers: ['Длина', 'Positive', 'Comparative', 'Superlative'], rows: [
            ['1-2 слога', 'big', 'bigger', 'the biggest'],
            ['1-2 слога', 'tall', 'taller', 'the tallest'],
            ['3+ слога', 'beautiful', 'more beautiful', 'the most beautiful'],
            ['3+ слога', 'expensive', 'more expensive', 'the most expensive']
          ]},
          { type: 'highlight', variant: 'success', content: '✓ Короткие → -er/-est, длинные → more/most' }
        ],
        [
          { type: 'heading', level: 3, content: 'КОРОТКИЕ прилагательные (1-2 слога): -ER / -EST' },
          { type: 'formula', content: 'adjective + -ER (comparative)\nadjective + -EST (superlative)' },
          { type: 'table', headers: ['Positive', 'Comparative', 'Superlative', 'Перевод'], rows: [
            ['tall', 'taller', 'the tallest', 'высокий / выше / самый высокий'],
            ['small', 'smaller', 'the smallest', 'маленький / меньше / самый маленький'],
            ['fast', 'faster', 'the fastest', 'быстрый / быстрее / самый быстрый'],
            ['cold', 'colder', 'the coldest', 'холодный / холоднее / самый холодный']
          ]},
          { type: 'code', content: 'big → bigger → the biggest\nhot → hotter → the hottest\nnice → nicer → the nicest' },
          { type: 'highlight', variant: 'warning', content: '! С превосходной степенью ВСЕГДА артикль the!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ОРФОГРАФИЧЕСКИЕ правила' },
          { type: 'text', content: '**При добавлении -er/-est применяются правила орфографии:**' },
          { type: 'table', headers: ['Правило', 'Пример', 'Comparative', 'Superlative'], rows: [
            ['Удвоение согласной', 'big, hot, thin', 'bigger, hotter, thinner', 'biggest, hottest, thinnest'],
            ['Y → IES', 'happy, easy', 'happier, easier', 'happiest, easiest'],
            ['E на конце → просто R/ST', 'nice, large', 'nicer, larger', 'nicest, largest']
          ]},
          { type: 'code', content: 'big → bigger → biggest (удвоение g)\nhappy → happier → happiest (y → i)\nnice → nicer → nicest (только r, st)' },
          { type: 'highlight', variant: 'tip', content: '→ Односложные на одну согласную удваивают её!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ДЛИННЫЕ прилагательные (3+ слога): MORE / MOST' },
          { type: 'formula', content: 'MORE + adjective (comparative)\nthe MOST + adjective (superlative)' },
          { type: 'table', headers: ['Positive', 'Comparative', 'Superlative'], rows: [
            ['beautiful', 'more beautiful', 'the most beautiful'],
            ['expensive', 'more expensive', 'the most expensive'],
            ['interesting', 'more interesting', 'the most interesting'],
            ['difficult', 'more difficult', 'the most difficult']
          ]},
          { type: 'highlight', variant: 'warning', content: '⚠ НЕ пишите beautifuller или expensivest — это ошибка!' }
        ],
        [
          { type: 'heading', level: 3, content: '2-СЛОЖНЫЕ прилагательные: два варианта' },
          { type: 'text', content: '**Некоторые 2-сложные имеют ОБА варианта:**' },
          { type: 'table', headers: ['Adjective', 'Вариант 1', 'Вариант 2'], rows: [
            ['clever', 'cleverer / the cleverest', 'more clever / the most clever'],
            ['simple', 'simpler / the simplest', 'more simple / the most simple'],
            ['quiet', 'quieter / the quietest', 'more quiet / the most quiet']
          ]},
          { type: 'highlight', variant: 'info', content: '→ Оба варианта правильны, но -er/-est чаще!' }
        ],
        [
          { type: 'heading', level: 3, content: 'НЕПРАВИЛЬНЫЕ формы — запомнить!' },
          { type: 'text', content: '**Эти прилагательные НЕ следуют правилам — нужно ЗАПОМНИТЬ:**' },
          { type: 'table', headers: ['Positive', 'Comparative', 'Superlative', 'Перевод'], rows: [
            ['good', 'better', 'the best', 'хороший / лучше / лучший'],
            ['bad', 'worse', 'the worst', 'плохой / хуже / худший'],
            ['far', 'farther/further', 'the farthest/furthest', 'далёкий / дальше / самый далёкий'],
            ['little', 'less', 'the least', 'маленький / меньше / наименьший'],
            ['much/many', 'more', 'the most', 'много / больше / больше всего']
          ]},
          { type: 'highlight', variant: 'warning', content: '! Это САМЫЕ важные неправильные формы!' }
        ]
      ],
      examples: [],
      practice: []
    }
  },
  {
    id: 14,
    title: 'Present Simple and Present Continuous',
    description: 'Настоящее простое и длительное время',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Два настоящих времени в английском' },
        { type: 'text', content: 'В английском есть два основных настоящих времени с разными значениями: Present Simple (для привычек и фактов) и Present Continuous (для действий в процессе).' },
        { 
          type: 'highlight', 
          variant: 'warning',
          content: '⚠ **Ключевое различие:** Simple = регулярно/всегда, Continuous = сейчас/временно' 
        }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'PRESENT SIMPLE — формулы и формы' },
          { type: 'text', content: '**Образование:**' },
          { type: 'formula', content: '✓ I/You/We/They + verb\n✓ He/She/It + verb + S' },
          { type: 'table', headers: ['Утверждение', 'Отрицание', 'Вопрос'], rows: [
            ['I work', 'I don\'t work', 'Do I work?'],
            ['She works', 'She doesn\'t work', 'Does she work?'],
            ['They live', 'They don\'t live', 'Do they live?']
          ]},
          { type: 'highlight', variant: 'warning', content: '! С he/she/it добавляем -S к глаголу!' }
        ],
        [
          { type: 'heading', level: 3, content: 'PRESENT CONTINUOUS — формулы и формы' },
          { type: 'text', content: '**Образование:**' },
          { type: 'formula', content: 'am/is/are + V-ING' },
          { type: 'table', headers: ['Утверждение', 'Отрицание', 'Вопрос'], rows: [
            ['I am working', 'I am not working', 'Am I working?'],
            ['She is working', 'She isn\'t working', 'Is she working?'],
            ['They are working', 'They aren\'t working', 'Are they working?']
          ]},
          { type: 'code', content: 'work → working\nread → reading\nstudy → studying\nrun → running (удвоение!)' },
          { type: 'highlight', variant: 'success', content: '✓ Всегда есть am/is/are + глагол с -ing!' }
        ],
        [
          { type: 'heading', level: 3, content: 'PRESENT SIMPLE — когда использовать' },
          { type: 'text', content: '**Используется для:**' },
          { type: 'table', headers: ['Случай', 'Пример', 'Перевод'], rows: [
            ['Привычки, регулярные действия', 'I go to work every day', 'Я хожу на работу каждый день'],
            ['Факты, истины', 'Water boils at 100°C', 'Вода кипит при 100°C'],
            ['Расписания', 'The train leaves at 8 PM', 'Поезд отправляется в 8 вечера'],
            ['Постоянные состояния', 'She lives in London', 'Она живёт в Лондоне']
          ]},
          { type: 'text', content: '**Signal words:**' },
          { type: 'code', content: 'always, usually, often, sometimes, rarely, never\nevery day/week/month/year\non Mondays, in the morning' },
          { type: 'highlight', variant: 'tip', content: '→ Если регулярно повторяется — Present Simple!' }
        ],
        [
          { type: 'heading', level: 3, content: 'PRESENT CONTINUOUS — когда использовать' },
          { type: 'text', content: '**Используется для:**' },
          { type: 'table', headers: ['Случай', 'Пример', 'Перевод'], rows: [
            ['Действие СЕЙЧАС', 'I am reading now', 'Я читаю сейчас'],
            ['Временная ситуация', 'She is living in Paris this year', 'Она живёт в Париже в этом году'],
            ['Изменения, тренды', 'The weather is getting warmer', 'Погода становится теплее'],
            ['Договорённость на будущее', 'We are meeting at 5 PM', 'Мы встречаемся в 5 вечера']
          ]},
          { type: 'text', content: '**Signal words:**' },
          { type: 'code', content: 'now, at the moment, right now\ncurrently, today, this week/month\nLook! Listen! (приказ посмотреть на действие)' },
          { type: 'highlight', variant: 'tip', content: '→ Если в процессе прямо сейчас — Present Continuous!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ПРЯМОЕ СРАВНЕНИЕ Simple vs Continuous' },
          { type: 'comparison', items: [
            { label: 'I work in a bank', countable: 'постоянная работа (Simple)', uncountable: 'I am working now (сейчас в процессе)' },
            { label: 'She lives in London', countable: 'постоянное место (Simple)', uncountable: 'She is living in Paris temporarily (временно)' },
            { label: 'They play tennis', countable: 'регулярно (Simple)', uncountable: 'They are playing tennis now (прямо сейчас)' }
          ]},
          { type: 'highlight', variant: 'warning', content: '⚠ Разные времена — разный смысл!' }
        ],
        [
          { type: 'heading', level: 3, content: 'СТАТИВНЫЕ глаголы — НЕ используются в Continuous!' },
          { type: 'text', content: '**Глаголы состояния (state verbs) обычно ТОЛЬКО в Simple:**' },
          { type: 'table', headers: ['Категория', 'Глаголы'], rows: [
            ['Чувства', 'like, love, hate, prefer, want, need'],
            ['Мышление', 'know, understand, believe, think (считать), remember, forget'],
            ['Восприятие', 'see, hear, smell, taste'],
            ['Принадлежность', 'have (иметь), own, belong, possess'],
            ['Другие', 'be, seem, appear, consist, contain']
          ]},
          { type: 'code', content: '✓ I like this song. (НЕ: I am liking)\n✓ She knows the answer. (НЕ: She is knowing)\n✓ We have a car. (НЕ: We are having - если "иметь")\n✓ It seems difficult. (НЕ: It is seeming)' },
          { type: 'highlight', variant: 'warning', content: '! Это одна из самых частых ошибок!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ИСКЛЮЧЕНИЯ — глаголы меняют значение!' },
          { type: 'text', content: '**Некоторые глаголы имеют два значения:**' },
          { type: 'table', headers: ['Глагол', 'Simple (состояние)', 'Continuous (действие)'], rows: [
            ['think', 'I think it\'s good (считаю)', 'I\'m thinking about it (размышляю)'],
            ['have', 'I have a car (имею)', 'I\'m having dinner (ем)'],
            ['see', 'I see you (понимаю/вижу)', 'I\'m seeing the doctor (встречаюсь)'],
            ['taste', 'It tastes good (на вкус)', 'She\'s tasting the soup (пробует)'],
            ['smell', 'It smells nice (пахнет)', 'I\'m smelling the flowers (нюхаю)']
          ]},
          { type: 'code', content: 'I think you\'re right. (моё мнение)\nI\'m thinking about the problem. (процесс размышления)\n\nI have a dog. (владею)\nI\'m having breakfast. (ем сейчас)' },
          { type: 'highlight', variant: 'tip', content: '→ Контекст определяет, какое время использовать!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ОРФОГРАФИЯ -ING форм' },
          { type: 'text', content: '**Правила добавления -ing:**' },
          { type: 'table', headers: ['Правило', 'Примеры'], rows: [
            ['Обычно + ing', 'work → working, read → reading'],
            ['E на конце → убрать E', 'make → making, come → coming'],
            ['1 гласная + 1 согласная → удвоить', 'run → running, sit → sitting'],
            ['IE на конце → Y + ING', 'lie → lying, die → dying']
          ]},
          { type: 'code', content: 'work → working\nmake → making (без e)\nrun → running (удвоение n)\nlie → lying (ie → y)' },
          { type: 'highlight', variant: 'warning', content: '! Обращайте внимание на орфографию!' }
        ],
        [
          { type: 'heading', level: 3, content: 'РАСПИСАНИЯ — используем Simple для будущего!' },
          { type: 'text', content: '**Для фиксированных расписаний используем Present Simple:**' },
          { type: 'code', content: 'The train leaves at 8 PM. (отправляется)\nThe class starts at 9 AM. (начинается)\nThe store opens at 10. (открывается)\nThe film begins at 7. (начинается)' },
          { type: 'highlight', variant: 'info', content: '→ Расписание = факт, поэтому Simple!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ТИПИЧНЫЕ ОШИБКИ' },
          { type: 'table', headers: ['Ошибка ✗', 'Правильно ✓', 'Объяснение'], rows: [
            ['I am liking this song', 'I like this song', 'like = стативный глагол'],
            ['She is knowing the answer', 'She knows the answer', 'know = стативный глагол'],
            ['He work here', 'He works here', 'нужно -s с he/she/it'],
            ['Does she working?', 'Is she working?', 'Continuous = am/is/are'],
            ['I working now', 'I am working now', 'нужен am/is/are']
          ]},
          { type: 'highlight', variant: 'warning', content: '! Будьте внимательны к стативным глаголам!' }
        ]
      ],
      examples: [
        { sentence: 'I usually go to work by bus, but today I am driving because of the rain.', translation: 'Обычно я езжу на работу на автобусе, но сегодня еду на машине из-за дождя.', highlight: true },
        { sentence: 'She works in a bank, but this week she is working from home.', translation: 'Она работает в банке, но на этой неделе работает из дома.' },
        { sentence: 'Water boils at 100 degrees Celsius.', translation: 'Вода кипит при 100 градусах Цельсия.', highlight: true },
        { sentence: 'Look! The children are playing in the garden.', translation: 'Смотри! Дети играют в саду.' },
        { sentence: 'I don\'t understand this question. Can you explain it?', translation: 'Я не понимаю этот вопрос. Можешь объяснить?' },
        { sentence: 'We are having dinner at 7 PM tonight. Would you like to join us?', translation: 'Мы ужинаем в 7 вечера сегодня. Хочешь присоединиться?', highlight: true },
        { sentence: 'The Earth goes around the Sun.', translation: 'Земля вращается вокруг Солнца.' },
        { sentence: 'He is always complaining about something!', translation: 'Он вечно на что-то жалуется!' },
        { sentence: 'I think you\'re right, but I\'m still thinking about it.', translation: 'Я думаю, ты прав, но я всё ещё размышляю об этом.', highlight: true },
        { sentence: 'The train leaves at 8:30 PM every evening.', translation: 'Поезд отправляется в 8:30 вечера каждый вечер.' },
        { sentence: 'She is living in Paris this year while she studies French.', translation: 'Она живёт в Париже в этом году, пока изучает французский.' },
        { sentence: 'I know that he is working hard on his project right now.', translation: 'Я знаю, что он сейчас усердно работает над своим проектом.' }
      ],
      practice: [
        { type: 'heading', level: 2, content: 'Практика' },
        { type: 'text', content: '**Задание 1:** Выберите правильное время (Simple или Continuous):' },
        { type: 'code', content: 'I (read/am reading) books every day.\nShe (watches/is watching) TV right now.\nThey (live/are living) in London permanently.\nHe (work/is working) at the moment.\nWe (know/are knowing) the answer.' },
        { type: 'text', content: '**Задание 2:** Раскройте скобки в правильном времени:' },
        { type: 'list', items: [
          'I usually ________ (go) to work by car.',
          'Look! It ________ (rain) outside.',
          'She ________ (not/understand) the question.',
          'What ________ you ________ (do) now?',
          'The Sun ________ (rise) in the east.'
        ]},
        { type: 'text', content: '**Задание 3:** Исправьте ошибки:' },
        { type: 'code', content: '✗ I am liking this song. → ✓ __________\n✗ She is knowing the answer. → ✓ __________\n✗ He work in a bank. → ✓ __________\n✗ They working now. → ✓ __________\n✗ Does she watching TV? → ✓ __________' },
        { type: 'text', content: '**Задание 4:** Объясните разницу:' },
        { type: 'list', items: [
          'I live in Moscow. / I am living in Moscow this month.',
          'She has a car. / She is having breakfast.',
          'What do you think? / What are you thinking about?'
        ]},
        { type: 'highlight', variant: 'tip', content: '→ **Совет:** Регулярно/всегда → Simple, сейчас/временно → Continuous!' }
      ]
    },
  },
  {
    id: 15,
    title: 'Present Perfect and Present Perfect Continuous',
    description: 'Настоящее совершенное и длительное совершенное',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Present Perfect — связь прошлого с настоящим' },
        { type: 'text', content: 'Present Perfect соединяет прошлое с настоящим: действие произошло, но результат важен СЕЙЧАС. Present Perfect Continuous подчёркивает длительность действия до настоящего момента.' },
        { 
          type: 'highlight', 
          variant: 'warning',
          content: '⚠ **Ключевое отличие:** Perfect = результат важен, Perfect Continuous = длительность важна' 
        }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'PRESENT PERFECT — формула и формы' },
          { type: 'formula', content: 'have/has + V3 (Past Participle)' },
          { type: 'table', headers: ['Утверждение', 'Отрицание', 'Вопрос'], rows: [
            ['I have worked', 'I haven\'t worked', 'Have I worked?'],
            ['She has finished', 'She hasn\'t finished', 'Has she finished?'],
            ['They have lived', 'They haven\'t lived', 'Have they lived?']
          ]},
          { type: 'code', content: 'Правильные: work → worked → worked\nНеправильные: go → went → gone\n            see → saw → seen\n            be → was/were → been' },
          { type: 'highlight', variant: 'success', content: '✓ Have/has + 3-я форма глагола (V3)!' }
        ],
        [
          { type: 'heading', level: 3, content: 'PRESENT PERFECT CONTINUOUS — формула' },
          { type: 'formula', content: 'have/has + BEEN + V-ING' },
          { type: 'table', headers: ['Утверждение', 'Отрицание', 'Вопрос'], rows: [
            ['I have been working', 'I haven\'t been working', 'Have I been working?'],
            ['She has been reading', 'She hasn\'t been reading', 'Has she been reading?'],
            ['They have been living', 'They haven\'t been living', 'Have they been living?']
          ]},
          { type: 'highlight', variant: 'warning', content: '! BEEN обязательно — это форма глагола BE!' }
        ],
        [
          { type: 'heading', level: 3, content: 'PRESENT PERFECT — когда использовать' },
          { type: 'text', content: '**Используется для:**' },
          { type: 'table', headers: ['Случай', 'Пример', 'Перевод'], rows: [
            ['Результат в настоящем', 'I have finished my work', 'Я закончил работу (готово)'],
            ['Жизненный опыт', 'She has visited Paris', 'Она была в Париже'],
            ['Изменения', 'You have grown', 'Ты вырос'],
            ['Незавершённый период', 'I have read 3 books this week', 'Я прочитал 3 книги на этой неделе']
          ]},
          { type: 'text', content: '**Signal words:**' },
          { type: 'code', content: 'already, yet, just, ever, never\nfor (в течение), since (с тех пор как)\nrecently, lately, so far\nthis week/month/year' },
          { type: 'highlight', variant: 'tip', content: '→ Результат важен СЕЙЧАС!' }
        ],
        [
          { type: 'heading', level: 3, content: 'PRESENT PERFECT CONTINUOUS — когда использовать' },
          { type: 'text', content: '**Используется для:**' },
          { type: 'table', headers: ['Случай', 'Пример', 'Перевод'], rows: [
            ['Длительность до сейчас', 'I have been reading for 2 hours', 'Я читаю уже 2 часа'],
            ['Причина результата', 'I\'m tired. I\'ve been working', 'Я устал. Я работал'],
            ['Временная ситуация', 'She has been living here this month', 'Она живёт здесь в этом месяце']
          ]},
          { type: 'text', content: '**Signal words:**' },
          { type: 'code', content: 'for + период времени (for 2 hours)\nsince + момент начала (since 2010)\nHow long...? (Как долго?)' },
          { type: 'highlight', variant: 'tip', content: '→ Акцент на ДЛИТЕЛЬНОСТЬ процесса!' }
        ],
        [
          { type: 'heading', level: 3, content: 'СРАВНЕНИЕ: Perfect vs Perfect Continuous' },
          { type: 'comparison', items: [
            { label: 'I have read the book', countable: 'результат (книга прочитана)', uncountable: 'I have been reading for 2 hours (процесс 2 часа)' },
            { label: 'She has painted the wall', countable: 'результат (стена покрашена)', uncountable: 'She has been painting (поэтому в краске)' },
            { label: 'They have lived here', countable: 'факт проживания', uncountable: 'They have been living here (акцент на период)' }
          ]},
          { type: 'highlight', variant: 'warning', content: '⚠ Perfect = результат, Perfect Continuous = процесс!' }
        ],
        [
          { type: 'heading', level: 3, content: 'FOR vs SINCE — важное различие!' },
          { type: 'text', content: '**FOR — период времени (как долго):**' },
          { type: 'code', content: 'for 2 hours — в течение 2 часов\nfor 3 days — в течение 3 дней\nfor a week — в течение недели\nfor years — в течение лет' },
          { type: 'text', content: '**SINCE — момент начала (с какого момента):**' },
          { type: 'code', content: 'since 2010 — с 2010 года\nsince Monday — с понедельника\nsince I was a child — с детства\nsince 8 o\'clock — с 8 часов' },
          { type: 'table', headers: ['FOR (период)', 'SINCE (момент)'], rows: [
            ['for 5 years', 'since 2019'],
            ['for 2 hours', 'since 3 PM'],
            ['for a long time', 'since last year']
          ]},
          { type: 'highlight', variant: 'warning', content: '! FOR отвечает на "как долго?", SINCE — на "с какого момента?"' }
        ],
        [
          { type: 'heading', level: 3, content: 'ALREADY, YET, JUST — позиция в предложении' },
          { type: 'text', content: '**ALREADY (уже) — в утверждениях, между have/has и V3:**' },
          { type: 'code', content: 'I have already finished my homework.\nShe has already left.\nWe have already seen this film.' },
          { type: 'text', content: '**YET (ещё/уже) — в вопросах и отрицаниях, В КОНЦЕ:**' },
          { type: 'code', content: 'Have you finished yet? (вопрос)\nI haven\'t finished yet. (отрицание)\nHas she arrived yet?' },
          { type: 'text', content: '**JUST (только что) — между have/has и V3:**' },
          { type: 'code', content: 'I have just arrived.\nShe has just called.\nThey have just finished.' },
          { type: 'table', headers: ['Слово', 'Позиция', 'Тип предложения'], rows: [
            ['already', 'have/has + already + V3', 'утверждение'],
            ['yet', 'в конце предложения', 'вопрос/отрицание'],
            ['just', 'have/has + just + V3', 'утверждение']
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'EVER и NEVER — опыт в жизни' },
          { type: 'text', content: '**EVER (когда-либо) — в вопросах:**' },
          { type: 'code', content: 'Have you ever been to Paris?\nHas she ever tried sushi?\nHave they ever met him?' },
          { type: 'text', content: '**NEVER (никогда) — в отрицаниях (само по себе отрицание!):**' },
          { type: 'code', content: 'I have never been to Japan.\nShe has never eaten Chinese food.\nThey have never seen snow.' },
          { type: 'highlight', variant: 'warning', content: '! Never = отрицание, поэтому НЕ используйте haven\'t с never!' }
        ],
        [
          { type: 'heading', level: 3, content: 'СТАТИВНЫЕ глаголы с Perfect' },
          { type: 'text', content: '**Со стативными глаголами используем Perfect, НЕ Perfect Continuous:**' },
          { type: 'table', headers: ['Стативный глагол', 'Present Perfect ✓', 'Perfect Continuous ✗'], rows: [
            ['know', 'I have known her for 5 years', '✗ I have been knowing'],
            ['love', 'They have loved each other since 2010', '✗ They have been loving'],
            ['have (иметь)', 'I have had this car for 3 years', '✗ I have been having'],
            ['be', 'She has been here since morning', '✗ She has been being']
          ]},
          { type: 'highlight', variant: 'warning', content: '⚠ Стативные глаголы = только Perfect!' }
        ],
        [
          { type: 'heading', level: 3, content: 'HOW LONG...? — вопросы о длительности' },
          { type: 'text', content: '**Для вопроса "Как долго?" используем Present Perfect:**' },
          { type: 'formula', content: 'How long + have/has + subject + V3?' },
          { type: 'code', content: 'How long have you lived here?\nHow long has she been a teacher?\nHow long have they known each other?' },
          { type: 'text', content: '**С Continuous — акцент на процесс:**' },
          { type: 'code', content: 'How long have you been waiting?\nHow long has he been working?\nHow long have they been studying English?' },
          { type: 'highlight', variant: 'tip', content: '→ Ответ с for или since!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ТИПИЧНЫЕ ОШИБКИ' },
          { type: 'table', headers: ['Ошибка ✗', 'Правильно ✓', 'Объяснение'], rows: [
            ['I have seen him yesterday', 'I saw him yesterday', 'yesterday = Past Simple!'],
            ['She has lived here since 5 years', 'She has lived here for 5 years', 'период = for'],
            ['I have been knowing her', 'I have known her', 'know = стативный'],
            ['Have you finished already?', 'Have you finished yet?', 'вопрос = yet'],
            ['I haven\'t never been there', 'I have never been there', 'never само отрицание']
          ]},
          { type: 'highlight', variant: 'warning', content: '! С конкретным прошлым временем (yesterday, last week) — Past Simple!' }
        ]
      ],
      examples: [
        { sentence: 'I have finished my homework. I can go out now.', translation: 'Я закончил домашнюю работу. Теперь могу идти гулять.', highlight: true },
        { sentence: 'She has been reading this book for two hours.', translation: 'Она читает эту книгу уже два часа.' },
        { sentence: 'Have you ever been to London? — No, I have never been there.', translation: 'Ты когда-нибудь был в Лондоне? — Нет, никогда там не был.', highlight: true },
        { sentence: 'I have known her since 2010. We have been friends for 14 years.', translation: 'Я знаю её с 2010 года. Мы друзья уже 14 лет.' },
        { sentence: 'He has just arrived. He hasn\'t unpacked yet.', translation: 'Он только что приехал. Он ещё не распаковался.' },
        { sentence: 'I\'m tired because I have been working all day.', translation: 'Я устал, потому что работал весь день.', highlight: true },
        { sentence: 'They have already seen this film. They saw it last week.', translation: 'Они уже видели этот фильм. Они смотрели его на прошлой неделе.' },
        { sentence: 'How long have you been waiting? — I\'ve been waiting for 20 minutes.', translation: 'Как долго ты ждёшь? — Я жду уже 20 минут.' },
        { sentence: 'She has visited 15 countries so far. This year she has been to Spain and Italy.', translation: 'Она посетила 15 стран к настоящему моменту. В этом году она была в Испании и Италии.', highlight: true },
        { sentence: 'We have lived in this house since 2015.', translation: 'Мы живём в этом доме с 2015 года.' },
        { sentence: 'He has been studying English for five years, and he has made great progress.', translation: 'Он изучает английский уже пять лет, и он добился большого прогресса.' },
        { sentence: 'I have never tried sushi, but I have always wanted to.', translation: 'Я никогда не пробовал суши, но всегда хотел.' }
      ],
      practice: [
        { type: 'heading', level: 2, content: 'Практика' },
        { type: 'text', content: '**Задание 1:** Выберите правильную форму (Perfect или Perfect Continuous):' },
        { type: 'code', content: 'I (have lived / have been living) here for 10 years.\nShe (has finished / has been finishing) her work.\nHow long (have you waited / have you been waiting)?\nThey (have known / have been knowing) each other since school.' },
        { type: 'text', content: '**Задание 2:** Вставьте FOR или SINCE:' },
        { type: 'list', items: [
          'I have worked here ________ 2015.',
          'She has been studying ________ three hours.',
          'They have lived in London ________ last year.',
          'We have known each other ________ a long time.'
        ]},
        { type: 'text', content: '**Задание 3:** Вставьте already, yet или just:' },
        { type: 'code', content: 'I have ________ finished my homework.\nHave you called him ________?\nShe has ________ arrived.\nThey haven\'t left ________.' },
        { type: 'text', content: '**Задание 4:** Исправьте ошибки:' },
        { type: 'code', content: '✗ I have seen him yesterday. → ✓ __________\n✗ She has lived here since 5 years. → ✓ __________\n✗ I have been knowing her for long. → ✓ __________\n✗ Have you finished already? → ✓ __________\n✗ I haven\'t never been there. → ✓ __________' },
        { type: 'highlight', variant: 'tip', content: '→ **Совет:** For = период (как долго), since = момент (с какого времени)!' }
      ]
    },
  },
  {
    id: 16,
    title: 'Past Simple and Past Continuous',
    description: 'Прошедшее простое и длительное время в повествовании',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Два прошедших времени для повествования' },
        { type: 'text', content: 'Past Simple используется для завершённых действий в прошлом, а Past Continuous — для действий в процессе. Вместе они создают живое повествование.' },
        { 
          type: 'highlight', 
          variant: 'info',
          content: '**Ключевое различие:** Simple = завершённое действие, Continuous = фон, процесс' 
        }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'PAST SIMPLE — формула и формы' },
          { type: 'formula', content: 'Правильные глаголы: verb + ED\nНеправильные: 2-я форма (V2)' },
          { type: 'table', headers: ['Утверждение', 'Отрицание', 'Вопрос'], rows: [
            ['I worked', 'I didn\'t work', 'Did I work?'],
            ['She went', 'She didn\'t go', 'Did she go?'],
            ['They studied', 'They didn\'t study', 'Did they study?']
          ]},
          { type: 'code', content: 'Правильные: work → worked, study → studied\nНеправильные: go → went, see → saw, have → had' },
          { type: 'highlight', variant: 'success', content: '✓ Одинаковая форма для всех лиц!' }
        ],
        [
          { type: 'heading', level: 3, content: 'PAST CONTINUOUS — формула и формы' },
          { type: 'formula', content: 'was/were + V-ING' },
          { type: 'table', headers: ['Утверждение', 'Отрицание', 'Вопрос'], rows: [
            ['I was working', 'I wasn\'t working', 'Was I working?'],
            ['She was reading', 'She wasn\'t reading', 'Was she reading?'],
            ['They were studying', 'They weren\'t studying', 'Were they studying?']
          ]},
          { type: 'code', content: 'I/he/she/it → WAS + V-ing\nYou/we/they → WERE + V-ing' },
          { type: 'highlight', variant: 'warning', content: '! Was для единственного, were для множественного!' }
        ],
        [
          { type: 'heading', level: 3, content: 'PAST SIMPLE — когда использовать' },
          { type: 'text', content: '**Используется для:**' },
          { type: 'table', headers: ['Случай', 'Пример', 'Перевод'], rows: [
            ['Завершённое действие', 'I went to Paris last year', 'Я ездил в Париж в прошлом году'],
            ['Последовательность действий', 'He woke up, had breakfast, left', 'Он проснулся, позавтракал, ушёл'],
            ['Повторяющиеся действия', 'I visited her every week', 'Я навещал её каждую неделю'],
            ['Прерывающее действие', 'When you called, I left', 'Когда ты позвонил, я ушёл']
          ]},
          { type: 'text', content: '**Signal words:**' },
          { type: 'code', content: 'yesterday, last week/month/year\nago (2 days ago, 5 years ago)\nin 1990, in the past\nwhen (когда что-то прервало)' },
          { type: 'highlight', variant: 'tip', content: '→ Законченное действие в прошлом!' }
        ],
        [
          { type: 'heading', level: 3, content: 'PAST CONTINUOUS — когда использовать' },
          { type: 'text', content: '**Используется для:**' },
          { type: 'table', headers: ['Случай', 'Пример', 'Перевод'], rows: [
            ['Действие в процессе', 'I was reading at 8 PM', 'Я читал в 8 вечера'],
            ['Фон для другого действия', 'I was watching TV when he came', 'Я смотрел ТВ, когда он пришёл'],
            ['Два параллельных действия', 'While I was cooking, she was studying', 'Пока я готовил, она училась'],
            ['Атмосфера повествования', 'The sun was shining, birds were singing', 'Солнце светило, птицы пели']
          ]},
          { type: 'text', content: '**Signal words:**' },
          { type: 'code', content: 'at that moment, at 8 PM yesterday\nwhile (пока)\nwhen (когда что-то прервало)\nas (в то время как)' },
          { type: 'highlight', variant: 'tip', content: '→ Действие было в процессе!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ПРЕРВАННОЕ действие: when' },
          { type: 'text', content: '**Классическая конструкция: фоновое действие прервано:**' },
          { type: 'formula', content: 'was/were + V-ing + WHEN + Past Simple' },
          { type: 'code', content: 'I was watching TV when he called.\n   ↓ фон (длился)      ↓ прервало\n\nShe was sleeping when the alarm rang.\nThey were having dinner when I arrived.' },
          { type: 'table', headers: ['Фон (Continuous)', 'Прерывание (Simple)'], rows: [
            ['I was reading', 'when the phone rang'],
            ['She was cooking', 'when he came home'],
            ['They were playing', 'when it started to rain']
          ]},
          { type: 'highlight', variant: 'warning', content: '⚠ Continuous = фон, Simple = короткое действие, прервавшее фон!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ПАРАЛЛЕЛЬНЫЕ действия: while' },
          { type: 'text', content: '**Два действия происходили одновременно:**' },
          { type: 'formula', content: 'was/were + V-ing + WHILE + was/were + V-ing' },
          { type: 'code', content: 'I was reading while she was watching TV.\n     ↓ процесс          ↓ процесс\n\nWhile I was cooking, he was working.\nShe was studying while they were playing.' },
          { type: 'highlight', variant: 'tip', content: '→ While = оба действия в процессе одновременно!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ПОСЛЕДОВАТЕЛЬНОСТЬ: Past Simple' },
          { type: 'text', content: '**Для последовательных завершённых действий используем только Past Simple:**' },
          { type: 'code', content: 'He woke up, had breakfast and went to work.\n     ↓         ↓                 ↓\n   действие 1  действие 2      действие 3\n\nShe entered the room, sat down and opened the book.\nI came home, took a shower and had dinner.' },
          { type: 'highlight', variant: 'success', content: '✓ Действия следуют друг за другом = все Past Simple!' }
        ],
        [
          { type: 'heading', level: 3, content: 'СОЗДАНИЕ АТМОСФЕРЫ повествования' },
          { type: 'text', content: '**Past Continuous помогает создать картину:**' },
          { type: 'code', content: 'The sun was shining. Birds were singing.\nPeople were walking in the park.\nChildren were playing happily.\nSuddenly, it started to rain. (Simple — прервало)' },
          { type: 'highlight', variant: 'info', content: '→ Continuous = описание сцены, Simple = событие!' }
        ],
        [
          { type: 'heading', level: 3, content: 'СРАВНЕНИЕ Simple vs Continuous' },
          { type: 'comparison', items: [
            { label: 'When I arrived, she cooked dinner', countable: 'она начала готовить после', uncountable: 'When I arrived, she was cooking (уже готовила)' },
            { label: 'I read the book yesterday', countable: 'прочитал полностью', uncountable: 'I was reading the book (процесс, не закончил)' },
            { label: 'He worked from 9 to 5', countable: 'законченный период', uncountable: 'He was working at 3 PM (в процессе в тот момент)' }
          ]},
          { type: 'highlight', variant: 'warning', content: '⚠ Разные времена — разный смысл!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ТИПИЧНЫЕ ОШИБКИ' },
          { type: 'table', headers: ['Ошибка ✗', 'Правильно ✓', 'Объяснение'], rows: [
            ['I was went to work', 'I went to work', 'was нужен только с V-ing'],
            ['When he came, I cooked', 'When he came, I was cooking', 'фон = Continuous'],
            ['While I watched TV, he came', 'While I was watching TV, he came', 'процесс = Continuous'],
            ['I was knowing him', 'I knew him', 'know = стативный'],
            ['Yesterday I am working', 'Yesterday I was working', 'вчера = was/were']
          ]},
          { type: 'highlight', variant: 'warning', content: '! Не путайте was/were с am/is/are!' }
        ]
      ],
      examples: [
        { sentence: 'I was watching TV when he came in and sat next to me.', translation: 'Я смотрел телевизор, когда он вошёл и сел рядом со мной.', highlight: true },
        { sentence: 'While she was cooking dinner, her children were doing their homework.', translation: 'Пока она готовила ужин, её дети делали домашнюю работу.' },
        { sentence: 'Yesterday at 8 PM, I was having dinner with my family.', translation: 'Вчера в 8 вечера я ужинал с семьёй.' },
        { sentence: 'He woke up, had a shower, got dressed and left for work.', translation: 'Он проснулся, принял душ, оделся и ушёл на работу.', highlight: true },
        { sentence: 'The sun was shining and birds were singing when we arrived.', translation: 'Солнце светило и птицы пели, когда мы приехали.' },
        { sentence: 'I was reading a book when suddenly the lights went out.', translation: 'Я читал книгу, когда внезапно погас свет.', highlight: true },
        { sentence: 'What were you doing at 10 o\'clock last night? — I was sleeping.', translation: 'Что ты делал вчера в 10 вечера? — Я спал.' },
        { sentence: 'She didn\'t hear the phone because she was listening to music.', translation: 'Она не услышала телефон, потому что слушала музыку.' },
        { sentence: 'While I was walking home, I met an old friend.', translation: 'Пока я шёл домой, я встретил старого друга.' },
        { sentence: 'They were living in Paris when their son was born.', translation: 'Они жили в Париже, когда родился их сын.' },
        { sentence: 'I saw her yesterday. She was waiting for the bus.', translation: 'Я видел её вчера. Она ждала автобус.', highlight: true },
        { sentence: 'The doorbell rang while we were having breakfast.', translation: 'Дверной звонок зазвонил, пока мы завтракали.' }
      ],
      practice: [
        { type: 'heading', level: 2, content: 'Практика' },
        { type: 'text', content: '**Задание 1:** Выберите правильное время:' },
        { type: 'code', content: 'I (read/was reading) when he (called/was calling).\nShe (cooked/was cooking) while he (worked/was working).\nThey (went/were going) to school yesterday.\nWhat (did you do/were you doing) at 8 PM?' },
        { type: 'text', content: '**Задание 2:** Раскройте скобки:' },
        { type: 'list', items: [
          'When I ________ (arrive), she ________ (cook) dinner.',
          'While they ________ (play), it ________ (start) to rain.',
          'He ________ (wake up), ________ (have) breakfast and ________ (leave).',
          'I ________ (not/hear) the phone because I ________ (listen) to music.'
        ]},
        { type: 'text', content: '**Задание 3:** Исправьте ошибки:' },
        { type: 'code', content: '✗ I was went to work yesterday. → ✓ __________\n✗ When he came, I cooked dinner. → ✓ __________\n✗ While I watched TV, he came. → ✓ __________\n✗ Yesterday I am working. → ✓ __________' },
        { type: 'text', content: '**Задание 4:** Составьте рассказ о вчерашнем вечере, используя оба времени.' },
        { type: 'highlight', variant: 'tip', content: '→ **Совет:** Continuous для фона, Simple для событий!' }
      ]
    },
  },
  {
    id: 17,
    title: 'Past Perfect and Past Perfect Continuous',
    description: 'Прошедшее совершенное и длительное совершенное, временные связки',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Past Perfect — предпрошедшее время' },
        { type: 'text', content: 'Past Perfect показывает, что одно действие произошло РАНЬШЕ другого действия в прошлом. Past Perfect Continuous подчёркивает длительность действия до момента в прошлом.' },
        { 
          type: 'highlight', 
          variant: 'warning',
          content: '⚠ **Главное:** Нужно ДВА действия в прошлом, одно раньше другого!' 
        }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'PAST PERFECT — формула и формы' },
          { type: 'formula', content: 'had + V3 (Past Participle)' },
          { type: 'table', headers: ['Утверждение', 'Отрицание', 'Вопрос'], rows: [
            ['I had worked', 'I hadn\'t worked', 'Had I worked?'],
            ['She had finished', 'She hadn\'t finished', 'Had she finished?'],
            ['They had left', 'They hadn\'t left', 'Had they left?']
          ]},
          { type: 'code', content: 'had worked — работал (до того)\nhad gone — ушёл (до того)\nhad been — был (до того)\nhad seen — видел (до того)' },
          { type: 'highlight', variant: 'success', content: '✓ HAD одинаковый для всех лиц!' }
        ],
        [
          { type: 'heading', level: 3, content: 'PAST PERFECT CONTINUOUS — формула' },
          { type: 'formula', content: 'had + BEEN + V-ING' },
          { type: 'table', headers: ['Утверждение', 'Отрицание', 'Вопрос'], rows: [
            ['I had been working', 'I hadn\'t been working', 'Had I been working?'],
            ['She had been reading', 'She hadn\'t been reading', 'Had she been reading?'],
            ['They had been studying', 'They hadn\'t been studying', 'Had they been studying?']
          ]},
          { type: 'highlight', variant: 'tip', content: '→ BEEN обязательно!' }
        ],
        [
          { 
            type: 'heading', 
            level: 3, 
            content: 'ДВА ДЕЙСТВИЯ в прошлом — последовательность' 
          },
          { 
            type: 'text', 
            content: '**Past Perfect для БОЛЕЕ РАННЕГО действия:**' 
          },
          { 
            type: 'formula', 
            content: 'Действие 1 (раньше) → Past Perfect\nДействие 2 (позже) → Past Simple' 
          },
          { 
            type: 'code', 
            content: 'When we arrived, the film had started.\n    [позже]              [раньше]\n    (Simple)             (Perfect)\n\nBy the time I got home, they had left.\n    [позже]                [раньше]\n    (Simple)               (Perfect)' 
          },
          { 
            type: 'table', 
            headers: ['Раньше (Past Perfect)', 'Позже (Past Simple)'], 
            rows: [
              ['The film had started', 'when we arrived'],
              ['She had left', 'before I came'],
              ['I had finished', 'by the time he called']
            ]
          }
        ],
        [
          { type: 'heading', level: 3, content: 'AFTER — после того как' },
          { type: 'text', content: '**С союзом AFTER чаще используем Past Perfect:**' },
          { type: 'formula', content: 'After + Past Perfect, Past Simple' },
          { type: 'code', content: 'After she had finished dinner, she watched TV.\n         ↓ сначала                 ↓ потом\n\nAfter I had done my homework, I went out.\nAfter they had left, we cleaned the room.' },
          { type: 'highlight', variant: 'tip', content: '→ After = сначала Perfect, потом Simple' }
        ],
        [
          { type: 'heading', level: 3, content: 'BEFORE — перед тем как' },
          { type: 'text', content: '**С BEFORE можно использовать оба времени:**' },
          { type: 'code', content: 'ВАРИАНТ 1 (Past Perfect):\nI had done homework before I went out.\n   ↓ сначала              ↓ потом\n\nВАРИАНТ 2 (оба Past Simple, порядок ясен):\nI did homework before I went out.' },
          { type: 'highlight', variant: 'info', content: '→ С before порядок часто ясен из контекста' }
        ],
        [
          { type: 'heading', level: 3, content: 'BY THE TIME — к тому времени как' },
          { type: 'text', content: '**By the time подчёркивает завершённость:**' },
          { type: 'formula', content: 'By the time + Past Simple, Past Perfect' },
          { type: 'code', content: 'By the time I got home, they had left.\nBy the time she arrived, the meeting had finished.\nBy the time we woke up, it had stopped raining.' },
          { type: 'table', headers: ['Момент (by the time)', 'Что уже случилось (Perfect)'], rows: [
            ['by the time I arrived', 'the train had left'],
            ['by the time we got there', 'the show had started'],
            ['by the time he called', 'I had gone to bed']
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'PAST PERFECT CONTINUOUS — длительность' },
          { type: 'text', content: '**Показывает, как долго что-то длилось ДО момента в прошлом:**' },
          { type: 'code', content: 'He was tired because he had been working all day.\n                          ↓ причина (длился весь день)\n\nShe was dirty because she had been gardening.\nThey were exhausted because they had been running.' },
          { type: 'highlight', variant: 'tip', content: '→ Объясняет ПРИЧИНУ состояния в прошлом!' }
        ],
        [
          { type: 'heading', level: 3, content: 'СРАВНЕНИЕ: Perfect vs Perfect Continuous' },
          { type: 'comparison', items: [
            { label: 'I had read the book', countable: 'результат (книга прочитана)', uncountable: 'I had been reading (процесс чтения)' },
            { label: 'She had painted the room', countable: 'результат (комната покрашена)', uncountable: 'She had been painting (поэтому в краске)' },
            { label: 'They had lived there', countable: 'факт проживания', uncountable: 'They had been living (длительность)' }
          ]},
          { type: 'highlight', variant: 'info', content: '→ Perfect = результат, Perfect Continuous = процесс/длительность' }
        ],
        [
          { type: 'heading', level: 3, content: 'КОГДА Past Perfect НЕ нужен' },
          { type: 'text', content: '**Если порядок действий ясен, можно использовать только Past Simple:**' },
          { type: 'code', content: 'МОЖНО:\nI got up, had breakfast and went to work.\n(последовательность ясна → все Past Simple)\n\nI had breakfast after I got up.\n(after показывает порядок → Past Simple достаточно)' },
          { type: 'highlight', variant: 'warning', content: '! Не перегружайте речь Past Perfect без необходимости!' }
        ],
        [
          { type: 'heading', level: 3, content: 'СТАТИВНЫЕ глаголы с Past Perfect' },
          { type: 'text', content: '**Со стативными используем Perfect, НЕ Perfect Continuous:**' },
          { type: 'table', headers: ['Стативный', 'Past Perfect ✓', 'Perfect Continuous ✗'], rows: [
            ['know', 'I had known her for years', '✗ I had been knowing'],
            ['love', 'They had loved each other', '✗ They had been loving'],
            ['have (иметь)', 'She had had that car for 5 years', '✗ She had been having']
          ]},
          { type: 'highlight', variant: 'warning', content: '⚠ Стативные = только Perfect!' }
        ],
        [
          { type: 'heading', level: 3, content: 'ТИПИЧНЫЕ ОШИБКИ' },
          { type: 'table', headers: ['Ошибка ✗', 'Правильно ✓', 'Объяснение'], rows: [
            ['When I came, she left', 'When I came, she had left', 'она ушла ДО моего прихода'],
            ['After I went out, I did homework', 'After I had done homework, I went out', 'сначала homework'],
            ['I have been there before', 'I had been there before', 'прошлое = had'],
            ['He was tired. He worked', 'He was tired. He had been working', 'причина = Perfect Continuous'],
            ['Had you ate breakfast?', 'Had you eaten breakfast?', '3-я форма = eaten']
          ]},
          { type: 'highlight', variant: 'warning', content: '! Самая частая ошибка — использовать Past Simple вместо Past Perfect!' }
        ]
      ],
      examples: [
        { sentence: 'When we arrived at the cinema, the film had already started.', translation: 'Когда мы пришли в кинотеатр, фильм уже начался.', highlight: true },
        { sentence: 'He was tired because he had been working all day without a break.', translation: 'Он устал, потому что работал весь день без перерыва.' },
        { sentence: 'After she had finished dinner, she washed the dishes and watched TV.', translation: 'После того как она закончила ужин, она помыла посуду и посмотрела телевизор.', highlight: true },
        { sentence: 'By the time I got home, my family had already eaten dinner.', translation: 'К тому времени как я пришёл домой, моя семья уже поужинала.' },
        { sentence: 'I had never seen such a beautiful place before I visited Bali.', translation: 'Я никогда не видел такого красивого места, пока не посетил Бали.', highlight: true },
        { sentence: 'She had been living in Paris for 5 years when she met her husband.', translation: 'Она жила в Париже уже 5 лет, когда встретила своего мужа.' },
        { sentence: 'They couldn\'t get in because they had lost their keys.', translation: 'Они не могли войти, потому что потеряли ключи.' },
        { sentence: 'Before he came to Moscow, he had studied Russian for two years.', translation: 'Перед тем как приехать в Москву, он изучал русский два года.' },
        { sentence: 'I knew the town well because I had been there many times before.', translation: 'Я хорошо знал город, потому что бывал там много раз раньше.' },
        { sentence: 'When I finally found my phone, I realized someone had been using it.', translation: 'Когда я наконец нашёл свой телефон, я понял, что кто-то им пользовался.', highlight: true },
        { sentence: 'Had you ever travelled abroad before you went to Spain?', translation: 'Ты когда-нибудь ездил за границу до того, как поехал в Испанию?' },
        { sentence: 'The ground was wet because it had been raining all night.', translation: 'Земля была мокрой, потому что всю ночь шёл дождь.' }
      ],
      practice: [
        { type: 'heading', level: 2, content: 'Практика' },
        { type: 'text', content: '**Задание 1:** Выберите правильную форму (Past Simple или Past Perfect):' },
        { type: 'code', content: 'When I (arrived/had arrived), she (left/had left).\nAfter he (did/had done) homework, he (went/had gone) out.\nBy the time we (got/had got) there, the show (started/had started).\nI (was/had been) tired because I (worked/had been working) all day.' },
        { type: 'text', content: '**Задание 2:** Соедините предложения, используя Past Perfect:' },
        { type: 'list', items: [
          'I finished homework. Then I went out. → After I __________ homework, I went out.',
          'She left. Then I arrived. → When I arrived, she __________ .',
          'They ate dinner. Then I came. → By the time I came, they __________ dinner.',
          'He worked all day. He was tired. → He was tired because he __________ all day.'
        ]},
        { type: 'text', content: '**Задание 3:** Выберите Perfect или Perfect Continuous:' },
        { type: 'code', content: 'She was dirty because she (had painted / had been painting).\nI (had read / had been reading) the book, so I knew the ending.\nHe (had lived / had been living) there for 10 years when he moved.\nThey were tired because they (had run / had been running).' },
        { type: 'text', content: '**Задание 4:** Исправьте ошибки:' },
        { type: 'code', content: '✗ When I came, she left. → ✓ __________\n✗ After I went out, I did homework. → ✓ __________\n✗ I have been there before I came here. → ✓ __________\n✗ He had ate dinner. → ✓ __________' },
        { type: 'highlight', variant: 'tip', content: '→ **Совет:** Past Perfect = более раннее действие из двух!' }
      ]
    },
  },
  {
    id: 18,
    title: 'Future Simple: Will vs Going to',
    description: 'Будущее время: will и going to',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Два способа выразить будущее' },
        { type: 'text', content: 'В английском для будущего используют WILL и GOING TO. Выбор зависит от того, спонтанное это решение или план, есть ли признаки события.' },
        { 
          type: 'highlight', 
          variant: 'warning',
          content: '⚠ **Главное различие:** WILL = спонтанно/мнение, GOING TO = план/признаки' 
        }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'WILL — формула и формы' },
          { type: 'formula', content: 'will + base verb (V1)' },
          { type: 'table', headers: ['Утверждение', 'Отрицание', 'Вопрос'], rows: [
            ['I will work / I\'ll work', 'I won\'t work', 'Will I work?'],
            ['She will go / She\'ll go', 'She won\'t go', 'Will she go?']
          ]},
          { type: 'highlight', variant: 'success', content: '✓ Will одинаковый для всех лиц!' }
        ],
        [
          { type: 'heading', level: 3, content: 'GOING TO — формула и формы' },
          { type: 'formula', content: 'am/is/are + GOING TO + base verb' },
          { type: 'table', headers: ['Утверждение', 'Отрицание', 'Вопрос'], rows: [
            ['I am going to work', 'I\'m not going to work', 'Am I going to work?'],
            ['She is going to go', 'She isn\'t going to go', 'Is she going to go?']
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'WILL — когда использовать' },
          { type: 'table', headers: ['Случай', 'Пример'], rows: [
            ['Спонтанное решение', 'I\'ll help you! (решил сейчас)'],
            ['Обещание', 'I\'ll call you tomorrow'],
            ['Предсказание (мнение)', 'I think it will rain'],
            ['Предложение помощи', 'I\'ll open the door']
          ]},
          { type: 'highlight', variant: 'tip', content: '→ Will = решение принимается В МОМЕНТ речи!' }
        ],
        [
          { type: 'heading', level: 3, content: 'GOING TO — когда использовать' },
          { type: 'table', headers: ['Случай', 'Пример'], rows: [
            ['План/намерение', 'I\'m going to study medicine'],
            ['Признаки события', 'Look! It\'s going to rain'],
            ['Решение принято заранее', 'We\'re going to buy a car']
          ]},
          { type: 'highlight', variant: 'tip', content: '→ Going to = план уже есть ИЛИ видны признаки!' }
        ],
        [
          { type: 'heading', level: 3, content: 'СРАВНЕНИЕ: Will vs Going to' },
          { type: 'comparison', items: [
            { label: 'Телефон звонит', countable: 'I\'ll answer it (спонтанно)', uncountable: '— нет going to' },
            { label: 'Планы на лето', countable: '— нет will', uncountable: 'I\'m going to visit Italy' },
            { label: 'Предсказание', countable: 'I think he will win (мнение)', uncountable: 'He\'s going to win (по фактам)' }
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'ОБЕЩАНИЯ — только WILL' },
          { type: 'code', content: 'I\'ll call you tomorrow.\nI promise I\'ll help you.\nI\'ll open the window.' },
          { type: 'highlight', variant: 'warning', content: '! НЕ говорите "I\'m going to call you" для обещания!' }
        ],
        [
          { type: 'heading', level: 3, content: 'THINK, HOPE, EXPECT + WILL' },
          { type: 'code', content: 'I think it will rain tomorrow.\nI hope she will come.\nI expect he will win.' }
        ],
        [
          { type: 'heading', level: 3, content: 'ТИПИЧНЫЕ ОШИБКИ' },
          { type: 'table', headers: ['Ошибка ✗', 'Правильно ✓'], rows: [
            ['I will to go', 'I will go'],
            ['I\'m going to call you (обещание)', 'I\'ll call you'],
            ['Look! It will rain!', 'Look! It\'s going to rain!'],
            ['I go to study medicine', 'I\'m going to study']
          ]}
        ]
      ],
      examples: [
        { sentence: 'The phone is ringing. — I\'ll answer it!', translation: 'Телефон звонит. — Я отвечу! (спонтанно)', highlight: true },
        { sentence: 'I\'m going to study medicine next year. That\'s my plan.', translation: 'Я собираюсь изучать медицину в следующем году. Это мой план.' },
        { sentence: 'Look at those dark clouds! It\'s going to rain soon.', translation: 'Посмотри на эти тёмные тучи! Скоро пойдёт дождь.', highlight: true },
        { sentence: 'I think we will win the game. We\'re playing really well.', translation: 'Я думаю, мы выиграем игру. Мы играем очень хорошо.' },
        { sentence: 'I promise I\'ll call you tomorrow. I won\'t forget!', translation: 'Обещаю, я позвоню тебе завтра. Я не забуду!' },
        { sentence: 'What are your plans for the summer? — We\'re going to visit Italy.', translation: 'Какие у вас планы на лето? — Мы собираемся посетить Италию.' },
        { sentence: 'Watch out! That box is going to fall!', translation: 'Осторожно! Эта коробка сейчас упадёт!' },
        { sentence: 'I hope she will like her present.', translation: 'Я надеюсь, ей понравится подарок.' },
        { sentence: 'Don\'t worry. Everything will be fine.', translation: 'Не волнуйся. Всё будет хорошо.', highlight: true },
        { sentence: 'She\'s going to be a doctor. She\'s studying medicine.', translation: 'Она собирается стать врачом. Она изучает медицину.' },
        { sentence: 'It\'s cold in here. — I\'ll close the window.', translation: 'Здесь холодно. — Я закрою окно.' },
        { sentence: 'I expect the meeting will take about an hour.', translation: 'Я ожидаю, что встреча займёт около часа.' }
      ],
      practice: [
        { type: 'heading', level: 2, content: 'Практика' },
        { type: 'text', content: '**Задание 1:** Выберите will или going to:' },
        { type: 'code', content: 'The phone is ringing. — I (will answer / am going to answer) it.\nWhat are your plans? — I (will buy / am going to buy) a car next month.\nLook at those clouds! It (will rain / is going to rain).\nI think he (will win / is going to win) the competition.' },
        { type: 'text', content: '**Задание 2:** Заполните правильной формой:' },
        { type: 'list', items: [
          'Обещание: I promise I ________ (call) you.',
          'План: We ________ (visit) Paris next summer.',
          'Признаки: Watch out! You ________ (fall)!',
          'Спонтанно: I\'m tired. — I ________ (make) some coffee.'
        ]},
        { type: 'text', content: '**Задание 3:** Исправьте ошибки:' },
        { type: 'code', content: '✗ I will to help you. → ✓ __________\n✗ Look! It will rain! → ✓ __________\n✗ I\'m going to call you (обещание). → ✓ __________\n✗ I go to study medicine. → ✓ __________' },
        { type: 'highlight', variant: 'tip', content: '→ **Совет:** Спонтанно/обещание = will, план/признаки = going to!' }
      ]
    },
  },
  {
    id: 19,
    title: 'Future Continuous and Future Perfect',
    description: 'Будущее длительное и совершенное время',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Действия в процессе и завершённые к моменту в будущем' },
        { type: 'text', content: 'Future Continuous описывает действие в процессе в определённый момент будущего. Future Perfect - завершённое действие к моменту в будущем.' },
        { type: 'highlight', variant: 'info', content: '**Future Continuous:** действие будет происходить в конкретный момент\n**Future Perfect:** действие завершится к определённому моменту' }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'Future Continuous' },
          { type: 'formula', content: 'will be + V-ing' },
          { type: 'text', content: 'Используется для действия в процессе в определённый момент будущего.' },
          { type: 'table', headers: ['Форма', 'Пример', 'Перевод'], rows: [
            ['Утвердительная', 'I will be working', 'Я буду работать'],
            ['Отрицательная', 'I won\'t be sleeping', 'Я не буду спать'],
            ['Вопросительная', 'Will you be studying?', 'Ты будешь учиться?']
          ]},
          { type: 'highlight', variant: 'tip', content: 'Ключевые слова: **this time tomorrow**, **at 5 PM tomorrow**, **next Monday at 8**' }
        ],
        [
          { type: 'heading', level: 3, content: 'Future Perfect' },
          { type: 'formula', content: 'will have + V3' },
          { type: 'text', content: 'Используется для действия, которое завершится к определённому моменту в будущем.' },
          { type: 'table', headers: ['Форма', 'Пример', 'Перевод'], rows: [
            ['Утвердительная', 'I will have finished', 'Я закончу (к моменту)'],
            ['Отрицательная', 'I won\'t have completed', 'Я не завершу'],
            ['Вопросительная', 'Will you have done it?', 'Ты сделаешь это?']
          ]},
          { type: 'highlight', variant: 'tip', content: 'Ключевые слова: **by 2030**, **by the time**, **by next week**, **in two years**' }
        ],
        [
          { type: 'heading', level: 3, content: 'Present Continuous для будущего' },
          { type: 'formula', content: 'am/is/are + V-ing' },
          { type: 'text', content: 'Используется для договорённостей и запланированных встреч в будущем.' },
          { type: 'list', items: [
            'We\'re having dinner at 7 PM (договорились)',
            'I\'m meeting John tomorrow (запланировано)',
            'She\'s flying to Paris next week (билет куплен)'
          ]}
        ]
      ],
      examples: [
        { sentence: 'This time tomorrow I\'ll be lying on the beach.', translation: 'Завтра в это время я буду лежать на пляже.', highlight: true },
        { sentence: 'By 2030, I\'ll have finished my degree.', translation: 'К 2030 году я закончу обучение.', highlight: true },
        { sentence: 'We\'re having dinner with friends at 7 PM.', translation: 'Мы ужинаем с друзьями в 7 вечера.' },
        { sentence: 'Don\'t call at 8. I\'ll be having a meeting.', translation: 'Не звони в 8. У меня будет встреча.' },
        { sentence: 'By next month, I will have read 20 books.', translation: 'К следующему месяцу я прочитаю 20 книг.' }
      ],
      practice: [
        { type: 'text', content: '**Задание:** Выберите правильное время:' },
        { type: 'list', items: [
          'By next year, I ___ (finish) this course.',
          'Tomorrow at 6, I ___ (work).',
          'She ___ (meet) the client at 3 PM tomorrow.',
          'By 2025, we ___ (live) here for 10 years.'
        ]}
      ]
    },
  },
  {
    id: 20,
    title: 'Prepositions of Time and Place',
    description: 'Предлоги времени и места',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Предлоги времени и места' },
        { type: 'text', content: 'Предлоги времени и места имеют строгие правила использования.' },
        { type: 'highlight', variant: 'warning', content: '! Запомните систему **IN/ON/AT** - она логична и последовательна' }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'Предлоги времени' },
          { type: 'table', headers: ['Предлог', 'Использование', 'Примеры'], rows: [
            ['IN', 'года, месяцы, времена года, части дня', 'in 2020, in May, in summer, in the morning'],
            ['ON', 'дни недели, даты, праздники', 'on Monday, on 5th May, on Christmas Day'],
            ['AT', 'точное время, ночь, выходные', 'at 5 PM, at noon, at night, at the weekend']
          ]},
          { type: 'highlight', variant: 'tip', content: '✓ Исключения: **at night**, **in the morning/afternoon/evening**' }
        ],
        [
          { type: 'heading', level: 3, content: 'Предлоги места' },
          { type: 'table', headers: ['Предлог', 'Использование', 'Примеры'], rows: [
            ['IN', 'страны, города, здания (внутри)', 'in Russia, in Moscow, in the room'],
            ['ON', 'улицы, этажи, поверхности', 'on Baker Street, on the 2nd floor, on the table'],
            ['AT', 'конкретные места, адреса', 'at the station, at home, at 10 Oxford Street']
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'Предлоги движения' },
          { type: 'table', headers: ['Предлог', 'Значение', 'Пример'], rows: [
            ['to', 'направление (куда)', 'go to school'],
            ['from', 'откуда', 'from Moscow'],
            ['into', 'внутрь', 'go into the room'],
            ['out of', 'из (изнутри)', 'come out of the house']
          ]}
        ]
      ],
      examples: [
        { sentence: 'I was born in 1995.', translation: 'Я родился в 1995 году.', highlight: true },
        { sentence: 'The meeting is on Monday.', translation: 'Встреча в понедельник.', highlight: true },
        { sentence: 'I\'ll meet you at the station at 5 PM.', translation: 'Встретимся на станции в 5 вечера.', highlight: true },
        { sentence: 'She lives in London on Oxford Street.', translation: 'Она живёт в Лондоне на Оксфорд-стрит.' }
      ],
      practice: [
        { type: 'text', content: '**Задание:** Вставьте правильные предлоги:' },
        { type: 'list', items: [
          'I was born ___ 1990 ___ May.',
          'The book is ___ the table.',
          'See you ___ Monday ___ 3 PM.',
          'She lives ___ Paris ___ the 5th floor.'
        ]}
      ]
    },
  },
  {
    id: 21,
    title: 'Common Phrasal Verbs',
    description: 'Распространённые фразовые глаголы',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Фразовые глаголы' },
        { type: 'text', content: 'Фразовые глаголы - это глагол + предлог/частица с новым значением.' },
        { type: 'highlight', variant: 'info', content: '**Важно:** Значение фразового глагола часто невозможно понять из отдельных слов!' }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'Разделяемые фразовые глаголы' },
          { type: 'text', content: 'Можно ставить дополнение между глаголом и частицей.' },
          { type: 'table', headers: ['Phrasal Verb', 'Значение', 'Пример'], rows: [
            ['turn on/off', 'включить/выключить', 'turn it on / turn on the light'],
            ['fill in', 'заполнить', 'fill in the form / fill it in'],
            ['put on/off', 'надеть/отложить', 'put on your coat / put it on'],
            ['take off', 'снять', 'take off your shoes / take them off']
          ]},
          { type: 'highlight', variant: 'tip', content: '✓ С местоимениями: **turn it on** (НЕ: turn on it)' }
        ],
        [
          { type: 'heading', level: 3, content: 'Неразделяемые фразовые глаголы' },
          { type: 'text', content: 'Глагол и предлог всегда вместе.' },
          { type: 'table', headers: ['Phrasal Verb', 'Значение', 'Пример'], rows: [
            ['look after', 'присматривать', 'look after the baby'],
            ['look for', 'искать', 'look for my keys'],
            ['look into', 'изучать', 'look into the problem'],
            ['come across', 'наткнуться', 'come across an article']
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'Распространённые фразовые глаголы' },
          { type: 'table', headers: ['Phrasal Verb', 'Значение', 'Пример'], rows: [
            ['get up', 'вставать', 'I get up at 7 AM'],
            ['give up', 'сдаваться', 'Don\'t give up!'],
            ['put off', 'откладывать', 'put off the meeting'],
            ['find out', 'выяснить', 'find out the truth'],
            ['look up', 'искать (в словаре)', 'look up a word']
          ]}
        ]
      ],
      examples: [
        { sentence: 'I get up at 7 AM every day.', translation: 'Я встаю в 7 утра каждый день.', highlight: true },
        { sentence: 'Can you look after my dog while I\'m away?', translation: 'Можешь присмотреть за моей собакой, пока меня нет?', highlight: true },
        { sentence: 'Please fill in the form.', translation: 'Пожалуйста, заполните форму.' },
        { sentence: 'I need to look up this word in the dictionary.', translation: 'Мне нужно найти это слово в словаре.' }
      ],
      practice: [
        { type: 'text', content: '**Задание:** Замените фразовыми глаголами:' },
        { type: 'list', items: [
          'wake up → in the morning',
          'search for → information',
          'postpone → the meeting',
          'remove → your shoes'
        ]}
      ]
    },
  },
  {
    id: 22,
    title: 'Modal Verbs: Ability and Permission',
    description: 'Модальные глаголы: способность и разрешение',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Способность и разрешение' },
        { type: 'text', content: 'Can, could, may и might выражают способность, возможность и разрешение.' },
        { type: 'highlight', variant: 'info', content: '**Can/Could** → способность\n**May/Might** → разрешение (формально)' }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'CAN - способность и разрешение' },
          { type: 'table', headers: ['Использование', 'Пример', 'Перевод'], rows: [
            ['Способность (сейчас)', 'I can swim', 'Я умею плавать'],
            ['Разрешение (неформально)', 'Can I use your phone?', 'Могу я использовать телефон?'],
            ['Возможность', 'It can be difficult', 'Это может быть сложно'],
            ['Невозможность (can\'t)', 'I can\'t speak Chinese', 'Я не говорю по-китайски']
          ]},
          { type: 'formula', content: 'can + V (инфинитив без to)' }
        ],
        [
          { type: 'heading', level: 3, content: 'COULD - прошлое и вежливость' },
          { type: 'table', headers: ['Использование', 'Пример', 'Перевод'], rows: [
            ['Способность (прошлое)', 'I could swim when I was 5', 'Я умел плавать в 5 лет'],
            ['Вежливая просьба', 'Could you help me?', 'Не могли бы вы помочь?'],
            ['Возможность', 'It could rain', 'Может пойти дождь'],
            ['Невозможность (couldn\'t)', 'I couldn\'t find it', 'Я не мог найти это']
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'MAY/MIGHT - разрешение и возможность' },
          { type: 'table', headers: ['Модальный', 'Использование', 'Пример'], rows: [
            ['May', 'формальное разрешение', 'May I come in?'],
            ['May', 'возможность (50%)', 'It may rain'],
            ['Might', 'меньшая вероятность', 'It might snow'],
            ['May not', 'запрет (формально)', 'You may not leave']
          ]},
          { type: 'highlight', variant: 'tip', content: '✓ **May** более формально, чем **can**' }
        ]
      ],
      examples: [
        { sentence: 'I can swim very well.', translation: 'Я умею очень хорошо плавать.', highlight: true },
        { sentence: 'I could swim when I was five.', translation: 'Я умел плавать, когда мне было пять.', highlight: true },
        { sentence: 'Can I use your phone?', translation: 'Могу я воспользоваться твоим телефоном?' },
        { sentence: 'May I come in?', translation: 'Можно войти?' }
      ],
      practice: [
        { type: 'text', content: '**Задание:** Выберите правильный модальный глагол:' },
        { type: 'list', items: [
          'I (can/could) speak French now.',
          '(May/Can) I ask a question? (формально)',
          'She (can/could) play piano when she was 7.',
          'It (may/might) rain tomorrow. (вероятно)'
        ]}
      ]
    },
  },
  {
    id: 23,
    title: 'Modal Verbs: Obligation and Advice',
    description: 'Модальные глаголы: обязанность и совет',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Обязанность, необходимость и советы' },
        { type: 'text', content: 'Must, have to, should выражают разные степени обязанности и совета.' },
        { type: 'highlight', variant: 'warning', content: '! **Mustn\'t ≠ don\'t have to**\nmustn\'t = запрет\ndon\'t have to = не обязательно' }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'MUST - сильная необходимость' },
          { type: 'table', headers: ['Использование', 'Пример', 'Перевод'], rows: [
            ['Личная необходимость', 'I must go now', 'Мне нужно идти'],
            ['Логический вывод', 'He must be tired', 'Он, должно быть, устал'],
            ['Запрет (mustn\'t)', 'You mustn\'t smoke here', 'Здесь нельзя курить'],
            ['Сильный совет', 'You must see this film', 'Ты должен посмотреть этот фильм']
          ]},
          { type: 'formula', content: 'must + V (инфинитив без to)' }
        ],
        [
          { type: 'heading', level: 3, content: 'HAVE TO - внешняя обязанность' },
          { type: 'table', headers: ['Использование', 'Пример', 'Перевод'], rows: [
            ['Правила, законы', 'I have to wear a uniform', 'Я должен носить форму'],
            ['Нет обязанности', 'You don\'t have to come', 'Тебе не обязательно приходить'],
            ['Прошлое', 'I had to work', 'Мне пришлось работать'],
            ['Будущее', 'I will have to study', 'Мне придётся учиться']
          ]},
          { type: 'highlight', variant: 'info', content: '✓ **Have to** изменяется по временам, **must** - нет' }
        ],
        [
          { type: 'heading', level: 3, content: 'SHOULD - совет и рекомендация' },
          { type: 'table', headers: ['Использование', 'Пример', 'Перевод'], rows: [
            ['Совет', 'You should study harder', 'Тебе следует учиться усерднее'],
            ['Рекомендация', 'You should see a doctor', 'Тебе стоит обратиться к врачу'],
            ['Ожидание', 'He should be here soon', 'Он должен скоро прийти'],
            ['Отрицание', 'You shouldn\'t eat so much', 'Тебе не следует так много есть']
          ]}
        ]
      ],
      examples: [
        { sentence: 'You should study harder.', translation: 'Тебе следует учиться усерднее.', highlight: true },
        { sentence: 'I must go now. It\'s late.', translation: 'Мне нужно идти. Уже поздно.', highlight: true },
        { sentence: 'You have to wear a uniform at school.', translation: 'В школе нужно носить форму.', highlight: true },
        { sentence: 'You mustn\'t park here. It\'s forbidden.', translation: 'Здесь нельзя парковаться. Это запрещено.' }
      ],
      practice: [
        { type: 'text', content: '**Задание:** Выберите правильный модальный глагол:' },
        { type: 'list', items: [
          'You (must/should) see a doctor. (совет)',
          'You (mustn\'t/don\'t have to) come if you\'re busy.',
          'I (must/have to) wear a tie at work. (правило)',
          'You (mustn\'t/shouldn\'t) be late. (запрет)'
        ]}
      ]
    },
  },
  {
    id: 24,
    title: 'Zero and First Conditionals',
    description: 'Условные предложения нулевого и первого типа',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Реальные условия' },
        { type: 'text', content: 'Zero Conditional - общие истины и факты. First Conditional - реальные ситуации в будущем.' },
        { type: 'highlight', variant: 'info', content: '**Zero:** всегда верно (факты)\n**First:** реально в будущем' }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'Zero Conditional - общие истины' },
          { type: 'formula', content: 'If + Present Simple, Present Simple' },
          { type: 'text', content: 'Используется для фактов, законов природы, общих истин.' },
          { type: 'table', headers: ['Структура', 'Пример', 'Перевод'], rows: [
            ['If + Present, Present', 'If you heat water, it boils', 'Если нагреть воду, она закипает'],
            ['When + Present, Present', 'When it rains, it gets wet', 'Когда идет дождь, становится мокро'],
            ['If + Present, Imperative', 'If you see him, tell him', 'Если увидишь его, скажи ему']
          ]},
          { type: 'highlight', variant: 'tip', content: '✓ Можно использовать **when** вместо **if**' }
        ],
        [
          { type: 'heading', level: 3, content: 'First Conditional - реальное будущее' },
          { type: 'formula', content: 'If + Present Simple, will + V' },
          { type: 'text', content: 'Используется для реальных ситуаций в будущем.' },
          { type: 'table', headers: ['Структура', 'Пример', 'Перевод'], rows: [
            ['If + Present, will + V', 'If it rains, I will stay home', 'Если будет дождь, я останусь дома'],
            ['If + Present, may/might', 'If you study, you may pass', 'Если будешь учиться, можешь сдать'],
            ['If + Present, Imperative', 'If you see him, call me', 'Если увидишь его, позвони мне']
          ]},
          { type: 'highlight', variant: 'warning', content: '! В условной части НЕ используется **will**: If it **will rain** ✗' }
        ],
        [
          { type: 'heading', level: 3, content: 'Порядок частей' },
          { type: 'text', content: 'Условие может быть в начале или в конце предложения:' },
          { type: 'list', items: [
            'If it rains, we will stay home. (запятая)',
            'We will stay home if it rains. (без запятой)'
          ]}
        ]
      ],
      examples: [
        { sentence: 'If you heat water to 100°C, it boils.', translation: 'Если нагреть воду до 100°C, она закипает.', highlight: true },
        { sentence: 'If it rains tomorrow, we will stay home.', translation: 'Если завтра будет дождь, мы останемся дома.', highlight: true },
        { sentence: 'If I have time, I will help you.', translation: 'Если у меня будет время, я помогу тебе.' },
        { sentence: 'Ice melts if you heat it.', translation: 'Лёд тает, если его нагреть.' }
      ],
      practice: [
        { type: 'text', content: '**Задание:** Определите тип условного предложения:' },
        { type: 'list', items: [
          'If water freezes, it becomes ice. (Zero/First?)',
          'If you call me, I ___ (help) you.',
          'When you ___ (press) this button, the light turns on.',
          'If it ___ (be) sunny, we will go to the beach.'
        ]}
      ]
    },
  },
  {
    id: 25,
    title: 'Second and Third Conditionals',
    description: 'Условные предложения второго и третьего типа',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Нереальные условия' },
        { type: 'text', content: 'Second Conditional - нереальные ситуации в настоящем. Third Conditional - нереальные ситуации в прошлом.' },
        { type: 'highlight', variant: 'warning', content: '! **Second:** нереально сейчас (мечты)\n**Third:** было нереально (сожаления)' }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'Second Conditional - нереальное настоящее' },
          { type: 'formula', content: 'If + Past Simple, would + V' },
          { type: 'text', content: 'Используется для нереальных или маловероятных ситуаций в настоящем.' },
          { type: 'table', headers: ['Структура', 'Пример', 'Перевод'], rows: [
            ['If + Past, would + V', 'If I were rich, I would travel', 'Если бы я был богат, я бы путешествовал'],
            ['If + Past, could + V', 'If I had time, I could help', 'Если бы у меня было время, я мог бы помочь'],
            ['If + Past, might + V', 'If it rained, we might stay home', 'Если бы шел дождь, мы могли бы остаться дома']
          ]},
          { type: 'highlight', variant: 'tip', content: '✓ С глаголом **be** используется **were** для всех лиц: If I **were** you...' }
        ],
        [
          { type: 'heading', level: 3, content: 'Third Conditional - нереальное прошлое' },
          { type: 'formula', content: 'If + Past Perfect, would have + V3' },
          { type: 'text', content: 'Используется для ситуаций, которые не произошли в прошлом (сожаления).' },
          { type: 'table', headers: ['Структура', 'Пример', 'Перевод'], rows: [
            ['If + Past Perfect, would have + V3', 'If I had known, I would have come', 'Если бы я знал, я бы пришел'],
            ['If + Past Perfect, could have + V3', 'If he had studied, he could have passed', 'Если бы он учился, он мог бы сдать'],
            ['If + Past Perfect, might have + V3', 'If it had rained, we might have stayed', 'Если бы шел дождь, мы могли бы остаться']
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'Mixed Conditionals' },
          { type: 'text', content: 'Смешивают времена (прошлое → настоящее):' },
          { type: 'formula', content: 'If + Past Perfect, would + V' },
          { type: 'list', items: [
            'If I had studied harder, I would be a doctor now.',
            'If she had left earlier, she would be here by now.'
          ]},
          { type: 'highlight', variant: 'info', content: 'Прошлое условие → результат в настоящем' }
        ]
      ],
      examples: [
        { sentence: 'If I were rich, I would travel the world.', translation: 'Если бы я был богат, я бы путешествовал по миру.', highlight: true },
        { sentence: 'If I had studied harder, I would have passed the exam.', translation: 'Если бы я учился усерднее, я бы сдал экзамен.', highlight: true },
        { sentence: 'If she knew the truth, she would be angry.', translation: 'Если бы она знала правду, она бы рассердилась.' },
        { sentence: 'If they had left earlier, they would have caught the train.', translation: 'Если бы они ушли раньше, они бы успели на поезд.' }
      ],
      practice: [
        { type: 'text', content: '**Задание:** Перепишите в условных предложениях:' },
        { type: 'list', items: [
          'I\'m not rich, so I don\'t travel. (Second)',
          'I didn\'t know, so I didn\'t help. (Third)',
          'I didn\'t study, so I\'m not a doctor now. (Mixed)',
          'She doesn\'t have a car, so she walks. (Second)'
        ]}
      ]
    },
  },
  {
    id: 26,
    title: 'Passive Voice: Present and Past',
    description: 'Страдательный залог в настоящем и прошедшем времени',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Страдательный залог' },
        { type: 'text', content: 'Passive Voice используется, когда важнее действие, а не исполнитель.' },
        { type: 'highlight', variant: 'info', content: '**Формула:** be + Past Participle (V3)' }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'Present Simple Passive' },
          { type: 'formula', content: 'am/is/are + V3' },
          { type: 'table', headers: ['Форма', 'Пример', 'Перевод'], rows: [
            ['Утвердительная', 'The letter is written', 'Письмо написано'],
            ['Отрицательная', 'The letter isn\'t written', 'Письмо не написано'],
            ['Вопросительная', 'Is the letter written?', 'Письмо написано?']
          ]},
          { type: 'text', content: 'Трансформация из Active в Passive:' },
          { type: 'list', items: [
            'Active: They write letters. → Passive: Letters are written.',
            'Active: He opens the door. → Passive: The door is opened.'
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'Past Simple Passive' },
          { type: 'formula', content: 'was/were + V3' },
          { type: 'table', headers: ['Форма', 'Пример', 'Перевод'], rows: [
            ['Утвердительная', 'The house was built', 'Дом был построен'],
            ['Отрицательная', 'The house wasn\'t built', 'Дом не был построен'],
            ['Вопросительная', 'Was the house built?', 'Дом был построен?']
          ]},
          { type: 'text', content: 'Трансформация:' },
          { type: 'list', items: [
            'Active: They built the house. → Passive: The house was built.',
            'Active: She wrote the book. → Passive: The book was written.'
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'Когда использовать Passive' },
          { type: 'list', items: [
            'Исполнитель неизвестен: My bike was stolen.',
            'Исполнитель не важен: English is spoken here.',
            'Исполнитель очевиден: The thief was arrested.',
            'Указываем исполнителя с **by**: The book was written **by** Tolstoy.'
          ]},
          { type: 'highlight', variant: 'tip', content: '✓ Инструмент указывается с **with**: The door was opened **with** a key.' }
        ]
      ],
      examples: [
        { sentence: 'The letter is written every day.', translation: 'Письмо пишется каждый день.', highlight: true },
        { sentence: 'The house was built last year.', translation: 'Дом был построен в прошлом году.', highlight: true },
        { sentence: 'English is spoken all over the world.', translation: 'На английском говорят по всему миру.' },
        { sentence: 'The windows were cleaned yesterday.', translation: 'Окна были вымыты вчера.' }
      ],
      practice: [
        { type: 'text', content: '**Задание:** Преобразуйте в пассив:' },
        { type: 'list', items: [
          'They clean this room every week. →',
          'Someone built this house in 1990. →',
          'People speak English here. →',
          'They made this car in Japan. →'
        ]}
      ]
    },
  },
  {
    id: 27,
    title: 'Passive Voice: Future and Perfect',
    description: 'Страдательный залог в будущем и перфектных временах',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Passive в будущем и перфектных временах' },
        { type: 'text', content: 'Страдательный залог используется во всех временах.' },
        { type: 'highlight', variant: 'info', content: '**Формула:** be (в нужном времени) + V3' }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'Future Simple Passive' },
          { type: 'formula', content: 'will be + V3' },
          { type: 'table', headers: ['Форма', 'Пример', 'Перевод'], rows: [
            ['Утвердительная', 'The work will be finished', 'Работа будет закончена'],
            ['Отрицательная', 'The work won\'t be finished', 'Работа не будет закончена'],
            ['Вопросительная', 'Will the work be finished?', 'Работа будет закончена?']
          ]},
          { type: 'text', content: 'Трансформация:' },
          { type: 'list', items: [
            'Active: They will finish the work. → Passive: The work will be finished.',
            'Active: She will send the letter. → Passive: The letter will be sent.'
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'Present Perfect Passive' },
          { type: 'formula', content: 'has/have been + V3' },
          { type: 'table', headers: ['Форма', 'Пример', 'Перевод'], rows: [
            ['Утвердительная', 'The letter has been sent', 'Письмо было отправлено'],
            ['Отрицательная', 'The letter hasn\'t been sent', 'Письмо не было отправлено'],
            ['Вопросительная', 'Has the letter been sent?', 'Письмо было отправлено?']
          ]},
          { type: 'text', content: 'Трансформация:' },
          { type: 'list', items: [
            'Active: They have sent the letter. → Passive: The letter has been sent.',
            'Active: Someone has stolen my bike. → Passive: My bike has been stolen.'
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'Past Perfect и Future Perfect Passive' },
          { type: 'table', headers: ['Время', 'Формула', 'Пример'], rows: [
            ['Past Perfect', 'had been + V3', 'The work had been completed'],
            ['Future Perfect', 'will have been + V3', 'The project will have been finished']
          ]},
          { type: 'highlight', variant: 'tip', content: '✓ Логика одна: **be** в нужном времени + **V3**' }
        ]
      ],
      examples: [
        { sentence: 'The work will be finished tomorrow.', translation: 'Работа будет закончена завтра.', highlight: true },
        { sentence: 'The letter has already been sent.', translation: 'Письмо уже было отправлено.', highlight: true },
        { sentence: 'The bridge will be built by next year.', translation: 'Мост будет построен к следующему году.' },
        { sentence: 'The documents will have been prepared by the time you arrive.', translation: 'Документы будут подготовлены к моменту вашего прибытия.' }
      ],
      practice: [
        { type: 'text', content: '**Задание:** Преобразуйте в пассив:' },
        { type: 'list', items: [
          'They will finish the project. →',
          'Someone has already sent the email. →',
          'They had completed the work. →',
          'They will have repaired the car by Monday. →'
        ]}
      ]
    },
  },
  {
    id: 28,
    title: 'Reported Speech: Statements and Questions',
    description: 'Косвенная речь: утверждения и вопросы',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Косвенная речь' },
        { type: 'text', content: 'Косвенная речь используется для передачи чужих слов.' },
        { type: 'highlight', variant: 'warning', content: '! Меняются: времена глаголов, местоимения, указатели времени' }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'Изменение времён (Backshift)' },
          { type: 'table', headers: ['Прямая речь', 'Косвенная речь', 'Пример'], rows: [
            ['Present Simple', 'Past Simple', 'am/is/are → was/were'],
            ['Present Continuous', 'Past Continuous', 'am doing → was doing'],
            ['Past Simple', 'Past Perfect', 'did → had done'],
            ['Present Perfect', 'Past Perfect', 'has done → had done'],
            ['will', 'would', 'will do → would do'],
            ['can', 'could', 'can do → could do']
          ]},
          { type: 'highlight', variant: 'tip', content: '✓ Если говорим о всё ещё актуальном факте, время можно не менять' }
        ],
        [
          { type: 'heading', level: 3, content: 'Утверждения (Statements)' },
          { type: 'formula', content: 'He said (that)...' },
          { type: 'list', items: [
            'Direct: "I am tired." → Reported: He said (that) he was tired.',
            'Direct: "I will come." → Reported: He said (that) he would come.',
            'Direct: "I have finished." → Reported: He said (that) he had finished.'
          ]},
          { type: 'text', content: 'Глаголы: **said (that), told me (that), explained (that)**' }
        ],
        [
          { type: 'heading', level: 3, content: 'Вопросы (Questions)' },
          { type: 'text', content: 'Прямой порядок слов! НЕ инверсия!' },
          { type: 'table', headers: ['Тип вопроса', 'Формула', 'Пример'], rows: [
            ['Yes/No вопросы', 'He asked if/whether...', 'He asked if I was tired.'],
            ['Wh- вопросы', 'He asked where/when/why...', 'He asked where I lived.']
          ]},
          { type: 'highlight', variant: 'warning', content: '! He asked where **I lived** (НЕ: where **did I live**)' }
        ]
      ],
      examples: [
        { sentence: 'He said, "I am tired." → He said he was tired.', translation: 'Он сказал, что устал.', highlight: true },
        { sentence: 'She asked, "Where do you live?" → She asked where I lived.', translation: 'Она спросила, где я живу.', highlight: true },
        { sentence: '"I will come tomorrow," he said. → He said he would come the next day.', translation: 'Он сказал, что придёт на следующий день.' },
        { sentence: '"Have you seen this film?" she asked. → She asked if I had seen that film.', translation: 'Она спросила, видел ли я этот фильм.' }
      ],
      practice: [
        { type: 'text', content: '**Задание:** Преобразуйте в косвенную речь:' },
        { type: 'list', items: [
          'She said, "I can help you." →',
          'He asked, "What are you doing?" →',
          '"I have already eaten," he said. →',
          '"Do you speak English?" she asked. →'
        ]}
      ]
    },
  },
  {
    id: 29,
    title: 'Reported Speech: Commands and Time Expressions',
    description: 'Косвенная речь: приказы и изменения времени',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Команды и изменения времени' },
        { type: 'text', content: 'Команды передаются с помощью инфинитива. Выражения времени и места также меняются.' },
        { type: 'highlight', variant: 'info', content: '**Команды:** told/asked + to + infinitive' }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'Команды и просьбы' },
          { type: 'formula', content: 'told/asked/ordered + объект + (not) to + V' },
          { type: 'table', headers: ['Прямая речь', 'Косвенная речь'], rows: [
            ['"Close the door!"', 'He told me to close the door.'],
            ['"Please help me."', 'She asked me to help her.'],
            ['"Don\'t be late!"', 'He told me not to be late.'],
            ['"Don\'t touch this!"', 'She told me not to touch that.']
          ]},
          { type: 'text', content: 'Глаголы: **told** (приказ), **asked** (просьба), **ordered** (приказ), **warned** (предупреждение)' }
        ],
        [
          { type: 'heading', level: 3, content: 'Изменения времени' },
          { type: 'table', headers: ['Прямая речь', 'Косвенная речь', 'Пример'], rows: [
            ['today', 'that day', 'today → that day'],
            ['yesterday', 'the day before', 'yesterday → the day before'],
            ['tomorrow', 'the next day', 'tomorrow → the next day'],
            ['last week', 'the week before', 'last week → the week before'],
            ['next week', 'the following week', 'next week → the following week'],
            ['ago', 'before', '2 days ago → 2 days before']
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'Изменения места и указателей' },
          { type: 'table', headers: ['Прямая речь', 'Косвенная речь'], rows: [
            ['this', 'that'],
            ['these', 'those'],
            ['here', 'there'],
            ['now', 'then']
          ]}
        ]
      ],
      examples: [
        { sentence: '"Close the door!" → He told me to close the door.', translation: 'Он велел мне закрыть дверь.', highlight: true },
        { sentence: '"Don\'t be late!" → She told me not to be late.', translation: 'Она сказала мне не опаздывать.', highlight: true },
        { sentence: '"I saw him yesterday." → He said he had seen him the day before.', translation: 'Он сказал, что видел его накануне.' },
        { sentence: '"I\'ll do it tomorrow." → She said she would do it the next day.', translation: 'Она сказала, что сделает это на следующий день.' }
      ],
      practice: [
        { type: 'text', content: '**Задание:** Преобразуйте в косвенную речь:' },
        { type: 'list', items: [
          '"Help me, please." →',
          '"Don\'t touch this!" →',
          '"I was here yesterday." →',
          '"I will call you tomorrow." →'
        ]}
      ]
    },
  },
  {
    id: 30,
    title: 'Simple, Compound and Complex Sentences',
    description: 'Простые, сложносочинённые и сложноподчинённые предложения',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Структура предложений' },
        { type: 'text', content: 'Предложения различаются по структуре и количеству частей.' },
        { type: 'highlight', variant: 'info', content: '**Simple:** одна часть\n**Compound:** две равноправные\n**Complex:** главная + придаточная' }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'Simple Sentence - простое предложение' },
          { type: 'text', content: 'Одно подлежащее и одно сказуемое.' },
          { type: 'table', headers: ['Структура', 'Пример', 'Перевод'], rows: [
            ['S + V', 'I like tea.', 'Я люблю чай.'],
            ['S + V + O', 'She reads books.', 'Она читает книги.'],
            ['S + V + O + O', 'He gave me a book.', 'Он дал мне книгу.']
          ]},
          { type: 'highlight', variant: 'tip', content: '✓ Одна грамматическая основа' }
        ],
        [
          { type: 'heading', level: 3, content: 'Compound Sentence - сложносочинённое' },
          { type: 'text', content: 'Две независимые части, соединённые союзом.' },
          { type: 'table', headers: ['Союз', 'Пример', 'Значение'], rows: [
            ['and', 'I study, and she works.', 'добавление'],
            ['but', 'I like tea, but she prefers coffee.', 'противопоставление'],
            ['or', 'Study hard, or you will fail.', 'выбор'],
            ['so', 'I was tired, so I went home.', 'следствие']
          ]},
          { type: 'formula', content: 'Independent clause + conjunction + independent clause' }
        ],
        [
          { type: 'heading', level: 3, content: 'Complex Sentence - сложноподчинённое' },
          { type: 'text', content: 'Главная часть + придаточная (зависимая) часть.' },
          { type: 'table', headers: ['Союз', 'Пример', 'Тип'], rows: [
            ['although', 'Although it was raining, we went out.', 'уступка'],
            ['because', 'I stayed home because I was tired.', 'причина'],
            ['when', 'When he arrived, we left.', 'время'],
            ['if', 'If it rains, we will stay home.', 'условие']
          ]},
          { type: 'highlight', variant: 'tip', content: '✓ Придаточная часть не может существовать отдельно' }
        ]
      ],
      examples: [
        { sentence: 'I like tea. (Simple)', translation: 'Я люблю чай.', highlight: true },
        { sentence: 'I like tea, but she prefers coffee. (Compound)', translation: 'Я люблю чай, но она предпочитает кофе.', highlight: true },
        { sentence: 'Although it was raining, we went for a walk. (Complex)', translation: 'Хотя шёл дождь, мы пошли гулять.', highlight: true },
        { sentence: 'When he arrived, we left, and she stayed. (Compound-Complex)', translation: 'Когда он приехал, мы ушли, а она осталась.' }
      ],
      practice: [
        { type: 'text', content: '**Задание:** Определите тип предложения:' },
        { type: 'list', items: [
          'I study English. (Simple/Compound/Complex?)',
          'I was tired, so I went home.',
          'When it rains, I stay home.',
          'She studies hard, and she gets good grades.'
        ]}
      ]
    },
  },
  {
    id: 31,
    title: 'Relative Clauses and Gerunds/Infinitives',
    description: 'Относительные придаточные, герундий и инфинитив',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Относительные придаточные и глагольные формы' },
        { type: 'text', content: 'Relative clauses описывают существительные. Герундий и инфинитив - неличные формы глагола.' },
        { type: 'highlight', variant: 'info', content: '**Defining:** важная информация (без запятых)\n**Non-defining:** дополнительная информация (с запятыми)' }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'Defining Relative Clauses' },
          { type: 'text', content: 'Важная информация, которая определяет существительное. БЕЗ запятых.' },
          { type: 'table', headers: ['Местоимение', 'Использование', 'Пример'], rows: [
            ['who', 'люди', 'The man who called was my friend.'],
            ['which', 'вещи/животные', 'The book which I read was good.'],
            ['that', 'люди/вещи', 'The car that I bought is red.'],
            ['whose', 'притяжательное', 'The girl whose bag was stolen...']
          ]},
          { type: 'highlight', variant: 'tip', content: '✓ Можно опустить **who/which/that**, если они являются объектом' }
        ],
        [
          { type: 'heading', level: 3, content: 'Non-defining Relative Clauses' },
          { type: 'text', content: 'Дополнительная информация. С запятыми. НЕ используется **that**.' },
          { type: 'table', headers: ['Пример', 'Перевод'], rows: [
            ['My brother, who lives in London, is a doctor.', 'Мой брат, который живёт в Лондоне, врач.'],
            ['The book, which was expensive, was good.', 'Книга, которая была дорогой, была хорошей.']
          ]},
          { type: 'highlight', variant: 'warning', content: '! НЕЛЬЗЯ опустить местоимение в non-defining clauses' }
        ],
        [
          { type: 'heading', level: 3, content: 'Герундий (V-ing) vs Инфинитив (to V)' },
          { type: 'table', headers: ['Форма', 'После каких глаголов', 'Примеры'], rows: [
            ['Герундий (V-ing)', 'enjoy, finish, avoid, mind, suggest, keep', 'I enjoy reading.'],
            ['Инфинитив (to V)', 'want, decide, plan, hope, promise, agree', 'I want to be a doctor.'],
            ['Оба варианта', 'like, love, hate, start, begin', 'I like reading/to read.']
          ]},
          { type: 'text', content: 'После предлогов всегда герундий: I\'m good **at swimming**.' }
        ]
      ],
      examples: [
        { sentence: 'The book which I read was interesting.', translation: 'Книга, которую я прочитал, была интересной.', highlight: true },
        { sentence: 'My brother, who lives in London, is a doctor.', translation: 'Мой брат, который живёт в Лондоне, врач.', highlight: true },
        { sentence: 'I enjoy reading books.', translation: 'Мне нравится читать книги.' },
        { sentence: 'I want to be a doctor.', translation: 'Я хочу быть врачом.' }
      ],
      practice: [
        { type: 'text', content: '**Задание:** Вставьте герундий или инфинитив:' },
        { type: 'list', items: [
          'I decided ___ (go) to the cinema.',
          'She enjoys ___ (swim) in the sea.',
          'They want ___ (study) English.',
          'He finished ___ (write) the report.'
        ]}
      ]
    },
  },
  {
    id: 32,
    title: 'Coordinating and Subordinating Conjunctions',
    description: 'Сочинительные и подчинительные союзы',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Союзы в английском языке' },
        { type: 'text', content: 'Союзы соединяют слова, фразы или предложения.' },
        { type: 'highlight', variant: 'info', content: '**Coordinating:** соединяют равноправные части\n**Subordinating:** вводят придаточные предложения' }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'Coordinating Conjunctions (FANBOYS)' },
          { type: 'text', content: 'Соединяют равноправные части предложения.' },
          { type: 'table', headers: ['Союз', 'Значение', 'Пример'], rows: [
            ['for', 'потому что', 'I stayed home, for I was tired.'],
            ['and', 'и', 'I like tea and coffee.'],
            ['nor', 'и не', 'I don\'t like tea, nor do I like coffee.'],
            ['but', 'но', 'I like tea, but she prefers coffee.'],
            ['or', 'или', 'Study hard, or you will fail.'],
            ['yet', 'однако', 'It was late, yet we continued.'],
            ['so', 'поэтому', 'I was tired, so I went home.']
          ]},
          { type: 'highlight', variant: 'tip', content: '✓ Запятая перед союзом между независимыми предложениями' }
        ],
        [
          { type: 'heading', level: 3, content: 'Subordinating Conjunctions' },
          { type: 'text', content: 'Вводят придаточные (зависимые) предложения.' },
          { type: 'table', headers: ['Тип', 'Союзы', 'Пример'], rows: [
            ['Причина', 'because, since, as', 'I stayed home because I was tired.'],
            ['Время', 'when, while, before, after, until', 'When it rains, I stay home.'],
            ['Условие', 'if, unless', 'If it rains, we will stay home.'],
            ['Уступка', 'although, though, even though', 'Although it was raining, we went out.'],
            ['Цель', 'so that, in order that', 'I study so that I can pass the exam.']
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'Correlative Conjunctions' },
          { type: 'text', content: 'Парные союзы, работающие вместе.' },
          { type: 'table', headers: ['Пара', 'Пример', 'Перевод'], rows: [
            ['either...or', 'Either study or leave.', 'Или учись, или уходи.'],
            ['neither...nor', 'Neither tea nor coffee.', 'Ни чай, ни кофе.'],
            ['both...and', 'Both smart and kind.', 'И умный, и добрый.'],
            ['not only...but also', 'Not only smart but also kind.', 'Не только умный, но и добрый.']
          ]}
        ]
      ],
      examples: [
        { sentence: 'I like tea and coffee.', translation: 'Я люблю чай и кофе.', highlight: true },
        { sentence: 'I stayed home because I was tired.', translation: 'Я остался дома, потому что устал.', highlight: true },
        { sentence: 'Although it was raining, we went out.', translation: 'Хотя шёл дождь, мы вышли.' },
        { sentence: 'Hurry up, or we\'ll be late.', translation: 'Поторопись, или мы опоздаем.' }
      ],
      practice: [
        { type: 'text', content: '**Задание:** Выберите правильный союз и определите его тип:' },
        { type: 'list', items: [
          'I\'m tired ___ (and/but/because) happy.',
          'I stayed home ___ (because/although/if) I was sick.',
          'Study hard, ___ (or/and/but) you will fail.',
          '___ (Although/Because/When) it was late, we continued.'
        ]}
      ]
    },
  },
  {
    id: 33,
    title: 'Noun and Adverbial Clauses',
    description: 'Придаточные существительные и обстоятельственные',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Типы придаточных предложений' },
        { type: 'text', content: 'Придаточные предложения выполняют разные функции в предложении.' },
        { type: 'highlight', variant: 'info', content: '**Noun clauses:** функция существительного (что?)\n**Adverbial clauses:** функция обстоятельства (когда? где? почему?)' }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'Noun Clauses - придаточные существительные' },
          { type: 'text', content: 'Функционируют как существительное (подлежащее, дополнение, предикатив).' },
          { type: 'table', headers: ['Функция', 'Пример', 'Перевод'], rows: [
            ['Дополнение', 'I know that he is right.', 'Я знаю, что он прав.'],
            ['Подлежащее', 'What he said is true.', 'То, что он сказал, правда.'],
            ['Предикатив', 'The problem is that we don\'t have time.', 'Проблема в том, что у нас нет времени.']
          ]},
          { type: 'text', content: 'Вводятся: **that, what, whether, if, who, where, when, why, how**' }
        ],
        [
          { type: 'heading', level: 3, content: 'Adverbial Clauses of Time' },
          { type: 'text', content: 'Отвечают на вопрос "когда?"' },
          { type: 'table', headers: ['Союз', 'Пример', 'Значение'], rows: [
            ['when', 'When it rains, I stay home.', 'когда'],
            ['while', 'While I was sleeping, he left.', 'в то время как'],
            ['before', 'Call me before you leave.', 'перед тем как'],
            ['after', 'After he arrived, we left.', 'после того как'],
            ['until', 'Wait until I come back.', 'пока не'],
            ['as soon as', 'As soon as he arrives, call me.', 'как только']
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'Другие Adverbial Clauses' },
          { type: 'table', headers: ['Тип', 'Союзы', 'Пример'], rows: [
            ['Причина (why?)', 'because, since, as', 'I stayed because I was tired.'],
            ['Цель (why?)', 'so that, in order that', 'I study so that I can pass.'],
            ['Место (where?)', 'where, wherever', 'Go where you want.'],
            ['Образ действия (how?)', 'as, as if, as though', 'She acts as if she knows.']
          ]}
        ]
      ],
      examples: [
        { sentence: 'I know that he is right.', translation: 'Я знаю, что он прав.', highlight: true },
        { sentence: 'When it rains, I stay home.', translation: 'Когда идёт дождь, я остаюсь дома.', highlight: true },
        { sentence: 'She left early so that she could catch the train.', translation: 'Она ушла рано, чтобы успеть на поезд.' },
        { sentence: 'The problem is that we don\'t have enough time.', translation: 'Проблема в том, что у нас недостаточно времени.' }
      ],
      practice: [
        { type: 'text', content: '**Задание:** Определите тип придаточного:' },
        { type: 'list', items: [
          'I believe that you are right. (Noun/Adverbial?)',
          'He stayed because he was tired. (Тип?)',
          'When I arrived, they had left. (Тип?)',
          'What you said is important. (Noun/Adverbial?)'
        ]}
      ]
    },
  },
  {
    id: 34,
    title: 'Punctuation in Complex Sentences',
    description: 'Пунктуация в сложных предложениях',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Пунктуация в английском' },
        { type: 'text', content: 'Правильная пунктуация помогает понять структуру предложения.' },
        { type: 'highlight', variant: 'warning', content: '! Запятые в английском используются строже, чем в русском' }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'Запятые в Relative Clauses' },
          { type: 'table', headers: ['Тип', 'Запятые', 'Пример'], rows: [
            ['Defining', '✗ НЕТ', 'The book that I read was good.'],
            ['Non-defining', '✓ ЕСТЬ', 'My brother, who lives in Paris, is a teacher.']
          ]},
          { type: 'text', content: 'Правило: Если информация важна для понимания, кто/что - запятых НЕТ.' }
        ],
        [
          { type: 'heading', level: 3, content: 'Запятые в Complex Sentences' },
          { type: 'table', headers: ['Положение', 'Запятая', 'Пример'], rows: [
            ['Придаточное в начале', '✓ ЕСТЬ', 'Although it was late, we continued.'],
            ['Придаточное в конце', '✗ НЕТ', 'We continued although it was late.']
          ]},
          { type: 'highlight', variant: 'tip', content: '✓ Вводное придаточное → запятая после него' }
        ],
        [
          { type: 'heading', level: 3, content: 'Запятые в Compound Sentences' },
          { type: 'text', content: 'Запятая перед союзом между независимыми предложениями.' },
          { type: 'list', items: [
            '✓ I studied hard, and I passed the exam.',
            '✗ I studied hard and passed the exam. (одно подлежащее)',
            '✓ It was late, but we continued.',
            'Или точка с запятой: It was late; we went home.'
          ]}
        ],
        [
          { type: 'heading', level: 3, content: 'Другие правила' },
          { type: 'table', headers: ['Элемент', 'Правило', 'Пример'], rows: [
            ['Вводные слова', 'запятая после', 'However, I disagree.'],
            ['Списки', 'запятые между', 'I bought apples, oranges, and bananas.'],
            ['Прямая речь', 'запятая перед', 'He said, "I\'m tired."']
          ]}
        ]
      ],
      examples: [
        { sentence: 'My brother, who lives in Paris, is a teacher.', translation: 'Мой брат, который живёт в Париже, учитель.', highlight: true },
        { sentence: 'The book that I bought is on the table.', translation: 'Книга, которую я купил, на столе.', highlight: true },
        { sentence: 'Although it was late, we continued working.', translation: 'Хотя было поздно, мы продолжали работать.' },
        { sentence: 'I studied hard; I passed the exam.', translation: 'Я усердно учился; я сдал экзамен.' }
      ],
      practice: [
        { type: 'text', content: '**Задание:** Расставьте знаки препинания:' },
        { type: 'list', items: [
          'My sister who is a doctor lives in London.',
          'Although I was tired I continued.',
          'The book that I read was interesting.',
          'I like tea but she prefers coffee.'
        ]}
      ]
    },
  },
  {
    id: 35,
    title: 'Word Order, Question Tags and Emphasis',
    description: 'Порядок слов, разделительные вопросы и эмфаза',
    content: {
      introduction: [
        { type: 'heading', level: 2, content: 'Структура предложения и эмфаза' },
        { type: 'text', content: 'Порядок слов в английском строже, чем в русском. Question tags и эмфаза используются для уточнения и выделения.' },
        { type: 'highlight', variant: 'warning', content: '! Порядок слов в английском ФИКСИРОВАННЫЙ' }
      ],
      rules: [
        [
          { type: 'heading', level: 3, content: 'Базовый порядок слов' },
          { type: 'formula', content: 'Subject + Verb + Object + Adverbial' },
          { type: 'table', headers: ['Элемент', 'Позиция', 'Пример'], rows: [
            ['Subject (подлежащее)', '1', 'He'],
            ['Verb (сказуемое)', '2', 'gave'],
            ['Indirect Object', '3', 'me'],
            ['Direct Object', '4', 'the book'],
            ['Adverbial (обстоятельство)', '5', 'yesterday']
          ]},
          { type: 'text', content: 'Полное предложение: **He gave me the book yesterday.**' }
        ],
        [
          { type: 'heading', level: 3, content: 'Question Tags - разделительные вопросы' },
          { type: 'text', content: 'Короткие вопросы в конце предложения для подтверждения.' },
          { type: 'table', headers: ['Предложение', 'Tag', 'Правило'], rows: [
            ['You are a student,', 'aren\'t you?', 'Положительное → отрицательный tag'],
            ['She isn\'t coming,', 'is she?', 'Отрицательное → положительный tag'],
            ['They can swim,', 'can\'t they?', 'С модальным глаголом'],
            ['He doesn\'t like it,', 'does he?', 'С вспомогательным do/does/did']
          ]},
          { type: 'highlight', variant: 'tip', content: '✓ Tag всегда использует местоимение и вспомогательный/модальный глагол' }
        ],
        [
          { type: 'heading', level: 3, content: 'Эмфаза - выделение важного' },
          { type: 'table', headers: ['Конструкция', 'Пример', 'Перевод'], rows: [
            ['It is/was...that', 'It was John that called.', 'Именно Джон звонил.'],
            ['What...is/was', 'What I want is some peace.', 'Всё, что мне нужно - покой.'],
            ['Do/Does/Did + V', 'I do like coffee.', 'Я действительно люблю кофе.'],
            ['Инверсия', 'Never have I seen this.', 'Никогда я не видел этого.']
          ]},
          { type: 'text', content: 'Эмфаза используется для усиления или контраста.' }
        ]
      ],
      examples: [
        { sentence: 'He gave me the book.', translation: 'Он дал мне книгу.', highlight: true },
        { sentence: 'She is a teacher, isn\'t she?', translation: 'Она учительница, не так ли?', highlight: true },
        { sentence: 'They haven\'t arrived, have they?', translation: 'Они не прибыли, не так ли?' },
        { sentence: 'What I want is some peace.', translation: 'Всё, что мне нужно, это покой.' }
      ],
      practice: [
        { type: 'text', content: '**Задание:** Добавьте question tag:' },
        { type: 'list', items: [
          'You can swim, ___?',
          'He won\'t come, ___?',
          'They are students, ___?',
          'She doesn\'t like coffee, ___?'
        ]},
        { type: 'text', content: '**Создайте эмфатическое предложение:**' },
        { type: 'list', items: [
          'John called. (используйте It is...that)',
          'I need rest. (используйте What...is)'
        ]}
      ]
    },
  },
];

