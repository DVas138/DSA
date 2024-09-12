import {swap} from "../utils";

function shuffle(array: any[]) {
    for (let i = array.length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        swap(array, i ,randomIndex)
    }
    return array
}