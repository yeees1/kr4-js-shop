const products = [
  { id: 1, title: 'Бирюзовая футболка 1С', category: 'clothes', price: 3900, isAvailable: true, image: 'tshirt-turquoise.jpg', url: 'product.html', description: 'Футболка свободного кроя с вышитым логотипом 1С.' },
  { id: 2, title: 'Носки «Причиняем пользу»', category: 'clothes', price: 560, isAvailable: true, image: 'socks-useful.jpg', url: 'products/socks-useful.html', description: 'Белые носки с красным рисунком и фирменной надписью.' },
  { id: 3, title: 'Жёлтые сабо 1С', category: 'clothes', price: 3250, isAvailable: true, image: 'clogs-yellow.jpg', url: 'products/clogs-yellow.html', description: 'Лёгкая обувь с вентиляционными отверстиями.' },
  { id: 13, title: 'Футболка «Славянский интерфейс»', category: 'clothes', price: 3900, isAvailable: true, image: 'tshirt-slavic.jpg', url: 'products/tshirt-slavic.html', description: 'Белая футболка 1С:БО с принтом «Славянский интерфейс».' },
  { id: 14, title: 'Футболка Balance', category: 'clothes', price: 3900, isAvailable: true, image: 'tshirt-balance.jpg', url: 'products/tshirt-balance.html', description: 'Чёрная футболка 1С:БО с принтом Balance.' },
  { id: 4, title: 'Шоппер «Потянем любую задачу»', category: 'accessories', price: 970, isAvailable: true, image: 'shopper-task.jpg', url: 'products/shopper-task.html', description: 'Вместительная чёрная сумка с фирменным принтом.' },
  { id: 5, title: 'Деловой рюкзак 1С', category: 'accessories', price: 10400, isAvailable: true, image: 'backpack-business.jpg', url: 'products/backpack-business.html', description: 'Рюкзак с отделением для ноутбука.' },
  { id: 15, title: 'Металлический кардхолдер', category: 'accessories', price: 1900, isAvailable: true, image: 'cardholder-metal.jpg', url: 'products/cardholder-metal.html', description: 'Компактный футляр для карт с выдвижным механизмом.' },
  { id: 16, title: 'Ремешок для телефона', category: 'accessories', price: 450, isAvailable: true, image: 'phone-lanyard.jpg', url: 'products/phone-lanyard.html', description: 'Плетёный регулируемый ремешок на запястье.' },
  { id: 6, title: 'Бамбуковая подставка для телефона', category: 'accessories', price: 690, isAvailable: true, image: 'phone-stand-bamboo.jpg', url: 'products/phone-stand-bamboo.html', description: 'Разборная настольная подставка с отверстием для кабеля.' },
  { id: 7, title: 'Жёлтый термостакан 1С', category: 'home', price: 2080, isAvailable: true, image: 'coffer-yellow.jpg', url: 'products/coffer-yellow.html', description: 'Компактный термостакан с прозрачной крышкой.' },
  { id: 8, title: 'Термос с индикатором температуры', category: 'home', price: 2240, isAvailable: true, image: 'thermos-temperature.jpg', url: 'products/thermos-temperature.html', description: 'Термос с дисплеем температуры на крышке.' },
  { id: 17, title: 'Кружка Grade Fade', category: 'home', price: 1250, isAvailable: true, image: 'mug-grade-fade.jpg', url: 'products/mug-grade-fade.html', description: 'Стеклянная кружка с матовым градиентом и рисунком кота.' },
  { id: 9, title: 'Внешний аккумулятор 5000 мА·ч', category: 'tech', price: 2300, isAvailable: true, image: 'powerbank-5000.jpg', url: 'products/powerbank-5000.html', description: 'Компактный аккумулятор с индикатором заряда.' },
  { id: 18, title: 'Выдвижной кабель 3 в 1', category: 'tech', price: 780, isAvailable: true, image: 'cable-3in1.jpg', url: 'products/cable-3in1.html', description: 'Красный кабель с тремя видами разъёмов.' },
  { id: 19, title: 'Коврик с подсказками по 1С', category: 'tech', price: 990, isAvailable: true, image: 'mousepad-shortcuts.jpg', url: 'products/mousepad-shortcuts.html', description: 'Коврик с подсказками по языку Элемент платформы 1С.' },
  { id: 10, title: 'Беспроводная зарядка-подставка 1С', category: 'tech', price: 2200, isAvailable: true, image: 'charger-wireless.jpg', url: 'products/charger-wireless.html', description: 'Настольная подставка с беспроводной зарядкой.' },
  { id: 11, title: 'Ручка с подставкой для телефона', category: 'stationery', price: 430, isAvailable: true, image: 'pen-phone-stand.jpg', url: 'products/pen-phone-stand.html', description: 'Ручка с клипсой, которую можно использовать как подставку.' },
  { id: 12, title: 'Линейка-лупа с котом 1С', category: 'stationery', price: 390, isAvailable: false, image: 'magnifier-ruler.jpg', url: 'products/magnifier-ruler.html', description: 'Линейка с увеличительным участком и рисунком кота.' },
  { id: 20, title: 'Ручка-мультитул 1С', category: 'stationery', price: 620, isAvailable: true, image: 'pen-multitool.jpg', url: 'products/pen-multitool.html', description: 'Жёлтая ручка с несколькими полезными инструментами.' },
  { id: 21, title: 'Моя спящая Элла', category: 'ella', price: null, isAvailable: false, image: 'ella.jpg', url: 'product-ella.html', description: 'Элла спит.' },
  { id: 22, title: 'Моя уставшая защитница Элла', category: 'ella', price: null, isAvailable: false, image: 'ella-tired-guardian.jpg', url: 'products/ella-tired-guardian.html', description: 'Элла в костюме защитницы.' },
  { id: 23, title: 'Моя защитница Элла', category: 'ella', price: null, isAvailable: false, image: 'ella-guardian.jpg', url: 'products/ella-guardian.html', description: 'Элла с копьём и щитом.' }
];

const formatPrice = price => new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
