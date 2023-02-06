<script setup>
import { ref } from 'vue';
import colorJson from './assets/data/colors.json';

const colors = ref(colorJson);
const name = ref('');
const mainMenu = ref(true);
const score = ref(0);
const counter = ref(60);
const isGameEnd = ref(false);
const leaderboard = ref([]);
let selectedColor = [];
let timer;

const getName = () => {
    if (name.value === '' || name.value.length === 0) {
        return 'Guest';
    }

    return name.value;
}

const startGame = () => {
    if (timer) {
        clearInterval(timer);
    }

    isGameEnd.value = false;
    mainMenu.value = false;
    score.value = 0;
    counter.value = 60;
    getRandomColors();

    timer = setInterval(() => {
        if (counter.value === 0) {
            clearInterval(timer);
            isGameEnd.value = true;
            saveScore();
            return;
        }
        counter.value--;
    }, 1000);
}


const getNumberOfCircles = () => {
    let circleNumer = 4;
    if (score.value >= 5 && score.value <= 14) {
        return circleNumer = 9;
    } else if (score.value >= 15 && score.value <= 24) {
        return circleNumer = 16;
    } else if (score.value >= 25) {
        return circleNumer = 25;
    } else {
        return circleNumer;
    }
}

const getNumberOfgridColumns = () => {
    if (score.value >= 5 && score.value <= 14) {
        return 'grid-cols-3';
    } else if (score.value >= 15 && score.value <= 24) {
        return 'grid-cols-4';
    } else if (score.value >= 25) {
        return 'grid-cols-5';
    } else {
        return 'grid-cols-2';
    }
}

const getSizeOfCircles = () => {
    if (score.value >= 5 && score.value <= 14) {
        return 'w-24 h-24';
    } else if (score.value >= 15 && score.value <= 24) {
        return 'w-20 h-20';
    } else if (score.value >= 25) {
        return 'w-16 h-16';
    } else {
        return 'w-32 h-32';
    }
}

const getRandomColors = () => {
    selectedColor = [];
    const random = Math.floor(Math.random() * colors.value.length);
    const color = colors.value[random];
    for (let i = 0; i < getNumberOfCircles(); i++) {
        if (i < getNumberOfCircles() - 1) {
            selectedColor.push(color.primaryColor);
        } else {
            selectedColor.push(color.secondaryColor);
        }
    }
    return selectedColor.sort(() => Math.random() - 0.5)
}

const checkAnswer = (color) => {
    let secondaryColor = selectedColor.find((color) => selectedColor.indexOf(color) === selectedColor.lastIndexOf(color));

    if (color === secondaryColor) {
        score.value++;
        getRandomColors();
    }
}

const setMainMenu = () => {
    mainMenu.value = !mainMenu.value;
    isGameEnd.value = false;
    clearInterval(timer);
}

async function getLeaderboard() {
    const response = await fetch('https://test-project-api-production.up.railway.app/leaderboard');
    const data = await response.json();
    leaderboard.value = data;
}

const saveScore = async () => {
    const response = await fetch('https://test-project-api-production.up.railway.app/leaderboard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: getName(),
            score: score.value
        })
    });
    const data = await response.json();
    leaderboard.value = data;
}

const convertDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString() + ' ' + newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

getLeaderboard();
</script>
 
<template>
    <div class="w-screen h-screen" style="background-color: #2A303C;">
        <div class="w-full h-full" v-show="mainMenu">
            <div class="w-5/12 mx-auto mt-6">
                <img src="./assets/images/logo.png" alt="Catch The Wrong Color">
            </div>

            <div class="w-1/3 h-auto mx-auto mt-6 rounded-3xl shadow-lg pb-16" style="background-color: #334155;">
                <div class="flex flex-col items-center">
                    <input type="text" placeholder="Type your name..." class="input w-5/12 mt-14" v-model.trim="name" />
                    <button class="btn w-5/12 h-1/6 mt-4" style="background-color: #111B2E;" @click="startGame()">Let's
                        Start!</button>
                    <hr class="w-7/12 mt-9" style="border-color: gray;">
                    <label for="how-to-play" class="btn w-5/12 mt-10" style="background-color: #111B2E;">How to
                        play</label>
                </div>
            </div>
        </div>

        <div class="w-full h-full" v-show="!mainMenu">
            <div class="w-full h-1/6">
                <div class="w-1/12 mt-6 ml-6">
                    <img src="./assets/images/logo.png" alt="Catch The Wrong Color" @click="setMainMenu()">
                </div>
            </div>

            <div class="w-full h-full">
                <div class="w-full h-full flex flex-col">
                    <div class="w-full h-full flex flex-row">
                        <div class="w-1/4 h-1/3 flex flex-col" v-show="!isGameEnd">
                            <p class="text-lg ml-80">
                                <span class="font-bold">Player: </span>
                                {{ getName() }}
                            </p>
                            <p class="text-lg ml-80">
                                <span class="font-bold">Score: </span>
                                {{ score }}
                            </p>
                        </div>

                        <div class="w-2/4 h-full" v-show="!isGameEnd">
                            <div class="w-3/6 h-auto rounded-3xl shadow-lg m-auto pb-12"
                                style="background-color: #334155;">
                                <div class="w-full h-full flex flex-col">
                                    <p class="text-center text-5xl font-mono mt-7" style="color: white;">{{ counter }}
                                    </p>

                                    <div class="grid gap-1 m-auto mt-10" :class="getNumberOfgridColumns()">
                                        <div class="rounded-full" v-for="(color, index) in selectedColor" :key="index"
                                            :class="`${color} ${getSizeOfCircles()}`" @click="checkAnswer(color)"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="w-full h-full" v-show="isGameEnd">
                            <div class="w-1/4 h-full rounded-3xl shadow-lg mx-auto" style="background-color: #334155;">
                                <div class="w-full h-full flex flex-col" v-show="isGameEnd">
                                    <p class="text-center text-5xl font-mono mt-32" style="color: #FFDA1B;">
                                        Congratulations!</p>
                                    <p class="text-center text-5xl font-mono mt-7">{{ getName() }}</p>
                                    <p class="text-center text-5xl font-mono mt-7">{{ score }} point!!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full h-full flex flex-row justify-center gap-5">
                        <button class="btn mt-6" style="background-color: #AC9C48; color: white;"
                            @click="setMainMenu()">Main menu</button>
                        <label for="leaderboard" class="btn mt-6" style="background-color: #AC9C48; color: white;"
                            @click="getLeaderboard()">LeaderBoard</label>
                        <label for="restart-game" class="btn mt-6"
                            style="background-color: #AC9C48; color: white;">Restart Game</label>
                    </div>
                </div>
            </div>
        </div>

        <div id="firework" class="w-full h-full" v-show="isGameEnd">
            <img src="./assets/images/firework.gif" alt="firework" class="absolute top-0 left-0">
            <img src="./assets/images/firework.gif" alt="firework" class="absolute top-0 right-0">
            <img src="./assets/images/firework.gif" alt="firework" class="absolute bottom-0 left-0">
            <img src="./assets/images/firework.gif" alt="firework" class="absolute bottom-0 right-0">
            <img src="./assets/images/firework.gif" alt="firework" class="absolute top-1/4 left-1/4">
            <img src="./assets/images/firework.gif" alt="firework" class="absolute top-1/4 right-1/4">
            <img src="./assets/images/firework.gif" alt="firework" class="absolute bottom-1/4 left-1/4">
            <img src="./assets/images/firework.gif" alt="firework" class="absolute bottom-1/4 right-1/4">
        </div>
    </div>



    <!-- modal how to play -->
    <!-- <input type="checkbox" id="how-to-play" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative">
            <label for="how-to-play" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 class="text-lg font-bold">How to play?</h3>
            <p class="py-4">Find the different color, once you find it, click on it.</p>
        </div>
    </div> -->

    <input type="checkbox" id="how-to-play" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">How to play?</h3>
            <p class="py-4">Find the different color, once you find it, click on it.</p>
            <div class="modal-action mt-0">
                <label for="how-to-play" class="btn">Yay!</label>
            </div>
        </div>
    </div>

    <!-- modal restart game -->
    <input type="checkbox" id="restart-game" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Are you sure you want to restart the game</h3>
            <p class="py-4">Your score will be reset.</p>
            <div class="modal-action">
                <label for="restart-game" class="btn">No thanks</label>
                <label for="restart-game" class="btn btn-error" @click="startGame()">Yay!</label>
            </div>
        </div>
    </div>

    <!-- modal leaderboard -->
    <input type="checkbox" id="leaderboard" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative w-12/12">
            <label for="leaderboard" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 class="text-lg font-bold mb-3">Top 10 players</h3>
            <div class="flex flex-col">
                <div class="flex flex-row">
                    <div class="w-1/3">
                        <p class="font-bold text-left">Name</p>
                    </div>
                    <div class="w-1/3">
                        <p class="font-bold text-center">Score</p>
                    </div>
                    <div class="w-1/3">
                        <p class="font-bold text-right">Date</p>
                    </div>
                </div>
                <div class="flex flex-row" v-for="(player, index) in leaderboard" :key="index">
                    <div class="w-1/3">
                        <p class="text-left">{{ player.name }}</p>
                    </div>
                    <div class="w-1/3">
                        <p class="text-center">{{ player.score }}</p>
                    </div>
                    <div class="w-1/3">
                        <p class="text-right">{{ convertDate(player.updated_at) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped>
input {
    color: #000000;
    background-color: #A1A7B3;
}

input::placeholder {
    color: #000000;
    text-align: center;
}

input:focus::-webkit-input-placeholder {
    color: transparent;
}

#firework {
    pointer-events: none;
}
</style>