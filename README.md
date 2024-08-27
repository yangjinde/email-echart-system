#### 1 Technology stack
```
Svelte、Typescript、Tailwind CSS、Apache Echarts、Vitest
```

#### 2 Create project
```
npm create svelte@latest email-echart-system
```

#### 3 Install plugins

##### 3.1 Install Tailwind CSS
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
##### 3.2 Install Echarts
```
npm install echarts
```

##### 3.3 Install Vitest
```
npm install --save-dev vitest @testing-library/svelte
```

#### 4 Run step

##### 4.1 Install plugins
```
npm install
```

##### 4.2 Run system
```
npm run dev
```

#### 5 Run Unit Testing

##### 5.1 Run test
```
npm run test
```
##### 5.2 Run Unit test coverage
```
npx vitest run --coverage
```