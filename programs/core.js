'use-strict'
var htb = require('hex-to-binary');
const itb = require("int-to-binary");
const anyBase = require('any-base');
const bth = anyBase(anyBase.BIN,anyBase.HEX);
const dth=(v)=>(
    bth(itb.unsigned(v,20))
)
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
    "DEC",
    "INC",
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
function code_gen(command){
    const final = command.map((v)=>{
        let value = v.split(" ");
        if(v === "NULL"){
            return "00000";
        }
        else if(value.length===3){
            if(value[0]==="DATA"){
                return value[1]==='INT'? itb.unsigned(parseInt(value[2]), 20):
                        value[1]==='HEX'? htb(value[2]):
                        value[1]==='BIN'? value[2]:
                        value[1]==='ADD'? htb(value[2]):"0";
            }
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
    const finalRAMCode = hexFinal.join(" ");
    console.log({finalRAMCode});
    return finalRAMCode;
}
function symbollTable(){
    console.log({MRI:mri_symbol_table, RRI:rri_symbol_table, IOI:ioi_symbol_table});
}
module.exports = {codeGen: code_gen, symbollTable:symbollTable, htb, dth}