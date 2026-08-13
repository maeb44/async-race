import './script/a.ts'
import './styles/style1.scss'

console.log(1)
let array = [1,3,4].reduce((accumulator, element)=>accumulator + element,0)
console.log(array)