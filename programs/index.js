let command = []
// command = [
//     '0 LDA 0008',
//     'r CME',
//     'r CIR',
//     'r INC',
//     'r SHL',
//     'r CIL',
//     '0 STA 0009',
//     'r HLT',
//     'DATA INT 1300',
// ]
command = [
    "1 LDA 000c",
    "0 ADD 0007",
    "0 BSA 0008",
    "0 STA 0005",
    "r HLT",
    "NULL",
    "DATA INT 20",
    "DATA INT 10",
    "NULL",    //0003
    "0 SUB 0006",
    "1 BUN 0008",
    "NULL",
    "DATA ADD 0006",
]
const clipboardy = require('clipboardy');
const core = require('./core');
// core.symbollTable();
let finalRAMCode = core.codeGen(command);
clipboardy.writeSync(finalRAMCode);
// console.log(
//     {   
//         [core.dth(1300)]:core.htb('00514'),
//         'new Value':core.htb('00a2d'),
//     });
