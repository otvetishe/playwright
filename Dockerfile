# Використання базового імейджа Playwright
FROM mcr.microsoft.com/playwright:v1.46.1-jammy

# Встановлення робочої директорії
WORKDIR /app

# Копіювання package.json і package-lock.json для встановлення залежностей
COPY package*.json ./

# Встановлення залежностей
RUN npm install
RUN apt-get update && apt-get install -y xvfb xauth
RUN npx playwright install --with-deps

# Копіювання всіх файлів проекту до контейнера
COPY . .

# Вказання команди за замовчуванням для запуску тестів
CMD ["npx", "playwright", "test"]
