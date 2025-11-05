
let input= document.getElementById('inputBox');
let buttons=document.querySelectorAll('button');
let string='';
buttons.forEach(button =>{
        let value = button.innerText;
    button.addEventListener('click',(e)=>{
        if(value == '='){
            string=eval(string);
            input.value=string;
        }
        else if(value == 'AC'){
            string="";
            input.value=string;
        }
        else if(value == 'DEL'){
            string=string.substring(0,string.length-1);
            input.value=string;
        }
        else{
            string +=value;
            input.value=string;
        }
    })
})