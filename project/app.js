const inquirer = require("inquirer")
const { initQuestions } = require("./questions.js")

class pet {
  constructor(name, type, hunger, tiredness, bored, energy) {
    this.name = name
    this.type = type
    this.hunger = hunger
    this.tiredness = tiredness
    this.bored = bored
    this.energy = energy
  }

  health = 100

  feed() {
    console.log(`${this.name} is feeding... thirst + 10`)
    this.health += 10 
  }

  drink() {
    console.log(`${this.name} is drinking... hunger - 50`)
    this.health -= 50 
  }

  play() {
    console.log(`${this.name} is playing... hunger and thirst - 25 each`)
    this.health -= 25 
  }

  sleep() {
    console.log(`${this.name} is sleeping... energy full`)
    this.health += 100 
  }


}

let myPet

const init = () => {
  inquirer
    .prompt(initQuestions)
    .then((answers) => {
      console.log(answers)
      myPet = new pet(answers.name, answers.type, answers.hunger, answers.tiredness, answers.bored, answers.energy)
    })
    .then(() => gameLoop())
    .catch((error) => {
      console.log(error)
    })
}

const gameLoop = () => {
  

 if (myPet.health <= 0) {
    console.log("your pet is dead")
    return 
  }


  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: ["feed", "drink", "play", "sleep"],
      },
    ])
    .then((answer) => {
      if (answer.action === "feed") {
        myPet.feed()
      }
      else if (answer.action === "drink") {
        myPet.drink()
      }
      else if (answer.action === "play") {
        myPet.play()
      }
      else if (answer.action === "sleep") {
        myPet.sleep()
      }
    })
    .then(() => gameLoop())
}

init()