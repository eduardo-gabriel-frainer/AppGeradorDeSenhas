
const password = {
    value: '',
    length: 15,
    characters: {
        numbers: '0123456789',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        special: '?/~{}[]!@#$%&*()_--*/.,:;'
    },
    generate(chars) {
        let pwd = '';
        
        chars = chars || Object.values(this.characters).join('');

        for (let i=0; i< this.length; i++){
            pwd += chars[Math.floor(Math.random() * chars.length)];
        }

        this.value = pwd;
        return pwd;

    }
}

const pwdContent = document.getElementById('tela')
const btnGerar = document.getElementById('gerar')

const pwdSlider = document.getElementById('caracteresSlider')
const pwdSliderStatus = document.getElementById('sliderValue')
const pwdInputChars = document.getElementById('checkbox-container').getElementsByTagName('input')

const slider = document.getElementById("caracteresSlider");
const sliderValue = document.getElementById("sliderValue");

// Atualiza o valor mostrado ao lado do slider
slider.addEventListener("input", function () {
    sliderValue.textContent = slider.value;
});

function pwdGenerator(){
    let chars = '';

    for(let i = 0; i < pwdInputChars.length; i++){
         
        if(pwdInputChars[i].checked){
            chars += password.characters[pwdInputChars[i].name];

        }
    }

    password.length = pwdSlider.value;
    pwdContent.textContent = password.generate(chars);

}

btnGerar.addEventListener('click', pwdGenerator);

for(let i = 0; i < pwdInputChars.length; i++){
    pwdInputChars[i].addEventListener('change', pwdGenerator);
}

const copiar = document.getElementById('copiar');

copiar.addEventListener('click', () => {
    navigator.clipboard.writeText(password.value);
    copiar.value = 'Copiado';

    setTimeout(() => {
        copiar.value = 'Copiar';
    }, 2000);

})



