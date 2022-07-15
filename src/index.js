#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import gradient from "gradient-string";
import figlet from "figlet";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
let playerName;

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "准备开始 接受 Digitalchina Frontend Team Javascript 技术挑战了吗?"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("挑战规则")} 
    读题。
    选择答案。
    答错了就 ${chalk.bgRed("Game Over")}
    准备开始吧...
  `);
}

function winner() {
  console.clear();
  figlet(`恭喜 , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + "\n");

    console.log(chalk.green(`编程你最棒`));
    process.exit(0);
  });
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("AI正在计算答案...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `不错不错 ${playerName}. 你蒙对了!` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, 你可以躺平了 ${playerName}!` });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "输入挑战者的姓名?",
    default() {
      return "无名氏";
    },
  });

  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "NaN === NaN 返回是:\n",
    choices: ["true", "false"],
  });

  return handleAnswer(answers.question_1 === "false");
}

await welcome();

await askName();

await question1();

await winner();
