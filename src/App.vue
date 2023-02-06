<script setup>
import { ref } from 'vue';
import colorJson from './assets/data/colors.json';

const colors = ref(colorJson);
const name = ref('');
const mainMenu = ref(false);
const score = ref(0);
const counter = ref(60);
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

    mainMenu.value = true;
    score.value = 0;
    counter.value = 60;
    getRandomColors();

    timer = setInterval(() => {
        if (counter.value === 0) {
            clearInterval(timer);
            mainMenu.value = false;
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
}
</script>
 
<template>
    <div class="w-screen h-screen" style="background-color: #2A303C;">
        <div class="w-full h-full" v-show="!mainMenu">
            <div class="w-5/12 mx-auto mt-6">
                <img src="./assets/images/logo.png" alt="Catch The Wrong Color">
            </div>

            <div class="w-1/3 h-2/6 mx-auto mt-6 rounded-3xl shadow-lg" style="background-color: #334155;">
                <div class="flex flex-col items-center">
                    <input type="text" placeholder="Type your name..." class="input w-5/12 mt-14" v-model.trim="name" />
                    <button class="btn w-5/12 h-1/6 mt-2" style="background-color: #111B2E;" @click="startGame()">Let's
                        Start!</button>
                    <hr class="w-7/12 mt-9" style="border-color: gray;">
                    <label for="how-to-play" class="btn w-5/12 mt-8" style="background-color: #111B2E;">How to
                        play</label>
                </div>
            </div>
        </div>

        <div class="w-full h-full" v-show="mainMenu">
            <div class="w-full h-1/6">
                <div class="w-1/12 mt-6 ml-6">
                    <img src="./assets/images/logo.png" alt="Catch The Wrong Color">
                </div>
            </div>

            <div class="w-full h-full">
                <div class="w-full h-full flex flex-col">
                    <div class="w-full h-full flex flex-row">
                        <div class="w-1/4 h-1/3 flex flex-col">
                            <p class="text-lg ml-80">
                                <span class="font-bold">Player: </span>
                                {{ getName() }}
                            </p>
                            <p class="text-lg ml-80">
                                <span class="font-bold">Score: </span>
                                {{ score }}
                            </p>
                        </div>

                        <div class="w-2/4 h-full">
                            <div class="w-3/6 h-full rounded-3xl shadow-lg mx-auto" style="background-color: #334155;">
                                <div class="w-full h-full flex flex-col">
                                    <p class="text-center text-5xl font-mono mt-7">{{ counter }}</p>

                                    <div class="grid gap-1 m-auto mt-10" :class="getNumberOfgridColumns()">
                                        <div class="rounded-full" v-for="(color, index) in selectedColor"
                                            :key="index" :class="`${color} ${getSizeOfCircles()}`"
                                            @click="checkAnswer(color)"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full h-full flex flex-row justify-center gap-5">
                        <button class="btn mt-6" style="background-color: #AC9C48; color: white;" @click="setMainMenu()">Main
                            menu</button>
                        <label for="restart-game" class="btn mt-6"
                            style="background-color: #AC9C48; color: white;">Restart Game</label>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <!-- modal how to play -->
    <input type="checkbox" id="how-to-play" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative">
            <label for="how-to-play" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 class="text-lg font-bold">How to play?</h3>
            <p class="py-4">Find the different color, once you find it, click on it.</p>
        </div>
    </div>

    <!-- modal restart game -->
    <input type="checkbox" id="restart-game" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
            <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!
            </p>
            <div class="modal-action">
                <label for="restart-game" class="btn">No thanks</label>
                <label for="restart-game" class="btn btn-error" @click="startGame()">Yay!</label>
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
</style>