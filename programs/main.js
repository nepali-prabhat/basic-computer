'use-strict'
var htb = require('hex-to-binary');
const itb = require("int-to-binary");
const anyBase = require('any-base');
const bth = anyBase(anyBase.BIN,anyBase.HEX);
const clipboardy = require('clipboardy');

const mri=[
    "AND",
    "OR",
    "XOR",
    "NOT",
    "ADD",
    "SUB",
    "LDA",
    "STA",
    "BUN",
    "BSA",
    "ISZ",
    "XCH",
]
const rri=[
    "CLA",
    "CLE",
    "CMA",
    "CME",
    "CIR",
    "CIL",
    "INC",
    "DEC",
    "SPA",
    "SNA",
    "SZA",
    "SZE",
    "SHR",
    "SHL",
    "HLT",
]
const ioi=[
    "INP",
    "OUT",
    "SKI",
    "SKO",
    "ION",
    "IOF",
]
const mri_symbol_table = {}
mri.map((v,i)=>{
    mri_symbol_table[v] = itb.unsigned(i,4)
})
console.log(mri_symbol_table);
const rri_symbol_table={}
rri.map((v,i)=>{
    let value = `01111000000000000000`
    const index = 5+i;
    let middleValue = value.split("");
    middleValue[index] = 1;
    value = middleValue.join("");
    rri_symbol_table[v]=value
})
const ioi_symbol_table={}
ioi.map((v,i)=>{
    let value = `11111000000000000000`
    const index = 5+i;
    let middleValue = value.split("");
    middleValue[index] = 1;
    value = middleValue.join("");
    ioi_symbol_table[v]=value
})
function code_gen(){
    let command = [
        // '0 LDA 0005',
        // '0 ADD 0006',
        // '0 SUB 0007',
        // '0 STA 0008',
        // 'r HLT'
        '0 LDA 0003',
        '0 STA 0004',
        "r HLT",
        // 'r HLT',
    ]
    console.log("");
    console.log({command:command.join(", ")})
    const final = command.map((v)=>{
        let value = v.split(" ");
        if(value.length===3){
            const code = mri_symbol_table[value[1]];
            value[1] = code;
            const address = value[2].split("");
            let addressInBin = "";
            address.forEach((v)=>{
                addressInBin = addressInBin+htb(v)
            })
            value[2] = addressInBin.split("").splice(1,addressInBin.length).join("");
            return value.join("");
        }else{
            if(value[0]==='r'){
                return rri_symbol_table[value[1]]
            }else{
                return  ioi_symbol_table[value[1]]
            }
        }
    })
    const hexFinal = final.map((v)=>{
        const retVal = bth(v);
        if(retVal ==="0"){
            return "00000"
        }else{
            return retVal
        }
    })
    
    return hexFinal;
}
let finalRAMCode = "";
code_gen().forEach((v)=>{
    finalRAMCode = finalRAMCode+v+` `;
}) 
const dth=(v)=>(
    bth(itb.unsigned(v,20))
)
const data = [dth(20)].join(" ")
copy = finalRAMCode+data
clipboardy.writeSync(copy);
console.log("");
console.log({data: copy});
console.log("");
console.log(dth(50));
console.log(dth(40));