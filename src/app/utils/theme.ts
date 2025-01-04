export const handleTheme = () =>{
    const darkMode = localStorage.getItem('dark-mode');
    if(darkMode === 'true'){
        document.body.classList.add('dark');
    }else if(darkMode === 'false'){
        document.body.classList.remove('dark');
    }else{
        localStorage.setItem('dark-mode', 'false');
    }
}

export const handleThemeChange = () =>{
    const darkMode = localStorage.getItem('dark-mode');
    if(darkMode === 'true'){
        localStorage.setItem('dark-mode', 'false');
    }else{
        localStorage.setItem('dark-mode', 'true');
    }
    handleTheme();
}