<script setup>
import { ref } from 'vue';

const colorData = [
    {
        wrongColor: 'bg-red-700',
        rightColor: 'bg-red-800'
    },
    {
        wrongColor: 'bg-blue-600',
        rightColor: 'bg-blue-700'
    },
    {
        wrongColor: 'bg-green-400',
        rightColor: 'bg-green-500'
    },
    {
        wrongColor: 'bg-yellow-400',
        rightColor: 'bg-yellow-500'
    },
    {
        wrongColor: 'bg-purple-600',
        rightColor: 'bg-purple-500'
    },
    {
        wrongColor: 'bg-pink-900',
        rightColor: 'bg-rose-900'
    },
    {
        wrongColor: 'bg-indigo-800',
        rightColor: 'bg-indigo-700'
    },
    {
        wrongColor: 'bg-neutral-900',
        rightColor: 'bg-neutral-800'
    },
    {
        wrongColor: 'bg-emerald-200',
        rightColor: 'bg-green-200'
    },
    {
        wrongColor: 'bg-blue-700',
        rightColor: 'bg-blue-800'
    },
    {
        wrongColor: 'bg-teal-800',
        rightColor: 'bg-teal-900'
    },
    {
        wrongColor: 'bg-slate-600',
        rightColor: 'bg-gray-600'
    },
    {
        wrongColor: 'bg-amber-400',
        rightColor: 'bg-yellow-400'
    },
    {
        wrongColor: 'bg-indigo-700',
        rightColor: 'bg-blue-800'
    },
    {
        wrongColor: 'bg-teal-800',
        rightColor: 'bg-teal-900'
    },
    {
        wrongColor: 'bg-slate-600',
        rightColor: 'bg-gray-600'
    },
    {
        wrongColor: 'bg-amber-400',
        rightColor: 'bg-yellow-400'
    },
    {
        wrongColor: 'bg-emerald-200',
        rightColor: 'bg-green-200'
    },
    {
        wrongColor: 'bg-indigo-700',
        rightColor: 'bg-blue-800'
    },
    {
        wrongColor: 'bg-teal-800',
        rightColor: 'bg-teal-900'
    },
    {
        wrongColor: 'bg-slate-600',
        rightColor: 'bg-gray-600'
    },
    {
        wrongColor: 'bg-amber-400',
        rightColor: 'bg-yellow-400'
    },
    {
        wrongColor: 'bg-emerald-200',
        rightColor: 'bg-green-200'
    },
    {
        wrongColor: 'bg-indigo-700',
        rightColor: 'bg-blue-800'
    },
    {
        wrongColor: 'bg-teal-800',
        rightColor: 'bg-teal-900'
    },
    {
        wrongColor: 'bg-slate-600',
        rightColor: 'bg-gray-600'
    },
    {
        wrongColor: 'bg-amber-400',
        rightColor: 'bg-yellow-400'
    },
    {
        wrongColor: 'bg-emerald-200',
        rightColor: 'bg-green-200'
    },
    {
        wrongColor: 'bg-indigo-700',
        rightColor: 'bg-blue-800'
    },
    {
        wrongColor: 'bg-teal-800',
        rightColor: 'bg-teal-900'
    },
    {
        wrongColor: 'bg-slate-600',
        rightColor: 'bg-gray-600'
    },
    {
        wrongColor: 'bg-amber-400',
        rightColor: 'bg-yellow-400'
    }
]

let score = ref(0);
let start = ref(false);
let countdown = ref(60);
let gameEnd = ref(false);
let username = ref('');
let input = ref(false)
let colorSelected = [];
let timer;

const startGame = () => {
    if (start.value) return;
    start.value = true;
    input.value = true;
    gameEnd.value = false;
    score.value = 0;
    countdown.value = 60;
    colorSelected = getRandomColor();
    timer = setInterval(() => {
        if (countdown.value === 0) {
            gameEnd.value = true;
            start.value = false;
            clearInterval(timer);
            return;
        }
        countdown.value--;
    }, 1000)
}
const resetGame = () => {
    start.value = false;
    gameEnd.value = false;
    countdown.value = 60;
    score.value = 0;
    clearInterval(timer);
}

const getRandomColor = () => {
    colorSelected = [];
    let shuffledColor = randomColor();
    shuffledColor.sort(() => Math.random() - 0.5);

    return shuffledColor;
}

const randomColor = () => {
    let columnNumer = 4;
    if (score.value >= 5 && score.value <= 14) {
        columnNumer = 9;
    }
    else if (score.value >= 15 && score.value <= 24) {
        columnNumer = 16;
    }
    else if (score.value >= 25) {
        columnNumer = 25;
    }

    let color = colorData[Math.floor(Math.random() * colorData.length)];
    for (let i = 0; i < columnNumer; i++) {
        if (colorSelected.length < columnNumer - 1) {
            colorSelected.push(color.wrongColor);
        }
        else {
            colorSelected.push(color.rightColor);
            break;
        }
    }
    return colorSelected;
}

const nextLevel = () => {
    if (score.value == 0) {
        return 'grid-cols-2';
    }
    else if (score.value >= 5 && score.value <= 14) {
        return 'grid-cols-3';
    }
    else if (score.value >= 15 && score.value <= 24) {
        return 'grid-cols-4';
    }
    else if (score.value >= 25) {
        return 'grid-cols-5';
    }
    else {
        return 'grid-cols-2';
    }
}

const checkAnswer = (color) => {
    let oddColor = colorSelected.filter((color) => {
        return colorSelected.indexOf(color) === colorSelected.lastIndexOf(color);
    })

    if (color === oddColor[0]) {
        score.value++;
        colorSelected = getRandomColor();
    }
}

const getUsername = () => {
    if (username.value === '' || username.value === null || username.value.length === 0) {
        return username.value = 'Guest';
    }
    return username.value;
}
</script>
 
<template>
    <div class="w-screen h-screen dark">
        <div class="w-full h-full flex">
            <div class="flex flex-row m-auto w-9/12 h-5/6 bg-slate-200 dark:bg-slate-700 shadow-md rounded-2xl">
                <div class="form-control w-full max-w-xs m-auto" v-if="!input">
                    <label class="label">
                        <span class="label-text font-bold">What is your name?</span>
                    </label>

                    <input type="text" placeholder="Enter your name" class="input input-bordered"
                        v-model.trim="username" />
                    <button class="btn mt-3" @click="startGame()">Start Game</button>
                </div>

                <div class="w-full flex flex-col items-center" v-if="input">
                    <div class="flex flex-row mb-5 mt-10 gap-10">
                        <p class="text-lg font-bold m-auto">Username: {{ getUsername() }}</p>
                        <p class="text-lg font-bold m-auto">Score: {{ score }}</p>
                    </div>

                    <div class="flex mb-10 mt-10 gap-10">
                        <button class="btn" @click="startGame()">start new game</button>
                        <p class="font-mono text-6xl">{{ countdown }}</p>
                        <button class="btn" @click="resetGame()">reset game</button>
                    </div>

                    <div class="flex flex-col text-center mt-32" v-show="gameEnd">
                        <p class="text-2xl font-bold">Congrats {{ getUsername() }}, the game is over!</p>
                        <p class="text-2xl font-bold">your score is {{ score }}</p>
                    </div>

                    <div class="grid gap-3" :class="nextLevel()" v-show="start">
                        <div v-for="(color, index) in colorSelected" :key="index" class="w-24 h-24 rounded-full"
                            :class="color" @click="checkAnswer(color)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped>

</style>