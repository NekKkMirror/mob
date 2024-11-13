Запуск: 
```bash
    docker compose -f docker-compose.yml up -d --build
```

Скрипт для загрузки пользователей:
```bash
    npm run populate
```


Логи:
```bash
    docker compose -f docker-compose.yml logs --follow --tail 500
```

Выход из  [docker-compose.yml](docker-compose.yml):
```bash
    docker compose -f docker-compose.yml down -v
```