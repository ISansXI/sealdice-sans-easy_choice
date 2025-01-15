function generateRandomInteger(x, y) {
  return Math.floor(Math.random() * (y - x + 1)) + x;
}

function main() {
  // 注册扩展
  let ext = seal.ext.find('sans-ez-choice');
  if (!ext) {
    ext = seal.ext.new('sans-ez-choice', '地星 AKA Sans', '1.0.0');
    seal.ext.register(ext);
  }

  // 编写指令
  const cmdSeal = seal.ext.newCmdItemInfo();
  cmdSeal.name = 'sans-ez-choice';
  cmdSeal.help = '随机选择你想要的东西，使用.s指令使用，比如：\n.s 左边 右边 上边 下边';

  cmdSeal.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
      case 'help': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
      default: {
        let args = String(cmdArgs.getRestArgsFrom(1));
        let argsArr = args.split(" ");
        let sum = argsArr.length;
        let index = generateRandomInteger(0, sum - 1);
        seal.replyToSender(ctx, msg, `"${argsArr[index]}"`);
        const ret = seal.ext.newCmdExecuteResult(true);
        return ret;
      }
    }
  }

  // 注册命令
  ext.cmdMap['s'] = cmdSeal;
}

main();
