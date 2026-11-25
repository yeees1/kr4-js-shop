const products = [
  { id: 1, title: 'Бирюзовая футболка 1С', category: 'clothes', price: 3900, isAvailable: true, image: 'tshirt-turquoise.jpg', url: 'product.html', description: 'Футболка свободного кроя с вышитым логотипом 1С.' },
  { id: 2, title: 'Носки «Причиняем пользу»', category: 'clothes', price: 560, isAvailable: true, image: 'socks-useful.jpg', url: 'products/socks-useful.html', description: 'Белые носки с красным рисунком и фирменной надписью.' },
  { id: 3, title: 'Жёлтые сабо 1С', category: 'clothes', price: 3250, isAvailable: true, image: 'clogs-yellow.jpg', url: 'products/clogs-yellow.html', description: 'Лёгкая обувь с вентиляционными отверстиями.' },
  { id: 4, title: 'Шоппер «Потянем любую задачу»', category: 'accessories', price: 970, isAvailable: true, image: 'shopper-task.jpg', url: 'products/shopper-task.html', description: 'Вместительная чёрная сумка с фирменным принтом.' },
  { id: 5, title: 'Деловой рюкзак 1С', category: 'accessories', price: 10400, isAvailable: true, image: 'backpack-business.jpg', url: 'products/backpack-business.html', description: 'Рюкзак с отделением для ноутбука.' },
  { id: 6, title: 'Бамбуковая подставка для телефона', category: 'accessories', price: 690, isAvailable: true, image: 'phone-stand-bamboo.jpg', url: 'products/phone-stand-bamboo.html', description: 'Разборная настольная подставка с отверстием для кабеля.' },
  { id: 7, title: 'Жёлтый термостакан 1С', category: 'home', price: 2080, isAvailable: true, image: 'coffer-yellow.jpg', url: 'products/coffer-yellow.html', description: 'Компактный термостакан с прозрачной крышкой.' },
  { id: 8, title: 'Термос с индикатором температуры', category: 'home', price: 2240, isAvailable: true, image: 'thermos-temperature.jpg', url: 'products/thermos-temperature.html', description: 'Термос с дисплеем температуры на крышке.' },
  { id: 9, title: 'Внешний аккумулятор 5000 мА·ч', category: 'tech', price: 1950, isAvailable: true, image: 'powerbank-5000.jpg', url: 'products/powerbank-5000.html', description: 'Компактный аккумулятор с индикатором заряда.' },
  { id: 10, title: 'Беспроводная зарядка-подставка 1С', category: 'tech', price: 2490, isAvailable: true, image: 'charger-wireless.jpg', url: 'products/charger-wireless.html', description: 'Настольная подставка с беспроводной зарядкой.' },
  { id: 11, title: 'Ручка с подставкой для телефона', category: 'stationery', price: 430, isAvailable: true, image: 'pen-phone-stand.jpg', url: 'products/pen-phone-stand.html', description: 'Ручка с клипсой, которую можно использовать как подставку.' },
  { id: 12, title: 'Линейка-лупа с котом 1С', category: 'stationery', price: 390, isAvailable: false, image: 'magnifier-ruler.jpg', url: 'products/magnifier-ruler.html', description: 'Линейка с увеличительным участком и рисунком кота.' }
];

const formatPrice = price => new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
